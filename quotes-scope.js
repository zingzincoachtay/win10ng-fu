const masked = require('./quotes-masked.js');
var Parent = masked.folders;
//console.log(JSON.stringify(masked.getSubsNewFormDefault()));
console.log(JSON.stringify(masked.getSubsNewFormPosition()));
let NewFormVisibleCells = masked.getSubsNewFormPosition();
//console.log(JSON.stringify(masked.getSubsOldFormDefault()));
console.log(JSON.stringify(masked.getSubsOldFormPosition()));
let OldFormVisibleCells = masked.getSubsOldFormPosition();

const URIlist = 'C:\\Users\\kaoki\\Desktop\\current-parts.csv';
const URIColumn = 'H';
const MakerColumn = 'A';
const PartColumn  = 'B';
const SheetNamesVariants = [/^Sheet\d$/,/^Return form\s?\(\d\)$/];
// columns where values should always be available
// = ['AA46','R46','I46'];
const NewHistCell = [NewFormVisibleCells[0].latest.total,NewFormVisibleCells[1].latest.total,NewFormVisibleCells[2].latest.total];
// = [46,40,31];
const NewSubsCell = [NewFormVisibleCells[2].latest.total,NewFormVisibleCells[2].latest.proc_subtot,NewFormVisibleCells[2].latest.mat_subtot];
// = ['I69','J69'];
const OldHistCell = [OldFormVisibleCells[0].latest.total,OldFormVisibleCells[0].previous.total];
// = [69,48,35,25];
const OldSubsCell = [OldFormVisibleCells[0].latest.total,OldFormVisibleCells[0].latest.proc_subtot,OldFormVisibleCells[0].latest.vmat_subtot,OldFormVisibleCells[0].latest.mat_subtot];

module.exports = {
  getParent: ()=>Parent,
  getURITarget: ()=>URIlist,
  getURIColumn: ()=>URIColumn,
  initSpread : ()=>({'maker':MakerColumn,'ospart':PartColumn,'target':URIColumn}),
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
  setNewFormDefault  : ()=>masked.getSubsNewFormDefault(),
  getNewCellPositions: ()=>masked.getSubsNewFormPosition(),
  setOldFormDefault  : ()=>masked.getSubsOldFormDefault(),
  getOldCellPositions: ()=>masked.getSubsOldFormPosition(),
  setSheetNamesVariants: ()=>SheetNamesVariants
}
