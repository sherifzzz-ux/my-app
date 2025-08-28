-- ========================================
-- CRÉATION DE LA TABLE ADDRESS
-- ========================================

-- Créer la table Address selon le schéma Prisma
CREATE TABLE IF NOT EXISTS "Address" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "isDefault" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "userId" TEXT NOT NULL
);

-- Créer un index sur userId pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_address_user_id ON "Address"("userId");

-- Créer un index sur isDefault pour les requêtes de tri
CREATE INDEX IF NOT EXISTS idx_address_is_default ON "Address"("isDefault");

-- Ajouter une contrainte unique pour qu'un utilisateur n'ait qu'une seule adresse par défaut
CREATE UNIQUE INDEX IF NOT EXISTS idx_address_user_default ON "Address"("userId", "isDefault") WHERE "isDefault" = TRUE;

-- Créer un trigger pour mettre à jour updatedAt automatiquement
CREATE OR REPLACE FUNCTION update_address_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_address_updated_at 
    BEFORE UPDATE ON "Address" 
    FOR EACH ROW 
    EXECUTE FUNCTION update_address_updated_at();

-- Activer RLS (Row Level Security)
ALTER TABLE "Address" ENABLE ROW LEVEL SECURITY;

-- Créer une politique RLS pour que les utilisateurs ne voient que leurs propres adresses
CREATE POLICY "Users can view their own addresses" ON "Address"
    FOR SELECT USING (auth.uid()::text = "userId");

-- Créer une politique RLS pour que les utilisateurs puissent insérer leurs propres adresses
CREATE POLICY "Users can insert their own addresses" ON "Address"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- Créer une politique RLS pour que les utilisateurs puissent mettre à jour leurs propres adresses
CREATE POLICY "Users can update their own addresses" ON "Address"
    FOR UPDATE USING (auth.uid()::text = "userId");

-- Créer une politique RLS pour que les utilisateurs puissent supprimer leurs propres adresses
CREATE POLICY "Users can delete their own addresses" ON "Address"
    FOR DELETE USING (auth.uid()::text = "userId");

-- Insérer quelques adresses de test
INSERT INTO "Address" (id, name, phone, city, "addressLine1", "addressLine2", "isDefault", "userId", "createdAt", "updatedAt") 
VALUES 
    ('addr-1', 'Jean Dupont', '0123456789', 'Paris', '123 Rue de la Paix', 'Appartement 4A', true, 'test-user-123', NOW(), NOW()),
    ('addr-2', 'Marie Martin', '0987654321', 'Lyon', '456 Avenue des Champs', 'Bâtiment B', false, 'test-user-123', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Vérifier que la table a été créée
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'Address';

-- Vérifier la structure de la table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'Address'
ORDER BY ordinal_position;

-- Vérifier les données insérées
SELECT COUNT(*) as total_addresses FROM "Address";
