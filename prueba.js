const readFile = (route) => {
  return new Promise((resolve, reject) => {
    const links = [];
    fs.readFile("README.md", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else if (data.match(linkDetect) === null) {
        reject(console.log("no hay links"));
      } else if (data) {
        data.match(linkDetect).forEach((link) => {
          links.push(link);
        });
        resolve(links);
        console.log(links);
      }
    });
  });
};
