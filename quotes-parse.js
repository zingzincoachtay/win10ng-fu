const scope = require('./quotes-scope.js');
var Excel;
if(typeof require !== 'undefined') Excel = require('xlsx');

const getWBp = function(target){
  let Sheets;
  if (typeof Excel.readFile(target) !== 'undefined') Sheets = Excel.readFile(target);
  else return [];
  let Sheet;
  if (typeof Sheets.Sheets.Sheet1 !== 'undefined') Sheet = Sheets.Sheets.Sheet1;
  else return [];
  return Sheet;
}
const getURI = function(target,column){
  const eye = new RegExp('^'+column,'i');
  let Sheet = getWBp(target);
  var Lookout = Object.keys(Sheet).filter( (c)=>eye.test(c) );
  var URI = [];
  Lookout.forEach((r, i) => {
    URI.push( Sheet[r].v );
  });
  return URI;
}

const getSheetType = function(sheet){
  let Sheet = getWBp(sheet);
  let fingerprint = scope.getcellFingerprint();
  let fp = {
    'newcellhist':[],
    'newcellsubs':[],
    'oldcellhist':[],
    'oldcellsubs':[]
  };
  fp.newcellhist = testType(Sheet,fingerprint.getNewCellHistFingerprint);
  fp.newcellsubs = testType(Sheet,fingerprint.getNewCellSubsFingerprint);
  fp.oldcellhist = testType(Sheet,fingerprint.getOldCellHistFingerprint);
  fp.oldcellsubs = testType(Sheet,fingerprint.getOldCellSubsFingerprint);
  return fp;
}
const testType = function(data,fp){
  let rValues = [];
  let isUndef = new Set([true]);
  fp.forEach((item, i) => {
    if(typeof data[item] !== 'undefined'){
      isUndef.add(false);
      rValues.push( data[item].v );
    }
  });
  return isUndef.has(false) ? rValues : [];
}
const getDigest = function(uri){
  uri.forEach((sheet, i) => {
  //let sheet = uri[0];
    let SheetType = getSheetType(sheet);
    if (SheetType.newcellhist.length==0 && SheetType.newcellsubs.length==0 && SheetType.oldcellhist.length==0 && SheetType.oldcellsubs.length==0) {
      console.log(sheet);
      console.log(SheetType);
      //console.log(Excel.readFile(sheet));
    }
  });
  return [];
}

module.exports.getURI = getURI;
module.exports.getDigest = getDigest;
