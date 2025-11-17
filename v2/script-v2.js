/**
 * Landing Page Panneaux Solaires 2025
 * Script principal: Validation formulaire éligibilité, Modal, Analytics, Smooth Scroll
 * Note: Formulaire contact géré par contact-form.js
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
// NOTE: EmailJS retiré en V2
// ============================================
// Web3Forms est maintenant la seule solution utilisée
// Plus simple, plus fiable, 250 emails/mois gratuits

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
  const form = document.getElementById('eligibility-form');
  
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
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="form-loader"></span> Analyse IA en cours...';
    
    try {
      // Récupérer les données du formulaire
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Validation: Vérifier si propriétaire
      if (data.owner_status !== 'owner') {
        showFormInfo('Les aides panneaux solaires sont réservées aux propriétaires.<br>Les locataires ne peuvent malheureusement pas bénéficier de ces dispositifs.');
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        return;
      }

      // Validation: Vérifier champs requis
      if (!data.name || !data.email || !data.phone || !data.zipcode || !data.property_type) {
        showFormError('Veuillez remplir tous les champs obligatoires pour continuer.');
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        return;
      }

      // Validation: Format téléphone (10 chiffres)
      if (data.phone.length !== 10) {
        showFormError('Veuillez entrer un numéro de téléphone valide à 10 chiffres.');
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        return;
      }

      // Validation: Format code postal (5 chiffres)
      if (data.zipcode.length !== 5) {
        showFormError('Veuillez entrer un code postal valide à 5 chiffres.');
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        return;
      }
      
      // Analyse IA avec Gemini
      let aiAnalysis = null;
      let geminiWorked = false;
      try {
        aiAnalysis = await analyzeEligibilityWithGemini(data);
        console.log('✅ Analyse Gemini réussie:', aiAnalysis);
        geminiWorked = true;
      } catch (error) {
        console.warn('⚠️ Analyse Gemini échouée, utilisation du calcul standard:', error);
        // Note: On continue avec le calcul standard (fallback)
        geminiWorked = false;
      }
      
      // Calcul estimation aides selon surface toiture et résultat IA
      const roofArea = parseInt(data.roof_area) || 30; // Par défaut 30m²
      
      // PRIORITÉ: Utiliser le résultat de Gemini si disponible et valide
      let estimatedKwc, primeAmount;
      
      if (aiAnalysis && aiAnalysis.estimatedKwc && aiAnalysis.primeAmount) {
        // Utiliser directement les valeurs de Gemini
        estimatedKwc = Math.min(Math.max(parseInt(aiAnalysis.estimatedKwc) || 3, 3), 9); // Entre 3 et 9kWc
        primeAmount = parseInt(aiAnalysis.primeAmount) || (estimatedKwc * 80);
        console.log('📊 Utilisation valeurs Gemini:', { estimatedKwc, primeAmount });
      } else {
        // Calcul dynamique basé sur la surface réelle
        // Formule: ~3kWc par 10m² de toiture, avec limites réalistes
        const baseKwc = Math.floor(roofArea / 10) * 3;
        estimatedKwc = Math.min(Math.max(baseKwc, 3), 9); // Entre 3 et 9kWc
        primeAmount = estimatedKwc * 80; // 80€/kWc en 2025
        console.log('📊 Calcul standard basé sur surface:', { roofArea, estimatedKwc, primeAmount });
      }
      
      // Calcul TVA économisée (approximatif)
      const estimatedCost = estimatedKwc * 2000; // ~2000€/kWc installation
      const tvaEconomy = Math.round(estimatedCost * 0.145); // Différence entre 20% et 5.5%
      
      // Afficher résultat dans modal
      showEligibilityResult({
        eligible: true,
        primeAmount,
        estimatedKwc,
        tvaEconomy,
        annualProduction: aiAnalysis?.annualProduction, // Production de Gemini si disponible
        aiAnalysis: aiAnalysis?.recommendations,
        ...data
      });

      // Envoyer email via Web3Forms
      await sendEmailWeb3Forms(data, {
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
      showFormError(`Une erreur est survenue lors de l'analyse.<br>Détails: ${error.message || 'Erreur inconnue'}<br><br>Veuillez réessayer ou nous contacter directement.`);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
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

  // Production annuelle: utiliser celle de Gemini si disponible, sinon calcul standard
  const annualProduction = result.annualProduction || (result.estimatedKwc * 1000);
  const hasAiRecommendations = result.aiAnalysis && result.aiAnalysis.length > 50;

  // Construire le HTML du résultat
  const resultHTML = `
    <h2>🎉 Félicitations ${result.name.split(' ')[0]} !</h2>
    <p class="big-number">${result.primeAmount}€</p>
    <p style="text-align: center; font-size: 1.2rem; margin-bottom: 30px;">
      Prime autoconsommation estimée pour <strong>${result.estimatedKwc}kWc</strong>
    </p>

    ${hasAiRecommendations ? `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
      <h3 style="margin: 0 0 12px 0; font-size: 1.1rem;">🤖 Analyse IA Personnalisée</h3>
      <p style="margin: 0; line-height: 1.6; font-size: 0.95rem;">${result.aiAnalysis}</p>
    </div>
    ` : ''}

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
        ✓ Production estimée: <strong>${Math.round(annualProduction).toLocaleString('fr-FR')} kWh/an</strong>
        ${hasAiRecommendations ? '<br><small style="color: #666;">Calculé selon votre zone géographique</small>' : ''}
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
    const roofArea = parseInt(formData.roof_area) || 30;
    const propertyType = formData.property_type === 'house' ? 'Maison individuelle' : 'Appartement';
    const ownerStatus = formData.owner_status === 'owner' ? 'Propriétaire' : 'Locataire';

    // Déterminer la zone d'ensoleillement selon le département
    const postalCode = formData.zipcode || "75000";
    const dept = postalCode.substring(0, 2);
    let solarZone = "moyenne";
    let solarFactor = 1100; // kWh/kWc/an

    // Sud de la France (excellent ensoleillement)
    if (['06', '13', '83', '84', '30', '34', '66', '11', '09', '31', '32', '40', '64', '65'].includes(dept)) {
      solarZone = "excellente (Sud de la France)";
      solarFactor = 1300;
    }
    // Nord/Nord-Est (ensoleillement faible)
    else if (['59', '62', '80', '02', '08', '51', '54', '55', '57', '67', '68', '88'].includes(dept)) {
      solarZone = "faible (Nord de la France)";
      solarFactor = 950;
    }
    // Ouest (bon ensoleillement)
    else if (['29', '35', '44', '56', '85', '17', '33'].includes(dept)) {
      solarZone = "bonne (Ouest/Atlantique)";
      solarFactor = 1150;
    }

    const prompt = `Tu es un expert en panneaux solaires photovoltaïques en France. Analyse cette demande de manière PERSONNALISÉE et INTELLIGENTE.

DONNÉES CLIENT (FRANCE ${new Date().getFullYear()}):
- Type de bien: ${propertyType}
- Statut: ${ownerStatus}
- Code postal: ${formData.zipcode} (Département ${dept})
- Zone d'ensoleillement: ${solarZone}
- Surface toiture disponible: ${roofArea}m²

TA MISSION - ANALYSE INTELLIGENTE:
1. Calculer la puissance optimale (kWc) en tenant compte de:
   - Surface toiture (règle: 1kWc nécessite 8-10m² selon orientation/inclinaison)
   - Type de bien (maison = plus flexible, appartement = contraintes copropriété)
   - Zone géographique et ensoleillement (${solarZone})
   - Réglementation: max 9kWc pour prime autoconsommation optimale
   - Vérifier cohérence: une surface de ${roofArea}m² peut-elle supporter la puissance calculée?

2. Calculer les aides financières 2025:
   - Prime autoconsommation: 80€/kWc (tarif officiel 2025)
   - Estimer la TVA réduite 5.5% vs 20%
   - Identifier autres aides selon profil

3. Estimer la production annuelle réaliste:
   - Formule: kWc × ${solarFactor} kWh/an (facteur selon zone ${solarZone})
   - Ajuster selon type de bien

4. Recommandations SPÉCIFIQUES à CE client:
   - Basées sur son profil exact (${propertyType}, ${ownerStatus}, zone ${solarZone})
   - Conseils d'optimisation
   - Aides supplémentaires adaptées

RÈGLES STRICTES:
- Locataire = TOUJOURS inéligible (aucune exception)
- Propriétaire maison = éligible si surface suffisante (≥15m²)
- Propriétaire appartement = éligible mais limité (généralement 3-6kWc max)
- Cohérence surface/puissance: ne pas proposer 9kWc sur 20m²!

RÉPONDS UNIQUEMENT EN JSON VALIDE (sans markdown, sans texte avant/après):
{
  "eligible": true ou false (selon règles strictes),
  "estimatedKwc": nombre réaliste entre 3 et 9 (cohérent avec surface),
  "primeAmount": nombre (estimatedKwc × 80),
  "annualProduction": nombre en kWh (estimatedKwc × ${solarFactor}),
  "recommendations": "Analyse DÉTAILLÉE et PERSONNALISÉE (4-5 phrases) expliquant POURQUOI ces chiffres pour CE client précis, avec conseils adaptés à sa situation",
  "additionalAids": ["liste aides supplémentaires possibles: MaPrimeRénov', CEE, aides locales selon département ${dept}"],
  "analysisDetails": {
    "solarZone": "${solarZone}",
    "productionFactor": ${solarFactor},
    "surfaceAdequacy": "est-ce que ${roofArea}m² est suffisant/optimal pour la puissance proposée?",
    "optimizationTips": "conseils spécifiques orientation/inclinaison pour zone ${solarZone}"
  }
}

EXIGENCE: Adapte VRAIMENT tes calculs au profil. Un appartement à Paris (${dept === '75' ? 'oui' : 'non'}) n'aura PAS les mêmes recommandations qu'une maison à Marseille. Sois intelligent!`;

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
// ENVOI EMAIL VIA WEB3FORMS
// ============================================

async function sendEmailWeb3Forms(formData, calculations) {
  const leadData = {
    ...formData,
    ...calculations,
    timestamp: new Date().toLocaleString('fr-FR'),
    date: new Date().toLocaleDateString('fr-FR'),
    heure: new Date().toLocaleTimeString('fr-FR')
  };
  
  // Envoyer via Web3Forms
  if (WEB3FORMS_CONFIG.ACCESS_KEY) {
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
        return;
      } else {
        console.error('❌ Web3Forms a retourné une erreur:', result);
        throw new Error('Erreur Web3Forms: ' + JSON.stringify(result));
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi Web3Forms:', error);
      // Ne pas bloquer l'utilisateur - le formulaire fonctionne quand même
      // Les données sont dans la console pour copier-coller si nécessaire
      throw error;
    }
  } else {
    console.warn('⚠️ Web3Forms ACCESS_KEY non configuré');
    throw new Error('Configuration Web3Forms manquante');
  }
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
// FEEDBACK VISUEL FORMULAIRES
// ============================================

/**
 * Afficher un message d'erreur pour le formulaire d'éligibilité
 */
