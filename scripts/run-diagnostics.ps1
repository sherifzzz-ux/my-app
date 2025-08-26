Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    DIAGNOSTIC BASE DE DONNEES MAMI SHOP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Installation des dependances..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "2. Generation du client Prisma..." -ForegroundColor Yellow
npx prisma generate

Write-Host ""
Write-Host "3. Diagnostic rapide..." -ForegroundColor Yellow
node scripts/quick-diagnostic.js

Write-Host ""
Write-Host "4. Diagnostic complet..." -ForegroundColor Yellow
node scripts/database-diagnostic.js

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    DIAGNOSTIC TERMINE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Consultez les fichiers de resultat:" -ForegroundColor White
Write-Host "- DATABASE_DIAGNOSTIC.md" -ForegroundColor White
Write-Host "- DATABASE_SUMMARY.md" -ForegroundColor White
Write-Host ""
Read-Host "Appuyez sur Entree pour continuer"
