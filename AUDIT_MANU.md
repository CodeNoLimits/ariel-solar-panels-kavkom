# 📋 Document d'Audit & Spécifications - Site Panneaux Solaires ARIEL SOLAR

**Date :** Décembre 2025  
**Client :** ARIEL SOLAR PANELS KAVKOM  
**Auditeur/Développeur :** Manu  
**URL Site Actuel :** https://ariel-solar-panels.netlify.app  
**Site de Référence :** https://primapac.netlify.app

---

## 🎯 OBJECTIF PRINCIPAL

Créer un **site multi-pages professionnel** pour génération de leads panneaux solaires photovoltaïques en France, inspiré de **primapac.netlify.app** mais adapté au secteur solaire, avec un taux de conversion attendu de **15-25%**.

---

## 📊 ÉTAT ACTUEL DU SITE

### ✅ Points Positifs
- Structure multi-pages créée (6 pages)
- Navigation fonctionnelle
- Formulaire éligibilité avec validation
- EmailJS intégré (à configurer)
- Design responsive
- Images panneaux solaires réelles

### ⚠️ Points à Améliorer
- Design pas assez moderne/professionnel
- Manque de sections importantes
- Expérience utilisateur à optimiser
- Conversion rate à améliorer
- Manque d'éléments de preuve sociale avancés
- Animations et interactions limitées

---

## 🎨 CRITÈRES DE QUALITÉ & EXIGENCES

### 1. DESIGN & VISUEL

#### Palette de Couleurs (Industrie Solaire)
```
- Orange Solaire : #FF6B00 (CTA, énergie)
- Vert Écologie : #2E7D32 (environnement)
- Bleu Ciel Énergie : #00A8E8 (innovation)
- Jaune Soleil : #FFC107 (accents)
- Blanc : #FFFFFF
- Gris Foncé : #1a1a1a
```

#### Typographie
- Police principale : **Inter** (moderne, lisible)
- Tailles : H1 (3.5rem), H2 (2.5rem), Body (16px)
- Hiérarchie claire et lisible

#### Images
- **TOUTES les images doivent être de vraies images panneaux solaires**
- Format WebP avec fallback JPG
- Lazy loading activé
- Optimisation <200KB par image
- Haute qualité HD minimum
- Maisons françaises typiques (tuiles, ardoises)

#### Design System
- Design moderne et épuré
- Espaces blancs généreux
- Ombres et gradients subtils
- Animations fluides (hover, scroll, transitions)
- Micro-interactions
- Glassmorphism pour certains éléments

---

## 📄 STRUCTURE MULTI-PAGES REQUISE

### Page 1 : ACCUEIL (index.html)

#### Section 1 : HERO (Above the fold - CRUCIAL)
**Titre H1 :**
- "Jusqu'à 5 700€ d'Aides de l'État pour Installer vos Panneaux Solaires en 2025"
- OU "Panneaux Solaires: Divisez Votre Facture d'Électricité par 2 avec les Aides 2025"

**Sous-titre H2 :**
- "Vérifiez votre éligibilité à la Prime Autoconsommation + TVA 5.5% en 2 minutes avec notre IA. Gratuit et sans engagement."

**CTA Primaire :**
- Bouton orange/vert gros et visible
- "Calculer Mes Aides Gratuitement" → Scroll vers formulaire

**Visuel :**
- Image panneau solaire toit maison française moderne
- OU calculatrice interactive économies visible
- Éviter stock photos génériques

**Badges de Confiance :**
- 100% Gratuit
- Sans Engagement
- Réponse IA Immédiate
- Installateurs RGE

**Compteur Social Proof :**
- "🔥 [NOMBRE] personnes ont vérifié leur éligibilité aujourd'hui"
- Animation incrémentale

#### Section 2 : BANDE CONFIANCE
- "Notre intelligence artificielle analyse votre éligibilité instantanément"
- 3 pictos : ✓ Gratuit ✓ 2 minutes ✓ Sans engagement

#### Section 3 : FORMULAIRE ÉLIGIBILITÉ (PLACÉ TÔT)
**Titre :** "🤖 Vérification IA en Temps Réel"

**Champs requis :**
- Nom complet *
- Email *
- Téléphone * (10 chiffres, validation)
- Code Postal * (5 chiffres, validation)
- Type de bien * (Maison/Appartement)
- Vous êtes * (Propriétaire/Locataire)
- Surface toiture estimée (m²)

**Bouton Submit :**
- "🔍 Analyse IA Maintenant"

**Mentions :**
- "⚡ Réponse sous 24h • 🔒 Données sécurisées"
- Mentions légales RGPD

**Fonctionnalités :**
- Validation en temps réel
- Blocage si locataire (message clair)
- Calcul automatique prime estimée
- Modal résultat avec estimation détaillée
- Envoi EmailJS automatique (notification + confirmation)

