-- =====================================================
-- SCRIPT DE CORRECTION DE LA TABLE "Order"
-- =====================================================
-- Ce script ajoute les colonnes manquantes à la table Order
-- Exécutez ce script après avoir vérifié avec 01-diagnostic-database.sql
-- =====================================================

-- ATTENTION : Sauvegardez vos données avant d'exécuter ce script !
-- CRÉEZ UNE SAUVEGARDE :
-- SELECT * INTO "Order_backup" FROM "Order";

-- =====================================================
-- ÉTAPE 1 : AJOUTER LA COLONNE orderNumber SI MANQUANTE
-- =====================================================
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'Order' 
        AND column_name = 'orderNumber'
    ) THEN
        ALTER TABLE "Order" ADD COLUMN "orderNumber" TEXT;
        
        -- Générer des orderNumber uniques pour les commandes existantes
        UPDATE "Order" SET "orderNumber" = 'ORD-' || LPAD(CAST(ROW_NUMBER() OVER (ORDER BY "createdAt") AS TEXT), 8, '0')
        WHERE "orderNumber" IS NULL;
        
        -- Rendre la colonne NOT NULL et UNIQUE
        ALTER TABLE "Order" ALTER COLUMN "orderNumber" SET NOT NULL;
        ALTER TABLE "Order" ADD CONSTRAINT "Order_orderNumber_key" UNIQUE ("orderNumber");
        
        RAISE NOTICE 'Colonne orderNumber ajoutée avec succès';
    ELSE
        RAISE NOTICE 'Colonne orderNumber existe déjà';
    END IF;
END $$;

-- =====================================================
-- ÉTAPE 2 : AJOUTER LES COLONNES GUEST CHECKOUT SI MANQUANTES
-- =====================================================
DO $$ 
BEGIN
    -- firstName
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'firstName') THEN
        ALTER TABLE "Order" ADD COLUMN "firstName" TEXT;
        UPDATE "Order" SET "firstName" = COALESCE("guestName", "shippingName", 'Client') WHERE "firstName" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "firstName" SET NOT NULL;
        RAISE NOTICE 'Colonne firstName ajoutée';
    END IF;

    -- lastName
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'lastName') THEN
        ALTER TABLE "Order" ADD COLUMN "lastName" TEXT;
        UPDATE "Order" SET "lastName" = '' WHERE "lastName" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "lastName" SET NOT NULL;
        RAISE NOTICE 'Colonne lastName ajoutée';
    END IF;

    -- email
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'email') THEN
        ALTER TABLE "Order" ADD COLUMN "email" TEXT;
        UPDATE "Order" SET "email" = COALESCE("guestEmail", 'noemail@example.com') WHERE "email" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "email" SET NOT NULL;
        RAISE NOTICE 'Colonne email ajoutée';
    END IF;

    -- phone
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'phone') THEN
        ALTER TABLE "Order" ADD COLUMN "phone" TEXT;
        UPDATE "Order" SET "phone" = COALESCE("guestPhone", "shippingPhone", '') WHERE "phone" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "phone" SET NOT NULL;
        RAISE NOTICE 'Colonne phone ajoutée';
    END IF;
END $$;

-- =====================================================
-- ÉTAPE 3 : AJOUTER LES COLONNES D'ADRESSE DÉTAILLÉE
-- =====================================================
DO $$ 
BEGIN
    -- ville
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'ville') THEN
        ALTER TABLE "Order" ADD COLUMN "ville" TEXT;
        UPDATE "Order" SET "ville" = COALESCE("shippingCity", 'Dakar') WHERE "ville" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "ville" SET NOT NULL;
        RAISE NOTICE 'Colonne ville ajoutée';
    END IF;

    -- quartier
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'quartier') THEN
        ALTER TABLE "Order" ADD COLUMN "quartier" TEXT;
        UPDATE "Order" SET "quartier" = COALESCE("shippingAddress", '') WHERE "quartier" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "quartier" SET NOT NULL;
        RAISE NOTICE 'Colonne quartier ajoutée';
    END IF;

    -- adresseDetaillee
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'adresseDetaillee') THEN
        ALTER TABLE "Order" ADD COLUMN "adresseDetaillee" TEXT;
        UPDATE "Order" SET "adresseDetaillee" = COALESCE("shippingAddress", '') WHERE "adresseDetaillee" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "adresseDetaillee" SET NOT NULL;
        RAISE NOTICE 'Colonne adresseDetaillee ajoutée';
    END IF;

    -- orderNote (optionnel)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'orderNote') THEN
        ALTER TABLE "Order" ADD COLUMN "orderNote" TEXT;
        RAISE NOTICE 'Colonne orderNote ajoutée';
    END IF;
END $$;

