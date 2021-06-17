@ECHO OFF
CALL "default-tools.bat"
CALL "tracking-masked.bat"

ECHO[
ECHO Crawling `%dproject[1]%`
%find% %dproject[1]% -type f %iproject[1]% %xproject[1]% -exec %hash% "{}" ; | ^
%sed% -e "s/[\\\/]+/\\/g" | %sed% -e "s/^\W?([A-z0-9]+)\s+\W?(.+)$/\1 \2/g" | sort /+35 > %oproject[1]%
ECHO[
ECHO Executing `postprocess` - line by line
%eproject[1]% > "%USERPROFILE%\Desktop\current.csv"

ECHO[
ECHO Crawling `%dproject[2]%`
%md5% %dproject[2]% | ^
%sed% -e "s/[\\\/]+/\\/g" | %sed% -e "s/^\W?([A-z0-9]+)\s+\W?(.+)$/\1 \2/g" | sort /+35 > %oproject[2]%
ECHO[
ECHO Executing `postprocess` - line by line
%eproject[2]%
