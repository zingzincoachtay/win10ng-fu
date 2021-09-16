const fs = require('fs');

//let Sheets = ;

module.exports.Excel = (typeof require !== 'undefined') ? require('xlsx') : {};
module.exports.process = (typeof require !== 'undefined') ? require('process') : {};
module.exports.yargs = function(xargs){
  if(xargs.length<3)  console.log("No Target File.") && exit;
  return xargs.slice(2);//if argc<2, return empty
}
module.exports.load = function(target){
  try {
      if(!fs.existsSync(target))  console.log("The file does not exist.") && exit;
  } catch (err) {
      console.error(err);
  }
}
