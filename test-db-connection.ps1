# PowerShell version for Windows
Write-Host "🔍 Testing AWS RDS Connection..." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

Write-Host "📋 Current Configuration:" -ForegroundColor Yellow
Write-Host "Host: vgirl.c9gksmyc8wak.eu-central-1.rds.amazonaws.com"
Write-Host "Port: 5432"
Write-Host "Database: postgres"
Write-Host "Username: vgirl"
Write-Host ""

Write-Host "⏳ Testing connection with Prisma..." -ForegroundColor Cyan
npx prisma db push --accept-data-loss

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Connection successful! Schema pushed to database." -ForegroundColor Green
    Write-Host ""
    Write-Host "🌱 Now running database seed..." -ForegroundColor Yellow
    npm run db:seed
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database seeded successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎯 Ready to start development:" -ForegroundColor Magenta
        Write-Host "   npm run dev"
        Write-Host ""
        Write-Host "📊 View data in Prisma Studio:" -ForegroundColor Magenta
        Write-Host "   npx prisma studio"
    } else {
        Write-Host "❌ Seeding failed. Check the error above." -ForegroundColor Red
    }
} else {
    Write-Host "❌ Connection failed. Please check:" -ForegroundColor Red
    Write-Host "   1. RDS instance status is 'Available'"
    Write-Host "   2. Security group allows inbound PostgreSQL (port 5432)"
    Write-Host "   3. Credentials are correct"
    Write-Host "   4. Database is publicly accessible"
}
