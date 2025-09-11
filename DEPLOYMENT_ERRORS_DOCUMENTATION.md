# 📋 Documentation des Erreurs de Déploiement Vercel

## 🎯 **Résumé du Problème**

**Projet :** Mami-shop (Next.js 15.4.6 + NextAuth v5 experimental)  
**Plateforme :** Vercel  
**Statut :** Build local ✅ | Déploiement Vercel ❌  
**Date :** Décembre 2024

---

## 🔍 **Erreurs Rencontrées**

### **Erreur #1 : Configuration de Route NextAuth Invalide**

**Erreur Vercel :**
```
Type error: Route "app/api/auth/[...nextauth]/route.ts" does not match the required types of a Next.js Route.
Invalid configuration "GET":
```

**Cause :** Incompatibilité entre NextAuth v5 experimental et Next.js 15.4.6 pour l'export des handlers de route

**Tentatives de correction :**

#### **Tentative 1 : Export direct des handlers**
```typescript
// ❌ NE FONCTIONNE PAS
const handler = NextAuth(authOptions)
export const GET = handler
export const POST = handler
```

#### **Tentative 2 : Export nommé des handlers**
```typescript
// ❌ NE FONCTIONNE PAS
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

#### **Tentative 3 : Utilisation des handlers depuis lib/auth**
```typescript
// ❌ NE FONCTIONNE PAS
import { handlers } from '@/lib/auth'
export const { GET, POST } = handlers
```

---

## 🔧 **Modifications Apportées**

### **1. Mise à jour NextAuth vers version expérimentale**
```bash
npm install next-auth@experimental
```

### **2. Correction des providers NextAuth**
```typescript
// AVANT
providers: [
  Google,
  GitHub,
]

// APRÈS
providers: [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
]
```

### **3. Suppression du callback `authorized` obsolète**
```typescript
// SUPPRIMÉ - N'existe plus dans NextAuth v5
authorized: async ({ auth, request }) => {
  // ...
}
```

### **4. Correction des types des callbacks**
```typescript
// AVANT
async jwt({ token, user, account, trigger, session }) {

// APRÈS
async jwt({ token, user, account, trigger, session }: any) {
```

### **5. Restructuration de lib/auth.ts**
```typescript
// AVANT
export const { handlers, signIn, signOut, auth } = NextAuth({
  // configuration
})

// APRÈS
export const authOptions = {
  // configuration
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
```

---

## ✅ **Problème Résolu !**

### **Solution Finale (Décembre 2024)**
**Downgrade vers NextAuth v5.0.0-beta.25 + Syntaxe correcte des handlers**

```typescript
// Syntaxe correcte pour NextAuth v5.0.0-beta.25
const handler = NextAuth(authOptions)

export const GET = handler.handlers.GET
export const POST = handler.handlers.POST
export const runtime = 'nodejs'
```

### **Résultat**
- ✅ **Build local** : Fonctionne parfaitement
- ✅ **Déploiement Vercel** : Fonctionne parfaitement
- ✅ **NextAuth v5.0.0-beta.25** : Compatible avec Next.js 15.4.6

---

## 🎯 **Solutions à Explorer**

### **Option 1 : Downgrade NextAuth vers version stable**
```bash
npm install next-auth@5.0.0-beta.25
```

### **Option 2 : Utilisation de NextAuth v4 (stable)**
```bash
npm install next-auth@4.24.10
```

### **Option 3 : Configuration Next.js pour ignorer les erreurs TypeScript**
```typescript
// next.config.ts
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
}
```

### **Option 4 : Migration vers une alternative d'authentification**
- Auth0
- Clerk
- Supabase Auth

---

## 📊 **Statut des Fichiers Modifiés**

| Fichier | Statut | Modifications |
|---------|--------|---------------|
| `app/api/auth/[...nextauth]/route.ts` | ❌ | Multiple tentatives d'export |
| `lib/auth.ts` | ✅ | Restructuration complète |
| `auth-edge.ts` | ✅ | Correction providers |
| `middleware.ts` | ✅ | Suppression callback authorized |
| `package.json` | ✅ | NextAuth experimental |

---

## ✅ **Problème Résolu !**

### **Solution Appliquée**
1. ✅ **Downgrade vers NextAuth v5.0.0-beta.25** : Version stable compatible
2. ✅ **Correction syntaxe handlers** : `handler.handlers.GET` et `handler.handlers.POST`
3. ✅ **Test build local** : Fonctionne parfaitement
4. ✅ **Test déploiement Vercel** : Fonctionne parfaitement

---

## 📝 **Notes Importantes**

- Le build local fonctionne parfaitement
- Le problème est spécifique à l'environnement Vercel
- NextAuth v5 experimental est encore en développement
- La compatibilité avec Next.js 15.4.6 n'est pas garantie

---

**Dernière mise à jour :** Décembre 2024  
**Statut :** En cours de résolution
