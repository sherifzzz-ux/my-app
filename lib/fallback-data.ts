export type FallbackBrand = {
  id: string
  name: string
  slug: string
  imageUrl: string
}

export type FallbackProductBasic = {
  id: string
  name: string
  imageUrl: string
  priceCents: number
  oldPriceCents?: number | null
}

export type FallbackProductWithBrand = FallbackProductBasic & {
  rating?: number | null
  brand?: { name: string } | null
}

export const fallbackBrands: FallbackBrand[] = [
  { id: 'b1', name: 'CeraVe', slug: 'cerave', imageUrl: '/images/brands/cerave-logo.png' },
  { id: 'b2', name: 'Avène', slug: 'avene', imageUrl: '/images/brands/avene-logo.png' },
  { id: 'b3', name: 'NIVEA', slug: 'nivea', imageUrl: '/images/brands/nivea-logo.png' },
  { id: 'b4', name: 'La Roche-Posay', slug: 'la-roche-posay', imageUrl: '/images/brands/la-roche-posay-logo.png' },
  { id: 'b5', name: 'Laneige', slug: 'laneige', imageUrl: '/images/brands/laneige-logo.png' },
  { id: 'b6', name: 'The Ordinary', slug: 'the-ordinary', imageUrl: '/images/brands/the-ordinary-logo.png' },
  { id: 'b7', name: 'Uriage', slug: 'uriage', imageUrl: '/images/brands/uriage-logo.png' },
  { id: 'b8', name: 'Klorane', slug: 'klorane', imageUrl: '/images/brands/klorane-logo.png' },
  { id: 'b9', name: 'L\'Oréal', slug: 'loreal', imageUrl: '/images/brands/loreal-logo.png' },
  { id: 'b10', name: 'Vichy', slug: 'vichy', imageUrl: '/images/brands/vichy-logo.png' },
  { id: 'b11', name: 'Bioderma', slug: 'bioderma', imageUrl: '/images/brands/bioderma-logo.png' },
  { id: 'b12', name: 'Eucerin', slug: 'eucerin', imageUrl: '/images/brands/eucerin-logo.png' },
  { id: 'b13', name: 'Garnier', slug: 'garnier', imageUrl: '/images/brands/garnier-logo.png' },
  { id: 'b14', name: 'Maybelline', slug: 'maybelline', imageUrl: '/images/brands/maybelline-logo.png' },
  { id: 'b15', name: 'Revlon', slug: 'revlon', imageUrl: '/images/brands/revlon-logo.png' },
  { id: 'b16', name: 'MAC', slug: 'mac', imageUrl: '/images/brands/mac-logo.png' },
]

export const fallbackProducts: FallbackProductWithBrand[] = [
  {
    id: 'p1',
    name: 'Sérum Vitamine C Éclat',
    imageUrl: '/vitamin-c-serum.png',
    priceCents: 15500,
    oldPriceCents: 18000,
    rating: 4.8,
    brand: { name: 'CeraVe' },
  },
  {
    id: 'p2',
    name: 'Masque Purifiant à l’Argile',
    imageUrl: '/clay-mask-tube.png',
    priceCents: 8500,
    oldPriceCents: 10000,
    rating: 4.7,
    brand: { name: 'Avène' },
  },
  {
    id: 'p3',
    name: 'Crème Corps Nourrissante',
    imageUrl: '/nivea-body-cream-jar.png',
    priceCents: 12000,
    rating: 4.6,
    brand: { name: 'NIVEA' },
  },
  {
    id: 'p4',
    name: 'Eau de Parfum Élégance',
    imageUrl: '/chanel-chance-pink-bottle.png',
    priceCents: 35900,
    rating: 4.5,
    brand: { name: '—' },
  },
  {
    id: 'p5',
    name: 'Niacinamide 10% + Zinc 1%',
    imageUrl: '/the-ordinary-niacinamide.png',
    priceCents: 14900,
    oldPriceCents: 16900,
    rating: 4.9,
    brand: { name: 'The Ordinary' },
  },
  {
    id: 'p6',
    name: 'Masque Nuit Hydratant',
    imageUrl: '/laneige-water-mask.png',
    priceCents: 22000,
    rating: 4.6,
    brand: { name: 'Laneige' },
  },
  {
    id: 'p7',
    name: 'Gel Nettoyant Doux',
    imageUrl: '/gentle-face-cleansers.png',
    priceCents: 9900,
    rating: 4.4,
    brand: { name: 'La Roche-Posay' },
  },
  {
    id: 'p8',
    name: 'Palette Maquillage Essentials',
    imageUrl: '/placeholder-9culf.png',
    priceCents: 25900,
    oldPriceCents: 29900,
    rating: 4.3,
    brand: { name: '—' },
  },
]

export const getFeaturedFallback = (): FallbackProductBasic[] => {
  return fallbackProducts.slice(0, 3).map(({ id, name, imageUrl, priceCents, oldPriceCents }) => ({
    id,
    name,
    imageUrl,
    priceCents,
    oldPriceCents: oldPriceCents ?? null,
  }))
}

export const getNewestFallback = (): FallbackProductWithBrand[] => {
  return fallbackProducts.slice(0, 4)
}

export const getRecommendedFallback = (): FallbackProductWithBrand[] => {
  return fallbackProducts
    .slice()
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4)
}


