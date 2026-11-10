/* =========================================================
   AUTOTUBE CREW STUDIO
   Accessible site navigation and homepage media controls
   ========================================================= */

(() => {
  "use strict";

  document.documentElement.classList.add("js");

  function initNavigation() {
    document.querySelectorAll("header.header").forEach((header, index) => {
      const navigation = header.querySelector(".navigation");
      const toggle = header.querySelector(".menu-toggle");
      if (!navigation || !toggle) return;

      if (!navigation.id) navigation.id = `site-navigation-${index + 1}`;
      toggle.setAttribute("aria-controls", navigation.id);

      const setMenuState = (isOpen) => {
        navigation.classList.toggle("active", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        const icon = toggle.querySelector("span");
        if (icon) {
          icon.textContent = isOpen ? "✕" : "☰";
        } else {
          toggle.textContent = isOpen ? "✕" : "☰";
        }
      };

      setMenuState(false);
      toggle.addEventListener("click", () => {
        setMenuState(toggle.getAttribute("aria-expanded") !== "true");
      });
      navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenuState(false);
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth > 760) setMenuState(false);
      }, { passive: true });
    });
  }

  function initProjectVideos() {
    const projectVideos = Array.from(document.querySelectorAll(".project-video"));
    if (!projectVideos.length) return;

    projectVideos.forEach((video) => {
      video.addEventListener("play", () => {
        projectVideos.forEach((otherVideo) => {
          if (otherVideo !== video && !otherVideo.paused) otherVideo.pause();
        });
      });

      video.addEventListener("error", () => {
        const card = video.closest(".project-card");
        if (!card || card.querySelector(".video-error-note")) return;
        const note = document.createElement("p");
        note.className = "video-error-note";
        note.textContent = "This video format may not be supported by your browser.";
        note.setAttribute("role", "status");
        card.appendChild(note);
      });
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) projectVideos.forEach((video) => video.pause());
    });
  }

  function initHeroVideo() {
    const heroVideo = document.querySelector(".hero-video");
    if (!heroVideo) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopForReducedMotion = () => {
      if (reduceMotion.matches) {
        heroVideo.pause();
        heroVideo.removeAttribute("autoplay");
      }
    };

    stopForReducedMotion();
    if (typeof reduceMotion.addEventListener === "function") {
      reduceMotion.addEventListener("change", stopForReducedMotion);
    }

    heroVideo.addEventListener("error", () => {
      heroVideo.pause();
      heroVideo.hidden = true;
    });
  }

  function init() {
    initNavigation();
    initProjectVideos();
    initHeroVideo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
