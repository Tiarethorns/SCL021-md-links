#!/usr/bin/env node

// Import the path module
const { resolve, isAbsolute } = require("path");
const path = require("path");
const fs = require("fs");
const https = require("https");
const fetch = require("node-fetch");
const [p1, p2, pathFile, ...args] = process.argv;

//comprobar que la ruta sea absoluta y si no, transformarla

const fixPath = (route) => {
  const pathIsAbsolute = path.isAbsolute(pathFile);
  if (pathIsAbsolute === false) {
    return path.resolve(pathFile);
  }
  return route;
};
console.log("La ruta absoluta del archivo es " + path.resolve(pathFile));

//verificar si la ruta es un archivo

function detectURLs(message) {
  var urlRegex =
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  return message.match(urlRegex);
}

const readFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, "utf8", (err, data) => {
      console.log("lenyendo archivo", typeof data);
      if (err) {
        return console.log("El archivo no es válido");
        reject(err);
      } else if (data) {
        const urlsDetected = detectURLs(data);
        console.log("urls detected", urlsDetected);
        resolve(urlsDetected);
      }
    });
  });
};
//readFile().then((data) => console.log(data.length));

readFile().then((urlsDetected) =>
  urlsDetected.map((link) => {
    //console.log({ link });
    return new Promise((resolve, reject) => {
      try {
        fetch(link)
          .then((respuesta) => {
            console.log(respuesta);
          })
          .catch((error) => {
            console.log(error);
          });
        /* https.get(link, (res) => {
          if (res.statusCode === 200) {
            resolve({
              source: process.argv[2],
              link: link,
              code: res.statusCode,
              message: "OK",
            });
          } else {
            reject({
              source: process.argv[2],
              link: link,
              code: res.statusCode,
              message: "FAIL",
            });
          }
        });*/
      } catch (error) {
        console.log({ error });
      }
    });
  })
);
