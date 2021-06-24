const fs = (typeof require !== 'undefined') ? require('fs') : {};
const path = (typeof require !== 'undefined') ? require('path') : {};

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
  return files;
}
const isMatch = (o,pos,neg,flags=[]) => !flags.concat(pos.map((rule)=> rule.test(o)),neg.map((rule)=>!rule.test(o))).includes(false);

module.exports.findFiles = (roots, files) => {
  for(let root of roots)
    files = getAllFiles(root,files);
  console.log("N(Found): "+files.length);
  return files;
};
module.exports.findDirs = (roots, files) => {
  for(let root of roots)
    files = getAllFiles(root,files);
  let dirs = new Set(files.map( (f)=>f.split(/[^\\\/]/g).slice(0,-1).join("\\") ));
  console.log("N(Found): "+Array.from(dirs).length);
  return Array.from(dirs);
};
module.exports.getEssentials = (files, irules, xrules) => files.filter( (file)=>isMatch(file,irules,xrules) );
