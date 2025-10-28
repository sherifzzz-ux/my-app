# Guide Complet : Reproduire l'Interface Mobile Spotify

## 📱 Vue d'ensemble

Ce guide détaille toutes les étapes nécessaires pour reproduire le rendu et l'expérience de l'application mobile Spotify dans votre projet Next.js.

---

## 🎨 1. ANALYSE DE L'INTERFACE SPOTIFY MOBILE

### 1.1 Structure de Navigation Principale

**Bottom Navigation Bar (Barre de navigation inférieure)**
- 5 onglets principaux :
  - 🏠 **Accueil** : Page d'accueil personnalisée
  - 🔍 **Recherche** : Exploration et recherche
  - 📚 **Bibliothèque** : Collection personnelle
  - ➕ **Premium** : Offres d'abonnement (optionnel)
  - 👤 **Profil** : Paramètres utilisateur

**Caractéristiques visuelles :**
- Fond noir (#000000) ou gris très foncé (#121212)
- Icônes blanches inactives avec 50% d'opacité
- Icône active en vert Spotify (#1DB954)
- Hauteur : ~80px sur mobile
- Position fixe en bas de l'écran

### 1.2 Header / Top Bar

**Structure :**
- Fond dégradé qui change selon le contenu
- Avatar utilisateur en haut à gauche
- Icônes notifications et paramètres en haut à droite
- Titre de la section ou message de bienvenue
- Scroll progressif avec effet de flou/opacité

### 1.3 Page d'Accueil

**Sections principales :**

1. **Header dynamique**
   - Message de salutation basé sur l'heure : "Bonjour", "Bonsoir"
   - Icônes paramètres et notifications

2. **Raccourcis récents** (2x3 grille)
   - 6 éléments récemment écoutés
   - Format carré avec image + titre tronqué
   - Fond légèrement élevé avec ombre

3. **Playlists recommandées**
   - Scroll horizontal
   - Cartes avec :
     - Image de couverture (carrée)
     - Titre de la playlist
     - Description courte
   - Espacement entre les cartes : 12-16px

4. **Sections thématiques**
   - "Made For You"
   - "Récemment écoutés"
   - "Vos meilleures playlists"
   - "Charts"
   - "Nouveautés"

5. **Format des cartes produits/playlists**
   - Image carrée (1:1 ratio)
   - Titre en blanc, 14-16px
   - Sous-titre en gris (#b3b3b3), 12-14px
   - Padding : 8px
   - Border-radius : 4-8px

### 1.4 Page Recherche

**Structure :**

1. **Barre de recherche**
   - Position sticky en haut
   - Icône loupe à gauche
   - Placeholder "Que voulez-vous écouter ?"
   - Fond blanc ou gris clair
   - Border-radius : 8px
   - Hauteur : 48px

2. **Catégories en grille** (2 colonnes)
   - Cartes colorées avec image d'illustration
   - Titre de catégorie
   - Fond de couleur aléatoire
   - Ratio 1:1 ou 16:9
   - Rotation de couleurs : 
     - Rose (#e91429)
     - Bleu (#1e3264)
     - Vert (#0d73ec)
     - Orange (#e8115b)
     - etc.

3. **Résultats de recherche**
   - Onglets : Tout, Titres, Albums, Artistes, Playlists
   - Liste avec images circulaires (artistes) ou carrées (albums)
   - Texte principal et secondaire

### 1.5 Page Bibliothèque

**Structure :**

1. **Header avec filtres**
   - Boutons filtres : Playlists, Artistes, Albums, Podcasts
   - Bouton tri (récents, alphabétique, créateur)

2. **Liste des éléments**
   - Image carrée à gauche (48x48px)
   - Titre + sous-titre (nombre de titres, créateur)
   - Icône épinglé pour favoris
   - Séparateur subtil entre éléments

### 1.6 Player (Lecteur Musical)

**Mini Player (en bas, au-dessus de la nav)**
- Hauteur : ~64px
- Image de l'album (48x48px)
- Titre + artiste
- Icône cœur (favori)
- Bouton lecture/pause
- Barre de progression

**Full Player (expansion)**
- Image album plein écran (avec dégradé derrière)
- Titre en gros
- Nom de l'artiste
- Barre de progression avec temps
- Contrôles :
  - Shuffle
  - Précédent
  - Play/Pause (grand bouton circulaire)
  - Suivant
  - Repeat
- Boutons secondaires :
  - Cœur (favori)
  - Partager
  - Queue
  - Devices

---

## 🎯 2. DESIGN SYSTEM SPOTIFY

### 2.1 Palette de Couleurs

```css
/* Couleurs principales */
--spotify-green: #1DB954;
--spotify-green-dark: #1aa34a;
--spotify-green-light: #1ed760;

/* Fond */
--bg-base: #121212;
--bg-elevated: #181818;
--bg-highlight: #282828;
--bg-press: #3E3E3E;

/* Texte */
--text-base: #FFFFFF;
--text-subdued: #B3B3B3;
--text-secondary: #A7A7A7;

/* Bordures */
--border-subtle: rgba(255, 255, 255, 0.1);
--border-strong: rgba(255, 255, 255, 0.2);

/* Couleurs catégories (recherche) */
--category-colors: [
  #e91429, #1e3264, #0d73ec, #e8115b,
  #dc148c, #8d67ab, #1e3264, #e13300,
  #477d95, #dc148c, #8d67ab, #509bf5
];
```

### 2.2 Typographie

```css
/* Fonts */
font-family: 'Circular Std', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;

/* Tailles */
--font-size-xs: 11px;
--font-size-sm: 13px;
--font-size-base: 14px;
--font-size-md: 16px;
--font-size-lg: 24px;
--font-size-xl: 32px;
--font-size-2xl: 48px;

/* Poids */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
--font-weight-black: 900;
```

### 2.3 Espacements

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 24px;
--spacing-2xl: 32px;
```

### 2.4 Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### 2.5 Ombres

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.4);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.5);
```

---

## 🏗️ 3. ARCHITECTURE ET STRUCTURE

### 3.1 Structure des Dossiers

```
app/
├── (spotify-mobile)/
│   ├── layout.tsx                 # Layout avec bottom nav
│   ├── page.tsx                   # Home/Accueil
│   ├── search/
│   │   └── page.tsx              # Page recherche
│   ├── library/
│   │   └── page.tsx              # Bibliothèque
│   ├── profile/
│   │   └── page.tsx              # Profil
│   └── player/
│       └── [id]/
│           └── page.tsx          # Player full screen
│
components/
├── spotify/
│   ├── layout/
│   │   ├── BottomNav.tsx         # Navigation inférieure
│   │   ├── TopBar.tsx            # Barre supérieure
│   │   └── MiniPlayer.tsx        # Mini lecteur
│   ├── home/
│   │   ├── RecentShortcuts.tsx   # Raccourcis récents
│   │   ├── PlaylistSection.tsx   # Section playlists
│   │   └── PlaylistCard.tsx      # Carte playlist
│   ├── search/
│   │   ├── SearchBar.tsx         # Barre de recherche
│   │   ├── CategoryGrid.tsx      # Grille catégories
│   │   └── CategoryCard.tsx      # Carte catégorie
│   ├── library/
│   │   ├── LibraryFilters.tsx    # Filtres bibliothèque
│   │   └── LibraryItem.tsx       # Item bibliothèque
│   └── player/
│       ├── FullPlayer.tsx        # Lecteur plein écran
│       ├── PlayerControls.tsx    # Contrôles lecture
│       └── ProgressBar.tsx       # Barre progression
│
lib/
├── spotify/
│   ├── constants.ts              # Constantes (couleurs, etc.)
│   └── utils.ts                  # Utilitaires
│
hooks/
├── usePlayer.ts                  # Hook pour le lecteur
└── useSpotifyTheme.ts           # Hook pour le thème
```

### 3.2 Layout Principal (Spotify Mobile)

```typescript
// app/(spotify-mobile)/layout.tsx
export default function SpotifyMobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="spotify-mobile-layout">
      {/* Content avec padding bottom pour nav + player */}
      <main className="pb-[144px]">{children}</main>
      
      {/* Mini Player */}
      <MiniPlayer />
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
```

---

## 🔧 4. IMPLÉMENTATION DES COMPOSANTS CLÉS

### 4.1 Bottom Navigation

**Fichier : `components/spotify/layout/BottomNav.tsx`**

```typescript
'use client';

import { Home, Search, Library, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Home, label: 'Accueil', href: '/' },
  { icon: Search, label: 'Recherche', href: '/search' },
  { icon: Library, label: 'Bibliothèque', href: '/library' },
  { icon: User, label: 'Profil', href: '/profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#000000] border-t border-white/10">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive
                    ? 'text-[#1DB954]'
                    : 'text-white/50'
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  isActive
                    ? 'text-[#1DB954]'
                    : 'text-white/50'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

**Styles Tailwind nécessaires :**
```css
/* Dans votre fichier global CSS ou Tailwind config */
.spotify-mobile-layout {
  @apply min-h-screen bg-[#121212] text-white;
}
```

### 4.2 Page d'Accueil

**Fichier : `app/(spotify-mobile)/page.tsx`**

```typescript
import { TopBar } from '@/components/spotify/layout/TopBar';
import { RecentShortcuts } from '@/components/spotify/home/RecentShortcuts';
import { PlaylistSection } from '@/components/spotify/home/PlaylistSection';

export default function SpotifyHomePage() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 18 ? 'Bonjour' : 'Bonsoir';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3264] via-[#121212] to-[#121212]">
      <TopBar />
      
      {/* Header avec salutation */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-3xl font-black">{greeting}</h1>
      </div>

      {/* Raccourcis récents */}
      <RecentShortcuts />

      {/* Playlists recommandées */}
      <PlaylistSection title="Made For You" />
      <PlaylistSection title="Récemment écoutés" />
      <PlaylistSection title="Vos meilleures playlists" />
      <PlaylistSection title="Charts" />
    </div>
  );
}
```

### 4.3 Carte Playlist

**Fichier : `components/spotify/home/PlaylistCard.tsx`**

```typescript
import Image from 'next/image';
import Link from 'next/link';

interface PlaylistCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export function PlaylistCard({
  id,
  title,
  description,
  imageUrl,
}: PlaylistCardProps) {
  return (
    <Link
      href={`/playlist/${id}`}
      className="group flex flex-col gap-2 p-3 rounded-lg bg-[#181818] hover:bg-[#282828] transition-colors"
    >
      <div className="relative aspect-square rounded-md overflow-hidden shadow-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <h3 className="font-bold text-base line-clamp-1">
        {title}
      </h3>
      
      <p className="text-sm text-[#B3B3B3] line-clamp-2">
        {description}
      </p>
    </Link>
  );
}
```

### 4.4 Barre de Recherche

**Fichier : `components/spotify/search/SearchBar.tsx`**

```typescript
'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

export function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="sticky top-0 z-40 bg-[#121212] px-4 pt-4 pb-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#121212]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Que voulez-vous écouter ?"
          className="w-full h-12 pl-12 pr-4 bg-white text-[#121212] rounded-lg font-medium placeholder:text-[#666] focus:outline-none"
        />
      </div>
    </div>
  );
}
```

### 4.5 Grille de Catégories (Recherche)

**Fichier : `components/spotify/search/CategoryGrid.tsx`**

```typescript
import { CategoryCard } from './CategoryCard';

const categories = [
  { id: '1', name: 'Musique', color: '#e91429', image: '/category-music.jpg' },
  { id: '2', name: 'Podcasts', color: '#1e3264', image: '/category-podcasts.jpg' },
  { id: '3', name: 'Concerts', color: '#0d73ec', image: '/category-concerts.jpg' },
  // ... autres catégories
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 pb-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  );
}
```

**Fichier : `components/spotify/search/CategoryCard.tsx`**

```typescript
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  color: string;
  image: string;
}

export function CategoryCard({ id, name, color, image }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${id}`}
      className="relative aspect-square rounded-lg overflow-hidden shadow-lg"
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 p-4">
        <h3 className="text-xl font-black text-white">
          {name}
        </h3>
      </div>
      
      <div className="absolute bottom-0 right-0 w-24 h-24 translate-x-4 translate-y-2 rotate-12">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-sm shadow-2xl"
        />
      </div>
    </Link>
  );
}
```

### 4.6 Mini Player

**Fichier : `components/spotify/layout/MiniPlayer.tsx`**

```typescript
'use client';

import Image from 'next/image';
import { Heart, Play, Pause } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function MiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Données exemple (à remplacer par votre state management)
  const currentTrack = {
    id: '1',
    title: 'Titre de la chanson',
    artist: 'Nom de l\'artiste',
    image: '/album-cover.jpg',
    progress: 45, // pourcentage
  };

  return (
    <Link
      href={`/player/${currentTrack.id}`}
      className="fixed bottom-20 left-0 right-0 z-40 bg-[#282828] border-t border-white/10"
    >
      {/* Barre de progression */}
      <div className="h-1 bg-white/20">
        <div
          className="h-full bg-white"
          style={{ width: `${currentTrack.progress}%` }}
        />
      </div>

      <div className="flex items-center gap-3 px-3 py-2">
        {/* Image album */}
        <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
          <Image
            src={currentTrack.image}
            alt={currentTrack.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {currentTrack.title}
          </p>
          <p className="text-xs text-[#B3B3B3] truncate">
            {currentTrack.artist}
          </p>
        </div>

        {/* Contrôles */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="p-2"
        >
          <Heart
            className={`w-5 h-5 ${
              isLiked ? 'fill-[#1DB954] text-[#1DB954]' : 'text-white'
            }`}
          />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsPlaying(!isPlaying);
          }}
          className="p-2"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white fill-white" />
          ) : (
            <Play className="w-6 h-6 text-white fill-white" />
          )}
        </button>
      </div>
    </Link>
  );
}
```

### 4.7 Full Player

**Fichier : `components/spotify/player/FullPlayer.tsx`**

```typescript
'use client';

import Image from 'next/image';
import { ChevronDown, MoreVertical, Heart, Shuffle, SkipBack, Play, Pause, SkipForward, Repeat } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function FullPlayer() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

  // Données exemple
  const track = {
    title: 'Titre de la chanson',
    artist: 'Nom de l\'artiste',
    image: '/album-cover.jpg',
    currentTime: 145, // secondes
    duration: 230, // secondes
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (track.currentTime / track.duration) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#5f3864] via-[#1e1e1e] to-[#121212] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => router.back()}>
          <ChevronDown className="w-7 h-7" />
        </button>
        <div className="text-center flex-1">
          <p className="text-xs text-[#B3B3B3]">LECTURE DEPUIS PLAYLIST</p>
          <p className="text-sm font-medium">Nom de la playlist</p>
        </div>
        <button>
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Image Album */}
      <div className="flex-1 flex items-center justify-center px-8 py-8">
        <div className="relative w-full aspect-square max-w-md rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={track.image}
            alt={track.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Infos chanson */}
      <div className="px-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate">
              {track.title}
            </h1>
            <p className="text-base text-[#B3B3B3] truncate">
              {track.artist}
            </p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="mt-1"
          >
            <Heart
              className={`w-7 h-7 ${
                isLiked ? 'fill-[#1DB954] text-[#1DB954]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="px-6 pb-4">
        <div className="relative h-1 bg-white/20 rounded-full">
          <div
            className="absolute h-full bg-white rounded-full"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute w-3 h-3 bg-white rounded-full top-1/2 -translate-y-1/2"
            style={{ left: `${progress}%`, marginLeft: '-6px' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-[#B3B3B3]">
          <span>{formatTime(track.currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Contrôles */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={isShuffled ? 'text-[#1DB954]' : ''}
          >
            <Shuffle className="w-6 h-6" />
          </button>

          <button>
            <SkipBack className="w-8 h-8" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-black fill-black" />
            ) : (
              <Play className="w-8 h-8 text-black fill-black ml-1" />
            )}
          </button>

          <button>
            <SkipForward className="w-8 h-8" />
          </button>

          <button
            onClick={() => {
              const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
              const currentIndex = modes.indexOf(repeatMode);
              setRepeatMode(modes[(currentIndex + 1) % 3]);
            }}
            className={repeatMode !== 'off' ? 'text-[#1DB954]' : ''}
          >
            <Repeat className="w-6 h-6" />
            {repeatMode === 'one' && (
              <span className="absolute -mt-1 ml-2 text-xs">1</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎭 5. ANIMATIONS ET INTERACTIONS

### 5.1 Animations de Transition

```typescript
// Dans votre fichier de configuration Tailwind ou CSS global

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

.animate-scale-in {
  animation: scaleIn 0.2s ease-out;
}
```

### 5.2 Effets de Scroll

**Header avec effet de blur/opacité au scroll :**

```typescript
'use client';

import { useEffect, useState } from 'react';

export function TopBar() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.min(scrollY / 200, 1);
  const blur = Math.min(scrollY / 50, 10);

  return (
    <header
      className="sticky top-0 z-40 px-4 py-3 transition-all"
      style={{
        backgroundColor: `rgba(18, 18, 18, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
      }}
    >
      {/* Contenu du header */}
    </header>
  );
}
```

### 5.3 Interactions Tactiles

```typescript
// Hook pour gérer les swipes
export function useSwipe(onSwipeLeft?: () => void, onSwipeRight?: () => void) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
```

---

## 📦 6. STATE MANAGEMENT

### 6.1 Store Zustand pour le Player

**Fichier : `lib/stores/playerStore.ts`**

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  image: string;
  duration: number;
  url: string;
}

interface PlayerState {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';
  
  // Actions
  setCurrentTrack: (track: Track) => void;
  setPlaylist: (tracks: Track[]) => void;
  togglePlay: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  setRepeatMode: (mode: 'off' | 'all' | 'one') => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      playlist: [],
      isPlaying: false,
      currentTime: 0,
      volume: 80,
      isShuffled: false,
      repeatMode: 'off',

      setCurrentTrack: (track) => set({ currentTrack: track }),
      
      setPlaylist: (tracks) => set({ playlist: tracks }),
      
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      
      setCurrentTime: (time) => set({ currentTime: time }),
      
      setVolume: (volume) => set({ volume }),
      
      toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),
      
      setRepeatMode: (mode) => set({ repeatMode: mode }),
      
      nextTrack: () => {
        const { playlist, currentTrack, repeatMode, isShuffled } = get();
        if (!currentTrack || playlist.length === 0) return;

        const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
        
        if (repeatMode === 'one') {
          // Rejouer la même chanson
          set({ currentTime: 0 });
          return;
        }

        let nextIndex: number;
        
        if (isShuffled) {
          // Mode aléatoire
          nextIndex = Math.floor(Math.random() * playlist.length);
        } else {
          // Mode normal
          nextIndex = currentIndex + 1;
          
          if (nextIndex >= playlist.length) {
            if (repeatMode === 'all') {
              nextIndex = 0;
            } else {
              // Fin de playlist
              set({ isPlaying: false });
              return;
            }
          }
        }

        set({ 
          currentTrack: playlist[nextIndex],
          currentTime: 0,
        });
      },
      
      previousTrack: () => {
        const { playlist, currentTrack, currentTime } = get();
        if (!currentTrack || playlist.length === 0) return;

        // Si on est à plus de 3 secondes, recommencer la chanson
        if (currentTime > 3) {
          set({ currentTime: 0 });
          return;
        }

        const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
        const previousIndex = currentIndex - 1;

        if (previousIndex < 0) {
          // Aller à la dernière chanson
          set({ 
            currentTrack: playlist[playlist.length - 1],
            currentTime: 0,
          });
        } else {
          set({ 
            currentTrack: playlist[previousIndex],
            currentTime: 0,
          });
        }
      },
    }),
    {
      name: 'spotify-player-storage',
    }
  )
);
```

### 6.2 Hook Custom pour le Player

**Fichier : `hooks/usePlayer.ts`**

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/lib/stores/playerStore';

export function usePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    setCurrentTime,
    togglePlay,
    nextTrack,
  } = usePlayerStore();

  // Initialiser l'élément audio
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    audioRef.current = new Audio();
    
    // Event listeners
    const audio = audioRef.current;
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      nextTrack();
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Changer la source quand la chanson change
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    
    audioRef.current.src = currentTrack.url;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  // Gérer play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Gérer le volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  return {
    currentTrack,
    isPlaying,
    currentTime,
    togglePlay,
  };
}
```

---

## 🎨 7. STYLES GLOBAUX

### 7.1 Configuration Tailwind

**Fichier : `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          'green-dark': '#1aa34a',
          'green-light': '#1ed760',
          black: '#121212',
          'black-base': '#000000',
          'gray-dark': '#181818',
          'gray-medium': '#282828',
          'gray-light': '#B3B3B3',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-circular)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 7.2 CSS Global

**Fichier : `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Variables CSS Spotify */
:root {
  --spotify-green: #1DB954;
  --spotify-green-dark: #1aa34a;
  --spotify-green-light: #1ed760;
  --bg-base: #121212;
  --bg-elevated: #181818;
  --bg-highlight: #282828;
  --bg-press: #3E3E3E;
  --text-base: #FFFFFF;
  --text-subdued: #B3B3B3;
}

/* Scrollbar personnalisé */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Désactiver le highlight bleu sur mobile */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations personnalisées */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## 📱 8. OPTIMISATIONS MOBILE

### 8.1 Meta Tags et Viewport

**Fichier : `app/layout.tsx`**

```typescript
export const metadata = {
  title: 'Spotify Mobile',
  description: 'Clone Spotify Mobile',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#121212',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Spotify',
  },
};
```

### 8.2 Gestes et Touch

```typescript
// Composant avec support des gestes
'use client';

import { useSwipe } from '@/hooks/useSwipe';

export function SwipeableCard() {
  const swipeHandlers = useSwipe(
    () => console.log('Swipe left'),
    () => console.log('Swipe right')
  );

  return (
    <div
      {...swipeHandlers}
      className="touch-pan-y"
    >
      {/* Contenu */}
    </div>
  );
}
```

### 8.3 Performance

**Lazy Loading des images :**

```typescript
import Image from 'next/image';

<Image
  src="/album.jpg"
  alt="Album"
  width={300}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

**Virtualization pour longues listes :**

```bash
npm install @tanstack/react-virtual
```

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function VirtualizedList({ items }: { items: any[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
  });

  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {/* Contenu de l'item */}
            {items[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🚀 9. ÉTAPES DE MISE EN ŒUVRE

### Phase 1 : Configuration de base (1-2h)

1. ✅ Créer la structure de dossiers
2. ✅ Configurer Tailwind avec les couleurs Spotify
3. ✅ Installer les dépendances (Zustand, Lucide, etc.)
4. ✅ Créer les variables CSS et styles globaux

### Phase 2 : Layout et navigation (2-3h)

5. ✅ Implémenter BottomNav
6. ✅ Créer le TopBar avec effet de scroll
7. ✅ Mettre en place le layout principal avec padding
8. ✅ Ajouter les routes de base (/, /search, /library, /profile)

### Phase 3 : Page d'accueil (3-4h)

9. ✅ Créer RecentShortcuts (grille 2x3)
10. ✅ Implémenter PlaylistSection avec scroll horizontal
11. ✅ Créer PlaylistCard avec styles Spotify
12. ✅ Ajouter les animations de chargement (skeleton)

### Phase 4 : Page Recherche (2-3h)

13. ✅ Implémenter SearchBar sticky
14. ✅ Créer CategoryGrid (2 colonnes)
15. ✅ Implémenter CategoryCard avec couleurs dynamiques
16. ✅ Ajouter la logique de recherche

### Phase 5 : Page Bibliothèque (2-3h)

17. ✅ Créer LibraryFilters
18. ✅ Implémenter LibraryItem
19. ✅ Ajouter le tri et les filtres
20. ✅ Gérer l'état vide

### Phase 6 : Player (4-5h)

21. ✅ Implémenter MiniPlayer avec barre de progression
22. ✅ Créer FullPlayer avec tous les contrôles
23. ✅ Ajouter les animations de transition
24. ✅ Implémenter le store Zustand
25. ✅ Créer le hook usePlayer avec HTMLAudioElement

### Phase 7 : Fonctionnalités avancées (3-4h)

26. ✅ Ajouter les gestes de swipe
27. ✅ Implémenter le système de favoris
28. ✅ Créer les playlists dynamiques
29. ✅ Ajouter la gestion de la queue

### Phase 8 : Optimisations (2-3h)

30. ✅ Optimiser les images avec Next.js Image
31. ✅ Ajouter le lazy loading
32. ✅ Implémenter la virtualisation pour les longues listes
33. ✅ Optimiser les performances

### Phase 9 : Polish et détails (2-3h)

34. ✅ Ajouter les micro-interactions
35. ✅ Peaufiner les animations
36. ✅ Tester sur différents devices
37. ✅ Corriger les bugs visuels

---

## 🎯 10. CHECKLIST FINALE

### Design

- [ ] Palette de couleurs Spotify respectée
- [ ] Typographie similaire (Circular Std ou alternative)
- [ ] Espacements cohérents (8px, 12px, 16px, 24px)
- [ ] Border radius cohérents (4px, 8px, 12px)
- [ ] Ombres subtiles sur les cartes
- [ ] Dégradés de couleur sur les headers

### Navigation

- [ ] Bottom nav avec 4-5 onglets
- [ ] Indicateur visuel de l'onglet actif (vert Spotify)
- [ ] Transitions fluides entre pages
- [ ] Top bar avec effet de scroll
- [ ] Breadcrumbs si nécessaire

### Page d'accueil

- [ ] Message de salutation dynamique
- [ ] Grille de raccourcis récents (2x3)
- [ ] Sections de playlists avec scroll horizontal
- [ ] Cartes avec images carrées
- [ ] Skeleton loading pendant le chargement

### Page Recherche

- [ ] Barre de recherche sticky
- [ ] Grille de catégories colorées (2 colonnes)
- [ ] Images inclinées sur les catégories
- [ ] Résultats de recherche avec filtres

### Page Bibliothèque

- [ ] Filtres en haut (Playlists, Albums, etc.)
- [ ] Liste avec images + infos
- [ ] Tri (récent, alphabétique, etc.)
- [ ] État vide si pas de contenu

### Player

- [ ] Mini player fixe au-dessus de la bottom nav
- [ ] Barre de progression visible
- [ ] Image + titre + artiste
- [ ] Contrôles basiques (play/pause, like)
- [ ] Full player avec transition fluide
- [ ] Tous les contrôles (shuffle, repeat, skip)
- [ ] Barre de progression interactive
- [ ] Image en plein écran avec dégradé

### Interactions

- [ ] Animations au clic/tap
- [ ] Feedback visuel immédiat
- [ ] Gestes de swipe (si applicable)
- [ ] Transitions de page fluides
- [ ] Pas de lag perceptible

### Performance

- [ ] Images optimisées
- [ ] Lazy loading
- [ ] Pas de re-renders inutiles
- [ ] Smooth scroll
- [ ] Temps de chargement < 2s

### Responsive

- [ ] Adapté aux petits écrans (320px+)
- [ ] Adapté aux écrans moyens (375px+)
- [ ] Adapté aux grands écrans (428px+)
- [ ] Safe areas respectées (notch iOS)
- [ ] Touch targets suffisamment grands (44px+)

---

## 📚 11. RESSOURCES COMPLÉMENTAIRES

### Fonts

- **Circular Std** (officiel Spotify, payant)
- **Gotham Rounded** (alternative gratuite)
- **Proxima Nova** (alternative)

### Icônes

- Lucide React : https://lucide.dev/
- React Icons : https://react-icons.github.io/react-icons/

### State Management

- Zustand : https://docs.pmnd.rs/zustand/getting-started/introduction
- Jotai : https://jotai.org/

### Animations

- Framer Motion : https://www.framer.com/motion/
- React Spring : https://www.react-spring.dev/

### Audio

- Howler.js : https://howlerjs.com/
- Web Audio API : https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

## 🔍 12. DÉTAILS TECHNIQUES SUPPLÉMENTAIRES

### 12.1 Gestion du dégradé dynamique

```typescript
// Extraire la couleur dominante d'une image
import { getPalette } from 'color-thief-react';

export function useImageColor(imageUrl: string) {
  const [color, setColor] = useState('#1e3264');

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    
    img.onload = () => {
      // Logique pour extraire la couleur
      const palette = getPalette(img, 5);
      setColor(palette[0]);
    };
  }, [imageUrl]);

  return color;
}
```

### 12.2 Gestion du cache

```typescript
// Utiliser SWR ou React Query pour le cache
import useSWR from 'swr';

export function usePlaylist(id: string) {
  const { data, error, isLoading } = useSWR(
    `/api/playlists/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    playlist: data,
    isLoading,
    isError: error,
  };
}
```

### 12.3 PWA Configuration

**Fichier : `next.config.js`**

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // votre config Next.js
});
```

**Fichier : `public/manifest.json`**

```json
{
  "name": "Spotify Mobile Clone",
  "short_name": "Spotify",
  "description": "Clone de l'application mobile Spotify",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#121212",
  "theme_color": "#121212",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## ✅ CONCLUSION

Ce guide vous fournit toutes les informations nécessaires pour reproduire fidèlement l'interface mobile de Spotify. L'implémentation complète devrait prendre environ **20-30 heures** selon votre niveau d'expérience.

**Ordre de priorité recommandé :**

1. **Structure et navigation** (Bottom nav + routes)
2. **Page d'accueil** (base de l'expérience)
3. **Player** (fonctionnalité centrale)
4. **Recherche** (découvrabilité)
5. **Bibliothèque** (organisation)
6. **Optimisations** (polish final)

**Points critiques à ne pas négliger :**

- Les **performances** (images optimisées, lazy loading)
- Les **animations** (transitions fluides)
- Le **state management** (Zustand pour le player)
- Les **touch interactions** (gestes mobiles)
- Le **responsive design** (différentes tailles d'écran)

Bonne implémentation ! 🎵
