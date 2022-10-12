#!/usr/bin/env node

// Import the path module
const { resolve, isAbsolute } = require("path");
const path = require("path");
const fs = require("fs");
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
// Use statSync() method to store the returned
// instance into variable named stats

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

//mostrar los archivos de un directorio
let foundFiles = [];
let filenames = fs.readdirSync("C:\\Users\\dizzy\\SCL021-cipher");
console.log("Archivos en la carpeta:");
console.log(filenames);

/*for (i = 0; i < filenames.length; i++) {
  
  filenames.push(foundFiles);
}
console.log(foundFiles);*/

filenames.forEach((file) => {
  foundFiles.push(file);
  //console.log("File:", file);
  console.log(foundFiles);
});
// filtrar solo los que tengan extension .md
const filterExtension = filenames.filter(
  (file) => path.extname(file) === ".md"
);
console.log(filterExtension);
