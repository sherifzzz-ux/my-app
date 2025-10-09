#!/bin/bash

# Script pour appliquer la migration orderNumber en production
# Usage: ./scripts/apply-migration.sh

set -e

echo "🔍 Checking for DATABASE_URL..."

if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL is not set"
  echo ""
  echo "Please set DATABASE_URL environment variable:"
  echo "  export DATABASE_URL='postgresql://...'"
  echo ""
  echo "Or create a .env file with:"
  echo "  DATABASE_URL='postgresql://...'"
  echo ""
  exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔄 Applying pending migrations..."
npx prisma migrate deploy

echo ""
echo "✅ Migration applied successfully!"
echo ""

echo "🔍 Verifying orderNumber column..."
npx prisma db execute --stdin <<SQL
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'Order' AND column_name = 'orderNumber';
SQL

echo ""
echo "✅ All done! You can now test the checkout."
