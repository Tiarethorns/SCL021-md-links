#!/usr/bin/env node

// Import the path module
const { resolve, isAbsolute } = require("path");
const path = require("path");
const fs = require("fs");
const url = require("url");
const linkDetect =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
/*const args = process.argv;
const basename = path.basename;
const parse = path.parse;*/

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

// leer los archivos
const readFile = (route) => {
  return new Promise(
    (resolve, reject) => {},
    fs.readFile("README.md", "utf8", (err, data) => {
      const links = []; //transformar a promesa asincrona
      if (err) {
        reject(err);
      } else if (data.match(linkDetect) === null) {
        reject("no hay links en el archivo");
      } else if (data) {
        data.match(linkDetect).forEach((link) => {
          links.push(link);
        });
        resolve(links);
        console.log(links);
        console.log(data.match(linkDetect));
      }
    })
  );
};
//contador de links
/*const LinkCount = (route) => {
  let count = 0;
  route.forEach((link, index) => {
    if (route.indexOf(link) === index) {
      count++;
    }
  });
  console.log("esto si funciona");
  return count;
};*/
