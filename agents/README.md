# 🤖 Agents Instructions - ARIEL SOLAR PANELS KAVKOM

## 📋 Règles Principales

### 1. MEMORY FIRST 🧠
- TOUJOURS checker `checkpoint-memory.sh` avant demander
- Ne JAMAIS redemander une API déjà sauvegardée
- Sauvegarder immédiatement si nouvelle info

### 2. DESIGN QA OBLIGATOIRE 🔍
- TOUJOURS lancer `design-qa-automation.sh` avant déployer
- Lighthouse doit être >= 90 Performance, >= 95 autres
- Bloquer déploiement si scores insuffisants

### 3. COORDINATION SYNC.MD 🤖
- Lire et updater `agents/SYNC.md` avant/pendant/après chaque tâche
- Cursor et Claude Code se coordonnent via ce fichier
- Annoncer avant/pendant/après chaque tâche

---

## 📁 Fichiers

- `AGENTS_INSTRUCTIONS.md` - Instructions complètes (628 lignes)
- `SYNC.md` - Coordination entre agents
- `README.md` - Ce fichier (guide rapide)

---

## 🚀 Quick Start

1. **Avant de commencer:**
   ```bash
   # Check Memory
   checkpoint-memory.sh get-api web3forms
   
   # Lire SYNC
   cat agents/SYNC.md
   ```

2. **Avant de déployer:**
   ```bash
   # Design QA
   design-qa-automation.sh
   ```

3. **Pendant le travail:**
   - Updater `agents/SYNC.md` avec ce que tu fais
   - Annoncer dans SYNC.md

4. **Après:**
   - Updater `agents/SYNC.md` avec résultat
   - Commit si nécessaire

---

**Voir `AGENTS_INSTRUCTIONS.md` pour détails complets.**
