#!/bin/bash

# VGirl Database Setup Guide
echo "🚀 VGirl AWS RDS Database Setup"
echo "================================="
echo ""

echo "📋 Your AWS RDS Details:"
echo "Endpoint: vgirl.c9gksmyc8wak.eu-central-1.rds.amazonaws.com"
echo "Port: 5432"
echo "Engine: PostgreSQL"
echo "Region: eu-central-1"
echo ""

echo "⚠️  IMPORTANT: You need to update your .env file with:"
echo "1. Your RDS master username"
echo "2. Your RDS master password"
echo "3. Your database name (usually 'postgres' by default)"
echo ""

echo "📝 Steps to complete setup:"
echo "1. Open .env file and replace placeholders:"
echo "   - USERNAME: Your RDS master username"
echo "   - PASSWORD: Your RDS master password"
echo "   - DATABASE_NAME: Your database name (default: postgres)"
echo ""
echo "2. Ensure your RDS instance security group allows connections:"
echo "   - Go to AWS Console > RDS > vgirl > Connectivity & security"
echo "   - Check Security groups > Edit inbound rules"
echo "   - Allow PostgreSQL (port 5432) from your IP or 0.0.0.0/0 for testing"
echo ""
echo "3. Run database migration:"
echo "   npm run db:push"
echo ""
echo "4. (Optional) Seed the database:"
echo "   npm run db:seed"
echo ""

echo "🔧 Troubleshooting:"
echo "- If connection fails, check your security group rules"
echo "- Verify your username/password are correct"
echo "- Ensure the RDS instance status is 'Available'"
echo "- Check if your IP is whitelisted in security groups"
echo ""

echo "📚 Useful commands:"
echo "- Test connection: npx prisma db pull"
echo "- Generate client: npx prisma generate"
echo "- Push schema: npx prisma db push"
echo "- View database: npx prisma studio"
echo ""

echo "✅ Once configured, your app will connect to AWS RDS!"
