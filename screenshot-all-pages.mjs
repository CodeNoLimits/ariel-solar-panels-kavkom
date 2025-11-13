import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const pages = [
    { url: '/', name: 'index' },
    { url: '/services.html', name: 'services' },
    { url: '/actualites.html', name: 'actualites' },
    { url: '/a-propos.html', name: 'a-propos' },
    { url: '/contact.html', name: 'contact' },
    { url: '/aides-financements.html', name: 'aides-financements' }
  ];
  
  for (const p of pages) {
    console.log(`📸 Capturing ${p.name}...`);
    await page.goto(`https://ariel-solar-panels.netlify.app${p.url}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `screenshot-${p.name}.png`, fullPage: true });
  }
  
  await browser.close();
  console.log('✅ TOUS les screenshots capturés');
})();
