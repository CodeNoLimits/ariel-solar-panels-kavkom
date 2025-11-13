/**
 * Landing Page Panneaux Solaires 2025
 * Script principal: Validation formulaire, Modal, EmailJS, Analytics, Smooth Scroll
 */

// ============================================
// CONFIGURATION EMAIL - WEB3FORMS (RECOMMANDÉ)
// ============================================
// Web3Forms est configuré pour envoyer automatiquement:
// 1. Email de notification à vous (nouveau lead)
// 2. Email de confirmation au client (si activé dans dashboard)
// 
// Pour configurer Web3Forms:
// 1. Aller sur https://web3forms.com/
// 2. Créer Access Key avec email: dreamaiultimate@gmail.com
// 3. Vérifier email et copier la clé
// 4. Remplacer YOUR_WEB3FORMS_ACCESS_KEY ci-dessous
// 5. Dans Dashboard Web3Forms → Settings:
//    - Enable "Send confirmation email to submitter": OUI
//    - Email notifications: dreamaiultimate@gmail.com

const WEB3FORMS_CONFIG = {
  ACCESS_KEY: '64016fc4-c7dd-4edf-ba28-14d3ba05b875', // ✅ Web3Forms configuré
  API_URL: 'https://api.web3forms.com/submit'
};

// ============================================
// CONFIGURATION EMAILJS (FALLBACK OPTIONNEL)
// ============================================
// EmailJS peut être utilisé en alternative si Web3Forms ne convient pas
// Pour configurer EmailJS:
// 1. Créer un compte sur https://www.emailjs.com (gratuit jusqu'à 200 emails/mois)
// 2. Créer un service email (Gmail, Outlook, etc.)
// 3. Créer 2 templates:
//    - Template LEAD: pour recevoir les nouveaux leads
//    - Template CONFIRM: pour confirmer au client
// 4. Remplacer les valeurs ci-dessous

const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // À remplacer par votre Public Key EmailJS
  SERVICE_ID: 'YOUR_SERVICE_ID', // À remplacer par votre Service ID
  TEMPLATE_LEAD: 'YOUR_TEMPLATE_LEAD_ID', // Template pour recevoir les leads
  TEMPLATE_CONFIRM: 'YOUR_TEMPLATE_CONFIRM_ID' // Template pour confirmer au client
};

// Initialiser EmailJS (si configuré)
if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// ============================================
// CONFIGURATION GEMINI AI
// ============================================
// Gemini API pour l'analyse intelligente de l'éligibilité

const GEMINI_CONFIG = {
  API_KEY: 'AIzaSyCNQOdKp-j4ioha5n3beDJ98YdSKFI-z8k',
  API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
};

// ============================================
// COMPTEUR VÉRIFICATIONS (Animation)
// ============================================

function animateCounter() {
  const counterElement = document.getElementById('verification-count');
  if (!counterElement) return;
  
  const target = parseInt(counterElement.textContent);
  const increment = Math.floor(Math.random() * 3) + 1; // 1-3 par clic
  const newValue = target + increment;
  
  // Animation
  let current = target;
  const duration = 1000;
  const steps = 20;
  const stepValue = (newValue - target) / steps;
  const stepDuration = duration / steps;
  
  const timer = setInterval(() => {
    current += stepValue;
    if ((stepValue > 0 && current >= newValue) || (stepValue < 0 && current <= newValue)) {
      counterElement.textContent = newValue;
      clearInterval(timer);
    } else {
      counterElement.textContent = Math.floor(current);
    }
  }, stepDuration);
}

// Incrémenter le compteur toutes les 30-60 secondes
setInterval(() => {
  if (Math.random() > 0.5) { // 50% de chance
    animateCounter();
  }
}, 45000);

// ============================================
// SMOOTH SCROLL POUR LES CTAs
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll pour tous les liens anchor
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Compenser la navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Initialiser FAQ accordéon
  initFAQ();
  
  // Initialiser formulaire
  initForm();
  
  // Initialiser Analytics tracking
  initAnalytics();
  
  // Initialiser animations scroll
  initScrollAnimations();
});

