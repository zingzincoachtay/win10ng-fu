var fs = require('fs');
var path = require('path');

const getAllFiles = (root, files) => {
  let contents = fs.readdirSync(root);
  console.log("Crawling here: "+root);
  files = files || [];

  contents.forEach(function(content) {
    if (fs.statSync(root + "\\" + content).isDirectory())
      files = getAllFiles(root + "\\" + content, files);
    else
      files.push(path.join(root, "\\", content));
      //files.push(path.join(__dirname, root, "/", content));
  });
  console.log("N(Found): "+files.length);
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
    files = getAllFiles(root,files);
  return files;
};
module.exports.essentialFiles = (files, irules, xrules) => files.filter( (file)=>isMatch(file,irules,xrules) );


const  getAbsPath = (root,relativePath) => root + '\\' + relativePath;
const  isDir = (absolutePath) => fs.statSync(absolutePath).isDirectory();
const  noDirs = function(paths){
  paths.forEach((path, i) => {
    if(isDir(path)) return false;
  });
  return true;
}
