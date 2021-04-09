@ECHO OFF
SET PROJECT=%~1
SET MSG=%2
SET INCLUDE=%3
ECHO %PROJECT%
::IF NOT EXIST %~2 (
::  ECHO Digesting all quotes in %1
::  ECHO %find% %~1 -type f  %~3 -exec %hash% "{}" ; | %grep% -iv "SERVICE ONLY|BUILDOUT|~" | sort /+35
::)
