-- =====================================================
-- Script de correction de la table Order
-- Ajoute toutes les colonnes manquantes identifiées
-- =====================================================

-- ÉTAPE 1 : Ajouter les colonnes d'informations de base
-- =====================================================

-- Numéro de commande (CRITIQUE - cause l'erreur actuelle)
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "orderNumber" TEXT;

-- Email du client
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "email" TEXT;

-- Prénom du client
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "firstName" TEXT;

-- Nom du client
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "lastName" TEXT;

-- Téléphone du client
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "phone" TEXT;

-- ÉTAPE 2 : Ajouter les colonnes pour Guest Checkout
-- =====================================================

-- Email du guest (pour commandes sans compte)
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "guestEmail" TEXT;

-- Nom complet du guest
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "guestName" TEXT;

-- Téléphone du guest
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "guestPhone" TEXT;

-- ÉTAPE 3 : Ajouter les colonnes d'adresse de livraison
-- =====================================================

-- Adresse de livraison complète
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "shippingAddress" TEXT;

-- Nom du destinataire
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "shippingName" TEXT;

-- Téléphone du destinataire
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "shippingPhone" TEXT;

-- Ville de livraison
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "shippingCity" TEXT;

-- Ville (champ alternatif)
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "ville" TEXT;

-- Quartier
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "quartier" TEXT;

-- Adresse détaillée
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "adresseDetaillee" TEXT;

-- ÉTAPE 4 : Ajouter les colonnes de livraison
-- =====================================================

-- Zone de livraison (Dakar, Thiès, Autres)
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "shippingZone" TEXT;

-- Frais de livraison en centimes
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "shippingCents" INTEGER DEFAULT 0;

-- Frais de livraison (format décimal)
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "shippingFees" DECIMAL(10,2) DEFAULT 0;

-- ÉTAPE 5 : Ajouter les colonnes de paiement
-- =====================================================

-- Méthode de paiement (Orange Money, Wave, CB)
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "paymentMethod" TEXT;

-- Statut du paiement
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "paymentStatus" TEXT;

-- Référence PayTech
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "paytechRef" TEXT;

-- Token PayTech
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "paytechToken" TEXT;

-- ÉTAPE 6 : Ajouter les colonnes financières et notes
-- =====================================================

-- Sous-total en centimes (avant frais de livraison)
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "subtotalCents" INTEGER DEFAULT 0;

-- Note de commande du client
ALTER TABLE "Order" 
ADD COLUMN IF NOT EXISTS "orderNote" TEXT;

-- ÉTAPE 7 : Générer les numéros de commande pour les commandes existantes (si besoin)
-- =====================================================

-- Mise à jour des orderNumber NULL avec un numéro unique
UPDATE "Order" 
SET "orderNumber" = 'ORD-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDD') || '-' || LPAD(id::text, 6, '0')
WHERE "orderNumber" IS NULL;

-- ÉTAPE 8 : Rendre orderNumber obligatoire
-- =====================================================

-- Ajouter la contrainte NOT NULL sur orderNumber
ALTER TABLE "Order" 
ALTER COLUMN "orderNumber" SET NOT NULL;

-- Ajouter une contrainte d'unicité sur orderNumber
ALTER TABLE "Order" 
ADD CONSTRAINT "Order_orderNumber_key" UNIQUE ("orderNumber");

-- ÉTAPE 9 : Créer un index sur orderNumber pour les performances
-- =====================================================

CREATE INDEX IF NOT EXISTS "Order_orderNumber_idx" ON "Order"("orderNumber");

-- ÉTAPE 10 : Afficher le résumé des colonnes
-- =====================================================

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Order'
ORDER BY ordinal_position;
