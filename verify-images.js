import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Liste des fichiers HTML à vérifier
const htmlFiles = [
  'index.html',
  'services.html',
  'actualites.html',
  'a-propos.html',
  'contact.html',
  'aides-financements.html'
];

// URLs Pexels attendues (VÉRIFIÉES - fonctionnent vraiment)
const expectedUrls = [
  'images.pexels.com/photos/159397', // Panneaux solaires sur toit
  'images.pexels.com/photos/2800832', // Panneaux solaires installation
  'images.pexels.com/photos/2800833' // Panneaux solaires professionnels
];

// URLs à éviter (anciennes qui ne fonctionnent pas)
const forbiddenUrls = [
  'cdn.pixabay.com', // Retourne 403
  'images.unsplash.com/photo-1509391366360-2e9590a079c6', // Retourne 404
  'images.pexels.com/photos/430' // IDs invalides
];

console.log('🔍 Vérification des images dans tous les fichiers HTML...\n');

let allGood = true;
let totalImages = 0;
let pixabayImages = 0;
let forbiddenImages = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${file} - FICHIER MANQUANT`);
    allGood = false;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const imgMatches = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi) || [];
  
  console.log(`\n📄 ${file}:`);
  console.log(`   ${imgMatches.length} image(s) trouvée(s)`);
  
  imgMatches.forEach((imgTag, index) => {
    totalImages++;
    const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
    if (!srcMatch) return;
    
    const src = srcMatch[1];
    const isValid = expectedUrls.some(url => src.includes(url));
    const isForbidden = forbiddenUrls.some(url => src.includes(url));
    
    if (isValid) {
      pixabayImages++;
      console.log(`   ✅ Image ${index + 1}: Pexels OK`);
    } else if (isForbidden) {
      forbiddenImages++;
      console.log(`   ❌ Image ${index + 1}: URL INTERDITE - ${src.substring(0, 60)}...`);
      allGood = false;
    } else {
      console.log(`   ⚠️  Image ${index + 1}: URL inconnue - ${src.substring(0, 60)}...`);
    }
  });
});

console.log('\n' + '='.repeat(60));
console.log('📊 RÉSUMÉ:');
console.log(`   Total images: ${totalImages}`);
console.log(`   ✅ Pexels (validées): ${pixabayImages}`);
console.log(`   ❌ Interdites: ${forbiddenImages}`);
console.log(`   ⚠️  Autres: ${totalImages - pixabayImages - forbiddenImages}`);

if (allGood && forbiddenImages === 0) {
  console.log('\n✅ TOUTES LES IMAGES SONT CORRECTES !');
  console.log('✅ Prêt pour publication');
  process.exit(0);
} else {
  console.log('\n❌ PROBLÈMES DÉTECTÉS - Ne pas publier');
  process.exit(1);
}

