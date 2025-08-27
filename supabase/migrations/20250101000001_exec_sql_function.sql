-- Migration pour créer une fonction d'exécution SQL sécurisée
-- Cette fonction est nécessaire pour créer des tables dynamiquement si elles n'existent pas

-- Créer la fonction exec_sql (seulement si elle n'existe pas)
CREATE OR REPLACE FUNCTION public.exec_sql(sql_text TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Vérifier que l'utilisateur a le rôle admin
    IF NOT public.has_role(auth.uid(), 'admin') THEN
        RAISE EXCEPTION 'Access denied. Admin role required.';
    END IF;
    
    -- Exécuter le SQL fourni
    EXECUTE sql_text;
END;
$$;

-- Donner les permissions appropriées
GRANT EXECUTE ON FUNCTION public.exec_sql(TEXT) TO authenticated;

-- Commentaire pour documenter l'usage
COMMENT ON FUNCTION public.exec_sql(TEXT) IS 'Fonction sécurisée pour exécuter du SQL dynamique. Réservée aux admins.';
