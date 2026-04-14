// ===================== CUSTOM CURSOR =====================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
const cursorLabel = document.getElementById('cursorLabel');

let cursorX = -100;
let cursorY = -100;
let dotX = -100;
let dotY = -100;

// Smooth follow for outer ring
function animateCursor() {
  // Outer ring follows with lag
  const currentLeft = parseFloat(cursor.style.left) || cursorX;
  const currentTop = parseFloat(cursor.style.top) || cursorY;
  const newLeft = currentLeft + (cursorX - currentLeft) * 0.15;
  const newTop = currentTop + (cursorY - currentTop) * 0.15;
  cursor.style.left = `${newLeft}px`;
  cursor.style.top = `${newTop}px`;

  // Dot follows instantly
  cursorDot.style.left = `${dotX}px`;
  cursorDot.style.top = `${dotY}px`;

  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  dotX = e.clientX;
  dotY = e.clientY;
});

document.addEventListener('mouseleave', () => {
  cursor.classList.add('hidden');
  cursorDot.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.classList.remove('hidden');
  cursorDot.style.opacity = '1';
});

// Detect hover targets
const hoverTargets = {
  link: 'a, button, .profile-links a, .side-nav-item',
  card: '.profile-card, .timeline-card, .skill-card, .project-card, .highlight-card',
  text: 'p, h1, h2, h3, span'
};

document.addEventListener('mouseover', (e) => {
  const el = e.target;

  if (el.closest(hoverTargets.link)) {
    cursor.className = 'cursor hover-link';
    cursorDot.style.opacity = '0';

    const linkEl = el.closest('a, button');
    if (linkEl) {
      const href = linkEl.getAttribute('href') || '';
      const label = linkEl.getAttribute('aria-label') || '';

      if (linkEl.classList.contains('project-card') || linkEl.classList.contains('highlight-card')) {
        cursorLabel.textContent = translations[currentLang]['cursor.view'];
      } else if (href.startsWith('mailto:')) {
        cursorLabel.textContent = translations[currentLang]['cursor.send'];
      } else if (href.startsWith('http') || href.startsWith('https')) {
        cursorLabel.textContent = translations[currentLang]['cursor.open'];
      } else if (href.startsWith('#')) {
        cursorLabel.textContent = translations[currentLang]['cursor.scroll'];
      } else {
        cursorLabel.textContent = '';
      }
    } else {
      cursorLabel.textContent = '';
    }
  } else if (el.closest(hoverTargets.card)) {
    cursor.className = 'cursor hover-card';
    cursorDot.style.opacity = '0';
    const cardEl = el.closest(hoverTargets.card);
    if (cardEl.classList.contains('project-card') || cardEl.classList.contains('highlight-card')) {
      cursorLabel.textContent = translations[currentLang]['cursor.view'];
    } else {
      cursorLabel.textContent = '';
    }
  } else if (el.closest(hoverTargets.text) && !el.closest('a') && !el.closest(hoverTargets.card)) {
    cursor.className = 'cursor hover-text';
    cursorDot.style.opacity = '0';
    cursorLabel.textContent = '';
  } else {
    cursor.className = 'cursor';
    cursorDot.style.opacity = '1';
    cursorLabel.textContent = '';
  }
});

// ===================== INTERACTIVE DOT GRID (Figma style) =====================
const canvas = document.getElementById('dotGrid');
const ctx = canvas.getContext('2d');

let width, height;
let mouseX = -1000;
let mouseY = -1000;
const DOT_SPACING = 28;
const DOT_BASE_RADIUS = 1;
const DOT_MAX_RADIUS = 3.5;
const INFLUENCE_RADIUS = 140;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('mouseleave', () => {
  mouseX = -1000;
  mouseY = -1000;
});

function drawDots() {
  ctx.clearRect(0, 0, width, height);

  const cols = Math.ceil(width / DOT_SPACING) + 1;
  const rows = Math.ceil(height / DOT_SPACING) + 1;
  const offsetX = (width % DOT_SPACING) / 2;
  const offsetY = (height % DOT_SPACING) / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = offsetX + col * DOT_SPACING;
      const y = offsetY + row * DOT_SPACING;

      const dx = mouseX - x;
      const dy = mouseY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let radius = DOT_BASE_RADIUS;
      let alpha = 0.12;

      if (dist < INFLUENCE_RADIUS) {
        const t = 1 - dist / INFLUENCE_RADIUS;
        const ease = t * t * (3 - 2 * t); // smoothstep
        radius = DOT_BASE_RADIUS + (DOT_MAX_RADIUS - DOT_BASE_RADIUS) * ease;
        alpha = 0.12 + 0.35 * ease;
      }

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fill();
    }
  }

  requestAnimationFrame(drawDots);
}
drawDots();

// ===================== MAGNETIC BUTTONS =====================
const magneticElements = document.querySelectorAll(
  '.lang-toggle, .side-nav-item, .profile-links a, .contact-links a, .contact-email, .project-card, .highlight-card, .case-link, .back-link'
);

magneticElements.forEach((el) => {
  const strength = el.classList.contains('side-nav-item') ? 0.4 : 0.3;
  const threshold = 80; // px distance to start attracting

  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    el.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  });
});

// ===================== CARD TILT =====================
const card = document.getElementById('card');

if (card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  });
}

// ===================== FLOATING CARDS PARALLAX =====================
const floatCards = document.querySelectorAll('.float-card');

// Reveal float cards with stagger
floatCards.forEach((fc, i) => {
  setTimeout(() => fc.classList.add('visible'), 600 + i * 150);
});

// Move float cards subtly with mouse
document.addEventListener('mousemove', (e) => {
  const cx = (e.clientX / window.innerWidth - 0.5) * 2;
  const cy = (e.clientY / window.innerHeight - 0.5) * 2;
  floatCards.forEach((fc) => {
    const speed = parseFloat(fc.dataset.speed) || 1;
    const moveX = cx * 15 * speed;
    const moveY = cy * 12 * speed;
    fc.style.translate = `${moveX}px ${moveY}px`;
  });
});

// ===================== SCROLL REVEAL =====================
const revealElements = document.querySelectorAll('.profile-card, .parallax-fade');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach((el) => {
  const parent = el.closest('.skills-grid') || el.closest('.timeline') || el.closest('.highlights-grid') || el.closest('.masonry');
  if (parent) {
    const siblings = parent.querySelectorAll('.parallax-fade');
    const index = Array.from(siblings).indexOf(el);
    el.style.transitionDelay = `${index * 0.1}s`;
  }
  revealObserver.observe(el);
});

// ===================== SIDE NAV ACTIVE =====================
const sections = document.querySelectorAll('.section, .highlights-section');
const navItems = document.querySelectorAll('.side-nav-item');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      if (id) {
        navItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
        });
      }
    }
  });
}, {
  threshold: 0.35,
});

sections.forEach(section => navObserver.observe(section));

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(item.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
