# Plan de refactoring pour éliminer les `as any`

## Étape 1 : Configuration Supabase ✅
- [x] Analyser le schéma de base de données
- [x] Documenter les tables et relations
- [x] Créer les types TypeScript corrects
- [ ] Configurer Supabase pour les noms avec majuscules

## Étape 2 : Mise à jour des types
- [ ] Créer un fichier de types personnalisés
- [ ] Configurer le client Supabase
- [ ] Tester la génération de types

## Étape 3 : Refactoring des API routes
- [ ] `app/api/admin/taxonomy-supabase/route.ts`
- [ ] `app/api/categories/[slug]/subcategories/route.ts`
- [ ] `app/api/products/route.ts`
- [ ] `app/api/admin/products-supabase/route.ts`
- [ ] `app/api/account/favorites/route.ts`

## Étape 4 : Refactoring des pages
- [ ] `app/category/[categorySlug]/subcategory/[subcategorySlug]/page.tsx`
- [ ] `app/corps-bain/sous-categorie/[slug]/page.tsx`

## Étape 5 : Refactoring des composants
- [ ] `lib/supabase/navigation.ts`
- [ ] Autres composants utilisant Supabase

## Étape 6 : Tests et validation
- [ ] Tester chaque fichier modifié
- [ ] Vérifier la compilation
- [ ] Tester les fonctionnalités

## Étape 7 : Nettoyage final
- [ ] Supprimer tous les `as any`
- [ ] Vérifier qu'il n'y a plus d'erreurs
- [ ] Tester l'application complète

## Fichiers prioritaires à traiter
1. **API routes** (critiques pour le fonctionnement)
2. **Pages** (importantes pour l'utilisateur)
3. **Composants** (moins critiques)

## Avantages attendus
- Types corrects et sécurisés
- Détection des erreurs à la compilation
- Code plus maintenable
- Performance améliorée
