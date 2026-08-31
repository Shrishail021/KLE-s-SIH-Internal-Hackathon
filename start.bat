@echo off
REM ═══════════════════════════════════════════════════════
REM  start.bat — KLE Jabin Hackathon 2026 Local Dev Server
REM  Double-click this file OR run it in any terminal
REM ═══════════════════════════════════════════════════════

echo.
echo  ╔══════════════════════════════════════╗
echo  ║  KLE Jabin Internal Hackathon 2026  ║
echo  ║  Starting local development server  ║
echo  ╚══════════════════════════════════════╝
echo.

REM ── Try to find node.exe in common NVM / nodejs locations ──
SET "NODE_FOUND=0"

IF EXIST "C:\Program Files\nodejs\node.exe" (
    SET "PATH=C:\Program Files\nodejs;C:\Users\%USERNAME%\AppData\Roaming\npm;%PATH%"
    SET "NODE_FOUND=1"
)

IF EXIST "C:\Users\%USERNAME%\AppData\Roaming\nvm\v22.0.0\node.exe" (
    SET "PATH=C:\Users\%USERNAME%\AppData\Roaming\nvm\v22.0.0;C:\Users\%USERNAME%\AppData\Roaming\npm;%PATH%"
    SET "NODE_FOUND=1"
)

IF EXIST "C:\Users\%USERNAME%\AppData\Roaming\nvm\v20.0.0\node.exe" (
    SET "PATH=C:\Users\%USERNAME%\AppData\Roaming\nvm\v20.0.0;C:\Users\%USERNAME%\AppData\Roaming\npm;%PATH%"
    SET "NODE_FOUND=1"
)

REM Check node in PATH already
node --version >nul 2>&1
IF NOT ERRORLEVEL 1 SET "NODE_FOUND=1"

IF "%NODE_FOUND%"=="0" (
    echo [ERROR] Could not find node.exe automatically.
    echo.
    echo Please:
    echo   1. Open a new terminal ^(CMD or PowerShell^)
    echo   2. Run: node --version   to confirm Node.js works
    echo   3. Then run: npm install
    echo   4. Then run: npm run dev
    echo.
    echo Download Node.js from: https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js found.

REM ── Install dependencies if node_modules is missing ──
IF NOT EXIST "node_modules\" (
    echo.
    echo [INFO] node_modules not found. Running npm install...
    echo        This may take 1-2 minutes on first run.
    echo.
    npm install
    IF ERRORLEVEL 1 (
        echo [ERROR] npm install failed.
        echo Please run "npm install" manually in this folder.
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed.
)

REM ── Start dev server ──
echo.
echo [INFO] Starting Vite dev server...
echo [INFO] The site will open at: http://localhost:5173
echo.
echo        Press Ctrl+C to stop the server
echo.
npm run dev
pause
