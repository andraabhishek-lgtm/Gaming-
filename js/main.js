/* ========================================
   REWORK GAMING - Main JavaScript
   Modern Gaming Website Effects
======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initMagneticButtons();
  initTextScramble();
  initGlitchEffect();
  initTypewriter();
  initHoverTilt();
  initGamingCursor();
  initFloatingIcons();
  initNeonFlicker();
  createScrollProgress();
  setupMenuToggle();
  setupFormHandling();
});

/* ========================================
   Menu Toggle for Mobile
======================================== */
function setupMenuToggle() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }
}

/* ========================================
   Gaming Parallax Effect
======================================== */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (!parallaxElements.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.4;
      element.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}

/* ========================================
   Magnetic Gaming Buttons
======================================== */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn, .nav-link, .social-link, .filter-btn');

  buttons.forEach(button => {
    button.addEventListener('mousemove', e => {
      const rect = button.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
}

/* ========================================
   Hacker Text Scramble
======================================== */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);

    const promise = new Promise(resolve => this.resolve = resolve);

    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';

      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);

      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);

    this.frame = 0;
    this.update();

    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.3) {
          char = this.randomChar();
          this.queue[i].char = char;
        }

        output += `<span class="scramble">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function initTextScramble() {
  document.querySelectorAll('[data-scramble]').forEach(el => {
    const fx = new TextScramble(el);
    const text = el.innerText;

    el.addEventListener('mouseenter', () => {
      fx.setText(text);
    });
  });
}

/* ========================================
   Gaming Glitch Effect
======================================== */
function initGlitchEffect() {
  const glitchElements = document.querySelectorAll('[data-glitch]');

  glitchElements.forEach(el => {
    const originalText = el.innerText;

    el.addEventListener('mouseenter', () => {
      let iteration = 0;

      const interval = setInterval(() => {
        el.innerText = originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }

            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2;
      }, 40);
    });
  });
}

/* ========================================
   Typewriter Gaming Effect
======================================== */
function initTypewriter() {
  const elements = document.querySelectorAll('[data-typewriter]');

  elements.forEach(el => {
    const text = el.dataset.typewriter;
    const speed = el.dataset.speed || 80;

    el.innerHTML = '';

    let i = 0;

    function type() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          observer.unobserve(el);
        }
      });
    });

    observer.observe(el);
  });
}

/* ========================================
   3D Gaming Cards Tilt
======================================== */
function initHoverTilt() {
  const cards = document.querySelectorAll(
    '.game-card, .team-card, .blog-card, .blog-post, .tournament-card, .detail-card, .value-card'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y - rect.height / 2) / 12;
      const rotateY = (rect.width / 2 - x) / 12;

      card.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ========================================
   Gaming Cursor Glow
======================================== */
function initGamingCursor() {
  if (window.innerWidth < 768) return;

  const cursor = document.createElement('div');
  cursor.classList.add('gaming-cursor');

  cursor.style.cssText = `
    width:20px;
    height:20px;
    border:2px solid #00d9ff;
    border-radius:50%;
    position:fixed;
    pointer-events:none;
    z-index:99999;
    transition:transform .1s ease;
    box-shadow:0 0 15px #00d9ff;
    display:none;
  `;

  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.display = 'block';
    cursor.style.left = (e.clientX - 10) + 'px';
    cursor.style.top = (e.clientY - 10) + 'px';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
  });
}

/* ========================================
   Floating Gaming Icons
======================================== */
function initFloatingIcons() {
  const icons = document.querySelectorAll('.floating-icon');

  icons.forEach((icon, index) => {
    icon.style.animation = `float ${3 + index}s ease-in-out infinite`;
  });
}

/* ========================================
   Neon Flicker Effect
======================================== */
function initNeonFlicker() {
  const neonTexts = document.querySelectorAll('.neon-text');

  neonTexts.forEach(text => {
    setInterval(() => {
      text.style.opacity = 0.8 + Math.random() * 0.2;
      text.style.textShadow = `0 0 ${10 + Math.random() * 20}px #ff006e`;
    }, 120);
  });
}

