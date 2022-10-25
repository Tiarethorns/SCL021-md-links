#!/usr/bin/env node

const { fixPath, isFile, extension, readFile } = require("./index");
const path = require("path");
const fs = require("fs");
const https = require("https");
const { get } = require("http");
const [p1, p2, pathFile, ...args] = process.argv;

const mdLinks = (route, options) => {
  if (pathIsAbsolute === false) {
    fixPath(pathFile);
  } else {
  }
};
