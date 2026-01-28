@echo off
title WorkJourney - Production Server
color 0E

echo.
echo ===============================================
echo    WorkJourney - Production Server
echo ===============================================
echo.

cd /d "%~dp0"

if not exist ".next\" (
    echo.
    echo ERROR: Production build not found!
    echo Please run build.bat first.
    echo.
    pause
    exit /b 1
)

echo Starting production server...
echo.
echo Server running at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

call npm start

pause
