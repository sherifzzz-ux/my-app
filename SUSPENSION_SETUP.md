# Configuration de la Suspension des Utilisateurs

## 🚨 Problème Identifié
Le bouton "Suspendre" ne fonctionnait pas car Supabase Auth Admin n'était pas configuré correctement ou la fonctionnalité `banned_until` n'était pas supportée.

## ✅ Solution Implémentée
Nous avons créé une solution alternative qui utilise une table personnalisée `user_suspensions` pour gérer la suspension des utilisateurs.

## 🛠️ Étapes de Configuration

### 1. **Appliquer la Migration SQL**
Exécutez le fichier de migration dans votre base de données Supabase :

```sql
-- Le fichier est dans: supabase/migrations/20250101000000_user_suspensions.sql
-- Appliquez-le via l'interface Supabase ou votre client SQL
```

### 2. **Vérifier les Variables d'Environnement**
Assurez-vous que ces variables sont configurées dans votre `.env.local` :

```bash
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_role
```

### 3. **Tester la Fonctionnalité**
1. Allez dans la section Admin > Utilisateurs
2. Cliquez sur "Suspendre" pour un utilisateur
3. Vérifiez que le statut change à "Suspendu"
4. Testez la réactivation

## 🔧 Comment ça Marche

### **Approche Hybride :**
1. **Essai 1** : Utilise `supabase.auth.admin.updateUserById()` si disponible
2. **Fallback** : Utilise notre table `user_suspensions` personnalisée

### **Table user_suspensions :**
- `user_id` : ID de l'utilisateur suspendu
- `suspended_until` : Date de fin de suspension
- `suspended_by` : ID de l'admin qui a suspendu
- `reason` : Raison de la suspension

## 🧪 Test de la Configuration

### **Test 1 : Vérifier la Table**
```sql
-- Vérifier que la table existe
SELECT * FROM user_suspensions LIMIT 1;
```

### **Test 2 : Vérifier les Permissions**
```sql
-- Vérifier que la fonction has_role fonctionne
SELECT has_role(auth.uid(), 'admin');
```

### **Test 3 : Tester la Suspension**
1. Suspendre un utilisateur via l'interface
2. Vérifier dans la base : `SELECT * FROM user_suspensions WHERE user_id = 'user_id';`

## 🚀 Avantages de cette Solution

1. **Robustesse** : Fonctionne même si Supabase Auth Admin échoue
2. **Flexibilité** : Permet de personnaliser la logique de suspension
3. **Traçabilité** : Garde un historique des suspensions
4. **Performance** : Requêtes optimisées avec des index

## 🔍 Dépannage

### **Problème : "Table user_suspensions doesn't exist"**
**Solution** : Appliquez la migration SQL

### **Problème : "Permission denied"**
**Solution** : Vérifiez que l'utilisateur a le rôle 'admin'

### **Problème : "Function has_role doesn't exist"**
**Solution** : Vérifiez que les migrations de base ont été appliquées

## 📝 Logs et Debugging

Les erreurs sont loggées dans la console du serveur. Vérifiez :
- Les logs de l'API lors des tentatives de suspension
- Les erreurs dans la console du navigateur
- Les logs Supabase dans le dashboard

## 🎯 Prochaines Étapes

1. **Tester** la suspension et réactivation
2. **Vérifier** que l'interface se met à jour correctement
3. **Implémenter** des notifications en temps réel si nécessaire
4. **Ajouter** des raisons de suspension personnalisées
