@echo off
REM Flutter Build Fix Script for Windows
REM Fixes the "_$ProductFromJson not found" error

echo ========================================
echo Flutter Build Fix Script
echo ========================================
echo.

echo Step 1/4: Cleaning Flutter project...
call flutter clean
if errorlevel 1 (
    echo ERROR: Flutter clean failed!
    pause
    exit /b 1
)
echo ✓ Clean completed
echo.

echo Step 2/4: Getting dependencies...
call flutter pub get
if errorlevel 1 (
    echo ERROR: Flutter pub get failed!
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo Step 3/4: Running code generation...
call flutter pub run build_runner build --delete-conflicting-outputs
if errorlevel 1 (
    echo ERROR: Code generation failed!
    pause
    exit /b 1
)
echo ✓ Code generated successfully
echo.

echo Step 4/4: Running Flutter app...
call flutter run -d ZY22D54TZZ

pause
