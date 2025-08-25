# Configuration Supabase pour Vercel

## 1. Exécuter les migrations

Connectez-vous à votre projet Supabase et exécutez ces migrations dans l'ordre :

### Migration 1: Site Settings et Audit Logs

```sql
-- Copier le contenu de Frontend/supabase/migrations/20250824000100_site_settings_audit_logs.sql
```

### Migration 2: Tables E-commerce

```sql
-- Copier le contenu de Frontend/supabase/migrations/20250824000200_ecommerce_tables.sql
```

### Migration 3: Produits de test

```sql
-- Copier le contenu de Frontend/supabase/migrations/20250824000300_sample_products.sql
```

## 2. Variables d'environnement Vercel

Ajoutez ces variables dans Vercel > Settings > Environment Variables :

### Supabase

```bash
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]
```

### Auth.js (NextAuth)

```bash
AUTH_SECRET=[GENERATE-A-RANDOM-SECRET]
AUTH_URL=https://[YOUR-VERCEL-DOMAIN].vercel.app
```

### Optionnel

```bash
NEXT_PUBLIC_BASE_URL=https://[YOUR-VERCEL-DOMAIN].vercel.app
```

## 3. Créer un utilisateur admin

Dans Supabase SQL Editor, exécutez :

```sql
-- Créer un utilisateur admin (remplacez par votre email)
insert into auth.users (email, email_confirmed_at, created_at, updated_at)
values ('votre-email@example.com', now(), now(), now())
on conflict (email) do nothing;

-- Récupérer l'ID de l'utilisateur créé
with user_info as (
  select id from auth.users where email = 'votre-email@example.com'
)
insert into public.user_roles (user_id, role, created_at)
select id, 'admin', now() from user_info
on conflict (user_id) do update set role = 'admin';

-- Créer un profil pour l'utilisateur
with user_info as (
  select id from auth.users where email = 'votre-email@example.com'
)
insert into public.profiles (id, first_name, last_name, created_at, updated_at)
select id, 'Admin', 'User', now(), now() from user_info
on conflict (id) do nothing;
```

## 4. Désactiver la maintenance

```sql
-- Insérer ou mettre à jour les paramètres du site
insert into public.site_settings (id, site_name, maintenance_mode, created_at, updated_at)
values (gen_random_uuid(), 'Mami Shop', false, now(), now())
on conflict (id) do update set 
  maintenance_mode = false,
  updated_at = now();
```

## 5. Vérifier l'accès

1. Allez sur `https://[YOUR-VERCEL-DOMAIN].vercel.app/api/auth/signin`
2. Connectez-vous avec votre email
3. Accédez à `https://[YOUR-VERCEL-DOMAIN].vercel.app/admin`

## Dépannage

- **Erreur 500**: Vérifiez `SUPABASE_SERVICE_ROLE_KEY`
- **Pas de données**: Exécutez les migrations dans l'ordre
- **Accès refusé**: Vérifiez que votre utilisateur a le rôle `admin`
- **Maintenance**: Vérifiez `site_settings.maintenance_mode = false`