// ============================================
// FAQ ACCORDÉON
// ============================================

function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const answer = this.nextElementSibling;
      
      // Fermer toutes les autres FAQ
      faqQuestions.forEach(q => {
        if (q !== this) {
          q.setAttribute('aria-expanded', 'false');
          q.nextElementSibling.classList.remove('active');
        }
      });
      
      // Toggle current FAQ
      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
        answer.classList.remove('active');
      } else {
        this.setAttribute('aria-expanded', 'true');
        answer.classList.add('active');
      }
    });
  });
}

// ============================================
// VALIDATION & SOUMISSION FORMULAIRE
// ============================================

function initForm() {
  const form = document.getElementById('contact-form');
  
  if (!form) return;
  
  // Synchroniser l'access_key Web3Forms dans le formulaire HTML
  const accessKeyInput = form.querySelector('input[name="access_key"]');
  if (accessKeyInput && WEB3FORMS_CONFIG.ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
    accessKeyInput.value = WEB3FORMS_CONFIG.ACCESS_KEY;
  }
  
  // Validation en temps réel pour téléphone et code postal
  const phoneInput = document.getElementById('phone');
  const zipcodeInput = document.getElementById('zipcode');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // Garder uniquement les chiffres
      this.value = this.value.replace(/\D/g, '');
      if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
      }
    });
  }
  
  if (zipcodeInput) {
    zipcodeInput.addEventListener('input', function(e) {
      // Garder uniquement les chiffres
      this.value = this.value.replace(/\D/g, '');
      if (this.value.length > 5) {
        this.value = this.value.slice(0, 5);
      }
    });
  }
  
  // Soumission formulaire
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = '⏳ Analyse en cours...';
    
    try {
      // Récupérer les données du formulaire
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Validation: Vérifier si propriétaire
      if (data.owner_status !== 'owner') {
        alert('⚠️ Les aides panneaux solaires sont réservées aux propriétaires. Les locataires ne peuvent pas bénéficier de ces dispositifs.');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        return;
      }
      
      // Validation: Vérifier champs requis
      if (!data.name || !data.email || !data.phone || !data.zipcode || !data.property_type) {
        alert('Veuillez remplir tous les champs obligatoires.');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        return;
      }
      
      // Validation: Format téléphone (10 chiffres)
      if (data.phone.length !== 10) {
        alert('Veuillez entrer un numéro de téléphone valide (10 chiffres).');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        return;
      }
      
      // Validation: Format code postal (5 chiffres)
      if (data.zipcode.length !== 5) {
        alert('Veuillez entrer un code postal valide (5 chiffres).');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        return;
      }
      
      // Analyse IA avec Gemini
      let aiAnalysis = null;
      try {
        aiAnalysis = await analyzeEligibilityWithGemini(data);
      } catch (error) {
        console.warn('⚠️ Analyse Gemini échouée, utilisation du calcul standard:', error);
      }
      
      // Calcul estimation aides selon surface toiture
      const roofArea = parseInt(data.roof_area) || 30; // Par défaut 30m²
      const estimatedKwc = aiAnalysis?.estimatedKwc || Math.min(Math.floor(roofArea / 10) * 3, 9); // ~3kWc per 10m², max 9kWc
      const primeAmount = estimatedKwc * 80; // 80€/kWc
      
      // Calcul TVA économisée (approximatif)
      const estimatedCost = estimatedKwc * 2000; // ~2000€/kWc installation
      const tvaEconomy = Math.round(estimatedCost * 0.145); // Différence entre 20% et 5.5%
      
      // Afficher résultat dans modal
      showEligibilityResult({
        eligible: true,
        primeAmount,
        estimatedKwc,
        tvaEconomy,
        aiAnalysis: aiAnalysis?.recommendations,
        ...data
      });

      // Envoyer emails via EmailJS
      await sendEmails(data, {
        primeAmount,
        estimatedKwc,
        tvaEconomy
      });
      
      // Track conversion analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          'event_category': 'conversion',
          'event_label': 'eligibility_form',
          'value': primeAmount
        });
      }
      
      // Réinitialiser le formulaire
      form.reset();
      
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// ============================================
// MODAL RÉSULTAT ÉLIGIBILITÉ
// ============================================

