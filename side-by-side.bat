@echo off

echo[
echo Highly recommend maximizing the prompt
echo Set at 200 print columns
echo Utilize Diffutils (Win) package
rem --color option is not available
set diff=%USERPROFILE%\Documents\coreutils\bin\diff.exe

echo[
echo Compare two indices and show differences side by side
%diff% -iw --side-by-side --suppress-common-lines -W 200 --minimal "%~1" "%~2"

echo[
echo Compare two indices and show differences in full lines
%diff% -iw                --suppress-common-lines -W 200           "%~1" "%~2"


echo[
pause
