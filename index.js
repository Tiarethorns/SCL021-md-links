#!/usr/bin/env node

// Import the path module
const { resolve, isAbsolute } = require("path");
const path = require("path");
const fs = require("fs");
const https = require("https");
//const fetch = require("node-fetch");

//comprobar que la ruta sea absoluta y si no, transformarla
const fixPath = (route) => {
  let pathIsAbsolute = path.isAbsolute(route);

  if (pathIsAbsolute === false) {
    let fixedPath = path.resolve(route);
    return fixedPath;
  }
  return route;
};

console.log("la ruta absoluta es " + fixPath("README.md"));

// Verifica si la ruta es un archivo, si es un directorio retorna false
const isFile = (route) => {
  let stats = fs.statSync("README.md");
  console.log("Es un archivo ? " + stats.isFile());
  return stats.isFile();
};
isFile();
// comprobar la extension del archivo
const extension = (route) => {
  console.log("La extension es" + path.extname("README.md"));
  return path.extname("README.md");
};
extension();

//archivos de un directorio
let filenames = fs.readdirSync("C:\\Users\\dizzy\\SCL021-cipher");
console.log("Archivos en la carpeta:");
console.log(filenames);

// filtrar solo los que tengan extension .md
const filterExtension = filenames.filter(
  (file) => path.extname(file) === ".md"
);
console.log(filterExtension);
console.log(filterExtension.length);

function detectURLs(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.match(urlRegex);
}
// leer los archivos
const readFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile("README.md", "utf8", (err, data) => {
      console.log("lenyendo archivo", typeof data);
      if (err) {
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
//links funcionales fetch
//npm install node-fetch

//import fetch from "node-fetch";
//.map transformar arreglo de url a arreglo de promesas

https.get("https://bluuweb.github.io/javascript/02-dom/", (res) => {
  //https.get(url[, options][, callback])
  if (res.statusCode === 200) {
    return console.log(
      "statusCode:",
      res.statusCode,
      "status Message:",
      res.statusMessage
    );
  } else {
    return console.log(
      "statusCode:",
      res.statusCode,
      "status Message:",
      res.statusMessage
    );
  }

  /*console.log("headers:", res.headers);

  res.on("data", (d) => {
      process.stdout.write(d);
    });
  })
  .on("error", (e) => {
    console.error(e);*/
});
