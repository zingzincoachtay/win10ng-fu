@ECHO OFF
:: http://steve-jansen.github.io/guides/windows-batch-scripting/part-2-variables.html
SETLOCAL ENABLEEXTENSIONS
SET SELF=%~nx0
SET SELFDIR=%~dp0

ECHO[
ECHO The day starts with checking for changes in the project folders.
ECHO The data files may be updated or new files may have been added yesterday.
ECHO[
ECHO Use either the md5deep package or md5sum package
ECHO[

CALL "default-tools.bat"
CALL "tracking-masked.bat"
ECHO Today's Timestamp %today%
ECHO[

FOR /l %%k in (1,1,2) DO (
  CALL :hashfile %%here[%%k]%% %%this[%%k]%%
)

ECHO[
ECHO Reminder -- next step, Drag and Drop "*.sum" files from yesterday to the respective digests to compare changes and track the progress.

::set spit=%USERPROFILE%\Desktop\spit.csv
::type %this[1]% %this[2]% > "%spit%"
::echo .\seek-all-parts.bat %spit% "%here[4]%" "%this[4]%"
::.\seek-all-parts.bat "%spit%" "%here[4]%" "%this[4]%"

PAUSE
GOTO :EOF

:hashfile
IF NOT EXIST %2 (
  ECHO Digesting all quotes in %1
  %md5% -r %1 | sort /+35 | %grep% "01 Current Quote" | %grep% "\.xlsx\?$" | %grep% -iv "SERVICE ONLY" | %grep% -iv "BUILDOUT" | %grep% -iv "~" > %2
  ECHO ...Done
)
EXIT /B
