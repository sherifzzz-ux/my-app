@echo off
echo ========================================
echo    DIAGNOSTIC SUPABASE - MAMI SHOP
echo ========================================
echo.

echo 1. Installation des dependances...
npm install

echo.
echo 2. Generation du client Prisma...
npx prisma generate

echo.
echo 3. Diagnostic rapide Supabase...
node scripts/supabase-quick-diagnostic.js

echo.
echo 4. Diagnostic complet Supabase...
node scripts/supabase-diagnostic.js

echo.
echo ========================================
echo    DIAGNOSTIC SUPABASE TERMINE
echo ========================================
echo.
echo Consultez les fichiers de resultat:
echo - DATABASE_DIAGNOSTIC.md
echo - DATABASE_SUMMARY.md
echo.
echo Prochaines etapes:
echo 1. Verifier les variables d'environnement Supabase
echo 2. Tester les politiques RLS
echo 3. Verifier les permissions utilisateur
echo 4. Tester avec SUPABASE_SERVICE_ROLE_KEY
echo.
pause
