@echo off
REM http://steve-jansen.github.io/guides/windows-batch-scripting/part-2-variables.html
SETLOCAL ENABLEEXTENSIONS
SET me=%~nx0
SET boss=%~dp0

ECHO[
ECHO The day starts with checking for changes in the project folders.
ECHO The data files may be updated or new files may have been added yesterday.

REM https://oscarliang.com/change-date-ouput-format-windows-batch-script/
ECHO[
REM set today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)%Time:~0,2%-%Time:~3,2%-%Time:~6,2%
SET today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)
ECHO Today's Timestamp %today%

ECHO[
ECHO Use either the md5deep package or md5sum package
SET md5=%USERPROFILE%\Documents\md5deep-4.4\md5deep64.exe
SET grep=%USERPROFILE%\Documents\coreutils\bin\grep.exe --colour=auto -i
CALL "%USERPROFILE%\Documents\tracking_target.bat"
ECHO[

FOR /l %%k in (1,1,2) DO (
  CALL :hashfile %%here[%%k]%% %%this[%%k]%%
)

ECHO[
ECHO Reminder -- next step, Drag and Drop "*.sum" files from yesterday to the respective digests to compare changes and track the progress.

set spit=%USERPROFILE%\Desktop\spit.csv
type %this[1]% %this[2]% > "%spit%"
echo .\seek-all-parts.bat %spit% "%here[4]%" "%this[4]%"
.\seek-all-parts.bat "%spit%" "%here[4]%" "%this[4]%"

PAUSE
GOTO :EOF

:hashfile
IF NOT EXIST %2 (
  ECHO Digesting all quotes in %1
  %md5% -r %1 | sort /+35 | %grep% "01 Current Quote" | %grep% "\.xlsx\?$" | %grep% -iv "SERVICE ONLY" | %grep% -iv "BUILDOUT" > %2
  ECHO ...Done
)
EXIT /B
