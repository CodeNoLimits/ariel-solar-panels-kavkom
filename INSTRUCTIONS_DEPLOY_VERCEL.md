# 🚀 DÉPLOIEMENT VERCEL - GUIDE RAPIDE

## Option 1: Via Interface Web (RECOMMANDÉ - 2 minutes)

### Étapes:

1. **Aller sur Vercel:**
   - https://vercel.com
   - Se connecter avec GitHub

2. **Importer le projet:**
   - Cliquer "New Project"
   - Importer depuis GitHub
   - Sélectionner le repo "ARIEL SOLAR PANELS KAVKOM"

3. **Configurer:**
   - Framework Preset: **Other** (site statique)
   - Root Directory: `./`
   - Build Command: (laisser vide)
   - Output Directory: `./`

4. **Déployer:**
   - Cliquer "Deploy"
   - Attendre 30 secondes
   - ✅ Site en ligne!

5. **Obtenir l'URL:**
   - URL format: `ariel-solar-xxxxx.vercel.app`
   - Configurer domaine personnalisé (optionnel)

---

## Option 2: Via CLI (Pour développeurs)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
cd "/Users/codenolimits-dreamai-nanach/Desktop/ARIEL SOLAR PANELS KAVKOM"
vercel

# Suivre les prompts:
# - Set up and deploy? Yes
# - Which scope? [Votre compte]
# - Link to existing project? No
# - Project name? ariel-solar-panels
# - Directory? ./
# - Override settings? No

# Déploiement en production
vercel --prod
```

---

## 🔧 Variables d'Environnement (Si nécessaire)

Si vous avez besoin d'ajouter des variables:

1. Dashboard Vercel → Project Settings → Environment Variables
2. Ajouter:
   - `WEB3FORMS_ACCESS_KEY` = votre_clé_ici
   - `GEMINI_API_KEY` = AIzaSyCNQOdKp-j4ioha5n3beDJ98YdSKFI-z8k

---

## 📊 Comparaison Vercel vs Netlify

| Fonctionnalité | Vercel | Netlify |
|----------------|--------|---------|
| **Vitesse déploiement** | ⚡ 20-30s | 🔵 30-45s |
| **Edge Network** | 100+ régions | 80+ régions |
| **Build gratuit** | 6000 min/mois | 300 min/mois |
| **Bandwidth** | 100 GB | 100 GB |
| **SSL Automatique** | ✅ Oui | ✅ Oui |
| **Formulaires** | ❌ Nécessite API | ✅ Natif (100/mois) |

**Recommandation:** Utilisez les deux!
- Vercel pour le site principal (plus rapide)
- Netlify en backup

---

## ✅ Après Déploiement

1. **Tester le site:**
   - Ouvrir l'URL Vercel
   - Tester le formulaire
   - Vérifier réception emails

2. **Configurer domaine personnalisé (optionnel):**
   - Dashboard Vercel → Domains
   - Ajouter `ariel-solar.fr` ou autre
   - Configurer DNS

3. **Activer Analytics:**
   - Dashboard Vercel → Analytics
   - Activer (gratuit jusqu'à 100k vues/mois)

---

## 🔄 Déploiements Automatiques

Vercel déploie automatiquement à chaque push GitHub:
- Push sur `main` → Production
- Push sur autre branche → Preview URL

---

## 📞 Support

- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

---

**Le site sera en ligne en 2 minutes!** ⚡
