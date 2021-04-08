const fs = require('fs');
const pc = require('process');//console.log(pc.argv);
const monitor = require('./exec.js');
const iniJSON = monitor.workingDir(pc.argv[1])+"settings.json";//console.log(iniJSON);

let masked;
try {
    if(!fs.existsSync(iniJSON)){
      try {
        fs.writeFileSync(iniJSON, "{}");
      } catch(err) {
        console.error(err);
      }
    }
    masked = monitor.maskedTarget(iniJSON);
} catch (err) { console.error(err); }

console.log(masked);

let allFiles = monitor.getAllFiles(masked.include.paths[0],[]);
console.log(allFiles.length);
console.log( monitor.essentialFiles(allFiles,masked.include.rules) );
