# 📧 Configuration EmailJS - Guide Complet

Ce guide vous explique comment configurer EmailJS pour recevoir automatiquement les leads par email et envoyer des confirmations aux clients.

## 🎯 Objectif

Configurer EmailJS pour que :
1. **Vous receviez un email** à chaque nouveau lead (avec toutes les informations)
2. **Le client reçoive un email de confirmation** automatiquement

## ⚡ Configuration Rapide (5 minutes)

### Étape 1: Créer un compte EmailJS (Gratuit)

1. Aller sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquer sur **"Sign Up"** (gratuit jusqu'à 200 emails/mois)
3. Créer votre compte avec votre email

### Étape 2: Ajouter un Service Email

1. Dans le dashboard EmailJS, aller dans **"Email Services"**
2. Cliquer sur **"Add New Service"**
3. Choisir votre fournisseur email :
   - **Gmail** (recommandé - facile)
   - **Outlook** / **Hotmail**
   - **Yahoo**
   - **Custom SMTP** (pour serveurs personnalisés)

#### Pour Gmail (Recommandé) :

1. Sélectionner **"Gmail"**
2. Cliquer sur **"Connect Account"**
3. Autoriser EmailJS à accéder à votre Gmail
4. **Noter le Service ID** (ex: `service_abc123`)

### Étape 3: Créer le Template Email pour Vous (Notification Lead)

1. Aller dans **"Email Templates"**
2. Cliquer sur **"Create New Template"**
3. Nommer le template : `"Notification Lead Panneaux Solaires"`

#### Configuration du Template :

**Subject (Sujet):**
```
Nouveau Lead Panneaux Solaires - {{from_name}}
```

**Content (Corps de l'email):**
```html
<h2>🎉 Nouveau Lead Panneaux Solaires</h2>

<p><strong>Informations du prospect:</strong></p>
<ul>
  <li><strong>Nom:</strong> {{from_name}}</li>
  <li><strong>Email:</strong> {{from_email}}</li>
  <li><strong>Téléphone:</strong> {{phone}}</li>
  <li><strong>Code Postal:</strong> {{zipcode}}</li>
  <li><strong>Type de bien:</strong> {{property_type}}</li>
  <li><strong>Surface toiture:</strong> {{roof_area}} m²</li>
</ul>

<p><strong>Estimation:</strong></p>
<ul>
  <li><strong>Puissance estimée:</strong> {{estimated_kwc}}</li>
  <li><strong>Prime autoconsommation:</strong> {{prime_amount}}</li>
  <li><strong>Économie TVA:</strong> {{tva_economy}}</li>
</ul>

<p><strong>Date:</strong> {{timestamp}}</p>

<hr>

<p><em>Ce lead a été généré depuis votre landing page panneaux solaires.</em></p>
```

4. Dans **"Settings"**, configurer :
   - **To Email:** Votre email (ex: `contact@arielsolar.fr`)
   - **From Name:** `ARIEL SOLAR Landing Page`
   - **Reply To:** `{{from_email}}` (pour répondre directement au client)

5. **Sauvegarder** et **noter le Template ID** (ex: `template_xyz789`)

### Étape 4: Créer le Template Email de Confirmation Client

1. Cliquer sur **"Create New Template"**
2. Nommer : `"Confirmation Client Panneaux Solaires"`

#### Configuration du Template :

**Subject (Sujet):**
```
Votre estimation aides panneaux solaires 2025 - ARIEL SOLAR
```

**Content (Corps de l'email):**
```html
<h2>Bonjour {{to_name}},</h2>

<p>Merci d'avoir vérifié votre éligibilité aux aides panneaux solaires 2025 !</p>

<div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
  <h3 style="color: #FF6B00; margin-top: 0;">Votre estimation personnalisée:</h3>
  <ul style="font-size: 16px; line-height: 1.8;">
    <li><strong>Prime autoconsommation:</strong> {{prime_amount}}</li>
    <li><strong>Puissance estimée:</strong> {{estimated_kwc}}</li>
    <li><strong>Économie TVA:</strong> {{tva_economy}}</li>
    <li><strong>Production estimée:</strong> {{production_estimate}} par an</li>
  </ul>
</div>

<p><strong>Prochaines étapes:</strong></p>
<p>Un conseiller RGE certifié vous contactera sous <strong>24h</strong> pour un devis personnalisé gratuit et sans engagement.</p>

<p>En attendant, vous pouvez consulter notre <a href="https://votre-site.com/faq">FAQ</a> pour plus d'informations.</p>

<p>Cordialement,<br>
<strong>L'équipe ARIEL SOLAR</strong></p>

<hr>
<p style="font-size: 12px; color: #666;">
  Vous avez reçu cet email car vous avez soumis une demande d'éligibilité sur notre site.
  Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email.
</p>
```

4. Dans **"Settings"**, configurer :
   - **To Email:** `{{to_email}}` (email du client)
   - **From Name:** `ARIEL SOLAR`
   - **Reply To:** Votre email de contact

5. **Sauvegarder** et **noter le Template ID** (ex: `template_abc456`)

### Étape 5: Récupérer votre Public Key

1. Aller dans **"Account"** > **"General"**
2. Trouver **"Public Key"**
3. **Copier la clé** (ex: `abcdefghijklmnop`)

### Étape 6: Configurer dans script.js

Ouvrir le fichier `script.js` et remplacer les valeurs dans `EMAILJS_CONFIG` :

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'VOTRE_PUBLIC_KEY_ICI',        // Public Key de l'étape 5
  SERVICE_ID: 'VOTRE_SERVICE_ID_ICI',          // Service ID de l'étape 2
  TEMPLATE_LEAD: 'VOTRE_TEMPLATE_LEAD_ID',    // Template ID notification (étape 3)
  TEMPLATE_CONFIRM: 'VOTRE_TEMPLATE_CONFIRM_ID' // Template ID confirmation (étape 4)
};
```

**Exemple complet:**
```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'abcdefghijklmnop',
  SERVICE_ID: 'service_abc123',
  TEMPLATE_LEAD: 'template_xyz789',
  TEMPLATE_CONFIRM: 'template_abc456'
};
```

### Étape 7: Tester

1. Ouvrir votre landing page
2. Remplir le formulaire avec votre propre email
3. Soumettre le formulaire
4. Vérifier que vous recevez bien :
   - Un email de notification (dans votre boîte)
   - Un email de confirmation (dans la boîte utilisée dans le formulaire)

## ✅ Checklist Configuration

- [ ] Compte EmailJS créé
- [ ] Service email configuré (Gmail/Outlook/etc.)
- [ ] Template notification lead créé
- [ ] Template confirmation client créé
- [ ] Public Key récupérée
- [ ] Configuration mise à jour dans `script.js`
- [ ] Test effectué et emails reçus

## 🔧 Dépannage

### Les emails ne partent pas

1. **Vérifier la console du navigateur** (F12) pour voir les erreurs
2. **Vérifier que les IDs sont corrects** dans `script.js`
3. **Vérifier les quotas EmailJS** (200 emails/mois gratuit)
4. **Vérifier les paramètres du template** (noms des variables)

### Erreur "EmailJS is not defined"

- Vérifier que le script EmailJS est bien chargé dans `index.html` :
  ```html
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
  ```

### Les emails arrivent en spam

- Ajouter votre domaine dans les paramètres EmailJS
- Vérifier les paramètres SPF/DKIM de votre domaine
- Utiliser un email professionnel plutôt qu'un email personnel

## 📊 Limites Gratuites EmailJS

- **200 emails/mois** (gratuit)
- **2 services email**
- **2 templates**

Pour plus d'emails, passer à un plan payant (à partir de $15/mois pour 1000 emails).

## 🔒 Sécurité

- **Ne jamais commiter** votre Public Key dans un repository public
- Utiliser des **variables d'environnement** en production
- La Public Key est publique par design (sécurisée côté EmailJS)

## 📞 Support

- Documentation EmailJS: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Support EmailJS: support@emailjs.com

---

**Une fois configuré, tous les leads seront automatiquement envoyés à votre email et les clients recevront une confirmation !** 🎉