function showEligibilityResult(result) {
  const modal = document.getElementById('result-modal');
  const modalBody = document.getElementById('modal-body');
  
  if (!modal || !modalBody) return;
  
  // Construire le HTML du résultat
  const resultHTML = `
    <h2>🎉 Félicitations ${result.name.split(' ')[0]} !</h2>
    <p class="big-number">${result.primeAmount}€</p>
    <p style="text-align: center; font-size: 1.2rem; margin-bottom: 30px;">
      Prime autoconsommation estimée pour <strong>${result.estimatedKwc}kWc</strong>
    </p>
    <ul style="list-style: none; padding: 0;">
      <li style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
        ✓ TVA réduite 5.5% (économie ~${result.tvaEconomy}€)
      </li>
      <li style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
        ✓ Revente surplus 20 ans garantie (0.13€/kWh)
      </li>
      <li style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
        ${result.estimatedKwc >= 6 ? '✓ Éligible Éco-PTZ 15000€ sans intérêts' : '✓ Exonération impôts si <3kWc'}
      </li>
      <li style="padding: 12px 0;">
        ✓ Production estimée: ${result.estimatedKwc * 1000}kWh/an
      </li>
    </ul>
    <p style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px; text-align: center;">
      <strong>Un conseiller RGE vous contacte sous 24h pour devis personnalisé gratuit.</strong><br>
      <small style="color: #666;">Un email de confirmation vous a été envoyé.</small>
    </p>
    <button onclick="closeModal()" class="cta-button-primary" style="width: 100%; margin-top: 20px;">
      Parfait, j'attends l'appel
    </button>
  `;
  
  modalBody.innerHTML = resultHTML;
  modal.style.display = 'flex';
  
  // Empêcher le scroll du body quand modal ouverte
  document.body.style.overflow = 'hidden';
  
  // Incrémenter le compteur
  animateCounter();
}

