#!/bin/bash

# Script de démarrage - Système de Revue Visuelle Automatique
# ARIEL SOLAR PANELS KAVKOM

echo "🎨 Démarrage du système de revue visuelle..."
echo ""

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé."
    echo "📥 Installation: https://nodejs.org/"
    exit 1
fi

# Rendre le script exécutable
chmod +x "$(dirname "$0")/auto-review-visual.js"

# Lancer le script Node.js
node "$(dirname "$0")/auto-review-visual.js"

