// Configuration centralisée des images du carousel
export const carouselImages = [
  { 
    id: 1, 
    src: '/images/banner1.jpg', 
    alt: 'Promotion Beauté 1',
    title: 'Nouveautés Beauté',
    subtitle: 'Découvrez nos dernières collections'
  },
  { 
    id: 2, 
    src: '/images/banner2.jpg', 
    alt: 'Promotion Beauté 2',
    title: 'Soins du Visage',
    subtitle: 'Révélez votre éclat naturel'
  },
  { 
    id: 3, 
    src: '/images/banner3.jpg', 
    alt: 'Promotion Beauté 3',
    title: 'Maquillage',
    subtitle: 'Sublimez votre beauté'
  },
  { 
    id: 4, 
    src: '/images/banner4.jpg', 
    alt: 'Promotion Beauté 4',
    title: 'Parfums',
    subtitle: 'Trouvez votre signature olfactive'
  },
  { 
    id: 5, 
    src: '/images/banner5.jpg', 
    alt: 'Promotion Beauté 5',
    title: 'Soins Corps',
    subtitle: 'Chouchoutez votre peau'
  },
  { 
    id: 6, 
    src: '/images/banner6.jpg', 
    alt: 'Promotion Beauté 6',
    title: 'Cheveux',
    subtitle: 'Des cheveux en pleine santé'
  },
  { 
    id: 7, 
    src: '/images/banner7.jpg', 
    alt: 'Promotion Beauté 7',
    title: 'Parapharmacie',
    subtitle: 'Votre santé, notre priorité'
  },
  { 
    id: 8, 
    src: '/images/banner8.jpg', 
    alt: 'Promotion Beauté 8',
    title: 'Bébé & Enfant',
    subtitle: 'Douceur et protection'
  },
  { 
    id: 9, 
    src: '/images/banner9.jpg', 
    alt: 'Promotion Beauté 9',
    title: 'Idées Cadeaux',
    subtitle: 'Offrez le meilleur de la beauté'
  },
  { 
    id: 10, 
    src: '/images/banner10.jpg', 
    alt: 'Promotion Beauté 10',
    title: 'K-Beauty',
    subtitle: 'Les secrets de beauté coréens'
  },
] as const

// Fonction utilitaire pour obtenir une image par ID
export const getCarouselImage = (id: number) => {
  return carouselImages.find(image => image.id === id)
}

// Fonction utilitaire pour obtenir toutes les images
export const getAllCarouselImages = () => {
  return carouselImages
}
