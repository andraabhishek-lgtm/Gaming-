/* ========================================
   REWORK GAMING - Particle Effects
   Advanced Visual Effects
======================================== */

class ParticleSystem {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      pointer-events: none;
    `;

    this.container.appendChild(this.canvas);
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
  }

  createParticles(count = 50) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 100 + 50,
        maxLife: 100,
        size: Math.random() * 3 + 1,
        color: this.getRandomColor()
      });
    }
  }

  getRandomColor() {
    const colors = ['#ff006e', '#00d9ff', '#ffbe0b', '#39ff14'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;

      if (particle.life <= 0) {
        this.particles.splice(index, 1);
      }

      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1;
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      const opacity = particle.life / particle.maxLife;

      this.ctx.fillStyle = particle.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

/* Initialize particles on hero section */
document.addEventListener('DOMContentLoaded', () => {
  const particlesContainer = document.getElementById('particles');

  if (particlesContainer) {
    const particleSystem = new ParticleSystem(particlesContainer);
    particleSystem.createParticles(100);

    const heroSection = document.querySelector('.hero');

    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 5; i++) {
          particleSystem.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 60,
            maxLife: 60,
            size: Math.random() * 2 + 1,
            color: particleSystem.getRandomColor()
          });
        }
      });
    }
  }
});

/* Floating particles background */
function createFloatingParticles() {
  const container = document.body;
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');

    particle.style.cssText = `
      position: fixed;
      width: ${Math.random() * 5 + 2}px;
      height: ${Math.random() * 5 + 2}px;
      background: radial-gradient(circle, #00d9ff, #ff006e);
      border-radius: 50%;
      pointer-events: none;
      z-index: ${Math.random() * 1000};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.3};
      box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
      animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
    `;

    container.appendChild(particle);

    setTimeout(() => {
      particle.style.opacity = Math.random() * 0.5 + 0.1;
    }, Math.random() * 2000);
  }
}

document.addEventListener('DOMContentLoaded', createFloatingParticles);

/* Mouse trail effect */
function createMouseTrail() {
  let lastX = 0;
  let lastY = 0;

  document.addEventListener('mousemove', (e) => {
    const distance = Math.sqrt(
      Math.pow(e.clientX - lastX, 2) +
      Math.pow(e.clientY - lastY, 2)
    );

    if (distance > 30) {
      const trail = document.createElement('div');

      trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: linear-gradient(135deg, #ff006e, #00d9ff);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        z-index: 1000;
        opacity: 0.6;
        animation: trailFade 0.8s ease-out forwards;
      `;

      document.body.appendChild(trail);

      lastX = e.clientX;
      lastY = e.clientY;

      setTimeout(() => trail.remove(), 800);
    }
  });
}

/* Add trail fade animation */
const style = document.createElement('style');
style.textContent = `
  @keyframes trailFade {
    to {
      opacity: 0;
      transform: scale(0);
    }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 768) {
    createMouseTrail();
  }
});

/* Ripple effect on click */
function createRippleEffect() {
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');

    ripple.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(0,217,255,0.5), transparent);
      border-radius: 50%;
      pointer-events: none;
      left: ${e.clientX - 10}px;
      top: ${e.clientY - 10}px;
      z-index: 999;
      animation: rippleExpand 0.6s ease-out forwards;
    `;

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
}

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleExpand {
    to {
      width: 200px;
      height: 200px;
      left: calc(50% - 100px);
      top: calc(50% - 100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

document.addEventListener('DOMContentLoaded', createRippleEffect);
