var fs = require('fs');
var path = require('path');

const getAllPaths = (root, files) => {
  let contents = fs.readdirSync(root);
  console.log("Crawling here: "+root);
  files = files || [];

  contents.forEach(function(content) {
    if (fs.statSync(root + "\\" + content).isDirectory())
      files = getAllPaths(root + "\\" + content, files);
    else
      files.push(path.join(root, "\\", content));
      //files.push(path.join(__dirname, root, "/", content));
  });
  return files;
}
const ruleTest = (o,rule) => {
  return (new RegExp(rule)).test(o);
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

module.exports.findFiles = (roots, files) => {
  for(let root of roots)
    files = getAllPaths(root,files);
  console.log("N(Found): "+files.length);
  return files;
};
module.exports.findDirs = (roots, files) => {
  for(let root of roots)
    files = getAllPaths(root,files);
  let dirs = new Set(files.map( (f)=>f.match(/^(.+\/)([^\\]+)$/).slice(1,-1) ).flat());
  console.log("N(Found): "+Array.from(dirs).length);
  return Array.from(dirs);
};
module.exports.getEssentials = (files, irules, xrules) => files.filter( (file)=>isMatch(file,irules,xrules) );
