-- Migration pour créer la table de suspension des utilisateurs
-- Cette table permet de gérer la suspension des utilisateurs de manière alternative
-- si supabase.auth.admin n'est pas disponible

-- Créer la table user_suspensions
CREATE TABLE IF NOT EXISTS public.user_suspensions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    suspended_until TIMESTAMPTZ NOT NULL,
    suspended_by UUID REFERENCES auth.users(id) NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id)
);

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_user_suspensions_user_id ON public.user_suspensions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_suspensions_suspended_until ON public.user_suspensions(suspended_until);

-- Activer RLS
ALTER TABLE public.user_suspensions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour user_suspensions
-- Seuls les admins peuvent voir et gérer les suspensions
CREATE POLICY "Admins can view all suspensions" ON public.user_suspensions
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert suspensions" ON public.user_suspensions
    FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update suspensions" ON public.user_suspensions
    FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete suspensions" ON public.user_suspensions
    FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Créer la fonction pour créer la table (fallback)
CREATE OR REPLACE FUNCTION public.create_user_suspensions_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Cette fonction est appelée si la table n'existe pas
    -- Elle est déjà créée par cette migration, donc on ne fait rien
    RETURN;
END;
$$;

-- Créer un trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_user_suspensions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_suspensions_updated_at
    BEFORE UPDATE ON public.user_suspensions
    FOR EACH ROW EXECUTE FUNCTION public.update_user_suspensions_updated_at();

-- Créer une fonction pour vérifier si un utilisateur est suspendu
CREATE OR REPLACE FUNCTION public.is_user_suspended(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 
        FROM public.user_suspensions 
        WHERE user_id = user_uuid 
        AND suspended_until > now()
    );
$$;
