var fs = require('fs');
//var path = require('path');

const getFiles = function(givenDirs,AllFiles){
  let getDirs = givenDirs.filter( givenDir => isDir(givenDir) );
  let getFiles = givenDirs.filter( givenDir => !isDir(givenDir) );
  // Escape point if all directories had resolved at the same depth.
  //if (getDirs.length==0 && getFiles.length==0) return AllFiles;

  // Accumulate all files in one place
  AllFiles = [...AllFiles,...getFiles];
  let newAddr = [];
  getDirs.forEach((item, i) => {
    let bloc = fs.readdirSync(item);
    bloc.forEach((b, i) => {
      newAddr.push( getAbsPath(item,b) );
    });
  });
  // Return if no new folders in givenDirs or under getDirs
  // Recursive otherwise:
  //        new folders in givenDirs (getDirs.forEach)
  //        new folders under getDirs (fs.readdirSync)
  return noDirs(newAddr) ? [...AllFiles,...newAddr] : getFiles(newAddr,AllFiles);
}

const  getAbsPath = (root,relativePath) => root + '\\' + relativePath;
const  isDir = (absolutePath) => fs.statSync(absolutePath).isDirectory();
const  noDirs = function(paths){
  paths.forEach((path, i) => {
    if(isDir(path)) return false;
  });
  return true;
}

module.exports.getFiles = getFiles;
