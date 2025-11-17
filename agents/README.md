# 🤖 Agents Instructions - ARIEL SOLAR PANELS KAVKOM

## 📋 DOCUMENT PRINCIPAL

**Lis et suis TOUTES les instructions de ce document :**

👉 **`agents/MESSAGE_AGENTS.md`**

Ce document contient les règles pour gérer 10+ projets avec automation complète.

**AVANT toute action sur un projet, consulte ce document.**

---

## 🎯 RÈGLES PRINCIPALES (Résumé)

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

- **`MESSAGE_AGENTS.md`** ⭐ - **DOCUMENT PRINCIPAL** (lis ceci en premier!)
- `SYNC.md` - Coordination entre agents
- `README.md` - Ce fichier (guide rapide)

---

## 🚀 Quick Start

1. **AVANT toute action:**
   ```bash
   # Lire le document principal
   cat agents/MESSAGE_AGENTS.md
   
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

## 📍 Emplacements

- **Local:** `agents/MESSAGE_AGENTS.md`
- **GitHub:** https://github.com/CodeNoLimits/universal-project-automation/blob/main/MESSAGE_AGENTS.md
- **Template:** `~/.claude/templates/universal-project-automation/MESSAGE_AGENTS.md`

---

**Voir `MESSAGE_AGENTS.md` pour détails complets.**
