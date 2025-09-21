// Configuration centralisée des catégories et sous-catégories

export interface SubcategoryConfig {
  id: string
  name: string
  description: string
  slug: string
  icon: string
  productCount: number
  featured: boolean
  filters?: {
    brands?: string[]
    priceRanges?: { min: number; max: number; label: string }[]
    skinTypes?: string[]
    textures?: string[]
    ingredients?: string[]
    concerns?: string[]
  }
}

export interface CategoryConfig {
  id: string
  name: string
  description: string
  icon: string
  color: string
  subcategories: SubcategoryConfig[]
  totalProducts: number
  featured: boolean
}

export const categoriesConfig: CategoryConfig[] = [
  {
    id: 'soin-du-visage',
    name: 'Soin du visage',
    description: 'Tous les soins pour votre visage',
    icon: '✨',
    color: 'text-blue-500',
    totalProducts: 197,
    featured: true,
    subcategories: [
      {
        id: 'nettoyage',
        name: 'Nettoyage',
        description: 'Gels, mousses et eaux micellaires pour nettoyer votre peau en douceur',
        slug: 'nettoyage',
        icon: '🧼',
        productCount: 45,
        featured: true,
        filters: {
          brands: ['CeraVe', 'La Roche-Posay', 'Avène', 'Bioderma', 'Vichy'],
          priceRanges: [
            { min: 0, max: 1500, label: 'Moins de 15€' },
            { min: 1500, max: 3000, label: '15€ - 30€' },
            { min: 3000, max: 5000, label: '30€ - 50€' },
            { min: 5000, max: 10000, label: 'Plus de 50€' }
          ],
          skinTypes: ['Peau normale', 'Peau sèche', 'Peau grasse', 'Peau mixte', 'Peau sensible'],
          textures: ['Gel', 'Mousse', 'Crème', 'Eau micellaire', 'Huile'],
          ingredients: ['Acide salicylique', 'Niacinamide', 'Céramides', 'Acide hyaluronique', 'Eau thermale']
        }
      },
      {
        id: 'hydratation',
        name: 'Hydratation',
        description: 'Crèmes et sérums hydratants pour une peau éclatante',
        slug: 'hydratation',
        icon: '💧',
        productCount: 67,
        featured: true,
        filters: {
          brands: ['The Ordinary', 'Laneige', 'CeraVe', 'La Roche-Posay', 'Avène'],
          priceRanges: [
            { min: 0, max: 2000, label: 'Moins de 20€' },
            { min: 2000, max: 4000, label: '20€ - 40€' },
            { min: 4000, max: 6000, label: '40€ - 60€' },
            { min: 6000, max: 12000, label: 'Plus de 60€' }
          ],
          skinTypes: ['Peau normale', 'Peau sèche', 'Peau grasse', 'Peau mixte', 'Peau sensible'],
          textures: ['Crème', 'Sérum', 'Gel', 'Lotion', 'Essence'],
          ingredients: ['Acide hyaluronique', 'Céramides', 'Glycérine', 'Aloe vera', 'Vitamine E']
        }
      },
      {
        id: 'anti-age',
        name: 'Anti-âge',
        description: 'Soins anti-rides et fermeté pour préserver votre jeunesse',
        slug: 'anti-age',
        icon: '⏰',
        productCount: 34,
        featured: true,
        filters: {
          brands: ['L\'Oréal', 'Vichy', 'La Roche-Posay', 'Avène', 'Bioderma'],
          priceRanges: [
            { min: 0, max: 3000, label: 'Moins de 30€' },
            { min: 3000, max: 6000, label: '30€ - 60€' },
            { min: 6000, max: 10000, label: '60€ - 100€' },
            { min: 10000, max: 20000, label: 'Plus de 100€' }
          ],
          skinTypes: ['Peau normale', 'Peau sèche', 'Peau mixte', 'Peau mature'],
          textures: ['Crème', 'Sérum', 'Masque', 'Huile'],
          ingredients: ['Rétinol', 'Acide hyaluronique', 'Vitamine C', 'Peptides', 'Collagène']
        }
      },
      {
        id: 'masques',
        name: 'Masques',
        description: 'Masques visage et traitements pour des soins intensifs',
        slug: 'masques',
        icon: '🎭',
        productCount: 28,
        featured: false,
        filters: {
          brands: ['Laneige', 'The Ordinary', 'Avène', 'La Roche-Posay', 'Bioderma'],
          priceRanges: [
            { min: 0, max: 2000, label: 'Moins de 20€' },
            { min: 2000, max: 4000, label: '20€ - 40€' },
            { min: 4000, max: 8000, label: 'Plus de 40€' }
          ],
          skinTypes: ['Peau normale', 'Peau sèche', 'Peau grasse', 'Peau mixte', 'Peau sensible'],
          textures: ['Masque en tissu', 'Masque en crème', 'Masque en gel', 'Masque en poudre'],
          ingredients: ['Argile', 'Acide hyaluronique', 'Charbon', 'Aloe vera', 'Vitamine C']
        }
      },
      {
        id: 'protection-solaire',
        name: 'Protection solaire',
        description: 'Crèmes et sprays solaires pour protéger votre peau',
        slug: 'protection-solaire',
        icon: '☀️',
        productCount: 23,
        featured: false,
        filters: {
          brands: ['La Roche-Posay', 'Vichy', 'Avène', 'Bioderma', 'Eucerin'],
          priceRanges: [
            { min: 0, max: 2000, label: 'Moins de 20€' },
            { min: 2000, max: 4000, label: '20€ - 40€' },
            { min: 4000, max: 8000, label: 'Plus de 40€' }
          ],
          skinTypes: ['Peau normale', 'Peau sèche', 'Peau grasse', 'Peau mixte', 'Peau sensible'],
          textures: ['Crème', 'Spray', 'Gel', 'Lotion'],
          ingredients: ['SPF 30', 'SPF 50', 'SPF 50+', 'Filtres minéraux', 'Filtres chimiques']
        }
      }
    ]
  },
  {
    id: 'maquillage',
    name: 'Maquillage',
    description: 'Tous les produits de maquillage',
    icon: '💄',
    color: 'text-pink-500',
    totalProducts: 268,
    featured: true,
    subcategories: [
      {
        id: 'fond-de-teint',
        name: 'Fond de teint',
        description: 'Bases, fonds de teint et correcteurs pour un teint parfait',
        slug: 'fond-de-teint',
        icon: '🎨',
        productCount: 56,
        featured: true,
        filters: {
          brands: ['L\'Oréal', 'Maybelline', 'MAC', 'Revlon', 'Fenty Beauty'],
          priceRanges: [
            { min: 0, max: 2000, label: 'Moins de 20€' },
            { min: 2000, max: 4000, label: '20€ - 40€' },
            { min: 4000, max: 8000, label: '40€ - 80€' },
            { min: 8000, max: 15000, label: 'Plus de 80€' }
          ],
          skinTypes: ['Peau normale', 'Peau sèche', 'Peau grasse', 'Peau mixte'],
          textures: ['Liquide', 'Crème', 'Poudre', 'Stick', 'Mousse'],
          ingredients: ['Matifiant', 'Hydratant', 'Lumineux', 'Couverture moyenne', 'Couverture forte']
        }
      },
      {
        id: 'rouge-a-levres',
        name: 'Rouge à lèvres',
        description: 'Rouges à lèvres et gloss pour sublimer vos lèvres',
        slug: 'rouge-a-levres',
        icon: '💋',
        productCount: 89,
        featured: true,
        filters: {
          brands: ['MAC', 'Maybelline', 'L\'Oréal', 'Revlon', 'Fenty Beauty'],
          priceRanges: [
            { min: 0, max: 1500, label: 'Moins de 15€' },
            { min: 1500, max: 3000, label: '15€ - 30€' },
            { min: 3000, max: 6000, label: '30€ - 60€' },
            { min: 6000, max: 12000, label: 'Plus de 60€' }
          ],
          skinTypes: ['Tous types de peau'],
          textures: ['Mat', 'Brillant', 'Satiné', 'Gloss', 'Liquide'],
          ingredients: ['Hydratant', 'Longue tenue', 'Pigmenté', 'Nourrissant', 'Résistant']
        }
      },
      {
        id: 'yeux',
        name: 'Maquillage des yeux',
        description: 'Fards, mascaras et eyeliners pour des yeux magnifiques',
        slug: 'yeux',
        icon: '👁️',
        productCount: 78,
        featured: true,
        filters: {
          brands: ['Maybelline', 'L\'Oréal', 'MAC', 'Revlon', 'Urban Decay'],
          priceRanges: [
            { min: 0, max: 1500, label: 'Moins de 15€' },
            { min: 1500, max: 3000, label: '15€ - 30€' },
            { min: 3000, max: 6000, label: '30€ - 60€' },
            { min: 6000, max: 12000, label: 'Plus de 60€' }
          ],
          skinTypes: ['Tous types de peau'],
          textures: ['Poudre', 'Crème', 'Liquide', 'Gel', 'Crayon'],
          ingredients: ['Waterproof', 'Longue tenue', 'Pigmenté', 'Hypoallergénique', 'Résistant']
        }
      },
      {
        id: 'ongles',
        name: 'Ongles',
        description: 'Vernis et soins des ongles pour des mains parfaites',
        slug: 'ongles',
        icon: '💅',
        productCount: 45,
        featured: false,
        filters: {
          brands: ['Maybelline', 'L\'Oréal', 'Revlon', 'OPI', 'Essie'],
          priceRanges: [
            { min: 0, max: 1000, label: 'Moins de 10€' },
            { min: 1000, max: 2000, label: '10€ - 20€' },
            { min: 2000, max: 4000, label: 'Plus de 20€' }
          ],
          skinTypes: ['Tous types de peau'],
          textures: ['Vernis', 'Gel', 'Base', 'Top coat', 'Soin'],
          ingredients: ['Longue tenue', 'Résistant', 'Brillant', 'Mat', 'Nourrissant']
        }
      }
    ]
  },
  {
    id: 'cheveux',
    name: 'Cheveux',
    description: 'Soins et produits capillaires',
    icon: '💇‍♀️',
    color: 'text-purple-500',
    totalProducts: 202,
    featured: true,
    subcategories: [
      {
        id: 'shampooings',
        name: 'Shampooings',
        description: 'Shampooings pour tous types de cheveux',
        slug: 'shampooings',
        icon: '🧴',
        productCount: 67,
        featured: true,
        filters: {
          brands: ['Klorane', 'L\'Oréal', 'Garnier', 'NIVEA', 'Bioderma'],
          priceRanges: [
            { min: 0, max: 1500, label: 'Moins de 15€' },
            { min: 1500, max: 3000, label: '15€ - 30€' },
            { min: 3000, max: 6000, label: 'Plus de 30€' }
          ],
          skinTypes: ['Cheveux normaux', 'Cheveux secs', 'Cheveux gras', 'Cheveux colorés', 'Cheveux fins'],
          textures: ['Gel', 'Crème', 'Mousse', 'Liquide'],
          ingredients: ['Sans sulfates', 'Hydratant', 'Nourrissant', 'Purifiant', 'Colorant']
        }
      },
      {
        id: 'apres-shampooings',
        name: 'Après-shampooings',
        description: 'Masques et après-shampooings pour des cheveux soyeux',
        slug: 'apres-shampooings',
        icon: '🧖‍♀️',
        productCount: 45,
        featured: true,
        filters: {
          brands: ['Klorane', 'L\'Oréal', 'Garnier', 'NIVEA', 'Bioderma'],
          priceRanges: [
            { min: 0, max: 2000, label: 'Moins de 20€' },
            { min: 2000, max: 4000, label: '20€ - 40€' },
            { min: 4000, max: 8000, label: 'Plus de 40€' }
          ],
          skinTypes: ['Cheveux normaux', 'Cheveux secs', 'Cheveux abîmés', 'Cheveux colorés', 'Cheveux fins'],
          textures: ['Crème', 'Masque', 'Lotion', 'Huile'],
          ingredients: ['Hydratant', 'Nourrissant', 'Réparateur', 'Brillant', 'Démêlant']
        }
      },
      {
        id: 'soins-styling',
        name: 'Soins & Styling',
        description: 'Produits de coiffage et soins pour styliser vos cheveux',
        slug: 'soins-styling',
        icon: '💆‍♀️',
        productCount: 56,
        featured: true,
        filters: {
          brands: ['L\'Oréal', 'Garnier', 'Klorane', 'NIVEA', 'Bioderma'],
          priceRanges: [
            { min: 0, max: 2000, label: 'Moins de 20€' },
            { min: 2000, max: 4000, label: '20€ - 40€' },
            { min: 4000, max: 8000, label: 'Plus de 40€' }
          ],
          skinTypes: ['Cheveux normaux', 'Cheveux secs', 'Cheveux fins', 'Cheveux bouclés', 'Cheveux raides'],
          textures: ['Gel', 'Mousse', 'Crème', 'Spray', 'Huile'],
          ingredients: ['Tenue', 'Brillant', 'Volume', 'Lissage', 'Boucles']
        }
      },
      {
        id: 'coloration',
        name: 'Coloration',
        description: 'Teintures et produits de coloration pour changer de look',
        slug: 'coloration',
        icon: '🎨',
        productCount: 34,
        featured: false,
        filters: {
          brands: ['L\'Oréal', 'Garnier', 'Revlon', 'NIVEA', 'Klorane'],
          priceRanges: [
            { min: 0, max: 1500, label: 'Moins de 15€' },
            { min: 1500, max: 3000, label: '15€ - 30€' },
            { min: 3000, max: 6000, label: 'Plus de 30€' }
          ],
          skinTypes: ['Cheveux normaux', 'Cheveux secs', 'Cheveux colorés', 'Cheveux blancs'],
          textures: ['Crème', 'Gel', 'Mousse', 'Poudre'],
          ingredients: ['Permanent', 'Semi-permanent', 'Décolorant', 'Soin', 'Brillant']
        }
      }
    ]
  },
  {
    id: 'corps-bain',
    name: 'Corps & Bain',
    description: 'Soins pour le corps et produits de bain',
    icon: '🛁',
    color: 'text-indigo-500',
    totalProducts: 224,
    featured: true,
    subcategories: [
      {
        id: 'gels-douche',
        name: 'Gels douche',
        description: 'Gels douche et savons pour une hygiène parfaite',
        slug: 'gels-douche',
        icon: '🧼',
        productCount: 45,
        featured: true,
        filters: {
          brands: ['NIVEA', 'L\'Oréal', 'Garnier', 'Dove', 'Sanex'],
          priceRanges: [
            { min: 0, max: 1000, label: 'Moins de 10€' },
            { min: 1000, max: 2000, label: '10€ - 20€' },
            { min: 2000, max: 4000, label: 'Plus de 20€' }
          ],
          skinTypes: ['Peau normale', 'Peau sèche', 'Peau sensible', 'Peau grasse'],
          textures: ['Gel', 'Crème', 'Mousse', 'Savon'],
          ingredients: ['Hydratant', 'Nourrissant', 'Purifiant', 'Apaisant', 'Parfumé']
        }
      },
      {
        id: 'cremes-corps',
        name: 'Crèmes corps',
        description: 'Crèmes et laits pour le corps pour une peau douce',
        slug: 'cremes-corps',
        icon: '🧴',
        productCount: 67,
        featured: true,
        filters: {
          brands: ['NIVEA', 'L\'Oréal', 'Garnier', 'Dove', 'Sanex'],
          priceRanges: [
            { min: 0, max: 1500, label: 'Moins de 15€' },
            { min: 1500, max: 3000, label: '15€ - 30€' },
            { min: 3000, max: 6000, label: 'Plus de 30€' }
          ],
          skinTypes: ['Peau normale', 'Peau sèche', 'Peau sensible', 'Peau mature'],
          textures: ['Crème', 'Lait', 'Gel', 'Huile', 'Beurre'],
          ingredients: ['Hydratant', 'Nourrissant', 'Raffermissant', 'Anti-âge', 'Apaisant']
        }
      },
      {
        id: 'parfums-corps',
        name: 'Parfums corps',
        description: 'Eaux de toilette et parfums pour le corps',
        slug: 'parfums-corps',
        icon: '🌸',
        productCount: 89,
        featured: true,
        filters: {
          brands: ['L\'Oréal', 'Garnier', 'NIVEA', 'Dove', 'Sanex'],
          priceRanges: [
            { min: 0, max: 2000, label: 'Moins de 20€' },
            { min: 2000, max: 4000, label: '20€ - 40€' },
            { min: 4000, max: 8000, label: 'Plus de 40€' }
          ],
          skinTypes: ['Tous types de peau'],
          textures: ['Eau de toilette', 'Eau de parfum', 'Spray', 'Crème'],
          ingredients: ['Frais', 'Floral', 'Boisé', 'Oriental', 'Fruité']
        }
      },
      {
        id: 'soins-mains',
        name: 'Soins des mains',
        description: 'Crèmes et soins pour des mains parfaites',
        slug: 'soins-mains',
        icon: '✋',
        productCount: 23,
        featured: false,
        filters: {
          brands: ['NIVEA', 'L\'Oréal', 'Garnier', 'Dove', 'Sanex'],
          priceRanges: [
            { min: 0, max: 1000, label: 'Moins de 10€' },
            { min: 1000, max: 2000, label: '10€ - 20€' },
            { min: 2000, max: 4000, label: 'Plus de 20€' }
          ],
          skinTypes: ['Peau normale', 'Peau sèche', 'Peau sensible'],
          textures: ['Crème', 'Gel', 'Huile', 'Baume'],
          ingredients: ['Hydratant', 'Nourrissant', 'Réparateur', 'Apaisant', 'Protecteur']
        }
      }
    ]
  },
  {
    id: 'parfumerie',
    name: 'Parfumerie',
    description: 'Parfums et eaux de toilette',
    icon: '🌸',
    color: 'text-rose-500',
    totalProducts: 202,
    featured: true,
    subcategories: [
      {
        id: 'parfums-femme',
        name: 'Parfums femme',
        description: 'Parfums et eaux de parfum pour femme',
        slug: 'parfums-femme',
        icon: '👩',
        productCount: 78,
        featured: true,
        filters: {
          brands: ['L\'Oréal', 'Garnier', 'NIVEA', 'Dove', 'Sanex'],
          priceRanges: [
            { min: 0, max: 3000, label: 'Moins de 30€' },
            { min: 3000, max: 6000, label: '30€ - 60€' },
            { min: 6000, max: 12000, label: '60€ - 120€' },
            { min: 12000, max: 25000, label: 'Plus de 120€' }
          ],
          skinTypes: ['Tous types de peau'],
          textures: ['Eau de parfum', 'Eau de toilette', 'Parfum', 'Spray'],
          ingredients: ['Floral', 'Fruité', 'Oriental', 'Boisé', 'Frais']
        }
      },
      {
        id: 'parfums-homme',
        name: 'Parfums homme',
        description: 'Parfums et eaux de toilette pour homme',
        slug: 'parfums-homme',
        icon: '👨',
        productCount: 56,
        featured: true,
        filters: {
          brands: ['L\'Oréal', 'Garnier', 'NIVEA', 'Dove', 'Sanex'],
          priceRanges: [
            { min: 0, max: 3000, label: 'Moins de 30€' },
            { min: 3000, max: 6000, label: '30€ - 60€' },
            { min: 6000, max: 12000, label: '60€ - 120€' },
            { min: 12000, max: 25000, label: 'Plus de 120€' }
          ],
          skinTypes: ['Tous types de peau'],
          textures: ['Eau de toilette', 'Eau de parfum', 'Parfum', 'Spray'],
          ingredients: ['Boisé', 'Frais', 'Oriental', 'Marin', 'Épicé']
        }
      },
      {
        id: 'eaux-de-toilette',
        name: 'Eaux de toilette',
        description: 'Eaux de toilette unisexes',
        slug: 'eaux-de-toilette',
        icon: '💧',
        productCount: 45,
        featured: true,
        filters: {
          brands: ['L\'Oréal', 'Garnier', 'NIVEA', 'Dove', 'Sanex'],
          priceRanges: [
            { min: 0, max: 2000, label: 'Moins de 20€' },
            { min: 2000, max: 4000, label: '20€ - 40€' },
            { min: 4000, max: 8000, label: 'Plus de 40€' }
          ],
          skinTypes: ['Tous types de peau'],
          textures: ['Eau de toilette', 'Spray', 'Roll-on'],
          ingredients: ['Frais', 'Floral', 'Fruité', 'Boisé', 'Citronné']
        }
      },
      {
        id: 'coffrets-parfums',
        name: 'Coffrets parfums',
        description: 'Coffrets et coffrets découverte',
        slug: 'coffrets-parfums',
        icon: '🎁',
        productCount: 23,
        featured: false,
        filters: {
          brands: ['L\'Oréal', 'Garnier', 'NIVEA', 'Dove', 'Sanex'],
          priceRanges: [
            { min: 0, max: 5000, label: 'Moins de 50€' },
            { min: 5000, max: 10000, label: '50€ - 100€' },
            { min: 10000, max: 20000, label: 'Plus de 100€' }
          ],
          skinTypes: ['Tous types de peau'],
          textures: ['Coffret', 'Découverte', 'Miniatures'],
          ingredients: ['Variété', 'Découverte', 'Cadeau', 'Voyage', 'Collection']
        }
      }
    ]
  },
  {
    id: 'bebe-enfant',
    name: 'Bébé & Enfant',
    description: 'Produits de soin pour bébés et enfants',
    icon: '👶',
    color: 'text-yellow-500',
    totalProducts: 126,
    featured: true,
    subcategories: [
      {
        id: 'soins-bebe',
        name: 'Soins bébé',
        description: 'Produits de soin pour bébés',
        slug: 'soins-bebe',
        icon: '🍼',
        productCount: 45,
        featured: true,
        filters: {
          brands: ['NIVEA', 'Dove', 'Sanex', 'Mustela', 'Weleda'],
          priceRanges: [
            { min: 0, max: 1500, label: 'Moins de 15€' },
            { min: 1500, max: 3000, label: '15€ - 30€' },
            { min: 3000, max: 6000, label: 'Plus de 30€' }
          ],
          skinTypes: ['Peau sensible', 'Peau normale', 'Peau sèche'],
          textures: ['Crème', 'Lait', 'Gel', 'Huile', 'Poudre'],
          ingredients: ['Hypoallergénique', 'Sans parfum', 'Doux', 'Nourrissant', 'Protecteur']
        }
      },
      {
        id: 'hygiene-bebe',
        name: 'Hygiène bébé',
        description: 'Produits d\'hygiène pour bébés',
        slug: 'hygiene-bebe',
        icon: '🧴',
        productCount: 34,
        featured: true,
        filters: {
          brands: ['NIVEA', 'Dove', 'Sanex', 'Mustela', 'Weleda'],
          priceRanges: [
            { min: 0, max: 1500, label: 'Moins de 15€' },
            { min: 1500, max: 3000, label: '15€ - 30€' },
            { min: 3000, max: 6000, label: 'Plus de 30€' }
          ],
          skinTypes: ['Peau sensible', 'Peau normale'],
          textures: ['Gel', 'Crème', 'Mousse', 'Lotion'],
          ingredients: ['Hypoallergénique', 'Sans larmes', 'Doux', 'Purifiant', 'Apaisant']
        }
      },
      {
        id: 'soins-enfant',
        name: 'Soins enfant',
        description: 'Produits de soin pour enfants',
        slug: 'soins-enfant',
        icon: '👧',
        productCount: 28,
        featured: true,
        filters: {
          brands: ['NIVEA', 'Dove', 'Sanex', 'Mustela', 'Weleda'],
          priceRanges: [
            { min: 0, max: 1500, label: 'Moins de 15€' },
            { min: 1500, max: 3000, label: '15€ - 30€' },
            { min: 3000, max: 6000, label: 'Plus de 30€' }
          ],
          skinTypes: ['Peau sensible', 'Peau normale', 'Peau sèche'],
          textures: ['Crème', 'Gel', 'Lotion', 'Spray'],
          ingredients: ['Hypoallergénique', 'Doux', 'Nourrissant', 'Protecteur', 'Amusant']
        }
      },
      {
        id: 'accessoires-bebe',
        name: 'Accessoires bébé',
        description: 'Accessoires et équipements bébé',
        slug: 'accessoires-bebe',
        icon: '🧸',
        productCount: 19,
        featured: false,
        filters: {
          brands: ['NIVEA', 'Dove', 'Sanex', 'Mustela', 'Weleda'],
          priceRanges: [
            { min: 0, max: 2000, label: 'Moins de 20€' },
            { min: 2000, max: 4000, label: '20€ - 40€' },
            { min: 4000, max: 8000, label: 'Plus de 40€' }
          ],
          skinTypes: ['Tous types de peau'],
          textures: ['Accessoire', 'Équipement', 'Jouet'],
          ingredients: ['Sécurisé', 'Doux', 'Pratique', 'Amusant', 'Éducatif']
        }
      }
    ]
  }
]

// Fonctions utilitaires
export function getCategoryById(id: string): CategoryConfig | undefined {
  return categoriesConfig.find(category => category.id === id)
}

export function getSubcategoryById(categoryId: string, subcategoryId: string): SubcategoryConfig | undefined {
  const category = getCategoryById(categoryId)
  return category?.subcategories.find(sub => sub.id === subcategoryId)
}

export function getFeaturedSubcategories(categoryId: string): SubcategoryConfig[] {
  const category = getCategoryById(categoryId)
  return category?.subcategories.filter(sub => sub.featured) || []
}

export function getAllSubcategories(): SubcategoryConfig[] {
  return categoriesConfig.flatMap(category => category.subcategories)
}

export function getSubcategoriesByCategory(categoryId: string): SubcategoryConfig[] {
  const category = getCategoryById(categoryId)
  return category?.subcategories || []
}
