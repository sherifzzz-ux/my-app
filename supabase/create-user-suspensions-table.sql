-- Script pour créer la table user_suspensions
-- Exécutez ce script dans votre base de données Supabase si la table n'existe pas

-- Créer la table user_suspensions
CREATE TABLE IF NOT EXISTS public.user_suspensions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    suspended_until TIMESTAMPTZ NOT NULL,
    suspended_by UUID NOT NULL,
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

-- Vérifier que la table a été créée
SELECT 'Table user_suspensions créée avec succès' as status;
SELECT COUNT(*) as nombre_suspensions FROM public.user_suspensions;
