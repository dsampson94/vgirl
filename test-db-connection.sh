#!/bin/bash

echo "🔍 Testing AWS RDS Connection..."
echo "================================"

echo "📋 Current Configuration:"
echo "Host: vgirl.c9gksmyc8wak.eu-central-1.rds.amazonaws.com"
echo "Port: 5432"
echo "Database: postgres"
echo "Username: vgirl"
echo ""

echo "⏳ Testing connection with Prisma..."
npx prisma db push --accept-data-loss

if [ $? -eq 0 ]; then
    echo "✅ Connection successful! Schema pushed to database."
    echo ""
    echo "🌱 Now running database seed..."
    npm run db:seed
    
    if [ $? -eq 0 ]; then
        echo "✅ Database seeded successfully!"
        echo ""
        echo "🎯 Ready to start development:"
        echo "   npm run dev"
        echo ""
        echo "📊 View data in Prisma Studio:"
        echo "   npx prisma studio"
    else
        echo "❌ Seeding failed. Check the error above."
    fi
else
    echo "❌ Connection failed. Please check:"
    echo "   1. RDS instance status is 'Available'"
    echo "   2. Security group allows inbound PostgreSQL (port 5432)"
    echo "   3. Credentials are correct"
    echo "   4. Database is publicly accessible"
fi
