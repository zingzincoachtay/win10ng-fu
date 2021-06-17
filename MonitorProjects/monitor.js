const fs = require('fs');
const pc = require('process');//console.log(pc.argv);
const monitor = require('./exec.js');
const aboutme = monitor.SELF(pc.argv[1]);
const iniJSON = aboutme.SELFDIR+"settings.json";//console.log(iniJSON);

let masked;
try {
    if(!fs.existsSync(iniJSON)){
      try {
        fs.writeFileSync(iniJSON, "{}");
        //fs.writeFileSync(iniJSON, monitor.settings.default);
      } catch(err) {
        console.error(err);
      }
    }
    masked = monitor.maskedTarget(iniJSON);
} catch (err) { console.error(err); }
//console.log(masked);

let allFiles = monitor.findFiles(masked.include.paths,[]);
//console.log(allFiles.length);

let essential = monitor.essentialFiles(allFiles,masked.include.rules,masked.exclude.rules);
for(let file of essential)  console.log( file );
