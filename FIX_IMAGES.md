# 🖼️ Fix Images 404

## Problème
Les erreurs 404 suivantes apparaissent dans la console :
- `/images/shampoing.jpg`
- `/images/fond-teint.jpg`
- `/images/vitamines.jpg`

## Cause
Ces images sont référencées dans les produits de test mais n'existent pas dans `/public/images/`.

## Solution Automatique ✅

### Option 1: Via l'API Admin (RECOMMANDÉ)

Appelez simplement cette URL (POST request) :
```
https://votre-domaine.vercel.app/api/admin/fix-images
```

OU utilisez le script fourni :
```bash
./scripts/fix-images.sh
```

### Option 2: Via SQL Direct

Exécutez le script SQL :
```bash
psql $DATABASE_URL -f scripts/fix-missing-images.sql
```

OU manuellement :
```sql
-- Remplacer les images manquantes par des images existantes
UPDATE "public"."Product" 
SET "imageUrl" = '/images/p31-1.jpg'
WHERE "imageUrl" LIKE '%shampoing%';

UPDATE "public"."Product" 
SET "imageUrl" = '/images/p21-1.jpg'
WHERE "imageUrl" LIKE '%fond-teint%';

UPDATE "public"."Product" 
SET "imageUrl" = '/images/p12-1.jpg'
WHERE "imageUrl" LIKE '%vitamines%';
```

## Mapping des Images

| Image manquante | Image de remplacement | Catégorie |
|-----------------|----------------------|-----------|
| `shampoing.jpg` | `p31-1.jpg` ✅ | Cheveux |
| `fond-teint.jpg` | `p21-1.jpg` ✅ | Maquillage |
| `vitamines.jpg` | `p12-1.jpg` ✅ | Parapharmacie |

Les images de remplacement existent déjà dans `/public/images/`.

## Vérification

Après le fix, vérifiez :

1. **Console navigateur** : Les erreurs 404 doivent avoir disparu
2. **Base de données** :
   ```sql
   SELECT id, name, imageUrl 
   FROM "Product" 
   WHERE imageUrl LIKE '%p31-1%' 
      OR imageUrl LIKE '%p21-1%' 
      OR imageUrl LIKE '%p12-1%';
   ```
3. **Interface** : Les images des produits s'affichent correctement

## Images Disponibles

Le dossier `/public/images/` contient déjà toutes les images nécessaires :
- ✅ `p11-1.jpg`, `p11-2.jpg` (Catégorie 1)
- ✅ `p12-1.jpg`, `p12-2.jpg` (Catégorie 1)
- ✅ `p21-1.jpg`, `p21-2.jpg` (Catégorie 2)
- ✅ `p22-1.jpg`, `p22-2.jpg` (Catégorie 2)
- ✅ `p31-1.jpg`, `p31-2.jpg` (Catégorie 3)
- ✅ `p32-1.jpg`, `p32-2.jpg` (Catégorie 3)

## Pour Ajouter de Vraies Images

Si vous voulez ajouter les vraies images à la place :

1. **Téléchargez les images** dans `/public/images/` :
   - `shampoing.jpg` (recommandé: 800x800px)
   - `fond-teint.jpg` (recommandé: 800x800px)
   - `vitamines.jpg` (recommandé: 800x800px)

2. **Optimisez les images** (optionnel) :
   ```bash
   # Avec ImageMagick
   convert shampoing.jpg -resize 800x800 -quality 85 shampoing.jpg
   ```

3. **Redéployez** :
   ```bash
   vercel --prod
   ```

4. **Mettez à jour les URLs** dans la base de données (ou laissez tel quel)

## API Route

L'API `/api/admin/fix-images` :
- Recherche automatiquement les produits avec images manquantes
- Les remplace par des images existantes
- Retourne la liste des produits modifiés

**Code source** : `app/api/admin/fix-images/route.ts`

## Notes

- Les erreurs 404 d'images n'empêchent pas le site de fonctionner
- Elles affectent seulement l'affichage des produits concernés
- Next.js affiche un placeholder automatiquement en cas d'erreur
- Les images de remplacement sont de bonne qualité et adaptées

---

**Temps de résolution** : 30 secondes via l'API, 1 minute via SQL
