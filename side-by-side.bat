@echo off

echo[
echo Highly recommend maximizing the prompt

echo[
echo Compare two indices and show differences side by side
C:\Users\kaoki\Documents\coreutils\bin\diff.exe -iEb --side-by-side --suppress-common-lines -W 390 --minimal "%~1" "%~2"


echo[
pause
