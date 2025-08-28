-- ========================================
-- CRÉATION DE LA TABLE USER_ADDRESSES
-- ========================================

-- Créer la table user_addresses
CREATE TABLE IF NOT EXISTS user_addresses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'shipping',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(100),
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'France',
    phone VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer un index sur user_id pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);

-- Créer un index sur is_default pour les requêtes de tri
CREATE INDEX IF NOT EXISTS idx_user_addresses_is_default ON user_addresses(is_default);

-- Ajouter une contrainte unique pour qu'un utilisateur n'ait qu'une seule adresse par défaut
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_addresses_user_default ON user_addresses(user_id, is_default) WHERE is_default = TRUE;

-- Créer un trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_addresses_updated_at 
    BEFORE UPDATE ON user_addresses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Activer RLS (Row Level Security)
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

-- Créer une politique RLS pour que les utilisateurs ne voient que leurs propres adresses
CREATE POLICY "Users can view their own addresses" ON user_addresses
    FOR SELECT USING (auth.uid() = user_id);

-- Créer une politique RLS pour que les utilisateurs puissent insérer leurs propres adresses
CREATE POLICY "Users can insert their own addresses" ON user_addresses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Créer une politique RLS pour que les utilisateurs puissent mettre à jour leurs propres adresses
CREATE POLICY "Users can update their own addresses" ON user_addresses
    FOR UPDATE USING (auth.uid() = user_id);

-- Créer une politique RLS pour que les utilisateurs puissent supprimer leurs propres adresses
CREATE POLICY "Users can delete their own addresses" ON user_addresses
    FOR DELETE USING (auth.uid() = user_id);

-- Insérer quelques adresses de test (optionnel)
-- INSERT INTO user_addresses (user_id, type, first_name, last_name, address_line1, city, postal_code, country, is_default)
-- VALUES 
--     ('00000000-0000-0000-0000-000000000001', 'shipping', 'Jean', 'Dupont', '123 Rue de la Paix', 'Paris', '75001', 'France', TRUE),
--     ('00000000-0000-0000-0000-000000000001', 'billing', 'Jean', 'Dupont', '123 Rue de la Paix', 'Paris', '75001', 'France', FALSE);

-- Vérifier que la table a été créée
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'user_addresses';

-- Vérifier la structure de la table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_addresses'
ORDER BY ordinal_position;
