// Données de test pour la page Guide Beauté

export interface GuideArticle {
  id: string
  title: string
  description: string
  content: string
  image: string
  category: string
  subcategory: string
  author: string
  publishDate: string
  readTime: number
  difficulty: 'débutant' | 'intermédiaire' | 'avancé'
  tags: string[]
  isFeatured: boolean
  isPopular: boolean
  views: number
  likes: number
  relatedProducts: string[]
  steps?: GuideStep[]
  tips?: string[]
  warnings?: string[]
}

export interface GuideStep {
  id: string
  title: string
  description: string
  image?: string
  order: number
}

export const guideArticles: GuideArticle[] = [
  {
    id: '1',
    title: 'Routine Soin Visage Complète',
    description: 'Apprenez à créer une routine de soin visage adaptée à votre type de peau avec nos conseils d\'experts.',
    content: 'Une routine de soin visage efficace commence par le nettoyage, suivi de l\'hydratation et de la protection solaire...',
    image: '/guides/routine-soin-visage.jpg',
    category: 'soin-visage',
    subcategory: 'routine',
    author: 'Dr. Marie Dubois',
    publishDate: '2024-02-01',
    readTime: 8,
    difficulty: 'débutant',
    tags: ['routine', 'soin visage', 'débutant', 'conseils'],
    isFeatured: true,
    isPopular: true,
    views: 15420,
    likes: 892,
    relatedProducts: ['1', '2', '3'],
    steps: [
      {
        id: '1',
        title: 'Nettoyage',
        description: 'Commencez par nettoyer votre visage avec un produit adapté à votre type de peau.',
        order: 1
      },
      {
        id: '2',
        title: 'Tonification',
        description: 'Appliquez un tonique pour équilibrer le pH de votre peau.',
        order: 2
      },
      {
        id: '3',
        title: 'Hydratation',
        description: 'Hydratez votre peau avec une crème adaptée à votre type de peau.',
        order: 3
      },
      {
        id: '4',
        title: 'Protection Solaire',
        description: 'Protégez votre peau des rayons UV avec une crème solaire.',
        order: 4
      }
    ],
    tips: [
      'Choisissez des produits adaptés à votre type de peau',
      'Appliquez les produits du plus léger au plus épais',
      'N\'oubliez pas le cou et le décolleté'
    ],
    warnings: [
      'Testez toujours un nouveau produit sur une petite zone',
      'Évitez les produits trop agressifs pour les peaux sensibles'
    ]
  },
  {
    id: '2',
    title: 'Maquillage de Jour Naturel',
    description: 'Découvrez comment créer un maquillage de jour naturel et lumineux en quelques étapes simples.',
    content: 'Un maquillage de jour réussi commence par une base bien préparée...',
    image: '/guides/maquillage-jour-naturel.jpg',
    category: 'maquillage',
    subcategory: 'tutoriel',
    author: 'Sophie Martin',
    publishDate: '2024-01-28',
    readTime: 12,
    difficulty: 'intermédiaire',
    tags: ['maquillage', 'jour', 'naturel', 'tutoriel'],
    isFeatured: true,
    isPopular: true,
    views: 12850,
    likes: 756,
    relatedProducts: ['4', '5', '6'],
    steps: [
      {
        id: '1',
        title: 'Préparation de la Peau',
        description: 'Nettoyez et hydratez votre visage avant d\'appliquer le maquillage.',
        order: 1
      },
      {
        id: '2',
        title: 'Base de Maquillage',
        description: 'Appliquez une base de maquillage ou un fond de teint léger.',
        order: 2
      },
      {
        id: '3',
        title: 'Correcteur',
        description: 'Masquez les imperfections avec un correcteur.',
        order: 3
      },
      {
        id: '4',
        title: 'Poudre',
        description: 'Fixez le maquillage avec une poudre translucide.',
        order: 4
      },
      {
        id: '5',
        title: 'Fard à Paupières',
        description: 'Appliquez un fard à paupières neutre pour éclaircir le regard.',
        order: 5
      },
      {
        id: '6',
        title: 'Mascara',
        description: 'Appliquez du mascara pour allonger et épaissir les cils.',
        order: 6
      },
      {
        id: '7',
        title: 'Rouge à Lèvres',
        description: 'Terminez avec un rouge à lèvres ou un baume à lèvres.',
        order: 7
      }
    ],
    tips: [
      'Choisissez des couleurs proches de votre teint naturel',
      'Appliquez le maquillage en couches fines',
      'N\'oubliez pas de bien mélanger les produits'
    ],
    warnings: [
      'Évitez les couleurs trop vives pour un look de jour',
      'Vérifiez que votre maquillage est bien fixé avant de sortir'
    ]
  },
  {
    id: '3',
    title: 'Soins Cheveux Bio',
    description: 'Découvrez les bienfaits des soins cheveux bio et comment les intégrer dans votre routine.',
    content: 'Les soins cheveux bio offrent de nombreux avantages pour la santé de vos cheveux...',
    image: '/guides/soins-cheveux-bio.jpg',
    category: 'cheveux',
    subcategory: 'soins',
    author: 'Emma Rousseau',
    publishDate: '2024-01-25',
    readTime: 10,
    difficulty: 'débutant',
    tags: ['cheveux', 'bio', 'naturel', 'soins'],
    isFeatured: false,
    isPopular: true,
    views: 9850,
    likes: 543,
    relatedProducts: ['7', '8', '9'],
    steps: [
      {
        id: '1',
        title: 'Shampooing Bio',
        description: 'Utilisez un shampooing bio doux pour nettoyer vos cheveux.',
        order: 1
      },
      {
        id: '2',
        title: 'Après-Shampooing',
        description: 'Appliquez un après-shampooing bio pour démêler et nourrir.',
        order: 2
      },
      {
        id: '3',
        title: 'Masque Capillaire',
        description: 'Utilisez un masque capillaire bio une fois par semaine.',
        order: 3
      },
      {
        id: '4',
        title: 'Séchage Naturel',
        description: 'Préférez le séchage naturel au sèche-cheveux.',
        order: 4
      }
    ],
    tips: [
      'Choisissez des produits certifiés bio',
      'Évitez les produits contenant des sulfates',
      'Laissez vos cheveux sécher naturellement quand c\'est possible'
    ],
    warnings: [
      'Les produits bio peuvent avoir une mousse différente',
      'Il faut parfois du temps pour s\'habituer aux nouveaux produits'
    ]
  },
  {
    id: '4',
    title: 'Protection Solaire pour Enfants',
    description: 'Apprenez à protéger efficacement la peau sensible de vos enfants du soleil.',
    content: 'La protection solaire est essentielle pour les enfants dont la peau est plus sensible...',
    image: '/guides/protection-solaire-enfants.jpg',
    category: 'bebe-enfant',
    subcategory: 'protection',
    author: 'Dr. Pierre Moreau',
    publishDate: '2024-01-20',
    readTime: 6,
    difficulty: 'débutant',
    tags: ['enfants', 'protection solaire', 'santé', 'conseils'],
    isFeatured: true,
    isPopular: false,
    views: 7200,
    likes: 421,
    relatedProducts: ['10', '11', '12'],
    steps: [
      {
        id: '1',
        title: 'Choix de la Crème Solaire',
        description: 'Choisissez une crème solaire SPF 50+ spécialement formulée pour enfants.',
        order: 1
      },
      {
        id: '2',
        title: 'Application',
        description: 'Appliquez généreusement la crème solaire 30 minutes avant l\'exposition.',
        order: 2
      },
      {
        id: '3',
        title: 'Renouvellement',
        description: 'Renouvelez l\'application toutes les 2 heures et après chaque baignade.',
        order: 3
      },
      {
        id: '4',
        title: 'Protection Complémentaire',
        description: 'Utilisez des vêtements de protection et un chapeau.',
        order: 4
      }
    ],
    tips: [
      'Évitez l\'exposition au soleil entre 11h et 16h',
      'Choisissez des produits résistants à l\'eau',
      'Appliquez la crème même par temps nuageux'
    ],
    warnings: [
      'Ne laissez jamais un enfant seul au soleil',
      'Consultez un médecin en cas de coup de soleil'
    ]
  },
  {
    id: '5',
    title: 'Routine Anti-Âge Avancée',
    description: 'Découvrez une routine anti-âge complète pour préserver la jeunesse de votre peau.',
    content: 'Une routine anti-âge efficace combine plusieurs actifs puissants...',
    image: '/guides/routine-anti-age.jpg',
    category: 'soin-visage',
    subcategory: 'anti-age',
    author: 'Dr. Claire Lefebvre',
    publishDate: '2024-01-15',
    readTime: 15,
    difficulty: 'avancé',
    tags: ['anti-âge', 'routine', 'peau mature', 'actifs'],
    isFeatured: false,
    isPopular: true,
    views: 11200,
    likes: 678,
    relatedProducts: ['13', '14', '15'],
    steps: [
      {
        id: '1',
        title: 'Nettoyage Doux',
        description: 'Utilisez un nettoyant doux pour ne pas agresser la peau mature.',
        order: 1
      },
      {
        id: '2',
        title: 'Sérum Anti-Âge',
        description: 'Appliquez un sérum contenant des actifs anti-âge comme la vitamine C.',
        order: 2
      },
      {
        id: '3',
        title: 'Crème Anti-Âge',
        description: 'Utilisez une crème anti-âge riche en actifs régénérants.',
        order: 3
      },
      {
        id: '4',
        title: 'Protection Solaire',
        description: 'Protégez votre peau des rayons UV avec une crème solaire.',
        order: 4
      },
      {
        id: '5',
        title: 'Soins Ciblés',
        description: 'Appliquez des soins ciblés pour les zones sensibles.',
        order: 5
      }
    ],
    tips: [
      'Commencez tôt la prévention anti-âge',
      'Utilisez des actifs puissants comme la vitamine C et l\'acide hyaluronique',
      'Protégez votre peau du soleil quotidiennement'
    ],
    warnings: [
      'Introduisez les nouveaux actifs progressivement',
      'Consultez un dermatologue pour des soins plus intensifs'
    ]
  }
]

