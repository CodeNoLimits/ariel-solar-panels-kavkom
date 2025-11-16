# 🚨 CURSOR V2 GUIDE - RÈGLES STRICTES

> **ATTENTION CURSOR**: Ce guide définit les règles ABSOLUES pour travailler sur ce projet.
> **INTERDICTION FORMELLE** de modifier les fichiers existants sans autorisation explicite.

---

## ⛔ RÈGLE #1: NE JAMAIS TOUCHER À LA VERSION ORIGINALE

### Fichiers PROTÉGÉS (NE PAS MODIFIER):

```
❌ INTERDICTION ABSOLUE DE MODIFIER:
- index.html (version originale)
- services.html (version originale)
- a-propos.html (version originale)
- actualites.html (version originale)
- aides-financements.html (version originale)
- contact.html (version originale)
- styles.css (version originale)
- script.js (version originale)
- images/* (version originale)
```

**Si tu touches ces fichiers → ARRÊT IMMÉDIAT → DEMANDER CONFIRMATION**

---

## ✅ WORKFLOW OBLIGATOIRE POUR VERSION 2

### Étape 1: TOUJOURS Créer une Nouvelle Branche

```bash
# AVANT toute modification, exécuter:
BRANCH_NAME="cursor-v2-$(date +%Y%m%d-%H%M%S)"
git checkout -b "$BRANCH_NAME"
git status  # Vérifier qu'on est sur la nouvelle branche
```

**Confirmation visuelle:**
```
On branch cursor-v2-20250117-143022  ← BON
Your branch is up to date with 'origin/main'.  ← STOP, retourner à main
```

### Étape 2: Créer Structure V2 Séparée

```bash
# Créer dossier v2 pour nouvelles versions
mkdir -p v2

# Copier fichiers à modifier dans v2/
cp index.html v2/index-v2.html
cp services.html v2/services-v2.html
cp contact.html v2/contact-v2.html
cp styles.css v2/styles-v2.css
cp script.js v2/script-v2.js

# Créer dossier images v2
mkdir -p v2/images
```

**Structure du projet après:**
```
ARIEL SOLAR PANELS KAVKOM/
├── index.html           ← ORIGINAL (NE PAS TOUCHER)
├── services.html        ← ORIGINAL (NE PAS TOUCHER)
├── styles.css           ← ORIGINAL (NE PAS TOUCHER)
├── script.js            ← ORIGINAL (NE PAS TOUCHER)
├── images/              ← ORIGINAL (NE PAS TOUCHER)
│
└── v2/                  ← VERSION 2 (OK MODIFIER)
    ├── index-v2.html
    ├── services-v2.html
    ├── contact-v2.html
    ├── styles-v2.css
    ├── script-v2.js
    └── images/
```

### Étape 3: Modifier UNIQUEMENT les Fichiers V2

```bash
# ✅ BON: Modifier v2/index-v2.html
# ❌ MAUVAIS: Modifier index.html
```

---

## 📋 CHECKLIST AVANT CHAQUE MODIFICATION

**CURSOR, EXÉCUTE CETTE CHECKLIST AVANT TOUTE MODIFICATION:**

1. [ ] Vérifier branche actuelle: `git branch`
   - ✅ Sur branche `cursor-v2-*` → OK continuer
   - ❌ Sur branche `main` → ARRÊTER, créer branche

2. [ ] Vérifier fichier à modifier:
   - ✅ Chemin commence par `v2/` → OK modifier
   - ❌ Fichier racine (index.html, etc.) → ARRÊTER, demander

3. [ ] Vérifier git status:
   - ✅ Aucun fichier original modifié → OK
   - ❌ Fichiers originaux dans "Changes" → ARRÊTER, git restore

---

## 🔧 COMMANDES DE SÉCURITÉ

### Si Tu As Modifié un Fichier Original par Erreur:

```bash
# Annuler modifications NON COMMITÉES
git restore index.html
git restore services.html
git restore styles.css
git restore script.js

# Vérifier que tout est propre
git status
# → Should show: "nothing to commit, working tree clean"
```

### Si Tu As Commité par Erreur sur Main:

```bash
# NE PAS PANIQUER, créer branche depuis ce commit
git branch cursor-v2-rescue
git checkout main
git reset --hard HEAD~1  # Revenir au commit précédent
git checkout cursor-v2-rescue  # Aller sur branche de rescue
```

---

## 🎯 PROBLÈMES IDENTIFIÉS À CORRIGER (VERSION 2 UNIQUEMENT)

