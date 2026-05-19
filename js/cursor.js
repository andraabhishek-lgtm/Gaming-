/* ========================================
   REWORK GAMING - Custom Cursor
   Advanced Gaming Cursor Effects
======================================== */

class GamingCursor {
  constructor() {
    this.cursor = null;
    this.cursorTrail = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.trailEnabled = true;

    if (window.innerWidth >= 768) {
      this.init();
    }
  }

  init() {
    this.createCursor();
    this.createCursorTrail();
    this.setupEventListeners();
    document.documentElement.style.cursor = 'none';
  }

  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.classList.add('gaming-cursor');

    this.cursor.style.cssText = `
      width: 20px;
      height: 20px;
      border: 2px solid #00d9ff;
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      box-shadow: 0 0 15px #00d9ff, inset 0 0 10px rgba(0, 217, 255, 0.5);
      transition: transform 0.1s ease;
      display: none;
    `;

    document.body.appendChild(this.cursor);
  }

  createCursorTrail() {
    this.cursorTrail = document.createElement('div');
    this.cursorTrail.classList.add('cursor-trail');

    this.cursorTrail.style.cssText = `
      width: 30px;
      height: 30px;
      border: 1px solid rgba(0, 217, 255, 0.5);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 99998;
      box-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
      display: none;
    `;

    document.body.appendChild(this.cursorTrail);
  }

  setupEventListeners() {
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('mouseenter', () => this.showCursor());
    document.addEventListener('mouseleave', () => this.hideCursor());

    document.addEventListener('click', (e) => this.handleClick(e));
    document.addEventListener('mousedown', () => this.handleMouseDown());
    document.addEventListener('mouseup', () => this.handleMouseUp());

    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => this.expandCursor());
      el.addEventListener('mouseleave', () => this.shrinkCursor());
    });
  }

  handleMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (this.cursor) {
      this.cursor.style.left = (this.mouseX - 10) + 'px';
      this.cursor.style.top = (this.mouseY - 10) + 'px';
    }

    if (this.cursorTrail) {
      this.cursorTrail.style.left = (this.mouseX - 15) + 'px';
      this.cursorTrail.style.top = (this.mouseY - 15) + 'px';
    }
  }

  showCursor() {
    if (this.cursor) this.cursor.style.display = 'block';
    if (this.cursorTrail) this.cursorTrail.style.display = 'block';
  }

  hideCursor() {
    if (this.cursor) this.cursor.style.display = 'none';
    if (this.cursorTrail) this.cursorTrail.style.display = 'none';
  }

  expandCursor() {
    if (this.cursor) {
      this.cursor.style.transform = 'scale(1.5)';
      this.cursor.style.borderColor = '#ff006e';
      this.cursor.style.boxShadow = '0 0 20px #ff006e, inset 0 0 15px rgba(255, 0, 110, 0.5)';
    }

    if (this.cursorTrail) {
      this.cursorTrail.style.transform = 'scale(1.3)';
      this.cursorTrail.style.borderColor = 'rgba(255, 0, 110, 0.8)';
    }
  }

  shrinkCursor() {
    if (this.cursor) {
      this.cursor.style.transform = 'scale(1)';
      this.cursor.style.borderColor = '#00d9ff';
      this.cursor.style.boxShadow = '0 0 15px #00d9ff, inset 0 0 10px rgba(0, 217, 255, 0.5)';
    }

    if (this.cursorTrail) {
      this.cursorTrail.style.transform = 'scale(1)';
      this.cursorTrail.style.borderColor = 'rgba(0, 217, 255, 0.5)';
    }
  }

  handleMouseDown() {
    if (this.cursor) {
      this.cursor.style.transform = 'scale(0.8)';
    }
  }

  handleMouseUp() {
    if (this.cursor) {
      this.cursor.style.transform = 'scale(1)';
    }
  }

  handleClick(e) {
    this.createClickEffect(e.clientX, e.clientY);
  }

  createClickEffect(x, y) {
    const effect = document.createElement('div');

    effect.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      left: ${x - 10}px;
      top: ${y - 10}px;
      border: 2px solid #ff006e;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99997;
      animation: clickPulse 0.6s ease-out forwards;
    `;

    document.body.appendChild(effect);

    setTimeout(() => effect.remove(), 600);
  }
}

/* Add click pulse animation */
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  @keyframes clickPulse {
    0% {
      width: 20px;
      height: 20px;
      opacity: 1;
      box-shadow: 0 0 10px #ff006e;
    }
    100% {
      width: 80px;
      height: 80px;
      opacity: 0;
      box-shadow: 0 0 40px #ff006e;
    }
  }

  @keyframes cursorTrail {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
`;

document.head.appendChild(cursorStyle);

/* Initialize Gaming Cursor */
document.addEventListener('DOMContentLoaded', () => {
  new GamingCursor();
});

/* Cursor particle effect */
function createCursorParticles() {
  let lastX = 0;
  let lastY = 0;

  document.addEventListener('mousemove', (e) => {
    const distance = Math.sqrt(
      Math.pow(e.clientX - lastX, 2) +
      Math.pow(e.clientY - lastY, 2)
    );

    if (distance > 25) {
      const particle = document.createElement('div');

      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00d9ff;
        border-radius: 50%;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        pointer-events: none;
        z-index: 99996;
        opacity: 0.8;
        box-shadow: 0 0 5px #00d9ff;
        animation: cursorTrail 0.5s ease-out forwards;
      `;

      document.body.appendChild(particle);

      lastX = e.clientX;
      lastY = e.clientY;

      setTimeout(() => particle.remove(), 500);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth >= 768) {
    createCursorParticles();
  }
});

/* Custom pointer for mobile */
function createMobileCursor() {
  if (window.innerWidth < 768) {
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);

      if (element && element.tagName === 'BUTTON' || element.tagName === 'A') {
        element.style.opacity = '0.8';
      }
    }, false);

    document.addEventListener('touchend', () => {
      document.querySelectorAll('button, a').forEach(el => {
        el.style.opacity = '1';
      });
    }, false);
  }
}

document.addEventListener('DOMContentLoaded', createMobileCursor);

/* Spotlight effect on cursor */
function createSpotlightEffect() {
  if (window.innerWidth < 768) return;

  const spotlight = document.createElement('div');

  spotlight.style.cssText = `
    position: fixed;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 217, 255, 0.1), transparent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99997;
    display: none;
  `;

  document.body.appendChild(spotlight);

  document.addEventListener('mousemove', (e) => {
    spotlight.style.display = 'block';
    spotlight.style.left = (e.clientX - 100) + 'px';
    spotlight.style.top = (e.clientY - 100) + 'px';
  });

  document.addEventListener('mouseleave', () => {
    spotlight.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', createSpotlightEffect);
