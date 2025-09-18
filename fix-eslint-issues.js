#!/usr/bin/env node

/**
 * Script pour corriger automatiquement les problèmes ESLint courants
 */

const fs = require('fs');
const path = require('path');

// Fonction pour lire un fichier
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${filePath}:`, error.message);
    return null;
  }
}

// Fonction pour écrire un fichier
function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fichier corrigé: ${filePath}`);
  } catch (error) {
    console.error(`Erreur lors de l'écriture de ${filePath}:`, error.message);
  }
}

// Fonction pour corriger les apostrophes non échappées
function fixUnescapedEntities(content) {
  // Corriger les apostrophes dans le texte JSX
  return content
    .replace(/([^&])'([^;])/g, '$1&apos;$2')
    .replace(/([^&])"([^;])/g, '$1&quot;$2');
}

// Fonction pour supprimer les imports non utilisés (basique)
function removeUnusedImports(content) {
  // Cette fonction est basique et peut nécessiter des ajustements manuels
  const lines = content.split('\n');
  const usedImports = new Set();
  
  // Analyser le contenu pour trouver les imports utilisés
  for (const line of lines) {
    if (line.includes('import')) continue;
    
    // Chercher les utilisations d'imports
    const matches = line.match(/\b([A-Z][a-zA-Z0-9]*)\b/g);
    if (matches) {
      matches.forEach(match => usedImports.add(match));
    }
  }
  
  return content;
}

// Fonction pour corriger les éléments img en Image Next.js
function fixImgElements(content) {
  // Ajouter l'import Image si nécessaire
  if (content.includes('<img') && !content.includes('import Image from')) {
    const importMatch = content.match(/import.*from ['"]react['"];?/);
    if (importMatch) {
      content = content.replace(
        importMatch[0],
        importMatch[0] + '\nimport Image from "next/image";'
      );
    }
  }
  
  // Remplacer les éléments img par Image
  content = content.replace(
    /<img\s+([^>]*?)src=(["'])([^"']+)\2([^>]*?)>/g,
    (match, beforeSrc, quote, src, afterSrc) => {
      // Extraire les attributs importants
      const altMatch = afterSrc.match(/alt=(["'])([^"']+)\1/);
      const classNameMatch = afterSrc.match(/className=(["'])([^"']+)\1/);
      
      const alt = altMatch ? altMatch[2] : '';
      const className = classNameMatch ? classNameMatch[2] : '';
      
      // Déterminer les dimensions par défaut
      const width = 400;
      const height = 300;
      
      return `<Image
        src={${quote}${src}${quote}}
        alt="${alt}"
        width={${width}}
        height={${height}}
        className="${className}"
      />`;
    }
  );
  
  return content;
}

// Fonction principale
function fixFile(filePath) {
  const content = readFile(filePath);
  if (!content) return;
  
  let fixedContent = content;
  
  // Appliquer les corrections
  fixedContent = fixUnescapedEntities(fixedContent);
  fixedContent = fixImgElements(fixedContent);
  
  // Écrire le fichier corrigé
  if (fixedContent !== content) {
    writeFile(filePath, fixedContent);
  }
}

// Fonction pour parcourir récursivement les dossiers
function walkDirectory(dir, callback) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      walkDirectory(filePath, callback);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      callback(filePath);
    }
  }
}

// Exécution du script
console.log('🔧 Correction automatique des problèmes ESLint...\n');

const projectRoot = process.cwd();
const componentsDir = path.join(projectRoot, 'components');
const appDir = path.join(projectRoot, 'app');

// Corriger les fichiers dans components
if (fs.existsSync(componentsDir)) {
  console.log('📁 Correction des fichiers dans components/...');
  walkDirectory(componentsDir, fixFile);
}

// Corriger les fichiers dans app
if (fs.existsSync(appDir)) {
  console.log('📁 Correction des fichiers dans app/...');
  walkDirectory(appDir, fixFile);
}

console.log('\n✅ Correction terminée!');
console.log('⚠️  Vérifiez manuellement les corrections et ajustez si nécessaire.');
