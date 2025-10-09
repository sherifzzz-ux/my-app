-- ========================================
-- FIX RAPIDE : Résolution erreur orderNumber
-- À exécuter dans Supabase SQL Editor
-- ========================================

-- 1. Ajouter toutes les colonnes manquantes
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "orderNumber" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "email" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "firstName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "lastName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "guestEmail" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "guestName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "guestPhone" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingAddress" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingPhone" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingCity" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "ville" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "quartier" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "adresseDetaillee" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingZone" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingCents" INTEGER DEFAULT 0;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingFees" DECIMAL(10,2) DEFAULT 0;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentMethod" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentStatus" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paytechRef" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paytechToken" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "subtotalCents" INTEGER DEFAULT 0;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "orderNote" TEXT;

-- 2. Générer les numéros de commande
UPDATE "Order" 
SET "orderNumber" = 'ORD-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDD') || '-' || LPAD(id::text, 6, '0')
WHERE "orderNumber" IS NULL;

-- 3. Rendre orderNumber obligatoire et unique
ALTER TABLE "Order" ALTER COLUMN "orderNumber" SET NOT NULL;
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderNumber_key" UNIQUE ("orderNumber");
CREATE INDEX IF NOT EXISTS "Order_orderNumber_idx" ON "Order"("orderNumber");

-- 4. Vérification finale
SELECT COUNT(*) as total_colonnes FROM information_schema.columns WHERE table_name = 'Order';
