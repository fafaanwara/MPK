// Tahun otomatis
    document.getElementById('thn').textContent = new Date().getFullYear();

    // Mobile nav toggle
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('navMenu');
    if (toggle && menu) {
      toggle.onclick = () => menu.classList.toggle('show');
    }

    // Tutup menu mobile saat klik link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (menu) menu.classList.remove('show');
      });
    });

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
        horizontalContainer.style.transform = `translateX(${translateX}vw)`;

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
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Terapkan animasi pada elemen kartu
    document.querySelectorAll('.kartu').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });

    // Animasi untuk kontak items
    document.querySelectorAll('.kontak-item').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(item);
    });

    // slide beranda
    const hero = document.getElementById('hero');

    const images = [
      'fotbar1.jpg',
      'fotbar2.jpg',
      'fotbar3.jpg'
    ];

    let index = 0;

    // set background pertama
    hero.style.backgroundImage = `url('${images[index]}')`;

    function changeBackground() {
      // tambahkan efek blur
      hero.classList.add('fade');

      setTimeout(() => {
        index = (index + 1) % images.length;
        hero.style.backgroundImage = `url('${images[index]}')`;
      }, 500); // delay sedikit sebelum ganti gambar

      // hilangkan blur setelah gambar berubah
      setTimeout(() => {
        hero.classList.remove('fade');
      }, 1000);
    }

    // ganti background tiap 5 detik
    setInterval(changeBackground, 5000);

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
    