#!/usr/bin/env node

// Import the path module
const { resolve, isAbsolute } = require("path");
const path = require("path");
const fs = require("fs");
const linkDetect =
  /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
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
const readFile = fs.readFile("README.md", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
