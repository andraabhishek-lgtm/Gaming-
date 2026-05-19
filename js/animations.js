/* ========================================
   REWORK GAMING - Animations Module
   Animation Utilities and Effects
======================================== */

/* Reveal Animation on Scroll */
function setupRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        entry.target.style.animation = 'slideInBottom 0.8s ease-out forwards';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', setupRevealOnScroll);

/* Counter Animation */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const target = parseInt(counter.innerText.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);

    let current = 0;

    const updateCounter = () => {
      current += increment;

      if (current < target) {
        counter.innerText = Math.floor(current) + counter.innerText.slice(-1);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = counter.innerText.replace(/\d+/, target);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.unobserve(counter);
      }
    });

    observer.observe(counter);
  });
}

document.addEventListener('DOMContentLoaded', animateCounters);

/* Gradient Text Animation */
function createGradientText() {
  const elements = document.querySelectorAll('[data-gradient]');

  elements.forEach(el => {
    el.style.backgroundImage = 'linear-gradient(135deg, #ff006e, #00d9ff, #ffbe0b)';
    el.style.backgroundSize = '200% 200%';
    el.style.backgroundClip = 'text';
    el.style.webkitBackgroundClip = 'text';
    el.style.webkitTextFillColor = 'transparent';
    el.classList.add('gradient-shift');
  });
}

document.addEventListener('DOMContentLoaded', createGradientText);

/* Underline Animation */
function createUnderlineAnimation() {
  const links = document.querySelectorAll('a[data-underline]');

  links.forEach(link => {
    link.style.position = 'relative';

    const underline = document.createElement('span');
    underline.style.cssText = `
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #ff006e, #00d9ff);
      transition: width 0.3s ease;
    `;

    link.appendChild(underline);

    link.addEventListener('mouseenter', () => {
      underline.style.width = '100%';
    });

    link.addEventListener('mouseleave', () => {
      underline.style.width = '0';
    });
  });
}

document.addEventListener('DOMContentLoaded', createUnderlineAnimation);

/* Background Color Animation */
function animateBackgroundColor() {
  const elements = document.querySelectorAll('[data-bg-animate]');

  elements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.background = 'linear-gradient(135deg, rgba(255,0,110,0.1), rgba(0,217,255,0.1))';
      this.style.transition = 'background 0.3s ease';
    });

    el.addEventListener('mouseleave', function() {
      this.style.background = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', animateBackgroundColor);

/* Number Pulse Animation */
function pulseNumbers() {
  const numbers = document.querySelectorAll('.stat-number, [data-number]');

  numbers.forEach(num => {
    num.style.animation = 'pulse 2s infinite';
  });
}

document.addEventListener('DOMContentLoaded', pulseNumbers);

/* Border Animation */
function createBorderAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes borderFlow {
      0% {
        background-position: 0% 0%;
      }
      100% {
        background-position: 400% 0%;
      }
    }

    .border-animated {
      background: linear-gradient(
        90deg,
        #ff006e 0%,
        #00d9ff 25%,
        #ffbe0b 50%,
        #39ff14 75%,
        #ff006e 100%
      );
      background-size: 400% 100%;
      animation: borderFlow 3s linear infinite;
      padding: 2px;
    }

    .border-animated-inner {
      background: var(--darker-bg);
      padding: 30px;
    }
  `;

  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', createBorderAnimation);

/* Glow on Hover */
function createGlowOnHover() {
  const elements = document.querySelectorAll('[data-glow]');

  elements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.boxShadow = `0 0 30px var(--primary-color), inset 0 0 20px rgba(255,0,110,0.2)`;
    });

    el.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', createGlowOnHover);

/* Wave Text Animation */
function createWaveText() {
  const elements = document.querySelectorAll('[data-wave]');

  elements.forEach(el => {
    const text = el.innerText;
    let html = '';

    text.split('').forEach((char, i) => {
      html += `<span style="
        display: inline-block;
        animation: wave 0.6s ease-in-out ${i * 0.05}s infinite;
      ">${char}</span>`;
    });

    el.innerHTML = html;
  });
}

document.addEventListener('DOMContentLoaded', createWaveText);

/* Add wave animation */
const waveStyle = document.createElement('style');
waveStyle.textContent = `
  @keyframes wave {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;
document.head.appendChild(waveStyle);

/* Fade in on Load */
function fadeInOnLoad() {
  document.body.style.animation = 'fadeIn 0.5s ease-out';
}

document.addEventListener('DOMContentLoaded', fadeInOnLoad);

/* Scroll Progress Text */
function displayScrollProgress() {
  const progressText = document.createElement('div');
  progressText.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(255, 0, 110, 0.1);
    border: 1px solid rgba(255, 0, 110, 0.3);
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 12px;
    color: #00d9ff;
    z-index: 9999;
    display: none;
  `;

  document.body.appendChild(progressText);

  window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressText.innerText = `${Math.floor(scrollPercentage)}% Scrolled`;
    progressText.style.display = scrollPercentage > 5 ? 'block' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', displayScrollProgress);

/* Smooth Color Transition on Scroll */
function colorTransitionOnScroll() {
  const colors = ['#ff006e', '#00d9ff', '#ffbe0b', '#39ff14'];
  let colorIndex = 0;

  window.addEventListener('scroll', () => {
    const section = Math.floor((window.scrollY / window.innerHeight) % colors.length);
    
    if (section !== colorIndex) {
      colorIndex = section;
      document.documentElement.style.setProperty(
        '--current-color',
        colors[colorIndex]
      );
    }
  });
}

document.addEventListener('DOMContentLoaded', colorTransitionOnScroll);
