const fs = (typeof require !== 'undefined') ? require('fs') : {};
//const Excel = (typeof require !== 'undefined') ? require('xlsx') : {};
//const pc = (typeof require !== 'undefined') ? require('process') : {};
//const pbcopy = (typeof require !== 'undefined') ? require('clipboardy') : {};

module.exports.Excel = (typeof require !== 'undefined') ? require('xlsx') : {};
module.exports.pc = (typeof require !== 'undefined') ? require('process') : {};
module.exports.pbcopy = (typeof require !== 'undefined') ? require('clipboardy') : {};
module.exports.yargs = function(xargs){
  if(xargs.length<3)  console.log("No Target File.") && exit;
  return xargs.slice(2);//if argc<2, return empty
}
