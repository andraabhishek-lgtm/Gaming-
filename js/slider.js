/* ========================================
   REWORK GAMING - Slider/Carousel
   Game and Content Carousel
======================================== */

class Slider {
  constructor(sliderElement) {
    this.slider = sliderElement;
    this.items = this.slider.querySelectorAll('[class*="-card"]');
    this.currentIndex = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.createControls();
    this.startAutoPlay();
    this.setupKeyboardNavigation();
  }

  createControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('slider-controls');
    controlsContainer.style.cssText = `
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 30px;
      align-items: center;
    `;

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '← Prev';
    prevBtn.classList.add('slider-btn', 'prev-btn');
    prevBtn.style.cssText = `
      padding: 10px 20px;
      background: rgba(255, 0, 110, 0.2);
      border: 1px solid rgba(255, 0, 110, 0.5);
      color: #00d9ff;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    `;

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = 'Next →';
    nextBtn.classList.add('slider-btn', 'next-btn');
    nextBtn.style.cssText = `
      padding: 10px 20px;
      background: rgba(255, 0, 110, 0.2);
      border: 1px solid rgba(255, 0, 110, 0.5);
      color: #00d9ff;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    `;

    prevBtn.addEventListener('click', () => this.prev());
    nextBtn.addEventListener('click', () => this.next());

    prevBtn.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(255, 0, 110, 0.4)';
      this.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.3)';
    });

    prevBtn.addEventListener('mouseleave', function() {
      this.style.background = 'rgba(255, 0, 110, 0.2)';
      this.style.boxShadow = 'none';
    });

    nextBtn.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(255, 0, 110, 0.4)';
      this.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.3)';
    });

    nextBtn.addEventListener('mouseleave', function() {
      this.style.background = 'rgba(255, 0, 110, 0.2)';
      this.style.boxShadow = 'none';
    });

    const dotsContainer = document.createElement('div');
    dotsContainer.style.cssText = `
      display: flex;
      gap: 8px;
      margin: 0 20px;
    `;

    for (let i = 0; i < this.items.length; i++) {
      const dot = document.createElement('button');
      dot.style.cssText = `
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${i === 0 ? '#00d9ff' : 'rgba(255, 0, 110, 0.3)'};
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
      `;

      dot.addEventListener('click', () => this.goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    controlsContainer.appendChild(prevBtn);
    controlsContainer.appendChild(dotsContainer);
    controlsContainer.appendChild(nextBtn);

    this.slider.parentElement.appendChild(controlsContainer);
    this.dotsContainer = dotsContainer;
  }

  updateDots() {
    const dots = this.dotsContainer.querySelectorAll('button');
    dots.forEach((dot, i) => {
      if (i === this.currentIndex) {
        dot.style.background = '#00d9ff';
        dot.style.boxShadow = '0 0 10px #00d9ff';
        dot.style.transform = 'scale(1.2)';
      } else {
        dot.style.background = 'rgba(255, 0, 110, 0.3)';
        dot.style.boxShadow = 'none';
        dot.style.transform = 'scale(1)';
      }
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateDisplay();
    this.restartAutoPlay();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateDisplay();
    this.restartAutoPlay();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateDisplay();
    this.restartAutoPlay();
  }

  updateDisplay() {
    this.items.forEach((item, i) => {
      if (i === this.currentIndex) {
        item.style.display = 'block';
        item.style.animation = 'slideInBottom 0.5s ease-out';
      } else {
        item.style.display = 'none';
      }
    });

    this.updateDots();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  restartAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });
  }
}

/* Initialize Sliders */
document.addEventListener('DOMContentLoaded', () => {
  const gameSlider = document.getElementById('gameSlider');

  if (gameSlider) {
    new Slider(gameSlider);
  }
});

/* Touch Support for Mobile */
function addTouchSupport() {
  const sliders = document.querySelectorAll('[id*="Slider"]');

  sliders.forEach(slider => {
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      if (touchStartX - touchEndX > 50) {
        // Swiped left - next slide
        const nextBtn = slider.parentElement.querySelector('.next-btn');
        if (nextBtn) nextBtn.click();
      } else if (touchEndX - touchStartX > 50) {
        // Swiped right - prev slide
        const prevBtn = slider.parentElement.querySelector('.prev-btn');
        if (prevBtn) prevBtn.click();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', addTouchSupport);

/* Game Carousel with Auto-rotate */
function createAutoCarousel() {
  const carousel = document.getElementById('gameSlider');

  if (!carousel) return;

  const cards = carousel.querySelectorAll('.game-card');

  if (cards.length > 1) {
    let rotation = 0;

    setInterval(() => {
      rotation += 360 / cards.length;
      carousel.style.transition = 'transform 0.8s ease-out';
      carousel.style.transform = `rotateY(${rotation}deg)`;
    }, 4000);
  }
}

/* Infinite scroll effect */
function createInfiniteScroll() {
  const carousels = document.querySelectorAll('.game-slider, .teams-grid, .blog-grid');

  carousels.forEach(carousel => {
    carousel.style.scrollBehavior = 'smooth';

    carousel.addEventListener('scroll', () => {
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
        carousel.scrollLeft = 0;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', createInfiniteScroll);
