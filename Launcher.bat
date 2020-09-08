@echo off

echo[
echo Set apps to launch
set this[1]="C:\Users\kaoki\Documents\Opera Portable\" launcher.exe
set this[2]=C:\Users\kaoki\Documents\PDF-XChangeEditorPortable\ PDF-XChangeEditorPortable.exe
set this[3]="C:\Users\kaoki\Documents\Atom x64\" atom.exe

for /l %%k in (1,1,3) do (
  call :runforrest %%this[%%k]%% %%k
)

pause
goto :EOF

:runforrest
if exist %1 (
  echo Running App %3
  START /d %1 %2
  echo ...success
)
exit /b