-- =====================================================
-- ÉTAPE 4 : VÉRIFIER/AJOUTER LES COLONNES LEGACY
-- =====================================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'guestEmail') THEN
        ALTER TABLE "Order" ADD COLUMN "guestEmail" TEXT;
        RAISE NOTICE 'Colonne guestEmail ajoutée';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'guestName') THEN
        ALTER TABLE "Order" ADD COLUMN "guestName" TEXT;
        RAISE NOTICE 'Colonne guestName ajoutée';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'guestPhone') THEN
        ALTER TABLE "Order" ADD COLUMN "guestPhone" TEXT;
        RAISE NOTICE 'Colonne guestPhone ajoutée';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'shippingName') THEN
        ALTER TABLE "Order" ADD COLUMN "shippingName" TEXT;
        RAISE NOTICE 'Colonne shippingName ajoutée';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'shippingPhone') THEN
        ALTER TABLE "Order" ADD COLUMN "shippingPhone" TEXT;
        RAISE NOTICE 'Colonne shippingPhone ajoutée';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'shippingAddress') THEN
        ALTER TABLE "Order" ADD COLUMN "shippingAddress" TEXT;
        RAISE NOTICE 'Colonne shippingAddress ajoutée';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'shippingCity') THEN
        ALTER TABLE "Order" ADD COLUMN "shippingCity" TEXT;
        RAISE NOTICE 'Colonne shippingCity ajoutée';
    END IF;
END $$;

-- =====================================================
-- ÉTAPE 5 : VÉRIFIER/CRÉER LES ENUMS SI NÉCESSAIRE
-- =====================================================
DO $$ 
BEGIN
    -- ShippingZone enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ShippingZone') THEN
        CREATE TYPE "ShippingZone" AS ENUM ('DAKAR', 'THIES', 'AUTRE');
        RAISE NOTICE 'Type ENUM ShippingZone créé';
    END IF;

    -- PaymentMethod enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentMethod') THEN
        CREATE TYPE "PaymentMethod" AS ENUM ('ORANGE_MONEY', 'WAVE', 'CARD', 'CASH_ON_DELIVERY');
        RAISE NOTICE 'Type ENUM PaymentMethod créé';
    END IF;

    -- PaymentStatus enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentStatus') THEN
        CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');
        RAISE NOTICE 'Type ENUM PaymentStatus créé';
    END IF;

    -- OrderStatus enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'OrderStatus') THEN
        CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');
        RAISE NOTICE 'Type ENUM OrderStatus créé';
    END IF;
END $$;

-- =====================================================
-- ÉTAPE 6 : AJOUTER LES COLONNES ENUM SI MANQUANTES
-- =====================================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'shippingZone') THEN
        ALTER TABLE "Order" ADD COLUMN "shippingZone" "ShippingZone" DEFAULT 'DAKAR';
        UPDATE "Order" SET "shippingZone" = 'DAKAR' WHERE "shippingZone" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "shippingZone" SET NOT NULL;
        RAISE NOTICE 'Colonne shippingZone ajoutée';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'paymentMethod') THEN
        ALTER TABLE "Order" ADD COLUMN "paymentMethod" "PaymentMethod" DEFAULT 'ORANGE_MONEY';
        UPDATE "Order" SET "paymentMethod" = 'ORANGE_MONEY' WHERE "paymentMethod" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "paymentMethod" SET NOT NULL;
        RAISE NOTICE 'Colonne paymentMethod ajoutée';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'paymentStatus') THEN
        ALTER TABLE "Order" ADD COLUMN "paymentStatus" "PaymentStatus" DEFAULT 'PENDING';
        UPDATE "Order" SET "paymentStatus" = 'PENDING' WHERE "paymentStatus" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "paymentStatus" SET NOT NULL;
        RAISE NOTICE 'Colonne paymentStatus ajoutée';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'status') THEN
        ALTER TABLE "Order" ADD COLUMN "status" "OrderStatus" DEFAULT 'PENDING';
        UPDATE "Order" SET "status" = 'PENDING' WHERE "status" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "status" SET NOT NULL;
        RAISE NOTICE 'Colonne status ajoutée';
    END IF;
END $$;

-- =====================================================
-- ÉTAPE 7 : AJOUTER LES COLONNES PAYTECH
-- =====================================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'paytechToken') THEN
        ALTER TABLE "Order" ADD COLUMN "paytechToken" TEXT;
        RAISE NOTICE 'Colonne paytechToken ajoutée';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'paytechRef') THEN
        ALTER TABLE "Order" ADD COLUMN "paytechRef" TEXT;
        RAISE NOTICE 'Colonne paytechRef ajoutée';
    END IF;
END $$;

-- =====================================================
-- ÉTAPE 8 : AJOUTER LES COLONNES DE FRAIS
-- =====================================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Order' AND column_name = 'shippingFees') THEN
        ALTER TABLE "Order" ADD COLUMN "shippingFees" INTEGER DEFAULT 0;
        UPDATE "Order" SET "shippingFees" = 0 WHERE "shippingFees" IS NULL;
        ALTER TABLE "Order" ALTER COLUMN "shippingFees" SET NOT NULL;
        RAISE NOTICE 'Colonne shippingFees ajoutée';
    END IF;
END $$;

-- =====================================================
-- VÉRIFICATION FINALE
-- =====================================================
SELECT 
    'Vérification finale de la table Order' AS message,
    COUNT(*) as nombre_colonnes
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'Order';

-- Afficher toutes les colonnes de la table Order
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'Order'
ORDER BY ordinal_position;