### CRITIQUE (Priorité 1):

1. **Conflit ID Formulaires**
   - Fichier: `v2/index-v2.html` + `v2/contact-v2.html`
   - Problème: `contact-form` utilisé 2 fois
   - Solution: Renommer formulaire contact en `contact-page-form`

2. **Formulaire Contact Non Fonctionnel**
   - Fichier: `v2/script-v2.js`
   - Problème: Pas de handler pour formulaire contact
   - Solution: Ajouter handler séparé

3. **Google Analytics Non Configuré**
   - Fichier: `v2/index-v2.html` (lignes ~59, 64)
   - Problème: `GA_MEASUREMENT_ID` placeholder
   - Solution: Remplacer ou retirer

4. **EmailJS Chargé Inutilement**
   - Fichier: Toutes pages v2
   - Problème: SDK chargé mais non configuré
   - Solution: Retirer de toutes les pages

### IMPORTANT (Priorité 2):

5. **Images Externes (Pexels)**
   - Problème: Dépendance CDN externe
   - Solution: Télécharger → optimiser → placer dans `v2/images/`

6. **Responsive Grilles**
   - Fichier: `v2/services-v2.html`, `v2/aides-financements-v2.html`
   - Problème: Grilles pas adaptées mobile
   - Solution: Ajouter media queries

7. **Accessibilité Liens**
   - Fichier: `v2/actualites-v2.html`
   - Problème: Liens `href="#"` vides
   - Solution: Créer pages ou retirer

8. **SEO Meta Tags**
   - Fichier: Toutes pages v2
   - Problème: Meta tags incomplets
   - Solution: Ajouter Open Graph, Twitter Cards

### OPTIMISATIONS (Priorité 3):

9. **CSS Inline Répété**
   - Problème: Styles inline dupliqués
   - Solution: Extraire en classes dans `v2/styles-v2.css`

10. **Gestion Erreurs Gemini**
    - Fichier: `v2/script-v2.js`
    - Problème: Pas de fallback clair
    - Solution: Améliorer UX erreurs

---

## 📝 CONVENTION DE COMMIT

```bash
# Format des commits:
git commit -m "🔧 Cursor V2: [Type] Description courte

Détails:
- Changement 1
- Changement 2

Fichiers modifiés: v2/fichier-v2.html"
```

**Types:**
- `fix`: Correction de bug
- `feat`: Nouvelle fonctionnalité
- `refactor`: Refactorisation
- `style`: Amélioration visuelle
- `perf`: Optimisation performance
- `docs`: Documentation

**Exemples:**
```bash
git commit -m "🔧 Cursor V2: fix: Résoudre conflit ID formulaires

Détails:
- Renommer contact-form en contact-page-form dans contact-v2.html
- Créer handler séparé dans script-v2.js

Fichiers: v2/contact-v2.html, v2/script-v2.js"
```

---

## 🚀 DÉPLOIEMENT V2 (Séparé de V1)

### Option 1: Sous-domaine Netlify

```bash
# Déployer v2/ sur sous-domaine
cd v2/
netlify deploy --dir=. --site=ariel-solar-v2
```

**URL résultante:**
- V1 (original): `ariel-solar.netlify.app`
- V2 (nouveau): `ariel-solar-v2.netlify.app`

### Option 2: Branche Vercel

```bash
# Déployer branche v2 séparément
vercel --branch=cursor-v2-20250117
```

**URL résultante:**
- V1 (main): `ariel-solar.vercel.app`
- V2 (branche): `ariel-solar-git-cursor-v2-username.vercel.app`

---

## 🔍 VÉRIFICATIONS AUTOMATIQUES

### Avant Chaque Commit:

```bash
#!/bin/bash
# Script de vérification pré-commit

# Vérifier qu'aucun fichier original n'est modifié
MODIFIED_ORIGINALS=$(git diff --name-only | grep -v '^v2/')

if [ -n "$MODIFIED_ORIGINALS" ]; then
  echo "❌ ERREUR: Fichiers originaux modifiés:"
  echo "$MODIFIED_ORIGINALS"
  echo ""
  echo "Annuler avec: git restore <fichier>"
  exit 1
fi

# Vérifier qu'on n'est pas sur main
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" = "main" ]; then
  echo "❌ ERREUR: Vous êtes sur la branche main"
  echo "Créer nouvelle branche avec:"
  echo "  git checkout -b cursor-v2-\$(date +%Y%m%d-%H%M%S)"
  exit 1
fi

echo "✅ Vérifications OK"
exit 0
```

---