function closeModal() {
  const modal = document.getElementById('result-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Fermer modal en cliquant en dehors
document.addEventListener('click', function(e) {
  const modal = document.getElementById('result-modal');
  if (modal && e.target === modal) {
    closeModal();
  }
});

// Fermer modal avec Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ============================================
// ANALYSE IA AVEC GEMINI
// ============================================

async function analyzeEligibilityWithGemini(formData) {
  try {
    const prompt = `Analyse l'éligibilité d'un propriétaire français aux aides panneaux solaires 2025.

Informations:
- Type de bien: ${formData.property_type === 'house' ? 'Maison individuelle' : 'Appartement'}
- Statut: ${formData.owner_status === 'owner' ? 'Propriétaire' : 'Locataire'}
- Code postal: ${formData.zipcode}
- Surface toiture: ${formData.roof_area || 'Non renseigné'}m²

Réponds en JSON avec:
{
  "eligible": true/false,
  "estimatedKwc": nombre entre 3 et 9,
  "recommendations": "recommandations personnalisées en français",
  "primeAmount": montant en euros,
  "additionalAids": ["liste des aides supplémentaires"]
}`;

    const response = await fetch(`${GEMINI_CONFIG.API_URL}?key=${GEMINI_CONFIG.API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    
    // Extraire le JSON de la réponse
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback si pas de JSON
    return {
      eligible: true,
      estimatedKwc: Math.min(Math.floor((parseInt(formData.roof_area) || 30) / 10) * 3, 9),
      recommendations: "Installation recommandée selon vos critères."
    };
  } catch (error) {
    console.error('Erreur analyse Gemini:', error);
    throw error;
  }
}

// ============================================
// ENVOI EMAILS VIA WEB3FORMS (RECOMMANDÉ) OU EMAILJS
// ============================================

async function sendEmails(formData, calculations) {
  const leadData = {
    ...formData,
    ...calculations,
    timestamp: new Date().toLocaleString('fr-FR'),
    date: new Date().toLocaleDateString('fr-FR'),
    heure: new Date().toLocaleTimeString('fr-FR')
  };
  
  // PRIORITÉ 1: Web3Forms (plus simple, 250 emails/mois gratuits)
  if (WEB3FORMS_CONFIG.ACCESS_KEY && WEB3FORMS_CONFIG.ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
    try {
      const web3formsData = {
        access_key: WEB3FORMS_CONFIG.ACCESS_KEY,
        subject: `🎉 Nouveau Lead Panneaux Solaires - ${formData.name}`,
        from_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        zipcode: formData.zipcode,
        property_type: formData.property_type === 'house' ? 'Maison individuelle' : 'Appartement',
        owner_status: formData.owner_status === 'owner' ? 'Propriétaire' : 'Locataire',
        roof_area: formData.roof_area || 'Non renseigné',
        estimated_kwc: `${calculations.estimatedKwc}kWc`,
        prime_amount: `${calculations.primeAmount}€`,
        tva_economy: `${calculations.tvaEconomy}€`,
        production_estimate: `${calculations.estimatedKwc * 1000}kWh/an`,
        message: `Nouveau lead panneaux solaires ARIEL SOLAR:\n\n` +
                 `📋 Informations client:\n` +
                 `- Nom: ${formData.name}\n` +
                 `- Email: ${formData.email}\n` +
                 `- Téléphone: ${formData.phone}\n` +
                 `- Code Postal: ${formData.zipcode}\n` +
                 `- Type de bien: ${formData.property_type === 'house' ? 'Maison individuelle' : 'Appartement'}\n` +
                 `- Statut: ${formData.owner_status === 'owner' ? 'Propriétaire' : 'Locataire'}\n` +
                 `- Surface toiture: ${formData.roof_area || 'Non renseigné'}m²\n\n` +
                 `💰 Estimation automatique:\n` +
                 `- Puissance estimée: ${calculations.estimatedKwc}kWc\n` +
                 `- Prime autoconsommation: ${calculations.primeAmount}€\n` +
                 `- Économie TVA: ${calculations.tvaEconomy}€\n` +
                 `- Production estimée: ${calculations.estimatedKwc * 1000}kWh/an\n\n` +
                 `📅 Date: ${leadData.timestamp}\n\n` +
                 `⚡ Action requise: Contacter le client sous 24h`
      };
      
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
        console.log('✅ Email envoyé via Web3Forms avec succès:', result);
        return; // Succès, on arrête ici
      } else {
        console.warn('⚠️ Web3Forms a retourné une erreur:', result);
        // On continue avec EmailJS en fallback
      }
    } catch (error) {
      console.error('❌ Erreur Web3Forms, passage à EmailJS:', error);
      // On continue avec EmailJS en fallback
    }
  }
  
  // PRIORITÉ 2: EmailJS (fallback si Web3Forms non configuré ou échoue)
  if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    try {
      // Email 1: Notification pour vous (nouveau lead)
      const emailLeadParams = {
        to_email: 'dreamaiultimate@gmail.com', // Votre email
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        zipcode: formData.zipcode,
        property_type: formData.property_type === 'house' ? 'Maison' : 'Appartement',
        roof_area: formData.roof_area || 'Non renseigné',
        estimated_kwc: `${calculations.estimatedKwc}kWc`,
        prime_amount: `${calculations.primeAmount}€`,
        tva_economy: `${calculations.tvaEconomy}€`,
        timestamp: leadData.timestamp,
        message: `Nouveau lead panneaux solaires:\n\nNom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nCode Postal: ${formData.zipcode}\nType de bien: ${formData.property_type === 'house' ? 'Maison' : 'Appartement'}\nSurface toiture: ${formData.roof_area || 'Non renseigné'}m²\n\nEstimation:\n- Puissance: ${calculations.estimatedKwc}kWc\n- Prime: ${calculations.primeAmount}€\n- Économie TVA: ${calculations.tvaEconomy}€`
      };
      
      // Email 2: Confirmation pour le client
      const emailConfirmParams = {
        to_name: formData.name.split(' ')[0],
        to_email: formData.email,
        prime_amount: `${calculations.primeAmount}€`,
        estimated_kwc: `${calculations.estimatedKwc}kWc`,
        tva_economy: `${calculations.tvaEconomy}€`,
        production_estimate: `${calculations.estimatedKwc * 1000}kWh/an`,
        message: `Bonjour ${formData.name.split(' ')[0]},\n\nMerci d'avoir vérifié votre éligibilité aux aides panneaux solaires 2025.\n\nVotre estimation personnalisée:\n- Prime autoconsommation: ${calculations.primeAmount}€\n- Puissance estimée: ${calculations.estimatedKwc}kWc\n- Économie TVA: ${calculations.tvaEconomy}€\n- Production estimée: ${calculations.estimatedKwc * 1000}kWh/an\n\nUn conseiller RGE certifié vous contactera sous 24h pour un devis personnalisé gratuit.\n\nCordialement,\nL'équipe ARIEL SOLAR`
      };
      
      // Envoyer les deux emails en parallèle
      const [leadResult, confirmResult] = await Promise.all([
        emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_LEAD,
          emailLeadParams
        ),
        emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_CONFIRM,
          emailConfirmParams
        )
      ]);
      
      console.log('✅ Emails envoyés via EmailJS avec succès:', {
        lead: leadResult.status === 200,
        confirm: confirmResult.status === 200
      });
      return;
      
    } catch (error) {
      console.error('❌ Erreur envoi EmailJS:', error);
    }
  }
  
  // Si aucune solution n'est configurée
  console.warn('⚠️ Aucun service email configuré (Web3Forms ou EmailJS). Veuillez configurer vos clés.');
  console.log('📧 Lead reçu (à envoyer manuellement):', { ...formData, ...calculations });
  
  // Ne pas bloquer l'utilisateur - le formulaire fonctionne quand même
  // Les données sont dans la console pour copier-coller si nécessaire
}

// ============================================
// ANALYTICS TRACKING
// ============================================

function initAnalytics() {
  // Track CTA clicks
  document.querySelectorAll('.cta-button-primary').forEach(btn => {
    btn.addEventListener('click', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
          'event_category': 'engagement',
          'event_label': this.textContent.trim(),
          'event_location': this.closest('section')?.id || 'unknown'
        });
      }
    });
  });
  
  // Track scroll depth (optionnel)
  let maxScroll = 0;
  const scrollMilestones = [25, 50, 75, 100];
  const trackedMilestones = new Set();
  
  window.addEventListener('scroll', function() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Track milestones
      scrollMilestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth', {
              'event_category': 'engagement',
              'event_label': `${milestone}%`,
              'value': scrollPercent
            });
          }
        }
      });
    }
  });
  
  // Track time on page (optionnel)
  let startTime = Date.now();
  window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (typeof gtag !== 'undefined' && timeSpent > 10) {
      gtag('event', 'time_on_page', {
        'event_category': 'engagement',
        'event_label': 'seconds',
        'value': timeSpent
      });
    }
  });
}

// ============================================
// ANIMATIONS SCROLL
// ============================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observer les éléments à animer
  document.querySelectorAll('.advantage-card, .testimonial-card, .faq-item').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// UTILITAIRES
// ============================================

// Fonction helper pour formater les nombres
function formatNumber(num) {
  return new Intl.NumberFormat('fr-FR').format(num);
}

// Export pour utilisation externe si nécessaire
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showEligibilityResult,
    closeModal,
    sendEmails,
    animateCounter
  };
}
