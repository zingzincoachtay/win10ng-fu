const scope = require('./quotes-scope.js');
var Excel;
if(typeof require !== 'undefined') Excel = require('xlsx');

const pickSheetName = function(proposedNames){
  if(proposedNames.length==0) return '';
  if(proposedNames.length==1) return proposedNames[0];
  let validNames = proposedNames.filter(function(n){
    let isValid = new Set();
    scope.setSheetNamesVariants().forEach( (reItem, i) => isValid.add(reItem.test(n)) )
    return isValid.has(true);
  });
  return (validNames.length>=1) ? validNames[0] : '';
}
const getWBp = function(target){
  let Sheets = (typeof Excel.readFile(target) !== 'undefined') ? Excel.readFile(target) : [];
  let SheetName = (typeof Sheets.SheetNames !== 'undefined') ? pickSheetName(Sheets.SheetNames) : '';
  if(SheetName.length==0) return [];//will need to stop here, create exceptions handling function somewhere
  let Sheet = (typeof Sheets.Sheets[SheetName] !== 'undefined') ? Sheets.Sheets[SheetName] : [];
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
    'oldcellsubs':[],
    'isnew':false,
    'isold':false
  };
  fp.newcellhist = testType(Sheet,fingerprint.getNewCellHistFingerprint);
  fp.newcellsubs = testType(Sheet,fingerprint.getNewCellSubsFingerprint);
  fp.oldcellhist = testType(Sheet,fingerprint.getOldCellHistFingerprint);
  fp.oldcellsubs = testType(Sheet,fingerprint.getOldCellSubsFingerprint);
  if( pickSheetType(fp.newcellhist) && pickSheetType(fp.newcellsubs) ) fp.isnew = true;
  else if( pickSheetType(fp.oldcellhist) && pickSheetType(fp.oldcellsubs) ) fp.isold = true;
  else {

  }
  return fp;
}
const testType = function(data,fp){
  let rValues = [];
  let isUndef = new Set([true]);
  fp.forEach((item, i) => {
    if(typeof data[item] !== 'undefined'){
      isUndef.add(false);
      rValues.push( data[item].v );
    } else {
      rValues.push( 0 );
    }
  });
  return isUndef.has(false) ? rValues : [];
}
//Workbook or Sheets were unexpected.
//Sheets were malformed.
const pickSheetType = (vals) => (nonTrivials(vals).length>0) ? true : false;
const pickNonzero = function(vals){
  let picked = nonTrivials(vals);
  return (picked.length>0) ? picked[0] : 0;
}

const getDigest = function(uri){
  let readExcel = [];
  let fingerprint = scope.getcellFingerprint();
  uri.forEach((addr, i) => {
    let SheetType = getSheetType(addr);
    //console.log(addr); console.log(SheetType.newcellhist,SheetType.newcellsubs,SheetType.oldcellhist,SheetType.oldcellsubs,SheetType.isnew,SheetType.isold);
    if (!SheetType.isnew && !SheetType.isold) {
      // Maybe the sheet name is unexpected.
      // Maybe the sheet is not a quote.
      console.log(addr); console.log(SheetType.newcellhist,SheetType.newcellsubs,SheetType.oldcellhist,SheetType.oldcellsubs,SheetType.isnew,SheetType.isold);
    } else {
      if (SheetType.isnew) {
        readExcel.push({'sheet':addr,'total':pickNonzero(SheetType.newcellhist),'sub':SheetType.newcellsubs});
        //console.log({'sheet':addr,'total':pickNonzero(SheetType.newcellhist),'sub':SheetType.newcellsubs});
      }
      if (SheetType.isold) {
        readExcel.push({'sheet':addr,'total':pickNonzero(SheetType.oldcellhist),'sub':SheetType.oldcellsubs});
        //console.log({'sheet':addr,'total':pickNonzero(SheetType.oldcellhist),'sub':SheetType.oldcellsubs});
      }
    }
  });
  return readExcel;
}

const nonTrivials = (vals) => vals.filter( (v)=>(v!=0) );

module.exports.getURI = getURI;
module.exports.getDigest = getDigest;
