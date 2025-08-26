@echo off
echo ========================================
echo    DIAGNOSTIC BASE DE DONNEES MAMI SHOP
echo ========================================
echo.

echo 1. Installation des dependances...
npm install

echo.
echo 2. Generation du client Prisma...
npx prisma generate

echo.
echo 3. Diagnostic rapide...
node scripts/quick-diagnostic.js

echo.
echo 4. Diagnostic complet...
node scripts/database-diagnostic.js

echo.
echo ========================================
echo    DIAGNOSTIC TERMINE
echo ========================================
echo.
echo Consultez les fichiers de resultat:
echo - DATABASE_DIAGNOSTIC.md
echo - DATABASE_SUMMARY.md
echo.
pause
