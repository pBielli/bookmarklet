@echo off
setlocal EnableDelayedExpansion

REM === percorso da scansionare ===
set "ROOT=C:\CEM\SVILUPPO\Pat-git\bookmarklet\bookmarklets"

REM === file di output ===
set "OUT=C:\CEM\SVILUPPO\Pat-git\bookmarklet\bookmarklets.json"

REM contatore priorità
set PRIORITY=1

echo {> "%OUT%"
echo   "bookmarklets": [>> "%OUT%"

set FIRST=1

for /D %%D in ("%ROOT%\*") do (
    if !FIRST! EQU 0 (
        echo ,>> "%OUT%"
    )
    set FIRST=0

    echo     {>> "%OUT%"
    echo       "id": "%%~nxD",>> "%OUT%"
    echo       "enabled": true,>> "%OUT%"
    echo       "priority": !PRIORITY!>> "%OUT%"
    echo     }>> "%OUT%"

    set /A PRIORITY+=1
)

echo   ]>> "%OUT%"
echo }>> "%OUT%"

echo JSON generato: %OUT%
