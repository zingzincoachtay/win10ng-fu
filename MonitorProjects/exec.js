const fs = require('fs');
const path = require("path");
module.exports.workingDir = (SELF) => {
  let basin = SELF.match(/^(.+?)([^\\]+)$/);//console.log(basin);
  return basin[1];
}
module.exports.maskedTarget = (db) => {
  let database = {};console.log(db);
  try {
    const data = fs.readFileSync(db, 'utf8');

    database = JSON.parse(data);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
  return database;
}
const getAllFiles = (root, files) => {
  let contents = fs.readdirSync(root);

  files = files || [];

  contents.forEach(function(content) {
    if (fs.statSync(root + "/" + content).isDirectory())
      files = getAllFiles(root + "/" + content, files);
    else
      files.push(path.join(__dirname, root, "/", content));
  });

  return files
}
module.exports.getAllFiles = getAllFiles;
module.exports.essentialFiles = (files,rules) => {
  let essence = [];
  for(let file of files){
    let flags = new Set();
    rules.forEach((rule, i) => {
      let re = new RegExp(rule);
      flags.add( re.test(file) );
    });
    if( !flags.has(false) ) essence.push( file );
  }
}
