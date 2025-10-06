-- Vérifier la structure de la table Subcategory
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'Subcategory' 
ORDER BY ordinal_position;
