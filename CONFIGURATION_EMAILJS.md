# 📧 Configuration EmailJS - Guide Rapide

## ✅ Ce qui est déjà fait

- ✅ EmailJS SDK intégré dans `index.html`
- ✅ Fonction `sendEmails()` prête dans `script.js`
- ✅ Configuration EMAILJS_CONFIG créée
- ✅ Envoi de 2 emails : notification lead + confirmation client

## 🔧 Configuration en 5 minutes

### Étape 1 : Créer un compte EmailJS
1. Aller sur https://www.emailjs.com
2. Créer un compte gratuit (200 emails/mois gratuits)
3. Vérifier votre email

### Étape 2 : Créer un Service Email
1. Dans EmailJS, aller dans **Email Services**
2. Cliquer **Add New Service**
3. Choisir votre fournisseur (Gmail, Outlook, etc.)
4. Connecter votre compte email
5. **Copier le Service ID** (ex: `service_xxxxx`)

### Étape 3 : Créer le Template LEAD (pour recevoir les leads)
1. Aller dans **Email Templates**
2. Cliquer **Create New Template**
3. Nom: "Lead Notification"
4. **Template ID**: Notez-le (ex: `template_xxxxx`)
5. Contenu du template:
```
Sujet: Nouveau Lead Panneaux Solaires - {{from_name}}

Bonjour,

Nouveau lead reçu via le formulaire d'éligibilité:

Nom: {{from_name}}
Email: {{from_email}}
Téléphone: {{phone}}
Code Postal: {{zipcode}}
Type de bien: {{property_type}}
Surface toiture: {{roof_area}}m²

Estimation:
- Puissance: {{estimated_kwc}}
- Prime: {{prime_amount}}
- Économie TVA: {{tva_economy}}

Date: {{timestamp}}

Cordialement,
ARIEL SOLAR
```

### Étape 4 : Créer le Template CONFIRM (confirmation client)
1. Créer un nouveau template
2. Nom: "Confirmation Client"
3. **Template ID**: Notez-le
4. Contenu:
```
Sujet: Votre éligibilité aux aides panneaux solaires 2025

Bonjour {{to_name}},

Merci d'avoir vérifié votre éligibilité aux aides panneaux solaires 2025.

Votre estimation personnalisée:
- Prime autoconsommation: {{prime_amount}}
- Puissance estimée: {{estimated_kwc}}
- Économie TVA: {{tva_economy}}
- Production estimée: {{production_estimate}}

Un conseiller RGE certifié vous contactera sous 24h pour un devis personnalisé gratuit.

Cordialement,
L'équipe ARIEL SOLAR
```

### Étape 5 : Récupérer votre Public Key
1. Aller dans **Account** > **General**
2. **Copier votre Public Key** (ex: `xxxxxxxxxxxxx`)

### Étape 6 : Configurer dans script.js
Ouvrir `script.js` et remplacer dans `EMAILJS_CONFIG`:

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'VOTRE_PUBLIC_KEY_ICI',
  SERVICE_ID: 'VOTRE_SERVICE_ID_ICI',
  TEMPLATE_LEAD: 'VOTRE_TEMPLATE_LEAD_ID_ICI',
  TEMPLATE_CONFIRM: 'VOTRE_TEMPLATE_CONFIRM_ID_ICI'
};
```

## ✅ Test

1. Remplir le formulaire sur le site
2. Vérifier que vous recevez l'email de notification
3. Vérifier que le client reçoit l'email de confirmation

## 🆘 Problèmes courants

- **Emails non reçus**: Vérifier les spams
- **Erreur 400**: Vérifier que les variables du template correspondent
- **Erreur 401**: Vérifier la Public Key
- **Erreur 404**: Vérifier les Template IDs et Service ID

## 📝 Variables disponibles dans les templates

- `{{from_name}}` - Nom du client
- `{{from_email}}` - Email du client
- `{{phone}}` - Téléphone
- `{{zipcode}}` - Code postal
- `{{property_type}}` - Type de bien
- `{{roof_area}}` - Surface toiture
- `{{estimated_kwc}}` - Puissance estimée
- `{{prime_amount}}` - Montant prime
- `{{tva_economy}}` - Économie TVA
- `{{production_estimate}}` - Production estimée
- `{{timestamp}}` - Date et heure

---

**C'est tout ! Les emails seront envoyés automatiquement à chaque soumission de formulaire.**

