@echo off

echo[
echo Set apps to launch
set this[1]="%USERPROFILE%\Documents\Opera" launcher.exe
set this[2]="%USERPROFILE%\Documents\" Start.exe
set this[3]="%USERPROFILE%\Documents\Atom x64\" atom.exe

for /l %%k in (1,1,3) do (
  call :runforrest %%this[%%k]%% %%k
)

::pause
goto :EOF

:runforrest
if exist %1 (
  echo Running App %3
  START /d %1 %2
  echo ...success
)
exit /b
