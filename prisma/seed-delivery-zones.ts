/**
 * Seed script for delivery zones
 * Populates the database with all default delivery zones
 */

import { PrismaClient } from '@prisma/client'
import { DELIVERY_ZONES } from '../lib/delivery-zones'

const prisma = new PrismaClient()

// Map zones to their respective villes
const zoneVilleMap: Record<string, string> = {
  // Dakar central
  "Plateau": "Dakar",
  "Plateau centre Ville - SN49": "Dakar",
  "Médina": "Dakar",
  "Fann": "Dakar",
  "Fann Résidence": "Dakar",
  "Point E": "Dakar",
  "Amitié": "Dakar",
  
  // Libertés
  "Liberté 1": "Dakar",
  "Liberté 2": "Dakar",
  "Liberté 3": "Dakar",
  "Liberté 4": "Dakar",
  "Liberté 5": "Dakar",
  "Liberté 6": "Dakar",
  "Liberté 6 Extension": "Dakar",
  "Sicap Liberté": "Dakar",
  
  // Autres zones Dakar
  "Castors": "Dakar",
  "Colobane": "Dakar",
  "Dieuppeul": "Dakar",
  "Gueule Tapée": "Dakar",
  "Fass": "Dakar",
  "HLM": "Dakar",
  "HLM Grand Yoff": "Dakar",
  "HLM Grand Medine": "Dakar",
  "Scat Urbam": "Dakar",
  "VDN": "Dakar",
  "Sacré-Cœur": "Dakar",
  "Baobab": "Dakar",
  "Mermoz": "Dakar",
  "SICAP Baobab": "Dakar",
  "Zone A": "Dakar",
  "Zone B": "Dakar",
  "Zone C": "Dakar",
  "Zone De Captage": "Dakar",
  "Hann Maristes": "Dakar",
  "Hamo": "Dakar",
  "Hamo 2": "Dakar",
  "Hamo 3": "Dakar",
  "Grand Dakar": "Dakar",
  "Patte d'Oie": "Dakar",
  "Ouakam": "Dakar",
  "Yoff": "Dakar",
  "Ngor": "Dakar",
  "Almadies": "Dakar",
  "Mamelles": "Dakar",
  "Cité Avion": "Dakar",
  "Cité Assemblée": "Dakar",
  "Cité Keur Gorgui": "Dakar",
  "Cité Attaya": "Dakar",
  "Cité Mixta": "Dakar",
  "Cité Keur Damel": "Dakar",
  "Grand Yoff": "Dakar",
  "Golf Sud": "Dakar",
  "Niary Tally": "Dakar",
  "Dalifort": "Dakar",
  "Sud Foire": "Dakar",
  "Golf": "Dakar",
  "Fadia": "Dakar",
  "Camberene": "Dakar",
  "Khar Yalla": "Dakar",
  "Yarakh": "Dakar",
  "Gibraltar": "Dakar",
  "Soprim": "Dakar",
  "UCAD ESP Université": "Dakar",
  "Sangalkam": "Dakar",
  "Ouagou Niayes": "Dakar",
  
  // Parcelles Assainies
  "Parcelles Assainies": "Dakar",
  "Unité 1": "Dakar",
  "Unité 2": "Dakar",
  "Unité 3": "Dakar",
  "Unité 4": "Dakar",
  "Unité 5": "Dakar",
  "Unité 6": "Dakar",
  "Unité 7": "Dakar",
  "Unité 8": "Dakar",
  "Unité 9": "Dakar",
  "Unité 10": "Dakar",
  "Unité 11": "Dakar",
  "Unité 12": "Dakar",
  "Unité 13": "Dakar",
  "Unité 14": "Dakar",
  "Unité 15": "Dakar",
  "Unité 16": "Dakar",
  "Unité 17": "Dakar",
  "Unité 18": "Dakar",
  "Unité 19": "Dakar",
  "Unité 20": "Dakar",
  "Unité 21": "Dakar",
  "Unité 22": "Dakar",
  "Unité 23": "Dakar",
  "Unité 24": "Dakar",
  "Unité 25": "Dakar",
  "Unité 26": "Dakar",
  "Unité 27": "Dakar",
  "Unité 28": "Dakar",
  "Unité 29": "Dakar",
  "Unité 30": "Dakar",
  
  // Pikine
  "Pikine": "Pikine",
  "Guinaw Rails": "Pikine",
  "Thiaroye": "Pikine",
  "Thiaroye Sur Mer": "Pikine",
  "Sicap Mbao": "Pikine",
  "Fass Mbao": "Pikine",
  "Keur Massar": "Pikine",
  "Malika": "Pikine",
  "Yeumbeul Nord": "Pikine",
  "Yeumbeul Sud": "Pikine",
  "Jaxaay": "Pikine",
  "Keur Mbaye Fall": "Pikine",
  "Mbao": "Pikine",
  "Diamaguène": "Pikine",
  "Keur Ndiaye Lô": "Pikine",
  "Tivaouane Peulh": "Pikine",
  
  // Guédiawaye
  "Guediawaye": "Guédiawaye",
  
  // Rufisque
  "Rufisque": "Rufisque",
  "Bargny": "Rufisque",
  "Sébikotane": "Rufisque",
  "Sendou": "Rufisque",
  "Diamniadio": "Rufisque",
  "Lac Rose": "Rufisque",
  "Bambilor": "Rufisque",
  "Keur Daouda": "Rufisque",
  "Yenne": "Rufisque",
  "Popenguine": "Rufisque",
  "Kounoune": "Rufisque",
  
  // Thiès et Mbour
  "Thiès": "Thiès",
  "Saly": "Mbour",
  "Mbour": "Mbour",
  "Boun": "Autre",
  "Niaga": "Autre",
  
  // Autre
  "Hors de la region de Dakar": "Autre",
  "Autre": "Autre",
}

async function seedDeliveryZones() {
  console.log('🌱 Starting delivery zones seeding...')

  let created = 0
  let updated = 0

  for (let i = 0; i < DELIVERY_ZONES.length; i++) {
    const zoneName = DELIVERY_ZONES[i]
    const ville = zoneVilleMap[zoneName] || 'Autre'

    try {
      const existing = await prisma.deliveryZone.findUnique({
        where: { name: zoneName },
      })

      if (existing) {
        await prisma.deliveryZone.update({
          where: { id: existing.id },
          data: {
            ville,
            order: i,
          },
        })
        updated++
      } else {
        await prisma.deliveryZone.create({
          data: {
            name: zoneName,
            ville,
            isActive: true,
            order: i,
          },
        })
        created++
      }
    } catch (error) {
      console.error(`Error seeding zone ${zoneName}:`, error)
    }
  }

  console.log(`✅ Delivery zones seeding completed!`)
  console.log(`   - Created: ${created}`)
  console.log(`   - Updated: ${updated}`)
  console.log(`   - Total: ${DELIVERY_ZONES.length}`)
}

async function main() {
  try {
    await seedDeliveryZones()
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
