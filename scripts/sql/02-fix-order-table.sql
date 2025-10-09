-- ====================================================================
-- Migration : Correction de la table Order
-- Description : Ajoute toutes les colonnes manquantes pour le checkout PayTech
-- Date : 2025-10-09
-- ====================================================================

-- ====================================================================
-- ÉTAPE 1 : Créer les ENUMs manquants
-- ====================================================================

-- PaymentStatus
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentStatus') THEN
        CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');
    END IF;
END $$;

-- PaymentMethod
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentMethod') THEN
        CREATE TYPE "PaymentMethod" AS ENUM ('ORANGE_MONEY', 'WAVE', 'CARD', 'CASH_ON_DELIVERY');
    END IF;
END $$;

-- ShippingZone
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ShippingZone') THEN
        CREATE TYPE "ShippingZone" AS ENUM ('DAKAR', 'THIES', 'AUTRE');
    END IF;
END $$;

-- ====================================================================
-- ÉTAPE 2 : Mettre à jour l'ENUM OrderStatus
-- ====================================================================

-- Ajouter les valeurs manquantes (si elles n'existent pas déjà)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'CONFIRMED' AND enumtypid = 'OrderStatus'::regtype) THEN
        ALTER TYPE "OrderStatus" ADD VALUE 'CONFIRMED';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'PROCESSING' AND enumtypid = 'OrderStatus'::regtype) THEN
        ALTER TYPE "OrderStatus" ADD VALUE 'PROCESSING';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'DELIVERED' AND enumtypid = 'OrderStatus'::regtype) THEN
        ALTER TYPE "OrderStatus" ADD VALUE 'DELIVERED';
    END IF;
END $$;

-- ====================================================================
-- ÉTAPE 3 : Ajouter les colonnes manquantes à la table Order
-- ====================================================================

-- Informations client (required pour les nouvelles commandes)
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "orderNumber" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "firstName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "lastName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "email" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "phone" TEXT;

-- Adresse de livraison détaillée
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "ville" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "quartier" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "adresseDetaillee" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "orderNote" TEXT;

-- Guest checkout (nullable)
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "guestEmail" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "guestName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "guestPhone" TEXT;

-- Shipping (legacy, nullable)
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingName" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingPhone" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingAddress" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingCity" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingZone" "ShippingZone";
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingFees" INTEGER;

-- Paiement
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentMethod" "PaymentMethod";
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentStatus" "PaymentStatus";
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paytechToken" TEXT;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paytechRef" TEXT;

-- Totaux
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "subtotalCents" INTEGER;
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "shippingCents" INTEGER;

-- ====================================================================
-- ÉTAPE 4 : Définir les valeurs par défaut et contraintes
-- ====================================================================

-- Générer un orderNumber unique pour les commandes existantes
UPDATE "Order" SET "orderNumber" = id WHERE "orderNumber" IS NULL;

-- Valeurs par défaut pour les nouvelles colonnes
ALTER TABLE "Order" ALTER COLUMN "shippingZone" SET DEFAULT 'DAKAR';
ALTER TABLE "Order" ALTER COLUMN "shippingFees" SET DEFAULT 0;
ALTER TABLE "Order" ALTER COLUMN "paymentMethod" SET DEFAULT 'ORANGE_MONEY';
ALTER TABLE "Order" ALTER COLUMN "paymentStatus" SET DEFAULT 'PENDING';

-- Rendre userId nullable pour le guest checkout
ALTER TABLE "Order" ALTER COLUMN "userId" DROP NOT NULL;

-- Ajouter la contrainte unique sur orderNumber (si elle n'existe pas)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'Order_orderNumber_key'
    ) THEN
        ALTER TABLE "Order" ADD CONSTRAINT "Order_orderNumber_key" UNIQUE ("orderNumber");
    END IF;
END $$;

-- ====================================================================
-- ÉTAPE 5 : Créer la table DeliveryZone si elle n'existe pas
-- ====================================================================

CREATE TABLE IF NOT EXISTS "DeliveryZone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryZone_pkey" PRIMARY KEY ("id")
);

-- Ajouter la contrainte unique sur name (si elle n'existe pas)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'DeliveryZone_name_key'
    ) THEN
        ALTER TABLE "DeliveryZone" ADD CONSTRAINT "DeliveryZone_name_key" UNIQUE ("name");
    END IF;
END $$;

-- ====================================================================
-- ÉTAPE 6 : Créer la table UserFavorite si elle n'existe pas
-- ====================================================================

CREATE TABLE IF NOT EXISTS "UserFavorite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("id")
);

-- Ajouter les contraintes (si elles n'existent pas)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'UserFavorite_userId_productId_key'
    ) THEN
        ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_userId_productId_key" UNIQUE ("userId", "productId");
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'UserFavorite_userId_fkey'
    ) THEN
        ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_userId_fkey" 
            FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'UserFavorite_productId_fkey'
    ) THEN
        ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_productId_fkey" 
            FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

-- ====================================================================
-- ÉTAPE 7 : Vérification finale
-- ====================================================================

-- Afficher les colonnes de la table Order
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'Order'
ORDER BY ordinal_position;

-- Afficher un résumé
DO $$ 
DECLARE
    column_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO column_count
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Order';
    
    RAISE NOTICE '✅ Migration terminée avec succès !';
    RAISE NOTICE '📊 Nombre total de colonnes dans Order : %', column_count;
    RAISE NOTICE '📝 Consultez le fichier database_schemas.md pour la documentation complète';
END $$;
