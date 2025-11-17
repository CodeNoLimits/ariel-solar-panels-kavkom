#!/usr/bin/env node

/**
 * Déploiement Vercel via API
 * Désactive les protections automatiquement
 */

const https = require('https');
const { execSync } = require('child_process');

const VERCEL_TOKEN = process.env.VERCEL_TOKEN || '';
const PROJECT_NAME = 'ariel-solar-panels-kavkom';
const GIT_REPO = 'CodeNoLimits/ariel-solar-panels-kavkom';

if (!VERCEL_TOKEN) {
  console.log('⚠️  VERCEL_TOKEN non défini. Utilisez: export VERCEL_TOKEN=your_token');
  console.log('💡 Obtenez votre token: https://vercel.com/account/tokens');
  process.exit(1);
}

// Fonction pour appeler l'API Vercel
function vercelAPI(method, endpoint, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: endpoint,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function main() {
  console.log('🚀 Déploiement Vercel via API...\n');
  
  try {
    // 1. Créer/déployer le projet
    console.log('📦 Déploiement du projet...');
    const deployResult = await vercelAPI('POST', '/v13/deployments', {
      name: PROJECT_NAME,
      gitSource: {
        type: 'github',
        repo: GIT_REPO,
        ref: 'main'
      }
    });
    
    console.log('✅ Déploiement créé:', deployResult.url || deployResult);
    
    // 2. Désactiver les protections
    console.log('\n🔓 Désactivation des protections...');
    const projectId = deployResult.projectId || PROJECT_NAME;
    
    const updateResult = await vercelAPI('PATCH', `/v9/projects/${projectId}`, {
      passwordProtection: null,
      ssoProtection: null
    });
    
    console.log('✅ Protections désactivées');
    console.log('\n🎯 Site PUBLIC accessible:', deployResult.url || 'https://' + PROJECT_NAME + '.vercel.app');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();
