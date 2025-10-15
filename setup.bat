@echo off
:: PHC Leaflet Generator - Windows Setup Script
:: Double-click this file to run the setup

echo.
echo ============================================================
echo   PHC Leaflet Generator - Appwrite Setup
echo ============================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo [INFO] Node.js found: 
node --version
echo.

:: Run the setup script
echo [INFO] Running database setup...
echo.
node setup-database.js

echo.
echo ============================================================
echo.
echo Setup complete! Press any key to exit...
pause >nul

