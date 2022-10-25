#!/usr/bin/env node

// Import the path module
const { resolve, isAbsolute } = require("path");
const path = require("path");
const fs = require("fs");
const https = require("https");
const { get } = require("http");
const [p1, p2, pathFile, ...args] = process.argv;

//comprobar que la ruta sea absoluta y si no, transformarla
const fixPath = (route) => {
  const pathIsAbsolute = path.isAbsolute(route);
  if (pathIsAbsolute === false) {
    return path.resolve(route);
  }
  return route;
};

const isFile = (route) => {
  let stats = fs.statSync(pathFile);
  console.log("es un archivo? " + stats.isFile());
  return stats.isFile();
};

const extension = (route) => {
  console.log("La extension es" + path.extname(pathFile));
  return path.extname(pathFile);
};

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
    return new Promise((resolve, reject) => {
      try {
        https.get(urlsDetected, (link) => {
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
        });
      } catch (error) {
        console.log({ error });
      }
    });
  })
);

/**
 * the description of the function
 * @param {string} pathFile:¨the path file to look for all the links in md files
 * @param {object} options
 * @return {promise}:
 */ module.exports = { fixPath, isFile, extension, readFile };
