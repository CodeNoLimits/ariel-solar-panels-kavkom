/**
 * Handler Formulaire Contact (contact.html)
 * Gestion du formulaire de contact via Web3Forms
 */

// Configuration Web3Forms
const WEB3FORMS_CONFIG = {
  ACCESS_KEY: '64016fc4-c7dd-4edf-ba28-14d3ba05b875',
  API_URL: 'https://api.web3forms.com/submit'
};

// Initialiser le formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-page-form');
  
  if (!contactForm) return;
  
  // Synchroniser l'access_key Web3Forms
  const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
  if (accessKeyInput && WEB3FORMS_CONFIG.ACCESS_KEY) {
    accessKeyInput.value = WEB3FORMS_CONFIG.ACCESS_KEY;
  }
  
  // Validation téléphone (optionnel)
  const phoneInput = document.getElementById('contact-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // Garder uniquement les chiffres
      this.value = this.value.replace(/\D/g, '');
      if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
      }
    });
  }
  
  // Soumission formulaire
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Désactiver le bouton et afficher le loader
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="form-loader"></span> Envoi en cours...';
    
    try {
      // Récupérer les données du formulaire
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Validation champs requis
      if (!data.name || !data.email || !data.subject || !data.message) {
        showFormError('Veuillez remplir tous les champs obligatoires.');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        return;
      }
      
      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showFormError('Veuillez entrer une adresse email valide.');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        return;
      }
      
      // Préparer les données pour Web3Forms
      const web3formsData = {
        access_key: WEB3FORMS_CONFIG.ACCESS_KEY,
        subject: `📧 Contact ARIEL SOLAR - ${data.subject}`,
        from_name: data.name,
        email: data.email,
        phone: data.phone || 'Non renseigné',
        subject_type: data.subject,
        message: `Nouveau message de contact:\n\n` +
                 `Nom: ${data.name}\n` +
                 `Email: ${data.email}\n` +
                 `Téléphone: ${data.phone || 'Non renseigné'}\n` +
                 `Sujet: ${data.subject}\n\n` +
                 `Message:\n${data.message}\n\n` +
                 `Date: ${new Date().toLocaleString('fr-FR')}`
      };
      
      // Envoyer via Web3Forms
      const response = await fetch(WEB3FORMS_CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(web3formsData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Succès
        showFormSuccess('✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.');
        contactForm.reset();
        
        // Track analytics si disponible
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            'event_category': 'contact',
            'event_label': 'contact_form',
            'value': 1
          });
        }
      } else {
        // Erreur Web3Forms
        showFormError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement par email.');
        console.error('Erreur Web3Forms:', result);
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      showFormError('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
});

/**
 * Afficher un message d'erreur
 */
function showFormError(message) {
  // Supprimer les messages existants
  const existingMessages = document.querySelectorAll('.form-message');
  existingMessages.forEach(msg => msg.remove());
  
  // Créer le message d'erreur
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-message form-message-error';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    background: #fee;
    color: #c33;
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;
    border-left: 4px solid #c33;
  `;
  
  // Insérer après le formulaire
  const form = document.getElementById('contact-page-form');
  form.parentNode.insertBefore(errorDiv, form.nextSibling);
  
  // Scroll vers le message
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Supprimer après 5 secondes
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

/**
 * Afficher un message de succès
 */
function showFormSuccess(message) {
  // Supprimer les messages existants
  const existingMessages = document.querySelectorAll('.form-message');
  existingMessages.forEach(msg => msg.remove());
  
  // Créer le message de succès
  const successDiv = document.createElement('div');
  successDiv.className = 'form-message form-message-success';
  successDiv.textContent = message;
  successDiv.style.cssText = `
    background: #efe;
    color: #3c3;
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;
    border-left: 4px solid #3c3;
  `;
  
  // Insérer après le formulaire
  const form = document.getElementById('contact-page-form');
  form.parentNode.insertBefore(successDiv, form.nextSibling);
  
  // Scroll vers le message
  successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Supprimer après 8 secondes
  setTimeout(() => {
    successDiv.remove();
  }, 8000);
}

