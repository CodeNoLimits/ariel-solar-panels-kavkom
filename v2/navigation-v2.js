/**
 * Navigation Multi-Pages
 * Système de navigation pour site multi-pages
 */

// Pages disponibles
const PAGES = {
  'index.html': 'Accueil',
  'services.html': 'Services',
  'aides-financements.html': 'Aides & Financements',
  'a-propos.html': 'À Propos',
  'contact.html': 'Contact',
  'actualites.html': 'Actualités'
};

// Générer la navigation
function generateNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  const navHTML = `
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="nav-brand">
          <span class="logo-icon">☀️</span>
          ARIEL SOLAR
        </a>
        <div class="nav-menu" id="nav-menu">
          <a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Accueil</a>
          <a href="services.html" class="nav-link ${currentPage === 'services.html' ? 'active' : ''}">Services</a>
          <a href="aides-financements.html" class="nav-link ${currentPage === 'aides-financements.html' ? 'active' : ''}">Aides & Financements</a>
          <a href="a-propos.html" class="nav-link ${currentPage === 'a-propos.html' ? 'active' : ''}">À Propos</a>
          <a href="contact.html" class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}">Contact</a>
          <a href="actualites.html" class="nav-link ${currentPage === 'actualites.html' ? 'active' : ''}">Actualités</a>
          <a href="index.html#eligibility-form" class="nav-cta">Vérifier Mon Éligibilité</a>
        </div>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `;
  
  // Insérer la navigation au début du body
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  
  // Gérer le menu mobile
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
}

// Générer le footer
function generateFooter() {
  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>
              <span class="logo-icon">☀️</span>
              ARIEL SOLAR
            </h3>
            <p>Votre spécialiste en panneaux solaires et aides de l'État</p>
            <div class="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
          </div>
          <div class="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><a href="index.html">Accueil</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="aides-financements.html">Aides & Financements</a></li>
              <li><a href="a-propos.html">À Propos</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="actualites.html">Actualités</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Légal</h4>
            <ul>
              <li><a href="#mentions-legales">Mentions Légales</a></li>
              <li><a href="#confidentialite">Politique de Confidentialité</a></li>
              <li><a href="#cgu">CGU</a></li>
              <li><a href="#cookies">Politique Cookies</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Contact</h4>
            <p>📧 Email: contact@arielsolar.fr</p>
            <p>📞 Téléphone: 01 XX XX XX XX</p>
            <p>📍 Adresse: Paris, France</p>
            <p>🕒 Horaires: Lun-Ven 9h-18h</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 ARIEL SOLAR PANELS KAVKOM - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  `;
  
  // Insérer le footer à la fin du body
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    generateNavigation();
    generateFooter();
  });
} else {
  generateNavigation();
  generateFooter();
}

