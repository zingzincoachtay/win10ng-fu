const fs = require('fs');
const path = require("path");
module.exports.settings = () => ({"default":`{
  "include" : {
    "paths" : [...select project folders to crawl and monitor],
    "rules" : [...either substrings or RegExp expression that the absolute
                paths of the files must include/match]
  },
  "exclude" : {
    "paths" : [...select subdirectory to not monitor],
    "rules" : [...either substrings or RegExp expression that the absolute
                paths of the files cannot include/match]
  }
}`});
module.exports.SELF = (me) => {
  let basin = me.match(/^(.+?)([^\\]+)$/);//console.log(basin);
  return {"SELFDIR":basin[1],"SELFEXEC":basin[2]};
}
module.exports.maskedTarget = (db) => {
  let database = {};
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
    if (fs.statSync(root + "\\" + content).isDirectory())
      files = getAllFiles(root + "\\" + content, files);
    else
      files.push(path.join(root, "\\", content));
      //files.push(path.join(__dirname, root, "/", content));
  });

  return files;
}
module.exports.findFiles = (roots, files) => {
  for(let root of roots)
    files = getAllFiles(root,files);
  return files;
};
const ruleTest = (o,rule) => {
  let exp = rule.match(/^(\W)(.+)\1$/);
  if( exp !== null )  rule = exp[2];
  return (new RegExp(rule)).test(o);
}
const isMatch = (o,pos,neg) => {
  let flags = new Set();
  for(let rule of pos)
    flags.add(  ruleTest(o,rule) );
  for(let rule of neg)
    flags.add( !ruleTest(o,rule) );
  return !flags.has(false);
}
module.exports.essentialFiles = (files, irules, xrules) => files.filter( (file)=>isMatch(file,irules,xrules) );
