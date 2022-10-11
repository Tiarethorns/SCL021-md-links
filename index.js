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

console.log(fixPath("README.md"));

// Verifica si la ruta es un archivo, si es un directorio retorna false
// Use statSync() method to store the returned
// instance into variable named stats

const DirOrFile = (route) => {
  let stats = fs.statSync("README.md");
  console.log("is file ? " + stats.isFile());
  return stats.isFile();
};
DirOrFile();

//console.log("is directory ? " + stats.isDirectory());

// comprobar la extension del rchivo
const extension = (route) => {
  console.log("La extension es" + path.extname("README.md"));
  return path.extname("README.md");
};
extension();

