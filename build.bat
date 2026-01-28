@echo off
title WorkJourney - Production Build
color 0B

echo.
echo ===============================================
echo    WorkJourney - Building for Production
echo ===============================================
echo.

cd /d "%~dp0"

echo [1/3] Checking dependencies...
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

echo [2/3] Cleaning previous build...
if exist ".next\" (
    rmdir /s /q ".next"
    echo Previous build removed.
)

echo [3/3] Building production bundle...
call npm run build

if errorlevel 1 (
    echo.
    echo ERROR: Build failed! Check errors above.
    pause
    exit /b 1
) else (
    echo.
    echo ===============================================
    echo    Build completed successfully!
    echo    Run start-prod.bat to start the server
    echo ===============================================
)

pause
