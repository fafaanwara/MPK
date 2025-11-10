// Inisialisasi particles.js
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#b92f2f"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#b92f2f",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

// Tahun otomatis
document.getElementById('thn').textContent = new Date().getFullYear();

// ===========================================
// MOBILE MENU TOGGLE FUNCTIONALITY
// ===========================================

// Menu Toggle Functionality
const sidebar = document.getElementById('sidebar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

// Toggle sidebar function
function toggleSidebar() {
  sidebar.classList.toggle('active');

  // Add overlay for mobile
  if (window.innerWidth <= 768) {
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      overlay.onclick = toggleSidebar;
      document.body.appendChild(overlay);
    }
    overlay.classList.toggle('active');
  }
}

// Close sidebar function
function closeSidebar() {
  sidebar.classList.remove('active');
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function (event) {
  if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);

    if (!isClickInsideSidebar && !isClickOnToggle) {
      closeSidebar();
    }
  }
});

// Handle window resize
window.addEventListener('resize', function () {
  if (window.innerWidth > 768) {
    closeSidebar();
  }
});

// Add keyboard support (ESC key to close sidebar)
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && sidebar.classList.contains('active')) {
    closeSidebar();
  }
});

// Update active nav item based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');
  const regularNavItems = document.querySelectorAll('#navMenu a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  // Update sidebar nav items
  navItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (href === `#${currentSection}`) {
      item.classList.add('active');
    }
  });

  // Update regular nav items
  regularNavItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (href === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
}

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNav);

// Initialize active nav on page load
document.addEventListener('DOMContentLoaded', updateActiveNav);
// Efek scroll untuk navbar
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===========================================
// CAROUSEL LAYANAN
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
  // Inisialisasi Layanan Carousel
  const layananCarousel = document.getElementById('layananCarousel');
  const layananSlides = document.querySelectorAll('.layanan-slide');
  const layananPrevBtn = document.getElementById('layananPrevBtn');
  const layananNextBtn = document.getElementById('layananNextBtn');
  const layananNav = document.getElementById('layananNav');

  if (layananCarousel && layananNav) {
    let layananCurrentIndex = 0;
    const layananTotalSlides = layananSlides.length;

    // Buat indikator dots
    layananSlides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('layanan-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToLayananSlide(index);
      });
      layananNav.appendChild(dot);
    });

    const layananDots = document.querySelectorAll('.layanan-dot');

    function updateLayananCarousel() {
      layananCarousel.style.transform = `translateX(-${layananCurrentIndex * 100}%)`;
    }

    function goToLayananSlide(index) {
      layananCurrentIndex = index;
      updateLayananCarousel();
    }

    function nextLayananSlide() {
      layananCurrentIndex = (layananCurrentIndex + 1) % layananTotalSlides;
      updateLayananCarousel();
    }

    function prevLayananSlide() {
      layananCurrentIndex = (layananCurrentIndex - 1 + layananTotalSlides) % layananTotalSlides;
      updateLayananCarousel();
    }

    // Event listeners
    if (layananNextBtn) {
      layananNextBtn.addEventListener('click', nextLayananSlide);
    }

    if (layananPrevBtn) {
      layananPrevBtn.addEventListener('click', prevLayananSlide);
    }

    // Auto slide (opsional)
    let layananAutoSlide = setInterval(nextLayananSlide, 5000);

    // Hentikan auto slide saat hover
    layananCarousel.addEventListener('mouseenter', () => {
      clearInterval(layananAutoSlide);
    });

    layananCarousel.addEventListener('mouseleave', () => {
      layananAutoSlide = setInterval(nextLayananSlide, 5000);
    });
  }

  // ===========================================
  // CAROUSEL GALERI
  // ===========================================
  const galeriSlides = document.querySelectorAll('.galeri-slide');
  const galeriPrevBtn = document.querySelector('.galeri-nav.left');
  const galeriNextBtn = document.querySelector('.galeri-nav.right');
  const galeriIndicators = document.querySelector('.galeri-indicators');

  if (galeriSlides.length > 0 && galeriIndicators) {
    let galeriCurrentIndex = 0;
    const galeriTotalSlides = galeriSlides.length;

    // Buat indikator untuk galeri
    galeriSlides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('galeri-indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        goToGaleriSlide(index);
      });
      galeriIndicators.appendChild(indicator);
    });

    const galeriIndicatorDots = document.querySelectorAll('.galeri-indicator');

    function updateGaleriCarousel() {
      galeriSlides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next', 'hidden');

        if (index === galeriCurrentIndex) {
          slide.classList.add('active');
        } else if (index === (galeriCurrentIndex - 1 + galeriTotalSlides) % galeriTotalSlides) {
          slide.classList.add('prev');
        } else if (index === (galeriCurrentIndex + 1) % galeriTotalSlides) {
          slide.classList.add('next');
        } else {
          slide.classList.add('hidden');
        }
      });


    }

    function goToGaleriSlide(index) {
      galeriCurrentIndex = index;
      updateGaleriCarousel();
    }

    function nextGaleriSlide() {
      galeriCurrentIndex = (galeriCurrentIndex + 1) % galeriTotalSlides;
      updateGaleriCarousel();
    }

    function prevGaleriSlide() {
      galeriCurrentIndex = (galeriCurrentIndex - 1 + galeriTotalSlides) % galeriTotalSlides;
      updateGaleriCarousel();
    }

    // Event listeners untuk galeri
    if (galeriNextBtn) {
      galeriNextBtn.addEventListener('click', nextGaleriSlide);
    }

    if (galeriPrevBtn) {
      galeriPrevBtn.addEventListener('click', prevGaleriSlide);
    }

    // Keyboard navigation untuk galeri
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevGaleriSlide();
      if (e.key === 'ArrowRight') nextGaleriSlide();
    });

    // Auto-rotation untuk galeri
    let galeriAutoRotate = setInterval(nextGaleriSlide, 5000);

    // Pause auto-rotation on hover
    const galeriCarousel = document.querySelector('.galeri-carousel');
    if (galeriCarousel) {
      galeriCarousel.addEventListener('mouseenter', () => {
        clearInterval(galeriAutoRotate);
      });

      galeriCarousel.addEventListener('mouseleave', () => {
        galeriAutoRotate = setInterval(nextGaleriSlide, 5000);
      });
    }

    // Inisialisasi awal
    updateGaleriCarousel();
  }
});

