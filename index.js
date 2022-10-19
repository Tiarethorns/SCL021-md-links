#!/usr/bin/env node

// Import the path module
const { resolve, isAbsolute } = require("path");
const path = require("path");
const fs = require("fs");
const https = require("https");
const [p1, p2, pathFile, ...args] = process.argv;
//console.log({ pathFile, args });

//comprobar que la ruta sea absoluta y si no, transformarla
const fixPath = (route) => {
  let pathIsAbsolute = path.isAbsolute(pathFile);
  if (pathIsAbsolute === false) {
    let fixedPath = path.resolve(pathFile);
    return fixedPath;
  } else {
    return console.log("la ruta ya es absoluta");
  }
};
console.log("la ruta absoluta es " + fixPath(pathFile));

const isFile = (route) => {
  let stats = fs.statSync(pathFile);
  return stats.isFile();
};
isFile();

const isValid = (route) => {
  let isMD = path.extname(pathFile);
  console.log(isMD);
  if (isFile(pathFile) === true && isMD === ".md") {
    console.log("el archivo es válido");
  } else {
    return console.log("Debes inspeccionar un archivo tipo Markdown");
  }
};
isValid();
//corroborar si el archivo contiene links

function detectURLs(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
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
readFile().then((data) => console.log(data.length));
