var Parent = [];
Parent.push('H:\\PURCHASING\\02 QUOTES\\01 MATERIAL & COMPONENT Suppliers');
Parent.push('H:\\PURCHASING\\02 QUOTES\\02 MOLDED PART Suppliers');
const Target = 'C:\\Users\\kaoki\\Desktop\\current-parts.csv';
const Column = 'H';
const NewHistCell = ['AA46','R46','I46'];
const NewSubsCell = ['I46','I45','I40','I31']
const OldHistCell = ['J69','I69'];
const OldSubsCell = ['I69','I48','I35','I25'];

module.exports = {
  getParent: ()=>Parent,
  getTarget: ()=>Target,
  getColumn: ()=>Column,
  getcellFingerprint: ()=>({
    "getNewCellHistFingerprint": NewHistCell,
    "getNewCellSubsFingerprint": NewSubsCell,
    "getOldCellHistFingerprint": OldHistCell,
    "getOldCellSubsFingerprint": OldSubsCell
  }),
  getNewCellHistFingerprint: ()=>NewHistCell,
  getNewCellSubsFingerprint: ()=>NewSubsCell,
  getOldCellHistFingerprint: ()=>OldHistCell,
  getOldCellSubsFingerprint: ()=>OldSubsCell
}
