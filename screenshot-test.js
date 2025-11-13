const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Page d'accueil
  await page.goto('https://ariel-solar-panels.netlify.app/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-homepage.png', fullPage: true });
  
  // Services
  await page.goto('https://ariel-solar-panels.netlify.app/services.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-services.png', fullPage: true });
  
  // Actualités
  await page.goto('https://ariel-solar-panels.netlify.app/actualites.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-actualites.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshots capturés avec succès');
})();
