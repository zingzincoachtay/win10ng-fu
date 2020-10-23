@echo off

SET Today=%Date:~10,4%-%Date:~4,2%-%Date:~7,2%(%Date:~0,3%)

ECHO %Today%

SET me=%~nx0
SET parent=%~dp0
set boss=%~dp%parent%

ECHO %me%
ECHO %boss%
