@echo off
title WorkJourney - Development Server
color 0A

echo.
echo ===============================================
echo    WorkJourney - Starting Development Server
echo ===============================================
echo.

cd /d "%~dp0"

echo [1/2] Checking dependencies...
if not exist "node_modules\" (
    echo Dependencies not found. Installing...
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo [2/2] Starting development server...
echo.
echo Server will start at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