## 📊 MÉTRIQUES DE QUALITÉ V2

### Targets (Version 2):

| Métrique | V1 (Actuel) | V2 (Target) |
|----------|-------------|-------------|
| Lighthouse Performance | ~75 | > 90 |
| Lighthouse Accessibility | ~85 | > 95 |
| Lighthouse Best Practices | ~80 | > 95 |
| Lighthouse SEO | ~90 | > 95 |
| Bundle Size (CSS) | ~50KB | < 30KB |
| Bundle Size (JS) | ~80KB | < 50KB |
| Images Optimisées | 0% | 100% |
| Formulaires Fonctionnels | 50% | 100% |

### Tests à Exécuter (V2):

```bash
# Performance
npm run lighthouse v2/index-v2.html

# Accessibilité
npm run a11y v2/index-v2.html

# Validation HTML
npx html-validate v2/**/*.html

# Validation CSS
npx stylelint v2/styles-v2.css
```

---

## 🎓 PHILOSOPHIE V2

### Règles d'Or:

1. **V1 = Intouchable** → Version stable en production
2. **V2 = Terrain d'expérimentation** → OK prendre des risques
3. **Commit Fréquents** → Micro-cycles rapides
4. **Tests Avant Merge** → Qualité > Vitesse
5. **Documentation** → Chaque changement documenté

### Mindset:

```
V1 (Rendu) → V2 (Nu) → V2 Finalisé (Rendu) → V3 (Nu) ...
```

Chaque version est un cycle Nu→Rendu.
V1 est "rendu" (stable).
V2 est "nu" (en devenir).
Une fois V2 finalisée, elle devient "rendu" et on passe à V3.

**Pas de peur de livrer V2 imparfait.**
Mieux vaut 10 itérations qu'une perfection imaginaire.

---

## 🆘 EN CAS DE PROBLÈME

### Si Cursor Bloque:

1. **Git Status** → Voir l'état
2. **Git Diff** → Voir les changements
3. **Git Restore** → Annuler si erreur
4. **Demander à l'Utilisateur** → Si incertain

### Si Conflit Merge:

```bash
# Annuler le merge
git merge --abort

# Demander stratégie à l'utilisateur
# NE PAS résoudre automatiquement
```

### Si Doute sur Modification:

**TOUJOURS DEMANDER AVANT:**
- Modifier fichiers originaux
- Supprimer du code existant
- Changer architecture majeure
- Déployer en production

---

## 📚 RESSOURCES

### Documentation Projet:

- README.md (original)
- CONFIGURATION_APPLIQUEE.md (setup actuel)
- SYNCHRONISATION_CLAUDE_CODE_COMPLETE.md (sync tools)

### Standards à Respecter:

- **Tailwind CSS** → Classes utilitaires
- **Vanilla JS** → Pas de framework lourd
- **Accessibilité** → WCAG AA minimum
- **Performance** → Lighthouse > 90
- **SEO** → Meta tags complets

---

## ✅ VALIDATION FINALE V2

### Avant de Merger V2 → Main:

1. [ ] Tous les tests passent
2. [ ] Lighthouse > 90 sur toutes métriques
3. [ ] Formulaires testés manuellement
4. [ ] Responsive testé (mobile, tablette, desktop)
5. [ ] Accessibilité validée (navigation clavier)
6. [ ] Images optimisées et locales
7. [ ] Aucune dépendance externe cassée
8. [ ] Documentation à jour
9. [ ] Utilisateur a validé visuellement
10. [ ] Déployé sur URL preview et testé

**Seulement après ces 10 validations → OK merger dans main**

---

## 🎯 RÉCAPITULATIF: CE QUE CURSOR DOIT FAIRE

### ✅ FAIRE:

- Créer branche `cursor-v2-*` avant tout travail
- Travailler UNIQUEMENT dans dossier `v2/`
- Commits fréquents et descriptifs
- Tester après chaque changement
- Documenter les modifications importantes
- Demander si incertain

### ❌ NE PAS FAIRE:

- Toucher fichiers originaux (racine projet)
- Commiter sur branche `main` directement
- Modifier sans tester
- Déployer sans validation
- Supprimer code sans backup
- Deviner les intentions utilisateur

---

**CURSOR: Si tu lis ce guide, exécute cette commande pour confirmer:**

```bash
echo "✅ CURSOR V2 GUIDE LU ET COMPRIS" && git branch
```

---

*Guide créé: 2025-01-17*
*Version: 1.0*
*Auteur: Claude Code*
*Pour: Cursor IDE*