#### Section 4 : TÉMOIGNAGES CLIENTS
**3 cartes témoignages structure EXACTE :**

```html
<div class="testimonial-card">
  <div class="testimonial-avatar">[AVATAR/INITIALES]</div>
  <div class="location">[VILLE] ([DEPT])</div>
  <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
  <div class="testimonial-text">
    "Grâce à ARIEL SOLAR, j'ai installé [X]kWc de panneaux pour [MONTANT]€ après aides. 
    Ma facture EDF est passée de [X]€/mois à [Y]€/mois. 
    Je revends même mon surplus à EDF!"
  </div>
  <div class="customer-name">[PRÉNOM] [INITIAL], [ÂGE] ans</div>
</div>
```

**Exemples réalistes :**
- Lyon (69): "9kWc installés, 8500€ après prime 720€ + TVA 5.5%. Facture divisée par 2.5, autoconsommation 70%, revente surplus 0.13€/kWh. ROI prévu 9 ans!"
- Toulouse (31): "Propriétaire 58 ans, 6kWc sur toit sud. Prime 480€ + Eco-PTZ 15000€. Production 7000kWh/an couvre 80% besoins."
- Nantes (44): "3kWc compact pour pavillon. Total 6200€ après aides. Exonération impôts car <3kWc."

**Métriques visibles :**
- "98% satisfaction client"
- "Plus de 3000 installations depuis 2019"

#### Section 5 : AVANTAGES PANNEAUX SOLAIRES
**3 blocs visuels (icône + texte + image) :**

**Bloc 1: Économies**
- Icône: 💰
- Image: Panneaux solaires économies
- Titre: "Réduisez votre facture d'électricité jusqu'à 70%"
- Détail: "Autoconsommation directe + Revente surplus EDF à 0.13€/kWh garanti 20 ans"

**Bloc 2: Écologie**
- Icône: 🌱
- Image: Panneaux solaires écologie
- Titre: "Réduisez vos émissions CO2 de 90%"
- Détail: "Production propre 100% renouvelable, valorisation de votre patrimoine immobilier"

**Bloc 3: Indépendance**
- Icône: ⚡
- Image: Installation panneaux solaires
- Titre: "Produisez votre propre électricité"
- Détail: "Protection contre hausses tarifs EDF, autonomie énergétique jusqu'à 80%"

#### Section 6 : TABLEAU AIDES 2025 (CRUCIAL)
**Titre :** "Les Aides Panneaux Solaires 2025"

**Tableau responsive 3 colonnes :**

| Type Installation | Prime Investissement | Autres Aides |
|-------------------|---------------------|--------------|
| Panneaux 3kWc Photovoltaïque | 240€ (80€/kWc) | TVA 5.5% + Exonération impôts + Rachat 0.13€/kWh |
| Panneaux 6kWc Photovoltaïque | 480€ (80€/kWc) | TVA 5.5% + Rachat surplus EDF OA 20 ans |
| Panneaux 9kWc Photovoltaïque | 720€ (80€/kWc MAX) | TVA 5.5% + Éco-PTZ 15000€ + Rachat surplus |
| Chauffe-Eau Solaire Thermique | MaPrimeRénov' 3000-4000€ | Prime Énergie jusqu'à 5000€ + TVA 5.5% |
| Système Solaire Combiné | MaPrimeRénov' 4000-10000€ | Prime Énergie CEE + Éco-PTZ |

**Note importante :**
⚠️ "Profitez des barèmes 2025 dès maintenant! Installation RGE obligatoire. TVA 5.5% applicable depuis octobre 2025."

**Liste bonus :**
- ✓ Revente surplus électricité garantie 20 ans
- ✓ Obligation d'achat EDF OA à 0.13€/kWh
- ✓ ROI moyen entre 7-12 ans
- ✓ Garantie panneaux 25-30 ans

#### Section 7 : INSTALLATION PROFESSIONNELLE
- Image installation RGE
- Titre: "Installation Professionnelle Certifiée RGE"
- Liste garanties (RGE, décennale, suivi, maintenance)

#### Section 8 : FAQ
**Accordéon 8 questions :**
1. Combien coûte une installation panneaux solaires après aides?
2. Suis-je éligible aux aides si je suis locataire? → Non, propriétaire uniquement
3. Quelle est la différence photovoltaïque/thermique/hybride?
4. Comment fonctionne la prime autoconsommation 2025?
5. Obligation installateur RGE: c'est quoi?
6. Quel ROI et durée garantie panneaux?
7. Puis-je cumuler Prime + MaPrimeRénov'? → Oui si hybride
8. TVA 5.5%: quelles conditions exactes?

