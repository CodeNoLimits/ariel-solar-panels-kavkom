import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vérifier si Puppeteer est installé
let puppeteer;
try {
  puppeteer = await import('puppeteer');
} catch (e) {
  console.log('📦 Installation de Puppeteer...');
  execSync('npm install puppeteer --no-save', { stdio: 'inherit', cwd: __dirname });
  puppeteer = await import('puppeteer');
}

const browser = await puppeteer.default.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });

const htmlFiles = [
  { file: 'index.html', name: 'homepage' },
  { file: 'services.html', name: 'services' },
  { file: 'actualites.html', name: 'actualites' },
  { file: 'a-propos.html', name: 'a-propos' },
  { file: 'contact.html', name: 'contact' },
  { file: 'aides-financements.html', name: 'aides-financements' }
];

console.log('📸 Prise de screenshots...\n');

for (const { file, name } of htmlFiles) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${file} - FICHIER MANQUANT`);
    continue;
  }

  const url = `file://${filePath}`;
  console.log(`📸 ${name}...`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Attendre le chargement des images
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const screenshotPath = path.join(__dirname, `screenshot-${name}.png`);
    await page.screenshot({ 
      path: screenshotPath, 
      fullPage: true,
      type: 'png'
    });
    
    console.log(`   ✅ Screenshot sauvegardé: screenshot-${name}.png`);
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
  }
}

await browser.close();
console.log('\n✅ Tous les screenshots ont été pris !');
console.log('📁 Fichiers créés dans:', __dirname);

