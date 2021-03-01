const masked = require('./quotes-masked.js');
var Parent = masked.folders;
//Parent.push();
const URIlist = 'C:\\Users\\kaoki\\Desktop\\current-parts.csv';
const URIColumn = 'H';
const SheetNamesVariants = [/^Sheet\d$/,/^Return form\s?\(\d\)$/];
const NewHistCell = ['AA46','R46','I46'];
const NewSubsCell = ['I46','I45','I40','I31'];//inherit the column from HistCell
const OldHistCell = ['I69','J69'];
const OldSubsCell = ['I69','I48','I35','I25'];//inherit the column from HistCell

module.exports = {
  getParent: ()=>Parent,
  getTarget: ()=>URIlist,
  getColumn: ()=>URIColumn,
  getcellFingerprint: ()=>({
    "getNewCellHistFingerprint": NewHistCell,
    "getNewCellSubsFingerprint": NewSubsCell,
    "getOldCellHistFingerprint": OldHistCell,
    "getOldCellSubsFingerprint": OldSubsCell
  }),
  getNewCellHistFingerprint: ()=>NewHistCell,
  getNewCellSubsFingerprint: ()=>NewSubsCell,
  getOldCellHistFingerprint: ()=>OldHistCell,
  getOldCellSubsFingerprint: ()=>OldSubsCell,
  setSheetNamesVariants: ()=>SheetNamesVariants
}