#### Section 9 : CTA FINAL
- Fond gradient orange
- Titre: "Prêt à Économiser sur Votre Facture d'Électricité ?"
- CTA: "🔍 Analyse IA Gratuite"

---

### Page 2 : SERVICES (services.html)

**Sections requises :**
1. Hero avec titre "Nos Services"
2. Grille 3 services :
   - Installation Photovoltaïque
   - Maintenance & Entretien
   - Rénovation & Optimisation
3. Processus en 5 étapes (visuel avec numéros)
4. CTA vers formulaire

---

### Page 3 : AIDES & FINANCEMENTS (aides-financements.html)

**Sections requises :**
1. Hero avec titre "Aides & Financements 2025"
2. Tableau complet des aides (même que page accueil)
3. Détails de chaque aide (Prime, TVA, Éco-PTZ)
4. Calculateur d'aides interactif (optionnel)
5. CTA vers formulaire

---

### Page 4 : À PROPOS (a-propos.html)

**Sections requises :**
1. Hero avec titre "À Propos"
2. Mission de l'entreprise
3. Statistiques (3000+ installations, 98% satisfaction)
4. Valeurs (Écologie, Excellence, Transparence, Innovation)
5. Équipe (optionnel)
6. CTA

---

### Page 5 : CONTACT (contact.html)

**Sections requises :**
1. Hero avec titre "Contactez-Nous"
2. Formulaire de contact complet :
   - Nom, Email, Téléphone
   - Sujet (Devis, Info, Aide, Autre)
   - Message
3. Coordonnées :
   - Email: contact@arielsolar.fr
   - Téléphone: 01 XX XX XX XX
   - Adresse: Paris, France
   - Horaires: Lun-Ven 9h-18h
4. CTA vers formulaire éligibilité

---

### Page 6 : ACTUALITÉS (actualites.html)

**Sections requises :**
1. Hero avec titre "Actualités"
2. Grille articles (3 colonnes)
3. Chaque article :
   - Image panneaux solaires
   - Date
   - Titre
   - Extrait
   - Lien "Lire la suite"
4. CTA vers formulaire

---

## 🔧 FONCTIONNALITÉS TECHNIQUES REQUISES

### 1. Navigation Multi-Pages
- Menu sticky avec indicateur page active
- Menu mobile hamburger animé
- Smooth scroll
- Footer avec liens toutes pages

### 2. Formulaire Éligibilité
- Validation en temps réel
- Format téléphone (10 chiffres)
- Format code postal (5 chiffres)
- Blocage si locataire (message clair)
- Calcul automatique :
  - Surface toit / 10 * 3kWc (max 9kWc)
  - Prime = kWc * 80€
  - TVA économisée
- Modal résultat avec :
  - Montant prime estimée
  - Liste avantages
  - "Conseiller RGE contacte sous 24h"
- Envoi EmailJS :
  - Email notification (pour vous)
  - Email confirmation (pour client)

### 3. EmailJS Configuration
- **OBLIGATOIRE** : Configurer EmailJS pour envoi automatique
- 2 templates :
  - Notification lead (avec toutes infos)
  - Confirmation client (avec estimation)
- Guide fourni : `EMAILJS_SETUP.md`

### 4. Analytics
- Google Analytics 4 intégré
- Événements trackés :
  - CTA clicks
  - Form submissions
  - Scroll depth
  - Time on page

### 5. Performance
- Lighthouse score >90 (Performance/Accessibilité/SEO)
- Images optimisées <200KB
- Lazy loading images
- Minify CSS/JS
- CDN Netlify

### 6. SEO
- Meta tags complètes chaque page
- Schema.org structured data
- Open Graph tags
- URLs propres
- Alt text images
- Sitemap.xml

---

## 📱 RESPONSIVE DESIGN

**Breakpoints :**
- Mobile : 320px - 767px
- Tablet : 768px - 1023px
- Desktop : 1024px - 1439px
- Large : 1440px+

**Exigences :**
- Mobile-first approach
- Menu hamburger mobile
- Formulaire full-width mobile
- Tableau scroll horizontal mobile
- Images responsive
- Touch-friendly (boutons min 44x44px)

---

## 🎯 OPTIMISATION CONVERSION (CRO)

### Éléments de Preuve Sociale
- Compteur vérifications animé
- Témoignages avec photos/avatars
- Statistiques (98% satisfaction, 3000+ installations)
- Badges certifications RGE
- Logos partenaires (si disponibles)

### Urgence & Scarcité
- "Barèmes 2025 - Profitez-en maintenant"
- Compteur temps réel
- Offres limitées (si applicable)

### Trust Signals
- Badges sécurité (RGPD, données sécurisées)
- Certifications RGE visibles
- Garanties affichées
- Mentions légales accessibles

