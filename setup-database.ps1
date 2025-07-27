# VGirl Database Setup Guide for Windows PowerShell

Write-Host "🚀 VGirl AWS RDS Database Setup" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Your AWS RDS Details:" -ForegroundColor Yellow
Write-Host "Endpoint: vgirl.c9gksmyc8wak.eu-central-1.rds.amazonaws.com"
Write-Host "Port: 5432"
Write-Host "Engine: PostgreSQL"
Write-Host "Region: eu-central-1"
Write-Host ""

Write-Host "⚠️  IMPORTANT: You need to update your .env file with:" -ForegroundColor Red
Write-Host "1. Your RDS master username"
Write-Host "2. Your RDS master password"
Write-Host "3. Your database name (usually 'postgres' by default)"
Write-Host ""

Write-Host "📝 Steps to complete setup:" -ForegroundColor Cyan
Write-Host "1. Open .env file and replace placeholders:"
Write-Host "   - USERNAME: Your RDS master username"
Write-Host "   - PASSWORD: Your RDS master password"
Write-Host "   - DATABASE_NAME: Your database name (default: postgres)"
Write-Host ""
Write-Host "2. Ensure your RDS instance security group allows connections:"
Write-Host "   - Go to AWS Console > RDS > vgirl > Connectivity & security"
Write-Host "   - Check Security groups > Edit inbound rules"
Write-Host "   - Allow PostgreSQL (port 5432) from your IP or 0.0.0.0/0 for testing"
Write-Host ""
Write-Host "3. Run database migration:"
Write-Host "   npm run db:push"
Write-Host ""

Write-Host "🔧 Troubleshooting:" -ForegroundColor Yellow
Write-Host "- If connection fails, check your security group rules"
Write-Host "- Verify your username/password are correct"
Write-Host "- Ensure the RDS instance status is 'Available'"
Write-Host "- Check if your IP is whitelisted in security groups"
Write-Host ""

Write-Host "📚 Useful commands:" -ForegroundColor Magenta
Write-Host "- Test connection: npx prisma db pull"
Write-Host "- Generate client: npx prisma generate"
Write-Host "- Push schema: npx prisma db push"
Write-Host "- View database: npx prisma studio"
Write-Host ""

Write-Host "✅ Once configured, your app will connect to AWS RDS!" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
