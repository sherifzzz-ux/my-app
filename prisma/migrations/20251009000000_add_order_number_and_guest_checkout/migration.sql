-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('ORANGE_MONEY', 'WAVE', 'CARD', 'CASH_ON_DELIVERY');

-- CreateEnum
CREATE TYPE "public"."ShippingZone" AS ENUM ('DAKAR', 'THIES', 'AUTRE');

-- AlterEnum - Ajouter les nouvelles valeurs à OrderStatus (PostgreSQL 9.3+)
ALTER TYPE "public"."OrderStatus" ADD VALUE IF NOT EXISTS 'CONFIRMED';
ALTER TYPE "public"."OrderStatus" ADD VALUE IF NOT EXISTS 'PROCESSING';
ALTER TYPE "public"."OrderStatus" ADD VALUE IF NOT EXISTS 'DELIVERED';

-- AlterTable
ALTER TABLE "public"."Order" 
  -- Add orderNumber
  ADD COLUMN "orderNumber" TEXT,
  
  -- Make userId nullable for guest checkout
  ALTER COLUMN "userId" DROP NOT NULL,
  
  -- Add customer info fields
  ADD COLUMN "firstName" TEXT,
  ADD COLUMN "lastName" TEXT,
  ADD COLUMN "email" TEXT,
  ADD COLUMN "phone" TEXT,
  ADD COLUMN "ville" TEXT,
  ADD COLUMN "quartier" TEXT,
  ADD COLUMN "adresseDetaillee" TEXT,
  ADD COLUMN "orderNote" TEXT,
  
  -- Add legacy guest fields
  ADD COLUMN "guestEmail" TEXT,
  ADD COLUMN "guestName" TEXT,
  ADD COLUMN "guestPhone" TEXT,
  
  -- Add shipping fields
  ADD COLUMN "shippingName" TEXT,
  ADD COLUMN "shippingPhone" TEXT,
  ADD COLUMN "shippingAddress" TEXT,
  ADD COLUMN "shippingCity" TEXT,
  ADD COLUMN "shippingZone" "public"."ShippingZone" DEFAULT 'DAKAR',
  ADD COLUMN "shippingFees" INTEGER DEFAULT 0,
  
  -- Add payment fields
  ADD COLUMN "paymentMethod" "public"."PaymentMethod" DEFAULT 'ORANGE_MONEY',
  ADD COLUMN "paymentStatus" "public"."PaymentStatus" DEFAULT 'PENDING',
  ADD COLUMN "paytechToken" TEXT,
  ADD COLUMN "paytechRef" TEXT,
  
  -- Add totals
  ADD COLUMN "subtotalCents" INTEGER,
  ADD COLUMN "shippingCents" INTEGER;

-- Generate orderNumber for existing orders
UPDATE "public"."Order" 
SET "orderNumber" = 'ORD-' || SUBSTRING(gen_random_uuid()::text, 1, 12)
WHERE "orderNumber" IS NULL;

-- Set default values for existing orders
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
  "shippingCents" = COALESCE("shippingCents", 0),
  "shippingZone" = COALESCE("shippingZone", 'DAKAR'),
  "shippingFees" = COALESCE("shippingFees", 0),
  "paymentMethod" = COALESCE("paymentMethod", 'ORANGE_MONEY'),
  "paymentStatus" = COALESCE("paymentStatus", 'PENDING')
WHERE "orderNumber" IS NOT NULL;

-- Now make required fields NOT NULL
ALTER TABLE "public"."Order" 
  ALTER COLUMN "orderNumber" SET NOT NULL,
  ALTER COLUMN "firstName" SET NOT NULL,
  ALTER COLUMN "lastName" SET NOT NULL,
  ALTER COLUMN "email" SET NOT NULL,
  ALTER COLUMN "phone" SET NOT NULL,
  ALTER COLUMN "ville" SET NOT NULL,
  ALTER COLUMN "quartier" SET NOT NULL,
  ALTER COLUMN "adresseDetaillee" SET NOT NULL,
  ALTER COLUMN "subtotalCents" SET NOT NULL,
  ALTER COLUMN "shippingCents" SET NOT NULL,
  ALTER COLUMN "shippingZone" SET NOT NULL,
  ALTER COLUMN "shippingFees" SET NOT NULL,
  ALTER COLUMN "paymentMethod" SET NOT NULL,
  ALTER COLUMN "paymentStatus" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "public"."Order"("orderNumber");

-- CreateTable
CREATE TABLE "public"."UserFavorite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DeliveryZone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryZone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorite_userId_productId_key" ON "public"."UserFavorite"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryZone_name_key" ON "public"."DeliveryZone"("name");

-- AddForeignKey
ALTER TABLE "public"."UserFavorite" ADD CONSTRAINT "UserFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserFavorite" ADD CONSTRAINT "UserFavorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
