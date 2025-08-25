# Configuration Uploadthing

## Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env.local` :

```bash
# Uploadthing Configuration
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here
```

## Étapes de configuration

1. **Créer un compte Uploadthing**
   - Allez sur [uploadthing.com](https://uploadthing.com)
   - Créez un compte et un nouveau projet

2. **Récupérer les clés**
   - Dans votre dashboard Uploadthing, allez dans "API Keys"
   - Copiez `UPLOADTHING_SECRET` et `UPLOADTHING_APP_ID`

3. **Configurer les variables d'environnement**
   - Créez un fichier `.env.local` à la racine du projet
   - Ajoutez les variables ci-dessus avec vos vraies valeurs

4. **Redémarrer le serveur de développement**
   ```bash
   npm run dev
   ```

## Fonctionnalités disponibles

- **Upload d'images** : JPG, PNG, GIF, WebP jusqu'à 4MB
- **Drag & Drop** : Interface intuitive pour glisser-déposer
- **Validation** : Vérification automatique des types et tailles
- **Aperçu** : Visualisation immédiate des images uploadées
- **Sécurité** : Authentification requise pour tous les uploads

## Endpoints configurés

- `imageUploader` : Upload d'une seule image
- `multipleImages` : Upload de plusieurs images (max 5)

## Utilisation dans les composants

```tsx
import { ImageUpload } from "@/components/ui/ImageUpload";

<ImageUpload
  value={imageUrl}
  onChange={setImageUrl}
  onRemove={() => setImageUrl('')}
  maxFiles={1}
  maxSize={4 * 1024 * 1024} // 4MB
/>
```

## Dépannage

- **Erreur "Non autorisé"** : Vérifiez que l'utilisateur est connecté
- **Upload échoue** : Vérifiez les variables d'environnement
- **Image ne s'affiche pas** : Vérifiez l'URL retournée par Uploadthing
