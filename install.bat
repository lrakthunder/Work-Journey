@echo off
title WorkJourney - Install Dependencies
color 0D

echo.
echo ===============================================
echo    WorkJourney - Installing Dependencies
echo ===============================================
echo.

cd /d "%~dp0"

echo Installing npm packages...
call npm install

if errorlevel 1 (
    echo.
    echo ERROR: Installation failed!
    pause
    exit /b 1
) else (
    echo.
    echo ===============================================
    echo    Dependencies installed successfully!
    echo ===============================================
)

pause
