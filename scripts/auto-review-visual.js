#!/usr/bin/env node

/**
 * Système de Revue Visuelle Automatique
 * ARIEL SOLAR PANELS KAVKOM
 * 
 * Lance un serveur HTTP local, ouvre le navigateur,
 * et envoie des notifications toutes les 5 minutes pour revue visuelle.
 */

const { spawn, exec } = require('child_process');
const path = require('path');
const os = require('os');

// Configuration
const PORT = 8000;
const REVIEW_INTERVAL = 5 * 60 * 1000; // 5 minutes
const PROJECT_NAME = 'ARIEL SOLAR PANELS KAVKOM';
const LOCAL_URL = `http://localhost:${PORT}`;

let serverProcess = null;
let reviewCount = 0;
let reviewInterval = null;

// Détecter le système d'exploitation
const isWindows = os.platform() === 'win32';
const isMac = os.platform() === 'darwin';
const isLinux = os.platform() === 'linux';

/**
 * Ouvrir le navigateur
 */
function openBrowser(url) {
  let command;
  
  if (isMac) {
    command = `open "${url}"`;
  } else if (isWindows) {
    command = `start "" "${url}"`;
  } else if (isLinux) {
    command = `xdg-open "${url}"`;
  } else {
    console.log(`⚠️  Système non supporté. Ouvrez manuellement: ${url}`);
    return;
  }
  
  exec(command, (error) => {
    if (error) {
      console.error(`❌ Erreur ouverture navigateur:`, error.message);
    } else {
      console.log(`✅ Navigateur ouvert: ${url}`);
    }
  });
}

/**
 * Envoyer une notification système
 */
function sendNotification(title, message) {
  let command;
  
  if (isMac) {
    command = `osascript -e 'display notification "${message}" with title "${title}"'`;
  } else if (isLinux) {
    command = `notify-send "${title}" "${message}"`;
  } else if (isWindows) {
    // Windows 10+ avec PowerShell
    command = `powershell -Command "New-BurntToastNotification -Text '${title}', '${message}'"`;
  } else {
    console.log(`📢 ${title}: ${message}`);
    return;
  }
  
  exec(command, (error) => {
    if (error && !isWindows) {
      // Si notification échoue, afficher dans la console
      console.log(`📢 ${title}: ${message}`);
    }
  });
}

/**
 * Lancer le serveur HTTP
 */
function startServer() {
  console.log(`\n🚀 Démarrage serveur HTTP pour ${PROJECT_NAME}...`);
  console.log(`📁 Dossier: ${process.cwd()}`);
  console.log(`🌐 URL: ${LOCAL_URL}\n`);
  
  // Utiliser http-server (Node.js) si disponible, sinon python
  const httpServerCommand = 'npx';
  const httpServerArgs = ['-y', 'http-server', '.', '-p', PORT.toString(), '-o', 'false'];
  
  serverProcess = spawn(httpServerCommand, httpServerArgs, {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd()
  });
  
  serverProcess.on('error', (error) => {
    console.error(`❌ Erreur serveur:`, error.message);
    console.log(`\n🔄 Tentative avec Python...\n`);
    
    // Fallback: Python HTTP server
    serverProcess = spawn('python3', ['-m', 'http.server', PORT.toString()], {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd()
    });
    
    serverProcess.on('error', (error2) => {
      console.error(`❌ Erreur Python serveur:`, error2.message);
      console.log(`\n⚠️  Veuillez installer Node.js ou Python pour lancer le serveur.`);
      process.exit(1);
    });
  });
  
  serverProcess.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`\n❌ Serveur arrêté avec code ${code}`);
      console.log(`🔄 Redémarrage dans 3 secondes...\n`);
      setTimeout(() => {
        startServer();
      }, 3000);
    }
  });
  
  // Attendre que le serveur démarre
  setTimeout(() => {
    openBrowser(LOCAL_URL);
    sendNotification(
      `${PROJECT_NAME}`,
      `Serveur démarré sur ${LOCAL_URL}`
    );
    
    // Démarrer les revues périodiques
    startPeriodicReviews();
  }, 2000);
}

/**
 * Démarrer les revues périodiques
 */
function startPeriodicReviews() {
  console.log(`\n⏰ Revues visuelles automatiques activées (toutes les ${REVIEW_INTERVAL / 1000 / 60} minutes)\n`);
  
  reviewInterval = setInterval(() => {
    reviewCount++;
    const timestamp = new Date().toLocaleTimeString('fr-FR');
    
    console.log(`\n📋 Revue visuelle #${reviewCount} - ${timestamp}`);
    console.log(`🌐 Ouverture navigateur: ${LOCAL_URL}\n`);
    
    openBrowser(LOCAL_URL);
    
    sendNotification(
      `${PROJECT_NAME} - Revue #${reviewCount}`,
      `Temps de revue visuelle ! Ouvrez ${LOCAL_URL}`
    );
  }, REVIEW_INTERVAL);
}

/**
 * Arrêt propre
 */
function cleanup() {
  console.log(`\n\n🛑 Arrêt du système de revue visuelle...`);
  
  if (reviewInterval) {
    clearInterval(reviewInterval);
  }
  
  if (serverProcess) {
    console.log(`🔄 Arrêt du serveur...`);
    if (isWindows) {
      exec(`taskkill /F /PID ${serverProcess.pid}`, () => {});
    } else {
      serverProcess.kill('SIGTERM');
    }
  }
  
  console.log(`✅ Arrêt terminé. Au revoir !\n`);
  process.exit(0);
}

// Gestion des signaux d'arrêt
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Message de bienvenue
console.log(`
╔══════════════════════════════════════════════════════════╗
║   🎨 SYSTÈME DE REVUE VISUELLE AUTOMATIQUE              ║
║   ${PROJECT_NAME}                                        ║
╚══════════════════════════════════════════════════════════╝

📋 Configuration:
   • Port: ${PORT}
   • Intervalle: ${REVIEW_INTERVAL / 1000 / 60} minutes
   • URL: ${LOCAL_URL}

💡 Appuyez sur Ctrl+C pour arrêter

`);

// Démarrer le système
startServer();

