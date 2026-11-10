(() => {
  "use strict";

  const gsap = window.gsap;
  if (!gsap) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const heroItems = document.querySelectorAll(
    ".hero-content .eyebrow, .hero-content h1, .hero-content .hero-description, .hero-content .hero-actions"
  );

  if (heroItems.length) {
    gsap.from(heroItems, {
      opacity: 0,
      y: 28,
      duration: 0.9,
      stagger: 0.13,
      ease: "power3.out",
      delay: 0.12,
      clearProps: "all"
    });
  }

  if (!("IntersectionObserver" in window)) return;

  const revealGroups = [".intro", ".services", ".statement", ".contact-section"];

  revealGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((section) => {
      const children = section.querySelectorAll(
        ".eyebrow, h2, p, .text-link, .button-primary, .service-card"
      );
      if (!children.length) return;

      gsap.set(children, { autoAlpha: 0, y: 24 });

      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          gsap.to(children, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.09,
            ease: "power2.out",
            overwrite: "auto"
          });

          currentObserver.unobserve(section);
        });
      }, { threshold: 0.14 });

      observer.observe(section);
    });
  });
})();