export const guideCategories = [
  {
    id: 'all',
    name: 'Tous les guides',
    count: guideArticles.length,
    icon: '📚'
  },
  {
    id: 'soin-visage',
    name: 'Soin du Visage',
    count: guideArticles.filter(a => a.category === 'soin-visage').length,
    icon: '🧴'
  },
  {
    id: 'maquillage',
    name: 'Maquillage',
    count: guideArticles.filter(a => a.category === 'maquillage').length,
    icon: '💄'
  },
  {
    id: 'cheveux',
    name: 'Cheveux',
    count: guideArticles.filter(a => a.category === 'cheveux').length,
    icon: '💇'
  },
  {
    id: 'bebe-enfant',
    name: 'Bébé & Enfant',
    count: guideArticles.filter(a => a.category === 'bebe-enfant').length,
    icon: '👶'
  },
  {
    id: 'parfumerie',
    name: 'Parfumerie',
    count: guideArticles.filter(a => a.category === 'parfumerie').length,
    icon: '🌸'
  },
  {
    id: 'corps-bain',
    name: 'Corps & Bain',
    count: guideArticles.filter(a => a.category === 'corps-bain').length,
    icon: '🛁'
  }
]

export const difficultyLevels = [
  { id: 'all', name: 'Tous les niveaux', count: guideArticles.length },
  { id: 'debutant', name: 'Débutant', count: guideArticles.filter(a => a.difficulty === 'débutant').length },
  { id: 'intermediaire', name: 'Intermédiaire', count: guideArticles.filter(a => a.difficulty === 'intermédiaire').length },
  { id: 'avance', name: 'Avancé', count: guideArticles.filter(a => a.difficulty === 'avancé').length }
]

export const popularTags = [
  { id: 'routine', name: 'Routine', count: guideArticles.filter(a => a.tags.includes('routine')).length },
  { id: 'tutoriel', name: 'Tutoriel', count: guideArticles.filter(a => a.tags.includes('tutoriel')).length },
  { id: 'conseils', name: 'Conseils', count: guideArticles.filter(a => a.tags.includes('conseils')).length },
  { id: 'bio', name: 'Bio', count: guideArticles.filter(a => a.tags.includes('bio')).length },
  { id: 'naturel', name: 'Naturel', count: guideArticles.filter(a => a.tags.includes('naturel')).length },
  { id: 'anti-age', name: 'Anti-âge', count: guideArticles.filter(a => a.tags.includes('anti-âge')).length }
]
