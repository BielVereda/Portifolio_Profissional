// Fade-in animation on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
});

// Observa seções principais
document.querySelectorAll('.hero, .about, .projects, .contact, .resume').forEach(el => observer.observe(el));

/* === TIMELINE ANIMATION === */
const timeline = document.querySelector('.timeline');
if (timeline) {
  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timeline.classList.add('visible');
      } else {
        // Remove a classe quando sai da tela
        timeline.classList.remove('visible');
      }
    });
  }, { threshold: 0.3 });

  timelineObserver.observe(timeline);
}

// Smooth scroll para navbar
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Polyfill para scroll suave em navegadores sem suporte nativo
(function () {
  // Testa se o navegador suporta scroll-behavior
  const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;

  if (!supportsSmoothScroll) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          // Animação manual de scroll
          const startY = window.pageYOffset;
          const targetY = targetSection.getBoundingClientRect().top + startY;
          const duration = 600; // tempo em ms
          let startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const ease = progress < 0.5
              ? 2 * progress * progress
              : -1 + (4 - 2 * progress) * progress; // easeInOutQuad
            window.scrollTo(0, startY + (targetY - startY) * ease);
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          }

          requestAnimationFrame(step);
        }
      });
    });
  }
})();