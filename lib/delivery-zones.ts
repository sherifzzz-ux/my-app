/**
 * Liste complète des zones de livraison
 * Utilisé pour le formulaire de checkout et l'admin
 */

export const DELIVERY_ZONES = [
  // Plateau et centre-ville
  "Plateau",
  "Plateau centre Ville - SN49",
  "Médina",
  "Fann",
  "Fann Résidence",
  "Point E",
  "Amitié",
  
  // Libertés
  "Liberté 1",
  "Liberté 2",
  "Liberté 3",
  "Liberté 4",
  "Liberté 5",
  "Liberté 6",
  "Liberté 6 Extension",
  "Sicap Liberté",
  
  // Zones centrales
  "Castors",
  "Colobane",
  "Dieuppeul",
  "Gueule Tapée",
  "Fass",
  "HLM",
  "HLM Grand Yoff",
  "HLM Grand Medine",
  "Scat Urbam",
  "VDN",
  "Sacré-Cœur",
  "Baobab",
  "Mermoz",
  "SICAP Baobab",
  
  // Zones A, B, C
  "Zone A",
  "Zone B",
  "Zone C",
  "Zone De Captage",
  
  // Hann et environs
  "Hann Maristes",
  "Hamo",
  "Hamo 2",
  "Hamo 3",
  
  // Grand Dakar et Patte d'Oie
  "Grand Dakar",
  "Patte d'Oie",
  
  // Corniche et zones côtières
  "Ouakam",
  "Yoff",
  "Ngor",
  "Almadies",
  "Mamelles",
  
  // Cités
  "Cité Avion",
  "Cité Assemblée",
  "Cité Keur Gorgui",
  "Cité Attaya",
  "Cité Mixta",
  "Cité Keur Damel",
  
  // Grand Yoff
  "Grand Yoff",
  
  // Parcelles Assainies (Unités 1-30)
  "Parcelles Assainies",
  "Unité 1",
  "Unité 2",
  "Unité 3",
  "Unité 4",
  "Unité 5",
  "Unité 6",
  "Unité 7",
  "Unité 8",
  "Unité 9",
  "Unité 10",
  "Unité 11",
  "Unité 12",
  "Unité 13",
  "Unité 14",
  "Unité 15",
  "Unité 16",
  "Unité 17",
  "Unité 18",
  "Unité 19",
  "Unité 20",
  "Unité 21",
  "Unité 22",
  "Unité 23",
  "Unité 24",
  "Unité 25",
  "Unité 26",
  "Unité 27",
  "Unité 28",
  "Unité 29",
  "Unité 30",
  
  // Sud Dakar
  "Golf Sud",
  "Niary Tally",
  "Dalifort",
  "Sud Foire",
  "Golf",
  "Fadia",
  "Camberene",
  "Khar Yalla",
  "Yarakh",
  "Gibraltar",
  "Soprim",
  
  // Pikine et banlieue
  "Pikine",
  "Guinaw Rails",
  "Thiaroye",
  "Thiaroye Sur Mer",
  "Sicap Mbao",
  "Fass Mbao",
  "Keur Massar",
  "Malika",
  "Yeumbeul Nord",
  "Yeumbeul Sud",
  "Jaxaay",
  "Keur Mbaye Fall",
  "Mbao",
  "Diamaguène",
  "Keur Ndiaye Lô",
  "Tivaouane Peulh",
  
  // Guédiawaye
  "Guediawaye",
  
  // Zones périphériques Dakar
  "Sangalkam",
  "Rufisque",
  "Bargny",
  "Sébikotane",
  "Sendou",
  "Diamniadio",
  "Lac Rose",
  "Bambilor",
  "Keur Daouda",
  "Yenne",
  "Popenguine",
  "Ouagou Niayes",
  "Kounoune",
  "UCAD ESP Université",
  
  // Hors région de Dakar
  "Thiès",
  "Saly",
  "Mbour",
  "Boun",
  "Niaga",
  
  // Autre
  "Hors de la region de Dakar",
  "Autre",
] as const

export type DeliveryZoneType = typeof DELIVERY_ZONES[number]

export const VILLES = [
  "Dakar",
  "Pikine",
  "Guédiawaye",
  "Rufisque",
  "Thiès",
  "Mbour",
  "Autre",
] as const

export type VilleType = typeof VILLES[number]
