# Landing Page Panneaux Solaires 2025

Landing page de génération de leads pour installation de panneaux solaires photovoltaïques en France, optimisée pour la conversion et le SEO.

## 🎯 Objectif

Générer des leads qualifiés via un formulaire d'éligibilité aux aides panneaux solaires 2025 (Prime Autoconsommation, TVA 5.5%, Éco-PTZ).

**Taux de conversion attendu:** 15-25% (benchmark marché PV 2025)

## 📋 Structure

```
/
├── index.html          # Page principale (8 sections)
├── styles.css          # Design système complet
├── script.js           # Validation, modal, analytics
├── netlify.toml        # Configuration déploiement Netlify
└── README.md           # Documentation
```

## 🚀 Déploiement Netlify

### Méthode 1: Via GitHub (Recommandé)

1. **Créer un repository GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Landing page panneaux solaires"
   git branch -M main
   git remote add origin https://github.com/votre-username/solar-landing.git
   git push -u origin main
   ```

2. **Connecter à Netlify:**
   - Aller sur [netlify.com](https://netlify.com)
   - Cliquer sur "New site from Git"
   - Sélectionner votre repository GitHub
   - Netlify détectera automatiquement la configuration (`netlify.toml`)
   - Cliquer sur "Deploy site"

3. **Configurer le domaine personnalisé** (optionnel)

### Méthode 2: Drag & Drop

1. Aller sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Glisser-déposer le dossier du projet
3. Le site sera déployé automatiquement

## ⚙️ Configuration

### 1. Google Analytics 4

Remplacer `GA_MEASUREMENT_ID` dans `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=VOTRE_ID"></script>
<script>
  gtag('config', 'VOTRE_ID');
</script>
```

### 2. Envoi des Leads - EmailJS (RECOMMANDÉ - Configuré)

**✅ EmailJS est déjà intégré et configuré !**

Le système envoie automatiquement :
- **Un email à vous** à chaque nouveau lead (avec toutes les infos)
- **Un email de confirmation au client** automatiquement

#### Configuration EmailJS (5 minutes)

1. **Suivre le guide complet** : Voir `EMAILJS_SETUP.md`
2. **Créer un compte gratuit** sur [emailjs.com](https://www.emailjs.com/) (200 emails/mois)
3. **Configurer 2 templates** (notification + confirmation)
4. **Remplacer les clés** dans `script.js` ligne 8-13

**Guide détaillé :** `EMAILJS_SETUP.md`

#### Alternative: Netlify Forms

Si vous préférez Netlify Forms (gratuit, 100 soumissions/mois), le formulaire a déjà l'attribut `netlify`. Les leads seront dans le dashboard Netlify: **Site settings > Forms**

#### Autres options

- **Webhook personnalisé** : Modifier `sendEmails()` dans `script.js`
- **CRM** (HubSpot, Salesforce) : Intégrer l'API dans `sendEmails()`

### 3. Images

Remplacer les URLs Unsplash par vos propres images:

- **Hero:** Panneaux solaires toit maison (1200x800px recommandé)
- **Témoignages:** Photos clients (optionnel, ou utiliser initiales)
- **Format:** WebP recommandé pour performance

Placer les images dans un dossier `/images/` et mettre à jour les chemins dans `index.html`.

## 📊 Analytics & Tracking

### Événements Google Analytics 4 trackés:

- `cta_click` - Clics sur les boutons CTA
- `form_submit` - Soumission formulaire (conversion)
- `scroll_depth` - Profondeur de scroll (25%, 50%, 75%, 100%)
- `time_on_page` - Temps passé sur la page

### Configuration Google Tag Manager (optionnel)

1. Créer un compte GTM
2. Remplacer le code GA4 par le code GTM dans `index.html`
3. Configurer les tags dans l'interface GTM

## 🎨 Personnalisation

### Couleurs

Modifier les variables CSS dans `styles.css`:

```css
:root {
  --primary-color: #FF6B00;    /* Orange CTA */
  --secondary-color: #2E7D32;  /* Vert écologie */
  /* ... */
}
```

### Contenu

- **Témoignages:** Modifier les cartes dans la section 3
- **Tableau aides:** Mettre à jour selon barèmes 2025
- **FAQ:** Ajouter/modifier questions dans section 7
- **Footer:** Mettre à jour coordonnées et liens légaux

## ✅ Checklist Avant Lancement

### Fonctionnel
- [ ] Formulaire envoie leads correctement (test)
- [ ] Validation champs fonctionne
- [ ] Modal résultat s'affiche
- [ ] Smooth scroll CTA fonctionne
- [ ] FAQ accordéon fonctionne
- [ ] Responsive testé (320px-1920px)

### SEO
- [ ] Meta tags complètes
- [ ] Schema.org validé ([Google Rich Results Test](https://search.google.com/test/rich-results))
- [ ] Sitemap.xml créé (optionnel)
- [ ] Robots.txt configuré

### Performance
- [ ] Lighthouse score >90 (Performance/Accessibilité/SEO)
- [ ] Images optimisées (<200KB chacune)
- [ ] Lazy loading images activé
- [ ] HTTPS actif (Netlify auto)

### Légal
- [ ] Mentions légales page créée
- [ ] Politique confidentialité créée
- [ ] CGU créées
- [ ] Bandeau cookies RGPD (si tracking)

### Tracking
- [ ] Google Analytics 4 installé et testé
- [ ] Événements conversion configurés
- [ ] Test événements fire correctement

## 🔧 Développement Local

### Prévisualiser localement

1. **Avec Python:**
   ```bash
   python3 -m http.server 8000
   ```
   Ouvrir http://localhost:8000

2. **Avec Node.js (http-server):**
   ```bash
   npx http-server
   ```

3. **Avec VS Code Live Server:**
   - Installer l'extension "Live Server"
   - Clic droit sur `index.html` > "Open with Live Server"

## 📈 Optimisation Conversion (CRO)

### A/B Testing Recommandations

- **Titre Hero:** "Aides 5700€" vs "Divisez facture par 2"
- **CTA:** "Calculer Aides" vs "Vérifier Éligibilité" vs "Obtenir Devis"
- **Couleur CTA:** Orange vs Vert vs Bleu

### Outils Tracking

- **Hotjar** ou **Microsoft Clarity** pour heatmaps
- **Google Optimize** pour A/B tests (déprécié, utiliser Google Optimize 360 ou alternatives)

### Exit Intent Popup (optionnel)

Ajouter dans `script.js`:

```javascript
document.addEventListener('mouseleave', function(e) {
  if (e.clientY <= 0) {
    // Afficher popup exit intent
  }
});
```

## 🐛 Dépannage

### Formulaire ne fonctionne pas

- Vérifier que `netlify` est présent dans la balise `<form>` si utilisation Netlify Forms
- Vérifier console navigateur pour erreurs JavaScript
- Tester validation champs (téléphone 10 chiffres, code postal 5)

### Images ne chargent pas

- Vérifier chemins relatifs/absolus
- Vérifier format (WebP avec fallback JPG)
- Vérifier taille fichiers (<200KB recommandé)

### Analytics ne track pas

- Vérifier ID Google Analytics dans `index.html`
- Vérifier console navigateur (pas d'erreurs gtag)
- Tester avec [Google Tag Assistant](https://tagassistant.google.com/)

## 📞 Support

Pour questions ou problèmes:
- Email: contact@arielsolar.fr
- Documentation Netlify: https://docs.netlify.com

## 📄 Licence

© 2025 ARIEL SOLAR PANELS KAVKOM - Tous droits réservés

---

**Dernière mise à jour:** Décembre 2025