// ===========================================
// SCROLL HORIZONTAL TERPISAH
// ===========================================
const horizontalContainer = document.getElementById('horizontalContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const horizontalNav = document.getElementById('horizontalNav');

if (horizontalContainer && horizontalNav) {
  const panels = document.querySelectorAll('.horizontal-panel');
  const totalPanels = panels.length;
  let currentPanel = 0;

  // Buat navigasi dots
  panels.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('horizontal-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToPanel(index);
    });
    horizontalNav.appendChild(dot);
  });

  const dots = document.querySelectorAll('.horizontal-dot');

  // Fungsi untuk pergi ke panel tertentu
  function goToPanel(panelIndex) {
    currentPanel = panelIndex;
    const translateX = -currentPanel * 100;
    horizontalContainer.style.transform = `translateX(${translateX}%)`;

    // Update status aktif dot
    dots.forEach((dot, index) => {
      if (index === currentPanel) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Event listener untuk tombol panah
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPanel > 0) {
        goToPanel(currentPanel - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPanel < totalPanels - 1) {
        goToPanel(currentPanel + 1);
      }
    });
  }

  // Event listener untuk keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      if (currentPanel > 0) {
        goToPanel(currentPanel - 1);
      }
    } else if (e.key === 'ArrowRight') {
      if (currentPanel < totalPanels - 1) {
        goToPanel(currentPanel + 1);
      }
    }
  });

  // Event listener untuk swipe pada perangkat mobile
  let startX = 0;
  let endX = 0;

  horizontalContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  horizontalContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;

    if (startX - endX > swipeThreshold) {
      // Swipe kiri
      if (currentPanel < totalPanels - 1) {
        goToPanel(currentPanel + 1);
      }
    } else if (endX - startX > swipeThreshold) {
      // Swipe kanan
      if (currentPanel > 0) {
        goToPanel(currentPanel - 1);
      }
    }
  }

  // Auto slide untuk horizontal section
  let autoSlideInterval = setInterval(() => {
    if (currentPanel < totalPanels - 1) {
      goToPanel(currentPanel + 1);
    } else {
      goToPanel(0);
    }
  }, 5000);

  // Hentikan auto slide saat user berinteraksi
  horizontalContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  horizontalContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      if (currentPanel < totalPanels - 1) {
        goToPanel(currentPanel + 1);
      } else {
        goToPanel(0);
      }
    }, 5000);
  });
}

// Animasi saat elemen masuk ke viewport
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Terapkan animasi pada elemen kartu
document.querySelectorAll('.animate-on-scroll').forEach(element => {
  observer.observe(element);
});

// Slide hero background
const hero = document.getElementById('hero');
if (hero) {
  const images = [
    'image/1home.jpg',
    'image/2home.jpg',
    'image/3home.jpg',
  ];

  let index = 0;
  let nextIndex = 1;

  // Set background pertama
  hero.style.backgroundImage = `url('${images[index]}')`;

  // Preload semua gambar
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  function changeBackground() {
    // Ganti background dengan transisi halus
    hero.style.backgroundImage = `url('${images[nextIndex]}')`;

    // Update indeks
    index = nextIndex;
    nextIndex = (nextIndex + 1) % images.length;
  }

  // Ganti background tiap 5 detik
  setInterval(changeBackground, 5000);
}

// Tambahkan class saat tombol ditekan (untuk mobile)
document.querySelectorAll('.btn').forEach(button => {
  // Untuk touch devices
  button.addEventListener('touchstart', function () {
    this.style.transform = 'scale(0.95)';
  });

  button.addEventListener('touchend', function () {
    this.style.transform = 'scale(1)';
  });

  // Untuk devices dengan stylus/pen
  button.addEventListener('pointerdown', function () {
    if (window.matchMedia("(pointer: coarse)").matches) {
      this.style.transform = 'scale(0.95)';
    }
  });

  button.addEventListener('pointerup', function () {
    this.style.transform = 'scale(1)';
  });
});