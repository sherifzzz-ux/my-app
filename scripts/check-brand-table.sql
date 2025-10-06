-- Vérifier l'existence et la structure de la table Brand
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name ILIKE '%brand%';

-- Si la table existe, vérifier sa structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name ILIKE '%brand%'
ORDER BY ordinal_position;

-- Vérifier les données existantes
SELECT * FROM "Brand" LIMIT 5;
