-- Fonction pour exécuter des requêtes SQL dynamiques dans Supabase
-- À exécuter dans l'éditeur SQL de votre dashboard Supabase

-- 1. Créer la fonction exec_sql
CREATE OR REPLACE FUNCTION exec_sql(query text, params jsonb DEFAULT '[]'::jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result jsonb;
    param_array text[];
    i integer;
    param text;
BEGIN
    -- Convertir le JSON en array de paramètres
    param_array := array(
        SELECT jsonb_array_elements_text(params)
    );
    
    -- Remplacer les paramètres $1, $2, etc. par les vraies valeurs
    FOR i IN 1..array_length(param_array, 1) LOOP
        param := param_array[i];
        -- Échapper les paramètres pour éviter l'injection SQL
        IF param IS NULL THEN
            query := replace(query, '$' || i, 'NULL');
        ELSIF param = 'true' THEN
            query := replace(query, '$' || i, 'true');
        ELSIF param = 'false' THEN
            query := replace(query, '$' || i, 'false');
        ELSIF param ~ '^[0-9]+$' THEN
            query := replace(query, '$' || i, param);
        ELSE
            query := replace(query, '$' || i, quote_literal(param));
        END IF;
    END LOOP;
    
    -- Exécuter la requête
    EXECUTE 'SELECT jsonb_agg(row_to_json(t)) FROM (' || query || ') t' INTO result;
    
    -- Retourner un tableau vide si aucun résultat
    IF result IS NULL THEN
        result := '[]'::jsonb;
    END IF;
    
    RETURN result;
EXCEPTION
    WHEN OTHERS THEN
        -- En cas d'erreur, retourner l'erreur
        RETURN jsonb_build_object(
            'error', SQLERRM,
            'detail', SQLSTATE
        );
END;
$$;

-- 2. Donner les permissions nécessaires
GRANT EXECUTE ON FUNCTION exec_sql TO authenticated;
GRANT EXECUTE ON FUNCTION exec_sql TO service_role;

-- 3. Vérifier que la fonction est créée
SELECT 
    routine_name, 
    routine_type, 
    security_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_name = 'exec_sql';

-- 4. Test de la fonction
SELECT exec_sql('SELECT COUNT(*) as count FROM "Product"', '[]'::jsonb);
