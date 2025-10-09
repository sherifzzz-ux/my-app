-- QUICK FIX: Ajouter orderNumber à la table Order
-- Ce script peut être exécuté directement dans votre client PostgreSQL
-- pour résoudre rapidement l'erreur "orderNumber does not exist"

-- 1. Créer les enums nécessaires (s'ils n'existent pas déjà)
DO $$ BEGIN
    CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "public"."PaymentMethod" AS ENUM ('ORANGE_MONEY', 'WAVE', 'CARD', 'CASH_ON_DELIVERY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "public"."ShippingZone" AS ENUM ('DAKAR', 'THIES', 'AUTRE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1b. Ajouter les nouvelles valeurs à OrderStatus (si elles n'existent pas)
ALTER TYPE "public"."OrderStatus" ADD VALUE IF NOT EXISTS 'CONFIRMED';
ALTER TYPE "public"."OrderStatus" ADD VALUE IF NOT EXISTS 'PROCESSING';
ALTER TYPE "public"."OrderStatus" ADD VALUE IF NOT EXISTS 'DELIVERED';

-- 2. Ajouter orderNumber avec une valeur par défaut temporaire
ALTER TABLE "public"."Order" 
ADD COLUMN IF NOT EXISTS "orderNumber" TEXT;

-- 3. Générer des orderNumbers pour les commandes existantes
UPDATE "public"."Order" 
SET "orderNumber" = 'ORD-' || SUBSTRING(gen_random_uuid()::text, 1, 12)
WHERE "orderNumber" IS NULL;

-- 4. Rendre orderNumber NOT NULL et UNIQUE
ALTER TABLE "public"."Order" 
ALTER COLUMN "orderNumber" SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "Order_orderNumber_key" ON "public"."Order"("orderNumber");

-- 5. Ajouter les champs de base nécessaires pour le checkout
ALTER TABLE "public"."Order" 
ADD COLUMN IF NOT EXISTS "firstName" TEXT,
ADD COLUMN IF NOT EXISTS "lastName" TEXT,
ADD COLUMN IF NOT EXISTS "email" TEXT,
ADD COLUMN IF NOT EXISTS "phone" TEXT,
ADD COLUMN IF NOT EXISTS "ville" TEXT,
ADD COLUMN IF NOT EXISTS "quartier" TEXT,
ADD COLUMN IF NOT EXISTS "adresseDetaillee" TEXT,
ADD COLUMN IF NOT EXISTS "orderNote" TEXT,
ADD COLUMN IF NOT EXISTS "guestEmail" TEXT,
ADD COLUMN IF NOT EXISTS "guestName" TEXT,
ADD COLUMN IF NOT EXISTS "guestPhone" TEXT,
ADD COLUMN IF NOT EXISTS "shippingName" TEXT,
ADD COLUMN IF NOT EXISTS "shippingPhone" TEXT,
ADD COLUMN IF NOT EXISTS "shippingAddress" TEXT,
ADD COLUMN IF NOT EXISTS "shippingCity" TEXT,
ADD COLUMN IF NOT EXISTS "shippingZone" "public"."ShippingZone" DEFAULT 'DAKAR',
ADD COLUMN IF NOT EXISTS "shippingFees" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "paymentMethod" "public"."PaymentMethod" DEFAULT 'ORANGE_MONEY',
ADD COLUMN IF NOT EXISTS "paymentStatus" "public"."PaymentStatus" DEFAULT 'PENDING',
ADD COLUMN IF NOT EXISTS "paytechToken" TEXT,
ADD COLUMN IF NOT EXISTS "paytechRef" TEXT,
ADD COLUMN IF NOT EXISTS "subtotalCents" INTEGER,
ADD COLUMN IF NOT EXISTS "shippingCents" INTEGER;

-- 6. Rendre userId nullable pour le guest checkout
ALTER TABLE "public"."Order" 
ALTER COLUMN "userId" DROP NOT NULL;

-- 7. Mettre à jour les commandes existantes avec des valeurs par défaut
UPDATE "public"."Order" 
SET 
  "firstName" = COALESCE("firstName", 'Guest'),
  "lastName" = COALESCE("lastName", 'User'),
  "email" = COALESCE("email", 'guest@flawlessbeauty.sn'),
  "phone" = COALESCE("phone", '+221000000000'),
  "ville" = COALESCE("ville", 'Dakar'),
  "quartier" = COALESCE("quartier", 'N/A'),
  "adresseDetaillee" = COALESCE("adresseDetaillee", 'N/A'),
  "subtotalCents" = COALESCE("subtotalCents", "totalCents"),
  "shippingCents" = COALESCE("shippingCents", 0)
WHERE "firstName" IS NULL;

-- 8. Rendre les champs requis NOT NULL
ALTER TABLE "public"."Order" 
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "ville" SET NOT NULL,
ALTER COLUMN "quartier" SET NOT NULL,
ALTER COLUMN "adresseDetaillee" SET NOT NULL,
ALTER COLUMN "subtotalCents" SET NOT NULL,
ALTER COLUMN "shippingCents" SET NOT NULL;

-- 9. Créer les tables additionnelles
CREATE TABLE IF NOT EXISTS "public"."UserFavorite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "UserFavorite_userId_productId_key" 
ON "public"."UserFavorite"("userId", "productId");

DO $$ BEGIN
    ALTER TABLE "public"."UserFavorite" 
    ADD CONSTRAINT "UserFavorite_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "public"."User"("id") 
    ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."UserFavorite" 
    ADD CONSTRAINT "UserFavorite_productId_fkey" 
    FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") 
    ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "public"."DeliveryZone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DeliveryZone_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "DeliveryZone_name_key" 
ON "public"."DeliveryZone"("name");

-- 10. Vérification finale
SELECT 
    'orderNumber column added successfully!' as status,
    COUNT(*) as total_orders,
    COUNT(DISTINCT "orderNumber") as unique_order_numbers
FROM "public"."Order";