/* ========================================
   Scroll Progress Bar
======================================== */
function createScrollProgress() {
  const progress = document.createElement('div');

  progress.style.cssText = `
    position:fixed;
    top:0;
    left:0;
    height:4px;
    width:0%;
    background:linear-gradient(90deg,#00d9ff,#8b5cf6,#ff006e);
    z-index:99999;
    transition:width 0.1s ease;
  `;

  document.body.appendChild(progress);

  window.addEventListener('scroll', () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progressWidth =
      (window.pageYOffset / totalHeight) * 100;

    progress.style.width = progressWidth + '%';
  });
}

/* ========================================
   Gaming Confetti Explosion
======================================== */
function createConfetti(x, y) {
  const colors = ['#00d9ff', '#8b5cf6', '#ff006e', '#39ff14'];

  for (let i = 0; i < 25; i++) {
    const confetti = document.createElement('div');

    confetti.style.cssText = `
      position:fixed;
      width:8px;
      height:8px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${x}px;
      top:${y}px;
      z-index:9999;
      pointer-events:none;
      border-radius:50%;
    `;

    document.body.appendChild(confetti);

    let angle = Math.random() * Math.PI * 2;
    let velocity = Math.random() * 8;

    let posX = x;
    let posY = y;

    let opacity = 1;

    function animate() {
      posX += Math.cos(angle) * velocity;
      posY += Math.sin(angle) * velocity + 2;

      opacity -= 0.03;

      confetti.style.left = posX + 'px';
      confetti.style.top = posY + 'px';
      confetti.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        confetti.remove();
      }
    }

    animate();
  }
}

/* ========================================
   Confetti on Button Click
======================================== */
function setupConfetti() {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect();

      createConfetti(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
    });
  });
}

setupConfetti();

/* ========================================
   Smooth Scroll Behavior
======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ========================================
   Form Handling
======================================== */
function setupFormHandling() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      console.log('Form submitted:', {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
      });

      const rect = contactForm.getBoundingClientRect();
      createConfetti(rect.left + rect.width / 2, rect.top);

      contactForm.reset();

      alert('Thank you for your message! We will get back to you soon.');
    });
  }
}

/* ========================================
   Blog Search Functionality
======================================== */
function setupBlogSearch() {
  const searchInput = document.getElementById('searchBlog');
  const categoryFilter = document.getElementById('categoryFilter');
  const blogCards = document.querySelectorAll('.blog-post');

  if (searchInput && blogCards.length > 0) {
    function filterBlogs() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

      blogCards.forEach(card => {
        const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
        const text = card.innerText.toLowerCase();
        const category = card.dataset.category || 'all';

        const matches = title.includes(searchTerm) || text.includes(searchTerm);
        const matchesCategory =
          selectedCategory === 'all' || category === selectedCategory;

        card.style.display = matches && matchesCategory ? 'flex' : 'none';

        if (matches && matchesCategory) {
          card.style.animation = 'fadeIn 0.5s ease-out';
        }
      });
    }

    searchInput.addEventListener('input', filterBlogs);

    if (categoryFilter) {
      categoryFilter.addEventListener('change', filterBlogs);
    }
  }
}

document.addEventListener('DOMContentLoaded', setupBlogSearch);

/* ========================================
   Tournament Filter Functionality
======================================== */
function setupTournamentFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const tournamentCards = document.querySelectorAll('.tournament-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      tournamentCards.forEach(card => {
        const game = card.dataset.game;

        if (filter === 'all' || game === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', setupTournamentFilter);

/* ========================================
   Lazy Loading for Images
======================================== */
function setupLazyLoading() {
  const images = document.querySelectorAll('img');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src || img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

document.addEventListener('DOMContentLoaded', setupLazyLoading);

/* ========================================
   Scroll Animation Trigger
======================================== */
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.game-card, .team-card, .blog-card, .blog-post, .tournament-card').forEach(el => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', setupScrollAnimations);
