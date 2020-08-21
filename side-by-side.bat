@echo off

echo[
echo Highly recommend maximizing the prompt
echo Set at 200 print columns
echo Utilize Diffutils (Win) package

echo[
echo Compare two indices and show differences side by side
C:\Users\kaoki\Documents\coreutils\bin\diff.exe -iEb --side-by-side --suppress-common-lines -W 200 --minimal "%~1" "%~2"


echo[
pause
