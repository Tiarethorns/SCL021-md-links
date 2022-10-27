#!/usr/bin/env node

const { resolve, isAbsolute } = require("path");
const path = require("path");
const fs = require("fs");
const https = require("https");
const fetch = require("node-fetch");
const [p1, p2, pathFile, ...args] = process.argv;

//ruta absoluta o relativa
var absolutePath = path.resolve(pathFile);
console.log("La ruta absoluta del archivo es " + absolutePath);
//verificar si la ruta es un archivo
var stats = fs.statSync(pathFile);
console.log("Es un archivo ? " + stats.isFile());
//verificar si la ruta es un directorio
var stats = fs.statSync(pathFile);
console.log("Es un directorio ? " + stats.isDirectory());
//verificar que la extension sea ".md"
var extension = path.extname(pathFile);
console.log("La extensión del archivo es " + extension);

//función para detectar links dentro del archivo a leer
function detectURLs(message) {
  let urlRegex =
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
  return message.match(urlRegex);
}
//función que lee el archivo y detecta links
const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, "utf8", (err, data) => {
      console.log("leyendo archivo tipo", typeof data);
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

//callback que extrae la data requerida
readFile().then((urlsDetected) => {
  const arrPromises = urlsDetected.map((link) =>
    fetch(link)
      .then((res) => ({
        status: res.status,
        statusText: res.statusText,
        url: link,
      }))
      .catch((err) => err)
  );

  Promise.all(arrPromises).then((result) => console.log(result));
});
