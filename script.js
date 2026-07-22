document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. TYPING EFFECT
     ========================================================================== */
  const typingElement = document.getElementById('typing-text');
  const textArray = ['LOVELY SIS', 'MY BEST FRIEND', 'SWEET 16!'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  /* ==========================================================================
     2. PARTICLES & BALLOONS GENERATOR
     ========================================================================== */
  const particlesContainer = document.getElementById('particles');
  const balloonsContainer = document.getElementById('balloons');

  function createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 8 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;

      particlesContainer.appendChild(particle);
    }
  }

  function createBalloons() {
    const colors = ['#E53935', '#2196F3', '#FFCA28', '#AB47BC'];
    for (let i = 0; i < 12; i++) {
      const balloon = document.createElement('div');
      balloon.classList.add('balloon');
      balloon.style.left = `${Math.random() * 90 + 5}vw`;
      balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.animationDuration = `${Math.random() * 8 + 10}s`;
      balloon.style.animationDelay = `${Math.random() * 8}s`;

      balloonsContainer.appendChild(balloon);
    }
  }

  createParticles();
  createBalloons();

  /* ==========================================================================
     3. COUNTDOWN TIMER (TARGET: July 24, 2026)
     ========================================================================== */
  const targetDate = new Date('July 24, 2026 00:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = days < 10 ? `0${days}` : days;
      document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
      document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
      document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
    } else {
      document.getElementById('days').textContent = "00";
      document.getElementById('hours').textContent = "00";
      document.getElementById('minutes').textContent = "00";
      document.getElementById('seconds').textContent = "00";
    }
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ==========================================================================
     4. LIGHTBOX POPUP
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.masonry-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('active');
    }
  });

  /* ==========================================================================
     5. BUTTON RIPPLE EFFECT
     ========================================================================== */
  const rippleButtons = document.querySelectorAll('.ripple');

  rippleButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const circle = document.createElement('span');
      circle.classList.add('ripple-effect');
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      this.appendChild(circle);

      setTimeout(() => circle.remove(), 600);
    });
  });

  /* ==========================================================================
     6. SCROLL REVEAL ANIMATIONS & NAVBAR SCROLL
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  function handleScroll() {
    // Sticky navbar effect
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll reveal triggers
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initial check

  /* ==========================================================================
     7. MOBILE MENU TOGGLE
     ========================================================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

});
