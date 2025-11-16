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

      // Update active dot
      layananDots.forEach((dot, index) => {
        if (index === layananCurrentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
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
  // CAROUSEL GALERI - IMPROVED
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
        slide.classList.remove('active', 'prev', 'next');

        if (index === galeriCurrentIndex) {
          slide.classList.add('active');
        } else if (index === (galeriCurrentIndex - 1 + galeriTotalSlides) % galeriTotalSlides) {
          slide.classList.add('prev');
        } else if (index === (galeriCurrentIndex + 1) % galeriTotalSlides) {
          slide.classList.add('next');
        }
      });

      // Update active indicator
      galeriIndicatorDots.forEach((dot, index) => {
        if (index === galeriCurrentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
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

document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();

      // Tutup semua dropdown yang terbuka
      document.querySelectorAll('.dropdown-content.show').forEach(openContent => {
        if (openContent !== content) {
          openContent.classList.remove('show');
          openContent.parentNode.querySelector('.dropdown-btn').classList.remove('active');
        }
      });

      // Toggle dropdown yang diklik
      content.classList.toggle('show');
      btn.classList.toggle('active');
    });

    // Tambahkan event listener untuk setiap item dropdown
    const items = content.querySelectorAll('.dropdown-item');
    items.forEach(item => {
      item.addEventListener('click', function () {
        // Update teks tombol dengan item yang dipilih
        btn.innerHTML = this.innerHTML + '<i class="fas fa-chevron-down"></i>';
        content.classList.remove('show');
        btn.classList.remove('active');
      });
    });
  });

  // Tutup dropdown saat klik di luar
  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-content.show').forEach(content => {
      content.classList.remove('show');
      content.parentNode.querySelector('.dropdown-btn').classList.remove('active');
    });
  });
});


// Fungsi untuk toggle dropdown di sidebar mobile
function toggleDropdown(element) {
  const dropdown = element.parentElement;
  dropdown.classList.toggle('active');
}

// Fungsi untuk menutup semua dropdown saat sidebar ditutup
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('active');
  
  // Tutup semua dropdown di sidebar
  const dropdowns = sidebar.querySelectorAll('.dropdown-sidebar');
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove('active');
  });
  
  // Tutup overlay jika ada
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// Fungsi untuk menangani dropdown di navbar desktop pada mobile
document.addEventListener('DOMContentLoaded', function() {
  // Untuk dropdown di navbar desktop pada tampilan mobile
  const dropdownToggles = document.querySelectorAll('.dropdown > a');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = this.parentElement;
        dropdown.classList.toggle('active');
        
        // Tutup dropdown lainnya
        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
          }
        });
      }
    });
  });
  
  // Tutup dropdown saat klik di luar
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
});