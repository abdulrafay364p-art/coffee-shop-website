/* =========================================
   BREWED & CO. — JavaScript
   ========================================= */

// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// === MOBILE NAV TOGGLE ===
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  const spans = navToggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav when a link is clicked
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// === ACTIVE NAV LINK ON SCROLL ===
const sections = document.querySelectorAll('.page[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));

// === MENU TABS ===
const tabBtns  = document.querySelectorAll('.tab-btn');
const tabDrinks = document.getElementById('tab-drinks');
const tabFood   = document.getElementById('tab-food');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    tabDrinks.classList.toggle('hidden', tab !== 'drinks');
    tabFood.classList.toggle('hidden', tab !== 'food');
  });
});

// === CONTACT FORM ===
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Simulate submission (replace with real backend/Formspree/etc.)
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    formSuccess.classList.remove('hidden');
    submitBtn.textContent = 'Send Message ✉️';
    submitBtn.disabled = false;
    setTimeout(() => formSuccess.classList.add('hidden'), 5000);
  }, 1200);
});

// === SCROLL REVEAL ANIMATION ===
const revealEls = document.querySelectorAll('.menu-card, .info-block, .contact-form-wrap, .map-wrap');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = (i * 0.06) + 's';
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Add base style for reveal
const style = document.createElement('style');
style.textContent = `
  .menu-card, .info-block, .contact-form-wrap, .map-wrap {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .menu-card.revealed, .info-block.revealed,
  .contact-form-wrap.revealed, .map-wrap.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

revealEls.forEach(el => revealObserver.observe(el));

