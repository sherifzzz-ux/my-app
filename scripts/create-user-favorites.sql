-- ========================================
-- CRÉATION DE LA TABLE USER_FAVORITES
-- ========================================

-- Créer la table user_favorites
CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    product_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ajouter les contraintes de clés étrangères
ALTER TABLE user_favorites 
ADD CONSTRAINT fk_user_favorites_user_id 
FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE;

ALTER TABLE user_favorites 
ADD CONSTRAINT fk_user_favorites_product_id 
FOREIGN KEY (product_id) REFERENCES "Product"(id) ON DELETE CASCADE;

-- Créer un index unique pour éviter les doublons
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_favorites_unique 
ON user_favorites(user_id, product_id);

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id 
ON user_favorites(user_id);

CREATE INDEX IF NOT EXISTS idx_user_favorites_product_id 
ON user_favorites(product_id);

CREATE INDEX IF NOT EXISTS idx_user_favorites_created_at 
ON user_favorites(created_at);

-- Activer Row Level Security (RLS)
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Créer une politique RLS pour permettre aux utilisateurs de voir leurs propres favoris
CREATE POLICY "Users can view their own favorites" ON user_favorites
    FOR SELECT USING (auth.uid() = user_id);

-- Créer une politique RLS pour permettre aux utilisateurs d'ajouter leurs propres favoris
CREATE POLICY "Users can insert their own favorites" ON user_favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Créer une politique RLS pour permettre aux utilisateurs de supprimer leurs propres favoris
CREATE POLICY "Users can delete their own favorites" ON user_favorites
    FOR DELETE USING (auth.uid() = user_id);

-- Créer une politique RLS pour permettre aux utilisateurs de mettre à jour leurs propres favoris
CREATE POLICY "Users can update their own favorites" ON user_favorites
    FOR UPDATE USING (auth.uid() = user_id);

-- Créer un trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_favorites_updated_at 
    BEFORE UPDATE ON user_favorites 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Vérifier que la table a été créée
SELECT 
    table_name,
    table_type,
    is_insertable_into
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'user_favorites';

-- Vérifier la structure de la table créée
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_favorites'
ORDER BY ordinal_position;

-- Vérifier les contraintes
SELECT 
    constraint_name,
    constraint_type,
    table_name
FROM information_schema.table_constraints 
WHERE table_schema = 'public' 
AND table_name = 'user_favorites';

-- Vérifier les index
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
AND tablename = 'user_favorites';

-- Vérifier les politiques RLS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename = 'user_favorites';
