# Plan de migration pour éliminer les `as any`

## Étape 1 : Configuration des types ✅
- [x] Analyser le schéma de base de données
- [x] Créer les types TypeScript personnalisés
- [x] Configurer le client Supabase avec les types
- [x] Créer les fonctions d'aide typées

## Étape 2 : Migration des API routes
### Priorité 1 (Critiques)
- [ ] `app/api/admin/taxonomy-supabase/route.ts`
- [ ] `app/api/categories/[slug]/subcategories/route.ts`
- [ ] `app/api/products/route.ts`
- [ ] `app/api/admin/products-supabase/route.ts`

### Priorité 2 (Importantes)
- [ ] `app/api/account/favorites/route.ts`
- [ ] `app/api/admin/products/route.ts`

## Étape 3 : Migration des pages
- [ ] `app/category/[categorySlug]/subcategory/[subcategorySlug]/page.tsx`
- [ ] `app/corps-bain/sous-categorie/[slug]/page.tsx`

## Étape 4 : Migration des composants
- [ ] `lib/supabase/navigation.ts`
- [ ] Autres composants utilisant Supabase

## Étape 5 : Tests et validation
- [ ] Tester chaque fichier modifié
- [ ] Vérifier la compilation
- [ ] Tester les fonctionnalités

## Étape 6 : Nettoyage final
- [ ] Supprimer tous les `as any`
- [ ] Vérifier qu'il n'y a plus d'erreurs
- [ ] Tester l'application complète

## Fichiers à migrer (ordre de priorité)

### 1. API Routes (Critiques)
```
app/api/admin/taxonomy-supabase/route.ts
app/api/categories/[slug]/subcategories/route.ts
app/api/products/route.ts
app/api/admin/products-supabase/route.ts
app/api/account/favorites/route.ts
```

### 2. Pages (Importantes)
```
app/category/[categorySlug]/subcategory/[subcategorySlug]/page.tsx
app/corps-bain/sous-categorie/[slug]/page.tsx
```

### 3. Composants (Moins critiques)
```
lib/supabase/navigation.ts
```

## Avantages attendus
- ✅ Types corrects et sécurisés
- ✅ Détection des erreurs à la compilation
- ✅ Code plus maintenable
- ✅ Performance améliorée
- ✅ IntelliSense complet

## Risques à gérer
- ⚠️ Temps de développement plus long
- ⚠️ Nécessite des tests approfondis
- ⚠️ Complexité de configuration
