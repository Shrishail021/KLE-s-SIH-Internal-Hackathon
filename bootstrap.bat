@echo off
REM Bootstrap script — sets up Node.js PATH and installs deps
SET "NODEJS_PATH=C:\Program Files\nodejs"
SET "NPM_GLOBAL=C:\Users\shris\AppData\Roaming\npm"

IF EXIST "%NODEJS_PATH%\node.exe" (
    SET "PATH=%NODEJS_PATH%;%NPM_GLOBAL%;%PATH%"
    echo Node found at %NODEJS_PATH%
) ELSE (
    echo ERROR: node.exe not found at %NODEJS_PATH%
    echo Trying to use node from PATH...
)

echo Installing npm dependencies...
"%NPM_GLOBAL%\npm.cmd" install
IF ERRORLEVEL 1 (
    echo npm install failed. Trying with npm from PATH...
    npm install
)
echo Done.
