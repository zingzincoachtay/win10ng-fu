@ECHO OFF
CALL "default-tools.bat"

ECHO[
ECHO Crawling `H:\PURCHASING\02 QUOTES\01 MATERIAL ^& COMPONENT Suppliers`
ECHO Crawling `H:\PURCHASING\02 QUOTES\02 MOLDED PART Suppliers`
%find% "H:\PURCHASING\02 QUOTES\01 MATERIAL & COMPONENT Suppliers" "H:\PURCHASING\02 QUOTES\02 MOLDED PART Suppliers" -type f -regex ".+01 Current Quote.+\.xlsx?" -exec %hash% "{}" ; | ^
%grep% -iv "SERVICE ONLY|BUILDOUT|~" | %sed% -e "s/[\\\/]+/\\/g" | %sed% -e "s/^\W?([A-z0-9]+)\s+\W?(.+)$/\1 \2/g" | sort /+35 > "%USERPROFILE%\Desktop\%today% quotes.sum"

ECHO[
ECHO Creating `current-parts.csv` - line by line
%sed% "s/^\W?([A-z0-9]{32})\s+\W?([A-Z]:(\\{1,2}).+\3([^\\\/]+)\3(\S+?)\s+([^\\\/]+)\3[^\\\/]+\3(\S+?)\s+([^\\\/]+)\.xlsx?)$/\4\t\5\t\6\t\7\t\8\t\1\t\2\t\0/" "%USERPROFILE%\Desktop\%today% quotes.sum" > "%USERPROFILE%\Desktop\current-parts.csv"

ECHO[
ECHO Crawling `H:\PURCHASING\08 COST REDUCTION STUFF`
%md5% "H:\PURCHASING\08 COST REDUCTION STUFF" | %sed% -e "s/[\\\/]+/\\/g" | %sed% -e "s/^\W?([A-z0-9]+)\s+\W?(.+)$/\1 \2/g" | sort /+35 > "%USERPROFILE%\Desktop\%today% cr.sum"
