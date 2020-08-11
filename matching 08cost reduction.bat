@echo off

rem set today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)

rem https://stackoverflow.com/questions/51867874/run-command-with-drag-and-drop-onto-batch-file

rem for %%a in (%*) do C:\Users\kaoki\Documents\md5deep-4.4\md5deep64.exe -r -nx %%a "H:PURCHASING\02 QUOTES\"

set targetfollder=\\hagcsv005\PURCHASING\08 COST REDUCTION STUFF

echo[
echo Outputs the list of known hash(es)-file(s) pair that did not match (-x).
C:\Users\kaoki\Documents\md5deep-4.4\md5deep64.exe -r -x "%~1" "%targetfollder%"
echo[
echo Outputs the list of known hash(es)-file(s) pair that could not find files (-nx).
C:\Users\kaoki\Documents\md5deep-4.4\md5deep64.exe -r -nx "%~1" "%targetfollder%"

set today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)

echo[
set CR="C:\Users\kaoki\Desktop\08cost reduction %today%.sum"
if not exist %CR% (
echo Digesting all cost reduction proposal estimates.
C:\Users\kaoki\Documents\md5deep-4.4\md5deep64.exe  "%targetfollder%\*" | sort /+35 > %CR%
C:\Users\kaoki\Documents\md5deep-4.4\md5deep64.exe -r "%targetfollder%\IMPACT CALCULATOR" | sort /+35 >> %CR%
echo ...Done
)


echo[
pause