function showFormError(message) {
  // Supprimer les messages existants
  const existingMessages = document.querySelectorAll('.form-message');
  existingMessages.forEach(msg => msg.remove());

  // Créer le message d'erreur
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-message form-message-error';
  errorDiv.innerHTML = `<strong>❌ Erreur</strong><br>${message}`;
  errorDiv.style.cssText = `
    background: linear-gradient(135deg, #fee 0%, #fdd 100%);
    color: #c33;
    padding: 20px;
    border-radius: 12px;
    margin-top: 20px;
    border-left: 4px solid #c33;
    box-shadow: 0 4px 15px rgba(204, 51, 51, 0.2);
    font-size: 0.95rem;
    line-height: 1.6;
    animation: slideIn 0.3s ease;
  `;

  // Insérer après le formulaire
  const form = document.getElementById('eligibility-form');
  if (form) {
    form.parentNode.insertBefore(errorDiv, form.nextSibling);

    // Scroll vers le message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Supprimer après 6 secondes
    setTimeout(() => {
      errorDiv.style.opacity = '0';
      errorDiv.style.transform = 'translateY(-10px)';
      errorDiv.style.transition = 'all 0.3s ease';
      setTimeout(() => errorDiv.remove(), 300);
    }, 6000);
  }
}

/**
 * Afficher un message d'information
 */
function showFormInfo(message) {
  // Supprimer les messages existants
  const existingMessages = document.querySelectorAll('.form-message');
  existingMessages.forEach(msg => msg.remove());

  // Créer le message d'info
  const infoDiv = document.createElement('div');
  infoDiv.className = 'form-message form-message-info';
  infoDiv.innerHTML = `<strong>ℹ️ Information</strong><br>${message}`;
  infoDiv.style.cssText = `
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    color: #1565c0;
    padding: 20px;
    border-radius: 12px;
    margin-top: 20px;
    border-left: 4px solid #1976d2;
    box-shadow: 0 4px 15px rgba(25, 118, 210, 0.2);
    font-size: 0.95rem;
    line-height: 1.6;
    animation: slideIn 0.3s ease;
  `;

  // Insérer après le formulaire
  const form = document.getElementById('eligibility-form');
  if (form) {
    form.parentNode.insertBefore(infoDiv, form.nextSibling);
    infoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => {
      infoDiv.style.opacity = '0';
      infoDiv.style.transform = 'translateY(-10px)';
      infoDiv.style.transition = 'all 0.3s ease';
      setTimeout(() => infoDiv.remove(), 300);
    }, 6000);
  }
}

// Animation slide-in pour les messages
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);

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
