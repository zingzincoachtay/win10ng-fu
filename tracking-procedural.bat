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
:: Array made externally, so used CALL command
  CALL  "tracking-crawl.bat" %%dproject[%%k]%% %%oproject[%%k]%% %%iproject[%%k]%%
::    CALL ECHO Digesting all quotes in %%dproject[%%k]%%
::    CALL  %find% %%dproject[%%k]%% -type f  %%iproject[%%k]%% -exec %hash% "{}" ; | %grep% -iv "SERVICE ONLY|BUILDOUT|~"
    ECHO ...Done
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
IF NOT EXIST %~2 (
  ECHO Digesting all quotes in %~1
  ECHO %find% %~1 -type f  %~3 -exec %hash% "{}" ; | %grep% -iv "SERVICE ONLY|BUILDOUT|~" | sort /+35 > %~2
)
EXIT /B
