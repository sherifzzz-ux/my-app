/**
 * Script d'export des données vers Shopify
 * 
 * Ce script exporte vos produits, clients et commandes
 * au format CSV compatible avec Shopify
 * 
 * Usage: node scripts/export-to-shopify.js
 */

import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

// Fonction utilitaire pour échapper les CSV
function escapeCSV(str) {
  if (!str) return ''
  const value = String(str).replace(/"/g, '""')
  return `"${value}"`
}

/**
 * Export des produits au format Shopify
 */
async function exportProducts() {
  console.log('📦 Export des produits...')
  
  const products = await prisma.product.findMany({
    include: {
      category: true,
      subcategory: true,
      brand: true,
    },
    orderBy: { createdAt: 'desc' }
  })

  // Headers CSV Shopify
  const headers = [
    'Handle',
    'Title',
    'Body (HTML)',
    'Vendor',
    'Product Category',
    'Type',
    'Tags',
    'Published',
    'Option1 Name',
    'Option1 Value',
    'Variant SKU',
    'Variant Grams',
    'Variant Inventory Tracker',
    'Variant Inventory Qty',
    'Variant Inventory Policy',
    'Variant Fulfillment Service',
    'Variant Price',
    'Variant Compare At Price',
    'Variant Requires Shipping',
    'Variant Taxable',
    'Variant Barcode',
    'Image Src',
    'Image Position',
    'Image Alt Text',
    'Gift Card',
    'SEO Title',
    'SEO Description',
    'Google Shopping / Google Product Category',
    'Google Shopping / Gender',
    'Google Shopping / Age Group',
    'Google Shopping / MPN',
    'Google Shopping / AdWords Grouping',
    'Google Shopping / AdWords Labels',
    'Google Shopping / Condition',
    'Google Shopping / Custom Product',
    'Google Shopping / Custom Label 0',
    'Google Shopping / Custom Label 1',
    'Google Shopping / Custom Label 2',
    'Google Shopping / Custom Label 3',
    'Google Shopping / Custom Label 4',
    'Variant Image',
    'Variant Weight Unit',
    'Variant Tax Code',
    'Cost per item',
    'Status'
  ]

  const rows = [headers.join(',')]

  products.forEach(product => {
    const price = (product.priceCents / 100).toFixed(2)
    const comparePrice = product.oldPriceCents 
      ? (product.oldPriceCents / 100).toFixed(2) 
      : ''
    
    const tags = [
      product.category.name,
      product.subcategory?.name,
      product.brand?.name,
      product.isFeatured ? 'Featured' : null
    ].filter(Boolean).join(', ')

    const row = [
      escapeCSV(product.id), // Handle
      escapeCSV(product.name), // Title
      escapeCSV(product.description || ''), // Body (HTML)
      escapeCSV(product.brand?.name || 'FlawlessBeauty'), // Vendor
      escapeCSV('Health & Beauty > Personal Care > Cosmetics'), // Product Category
      escapeCSV(product.category.name), // Type
      escapeCSV(tags), // Tags
      'TRUE', // Published
      'Title', // Option1 Name
      'Default Title', // Option1 Value
      escapeCSV(product.id), // Variant SKU
      '0', // Variant Grams
      'shopify', // Variant Inventory Tracker
      product.stock || '0', // Variant Inventory Qty
      'deny', // Variant Inventory Policy
      'manual', // Variant Fulfillment Service
      price, // Variant Price
      comparePrice, // Variant Compare At Price
      'TRUE', // Variant Requires Shipping
      'FALSE', // Variant Taxable
      '', // Variant Barcode
      escapeCSV(product.imageUrl || ''), // Image Src
      '1', // Image Position
      escapeCSV(product.name), // Image Alt Text
      'FALSE', // Gift Card
      escapeCSV(product.name), // SEO Title
      escapeCSV(product.description?.substring(0, 160) || ''), // SEO Description
      'Health & Beauty', // Google Shopping Category
      'unisex', // Gender
      'adult', // Age Group
      '', '', '', 'new', 'FALSE', '', '', '', '', '', '', 'kg', '', '', 'active'
    ]

    rows.push(row.join(','))
  })

  const csvContent = rows.join('\n')
  writeFileSync(join(process.cwd(), 'shopify-products.csv'), csvContent, 'utf-8')
  
  console.log(`✅ ${products.length} produits exportés → shopify-products.csv`)
}

/**
 * Export des clients au format Shopify
 */
async function exportCustomers() {
  console.log('👥 Export des clients...')
  
  const users = await prisma.user.findMany({
    include: { 
      addresses: true,
      orders: {
        select: {
          totalCents: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  const headers = [
    'First Name',
    'Last Name',
    'Email',
    'Company',
    'Address1',
    'Address2',
    'City',
    'Province',
    'Province Code',
    'Country',
    'Country Code',
    'Zip',
    'Phone',
    'Accepts Marketing',
    'Total Spent',
    'Total Orders',
    'Tags',
    'Note',
    'Tax Exempt'
  ]

  const rows = [headers.join(',')]

  users.forEach(user => {
    const address = user.addresses[0] // Première adresse
    const nameParts = (user.name || '').split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''
    
    const totalSpent = user.orders.reduce((sum, order) => sum + order.totalCents, 0) / 100
    const totalOrders = user.orders.length

    const row = [
      escapeCSV(firstName),
      escapeCSV(lastName),
      escapeCSV(user.email),
      '', // Company
      escapeCSV(address?.addressLine1 || ''),
      escapeCSV(address?.addressLine2 || ''),
      escapeCSV(address?.city || 'Dakar'),
      'Dakar', // Province
      'DK', // Province Code
      'Senegal', // Country
      'SN', // Country Code
      '', // Zip
      escapeCSV(address?.phone || ''),
      'yes', // Accepts Marketing
      totalSpent.toFixed(2), // Total Spent
      totalOrders, // Total Orders
      'Imported', // Tags
      '', // Note
      'FALSE' // Tax Exempt
    ]

    rows.push(row.join(','))
  })

  const csvContent = rows.join('\n')
  writeFileSync(join(process.cwd(), 'shopify-customers.csv'), csvContent, 'utf-8')
  
  console.log(`✅ ${users.length} clients exportés → shopify-customers.csv`)
}

/**
 * Export des collections (catégories)
 */
async function exportCollections() {
  console.log('📂 Export des collections...')
  
  const categories = await prisma.category.findMany({
    include: {
      subcategories: true,
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: 'asc' }
  })

  const headers = [
    'Handle',
    'Title',
    'Body (HTML)',
    'Collection Type',
    'Published',
    'Tags',
    'SEO Title',
    'SEO Description',
    'Image Src',
    'Image Alt Text'
  ]

  const rows = [headers.join(',')]

  categories.forEach(category => {
    const row = [
      escapeCSV(category.slug),
      escapeCSV(category.name),
      escapeCSV(`Collection ${category.name} - ${category._count.products} produits`),
      'manual', // Collection Type
      'TRUE', // Published
      escapeCSV(category.subcategories.map(s => s.name).join(', ')),
      escapeCSV(category.name),
      escapeCSV(`Découvrez notre sélection ${category.name} sur FlawlessBeauty`),
      escapeCSV(category.imageUrl || ''),
      escapeCSV(category.name)
    ]

    rows.push(row.join(','))
  })

  const csvContent = rows.join('\n')
  writeFileSync(join(process.cwd(), 'shopify-collections.csv'), csvContent, 'utf-8')
  
  console.log(`✅ ${categories.length} collections exportées → shopify-collections.csv`)
}

/**
 * Export des marques (vendors)
 */
async function exportBrands() {
  console.log('🏷️ Export des marques...')
  
  const brands = await prisma.brand.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: 'asc' }
  })

  const data = brands.map(brand => ({
    name: brand.name,
    slug: brand.slug,
    productsCount: brand._count.products,
    imageUrl: brand.imageUrl || ''
  }))

  const jsonContent = JSON.stringify(data, null, 2)
  writeFileSync(join(process.cwd(), 'shopify-brands.json'), jsonContent, 'utf-8')
  
  console.log(`✅ ${brands.length} marques exportées → shopify-brands.json`)
  console.log('ℹ️  Note : Importez les marques comme "Vendors" dans Shopify')
}

/**
 * Génération d'un rapport de migration
 */
async function generateMigrationReport() {
  console.log('📊 Génération du rapport de migration...')
  
  const [productsCount, customersCount, ordersCount, categoriesCount, brandsCount] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.count(),
    prisma.category.count(),
    prisma.brand.count()
  ])

  const report = `
# 📊 Rapport de Migration FlawlessBeauty → Shopify

**Date :** ${new Date().toLocaleDateString('fr-FR')}

## 📈 Statistiques

| Type | Quantité |
|------|----------|
| 📦 Produits | ${productsCount} |
| 👥 Clients | ${customersCount} |
| 🛍️ Commandes | ${ordersCount} |
| 📂 Catégories | ${categoriesCount} |
| 🏷️ Marques | ${brandsCount} |

## 📁 Fichiers Générés

- ✅ \`shopify-products.csv\` - ${productsCount} produits
- ✅ \`shopify-customers.csv\` - ${customersCount} clients
- ✅ \`shopify-collections.csv\` - ${categoriesCount} collections
- ✅ \`shopify-brands.json\` - ${brandsCount} marques

## 📝 Étapes Suivantes

1. **Importer les produits** :
   \`\`\`
   Shopify Admin → Produits → Importer
   Sélectionner : shopify-products.csv
   \`\`\`

2. **Importer les clients** (optionnel) :
   \`\`\`
   Shopify Admin → Clients → Importer
   Sélectionner : shopify-customers.csv
   \`\`\`

3. **Créer les collections** :
   \`\`\`
   Shopify Admin → Produits → Collections
   Utiliser le fichier : shopify-collections.csv
   \`\`\`

4. **Configurer les marques** :
   - Les marques sont automatiquement importées comme "Vendors"
   - Elles apparaissent dans le champ "Fournisseur" des produits

## ⚠️ Points d'Attention

- **Images** : Vérifier que toutes les URLs d'images sont accessibles
- **Prix** : Confirmez que les prix sont corrects (en CFA)
- **Stock** : Vérifier les quantités en stock
- **Catégories** : Assigner manuellement les produits aux bonnes collections

## 🔄 Migration des Commandes

⚠️ **Important** : Les commandes existantes ne peuvent PAS être importées dans Shopify.

**Options** :
1. Conserver l'historique dans l'ancien système
2. Créer un dashboard externe pour consulter l'ancien historique
3. Exporter un PDF récapitulatif pour chaque client

## 📞 Support

En cas de problème :
- 📧 Email : support@shopify.com
- 💬 Chat : Disponible 24/7 dans votre admin Shopify
- 📚 Documentation : https://help.shopify.com

---

**Bonne migration ! 🚀**
`

  writeFileSync(join(process.cwd(), 'RAPPORT_MIGRATION_SHOPIFY.md'), report, 'utf-8')
  console.log('✅ Rapport généré → RAPPORT_MIGRATION_SHOPIFY.md')
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Début de l\'export vers Shopify...\n')
  
  try {
    await exportProducts()
    await exportCustomers()
    await exportCollections()
    await exportBrands()
    await generateMigrationReport()
    
    console.log('\n✅ Export terminé avec succès !')
    console.log('\n📁 Fichiers générés :')
    console.log('   - shopify-products.csv')
    console.log('   - shopify-customers.csv')
    console.log('   - shopify-collections.csv')
    console.log('   - shopify-brands.json')
    console.log('   - RAPPORT_MIGRATION_SHOPIFY.md')
    console.log('\n📖 Consultez le guide complet : GUIDE_MIGRATION_SHOPIFY.md')
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'export :', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