### A/B Testing Recommandations
- Variant A: Titre "Aides 5700€"
- Variant B: Titre "Divisez facture par 2"
- Test CTA: "Calculer Aides" vs "Vérifier Éligibilité"
- Couleur CTA: Orange vs Vert vs Bleu

---

## 🚫 ERREURS À ÉVITER

### Images
- ❌ JAMAIS d'images d'arbres/mer sans rapport
- ❌ JAMAIS d'images de mécanicien auto
- ❌ JAMAIS de stock photos génériques
- ✅ UNIQUEMENT vraies images panneaux solaires

### Design
- ❌ Design plat/sans profondeur
- ❌ Couleurs incohérentes
- ❌ Typographie illisible
- ✅ Design moderne avec gradients, ombres, animations

### Fonctionnalités
- ❌ Formulaire qui ne fonctionne pas
- ❌ EmailJS non configuré
- ❌ Navigation cassée
- ✅ Tout doit fonctionner parfaitement

---

## 📊 RÉFÉRENCE : PRIMAPAC.NETLIFY.APP

**Éléments à s'inspirer :**
- Structure navigation
- Design moderne et épuré
- Badges de confiance
- Compteur social proof
- Témoignages avec avatars
- Processus étape par étape
- CTA bien visibles
- Footer complet

**Adapter pour panneaux solaires :**
- Contenu spécifique solaire
- Images panneaux solaires
- Aides spécifiques 2025
- Tableau aides détaillé

---

## ✅ CHECKLIST QUALITÉ

### Fonctionnel
- [ ] Toutes les pages accessibles
- [ ] Navigation fonctionne entre pages
- [ ] Formulaire validation en temps réel
- [ ] Formulaire envoie emails (EmailJS configuré)
- [ ] Modal résultat s'affiche
- [ ] Calcul aides automatique
- [ ] Blocage locataire fonctionne
- [ ] FAQ accordéon fonctionne
- [ ] Menu mobile fonctionne
- [ ] Smooth scroll fonctionne

### Design
- [ ] Design moderne et professionnel
- [ ] Couleurs cohérentes (orange, vert, bleu)
- [ ] Typographie lisible
- [ ] Espaces blancs généreux
- [ ] Animations fluides
- [ ] Images panneaux solaires réelles
- [ ] Responsive parfait (320px-1920px)
- [ ] Contrastes suffisants (accessibilité)

### Performance
- [ ] Lighthouse >90 (Performance)
- [ ] Lighthouse >90 (Accessibilité)
- [ ] Lighthouse >90 (SEO)
- [ ] Images <200KB
- [ ] Temps chargement <3s
- [ ] Lazy loading activé

### SEO
- [ ] Meta tags complètes
- [ ] Schema.org validé
- [ ] Open Graph tags
- [ ] Alt text images
- [ ] URLs propres
- [ ] Sitemap.xml

### Légal
- [ ] Mentions légales
- [ ] Politique confidentialité
- [ ] CGU
- [ ] RGPD conforme
- [ ] Bandeau cookies (si tracking)

---

## 🎯 OBJECTIFS DE CONVERSION

**Taux de conversion attendu : 15-25%**

**Métriques à suivre :**
- Taux de conversion formulaire
- Taux de rebond
- Temps sur page
- Scroll depth
- CTA clicks
- Form abandonment

---

## 📞 CONTACT & SUPPORT

**Email :** contact@arielsolar.fr  
**Téléphone :** 01 XX XX XX XX

**Documentation technique :**
- `README.md` - Documentation générale
- `EMAILJS_SETUP.md` - Guide EmailJS
- `SITE_COMPLET.md` - Vue d'ensemble

---

## 🚀 DÉPLOIEMENT

**URL Production :** https://ariel-solar-panels.netlify.app

**Commandes Netlify :**
```bash
# Déployer en production
netlify deploy --prod --dir=.

# Déployer en preview
netlify deploy --dir=.
```

---

## 📝 NOTES FINALES

**Priorités :**
1. **Design moderne et professionnel** (inspiré primapac)
2. **Formulaire fonctionnel avec EmailJS** (OBLIGATOIRE)
3. **Images panneaux solaires réelles** (PAS d'arbres/mer/mécanicien)
4. **Conversion optimisée** (CTA visibles, preuve sociale)
5. **Performance** (Lighthouse >90)

**Qualité attendue :**
- Site de niveau professionnel
- Design moderne 2025
- Expérience utilisateur fluide
- Conversion optimisée
- Code propre et maintenable

---

**Merci Manu pour ton travail ! Le site doit être au niveau de primapac.netlify.app mais adapté aux panneaux solaires. N'hésite pas à améliorer encore plus que demandé ! 🚀**

