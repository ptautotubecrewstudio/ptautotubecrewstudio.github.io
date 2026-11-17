
/* =========================================================
   AUTOTUBE CREW STUDIO
   GLOBAL SITE NAVIGATION + MEDIA CONTROLS
   All sitemap pages use the same navigation.
   ========================================================= */

(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const NAV_GROUPS = [
    {
      id: "studio",
      label: "Studio",
      items: [
        ["about.html", "About the Studio"],
        ["team.html", "Our Team"],
        ["careers.html", "Careers"],
        ["clients.html", "Clients"],
        ["partners.html", "Partners"],
        ["investor-relations.html", "Investor Relations"]
      ]
    },
    {
      id: "services",
      label: "Services",
      items: [
        ["services.html", "All Services"],
        ["3d-animation.html", "3D Animation"],
        ["cgi.html", "CGI Production"],
        ["vfx.html", "Visual Effects"],
        ["video-production.html", "Video Production"],
        ["film-production.html", "Film Production"],
        ["creative-content.html", "Creative Content"],
        ["digital-platforms.html", "Digital Platforms"]
      ]
    },
    {
      id: "work",
      label: "Our Work",
      items: [
        ["portfolio.html", "Portfolio"],
        ["showreel.html", "Showreel"],
        ["case-studies.html", "Case Studies"],
        ["project-details.html", "Project Details"]
      ]
    },
    {
      id: "industries",
      label: "Industries",
      items: [
        ["industries.html", "Industries"],
        ["technology.html", "Technology"],
        ["our-workflow.html", "Our Workflow"],
        ["pricing.html", "Pricing"]
      ]
    },
    {
      id: "resources",
      label: "Resources",
      items: [
        ["blog.html", "Journal / Blog"],
        ["blog-post.html", "Blog Post"],
        ["news.html", "News"],
        ["events.html", "Events"],
        ["faq.html", "FAQs"],
        ["testimonials.html", "Testimonials"],
        ["downloads.html", "Downloads"],
        ["media-kit.html", "Media Kit"],
        ["press-kit.html", "Press Kit"],
        ["privacy-policy.html", "Privacy Policy"],
        ["terms-and-conditions.html", "Terms & Conditions"]
      ]
    },
    {
      id: "contact",
      label: "Let's Talk",
      items: [
        ["contact.html", "Contact Studio"],
        ["request-a-quote.html", "Request a Quote"]
      ]
    }
  ];

  const NAV_STYLES = `
    header:has(nav.acs-site-nav) {
      position: sticky !important;
      top: 0 !important;
      z-index: 1500 !important;
    }

    header nav.acs-site-nav {
      display: flex !important;
      flex: 1 1 auto !important;
      align-items: center !important;
      justify-content: flex-end !important;
      gap: clamp(9px, 1.05vw, 17px) !important;
      width: auto !important;
      max-width: none !important;
      min-width: 0 !important;
      margin: 0 !important;
      position: static !important;
    }

    header nav.acs-site-nav .acs-nav-home,
    header nav.acs-site-nav .acs-nav-group > summary {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 42px !important;
      padding: 0 3px !important;
      border: 0 !important;
      background: transparent !important;
      color: #ffffff !important;
      font-family: inherit !important;
      font-size: clamp(9px, .72vw, 11px) !important;
      font-weight: 800 !important;
      letter-spacing: .5px !important;
      line-height: 1.4 !important;
      text-transform: uppercase !important;
      white-space: nowrap !important;
      cursor: pointer !important;
      transition: color .2s ease, background .2s ease !important;
    }

    header nav.acs-site-nav .acs-nav-group {
      position: relative !important;
      flex: 0 0 auto !important;
    }

    header nav.acs-site-nav .acs-nav-group > summary {
      list-style: none !important;
    }

    header nav.acs-site-nav .acs-nav-group > summary::-webkit-details-marker {
      display: none !important;
    }

    header nav.acs-site-nav .acs-nav-group > summary::after {
      content: "⌄";
      margin-left: 6px;
      color: #ff4658;
      font-size: 13px;
    }

    header nav.acs-site-nav .acs-nav-home:hover,
    header nav.acs-site-nav .acs-nav-group > summary:hover,
    header nav.acs-site-nav .acs-nav-group.has-current > summary {
      color: #ff4658 !important;
    }

    header nav.acs-site-nav .acs-nav-group-contact > summary {
      min-height: 42px !important;
      padding: 0 13px !important;
      border: 1px solid #e50920 !important;
      background: #e50920 !important;
      color: #ffffff !important;
    }

    header nav.acs-site-nav .acs-nav-group-contact > summary:hover,
    header nav.acs-site-nav .acs-nav-group-contact[open] > summary {
      background: transparent !important;
      color: #ff4658 !important;
    }

    header nav.acs-site-nav .acs-dropdown-panel {
      display: none;
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      z-index: 2000;
      width: 490px;
      max-width: 90vw;
      padding: 12px;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 5px;
      background: #080808;
      border: 1px solid rgba(229,9,32,.8);
      box-shadow: 0 18px 45px rgba(0,0,0,.65);
    }

    header nav.acs-site-nav .acs-nav-group[data-nav-group="resources"] .acs-dropdown-panel {
      left: auto;
      right: 0;
    }

    header nav.acs-site-nav .acs-nav-group-contact .acs-dropdown-panel {
      left: auto;
      right: 0;
      width: 310px;
    }

    header nav.acs-site-nav .acs-nav-group[open] > .acs-dropdown-panel {
      display: grid;
    }

    header nav.acs-site-nav .acs-dropdown-panel a {
      display: flex !important;
      align-items: center !important;
      min-height: 42px !important;
      padding: 10px 12px !important;
      border: 1px solid transparent !important;
      background: transparent !important;
      color: #ffffff !important;
      font-family: inherit !important;
      font-size: 11px !important;
      font-weight: 600 !important;
      line-height: 1.45 !important;
      letter-spacing: .2px !important;
      text-transform: none !important;
      white-space: normal !important;
      transition: color .2s ease, background .2s ease, border-color .2s ease !important;
    }

    header nav.acs-site-nav .acs-dropdown-panel a:hover,
    header nav.acs-site-nav .acs-dropdown-panel a[aria-current="page"] {
      border-color: rgba(229,9,32,.45) !important;
      background: rgba(229,9,32,.13) !important;
      color: #ff4658 !important;
    }

    header nav.acs-site-nav .acs-nav-home[aria-current="page"] {
      color: #ff4658 !important;
    }

    header .acs-menu-toggle {
      display: none;
    }

    header nav.acs-site-nav a:focus-visible,
    header nav.acs-site-nav summary:focus-visible {
      outline: 2px solid #ff4658 !important;
      outline-offset: 4px !important;
    }

    @media (max-width: 1100px) {
      header nav.acs-site-nav {
        display: none !important;
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 2000 !important;
        width: 100% !important;
        max-height: calc(100svh - 90px) !important;
        overflow-y: auto !important;
        padding: 14px 5% 22px !important;
        flex-direction: column !important;
        align-items: stretch !important;
        justify-content: flex-start !important;
        gap: 3px !important;
        background: #080808 !important;
        border-top: 1px solid rgba(229,9,32,.6) !important;
        border-bottom: 1px solid rgba(229,9,32,.5) !important;
        box-shadow: 0 16px 35px rgba(0,0,0,.55) !important;
      }

      header nav.acs-site-nav.active,
      header nav.acs-site-nav.is-open {
        display: flex !important;
      }

      header nav.acs-site-nav .acs-nav-home,
      header nav.acs-site-nav .acs-nav-group > summary {
        display: flex !important;
        justify-content: space-between !important;
        width: 100% !important;
        min-height: 46px !important;
        padding: 10px 12px !important;
        border-bottom: 1px solid rgba(255,255,255,.1) !important;
        font-size: 11px !important;
      }

      header nav.acs-site-nav .acs-nav-group {
        width: 100% !important;
      }

      header nav.acs-site-nav .acs-dropdown-panel {
        position: static !important;
        width: 100% !important;
        max-width: none !important;
        margin: 5px 0 12px !important;
        padding: 9px !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        box-shadow: none !important;
      }

      header nav.acs-site-nav .acs-nav-group-contact > summary {
        justify-content: center !important;
        border: 1px solid #e50920 !important;
        background: #e50920 !important;
      }

      header .menu-toggle,
      header .terms-menu-toggle,
      header .test-menu-toggle {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-width: 46px !important;
        min-height: 42px !important;
        padding: 0 12px !important;
        border: 1px solid #e50920 !important;
        background: transparent !important;
        color: #ffffff !important;
        font-family: inherit !important;
        font-size: 12px !important;
        font-weight: 800 !important;
        cursor: pointer !important;
      }
    }

    @media (max-width: 480px) {
      header nav.acs-site-nav .acs-dropdown-panel {
        grid-template-columns: 1fr !important;
      }

      header nav.acs-site-nav .acs-dropdown-panel a {
        min-height: 40px !important;
      }
    }

    @media (min-width: 1101px) {
      header .menu-toggle,
      header .terms-menu-toggle,
      header .test-menu-toggle {
        display: none !important;
      }
    }
  `;

  function injectNavigationStyles() {
    if (document.getElementById("acs-global-navigation-styles")) return;

    const style = document.createElement("style");
    style.id = "acs-global-navigation-styles";
    style.textContent = NAV_STYLES;
    document.head.appendChild(style);
  }

  function buildNavigationMarkup(currentPage) {
    const groupsHTML = NAV_GROUPS.map((group) => {
      const linksHTML = group.items.map(([url, label]) => {
        const isCurrent = url === currentPage;
        return `
          <a href="${url}" ${isCurrent ? 'aria-current="page"' : ""}>
            ${label}
          </a>
        `;
      }).join("");

      const hasCurrent = group.items.some(([url]) => url === currentPage);
      const contactClass = group.id === "contact"
        ? " acs-nav-group-contact"
        : "";

      return `
        <details
          class="acs-nav-group${contactClass}${hasCurrent ? " has-current" : ""}"
          data-nav-group="${group.id}">
          <summary>${group.label}</summary>
          <div class="acs-dropdown-panel">
            ${linksHTML}
          </div>
        </details>
      `;
    }).join("");

    return `
      <a
        class="acs-nav-home"
        href="index.html"
        ${currentPage === "index.html" ? 'aria-current="page"' : ""}>
        Home
      </a>
      ${groupsHTML}
    `;
  }

  function initNavigation() {
    injectNavigationStyles();

    document.querySelectorAll("header").forEach((header, index) => {
      const navigation = header.querySelector(
        "nav.navigation, nav.terms-nav, nav.test-nav"
      );

      const toggle = header.querySelector(
        ".menu-toggle, .terms-menu-toggle, .test-menu-toggle"
      );

      if (!navigation) return;

      navigation.classList.add("navigation", "acs-site-nav");

      if (!navigation.id) {
        navigation.id = `acs-primary-navigation-${index + 1}`;
      }

      navigation.setAttribute("aria-label", "Main navigation");

      const currentPage =
        window.location.pathname.split("/").filter(Boolean).pop()
        || "index.html";

      navigation.innerHTML = buildNavigationMarkup(currentPage);

      const isLegacyToggle = Boolean(
        toggle &&
        (
          toggle.classList.contains("terms-menu-toggle") ||
          toggle.classList.contains("test-menu-toggle")
        )
      );

      const closeSubmenus = () => {
        navigation.querySelectorAll("details[open]").forEach((item) => {
          item.open = false;
        });
      };

      const updateToggleIcon = () => {
        if (!toggle) return;

        const expanded = toggle.getAttribute("aria-expanded") === "true";
        const icon = toggle.querySelector("span");

        if (icon) {
          icon.textContent = expanded ? "✕" : "☰";
        } else {
          toggle.textContent = expanded ? "✕" : "☰";
        }
      };

      const setMenuState = (isOpen) => {
        navigation.classList.toggle("active", isOpen);

        if (!isOpen) {
          navigation.classList.remove("is-open");
          closeSubmenus();
        }

        if (toggle) {
          toggle.setAttribute("aria-controls", navigation.id);
          toggle.setAttribute("aria-expanded", String(isOpen));
          toggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
          );
          updateToggleIcon();
        }
      };

      setMenuState(false);

      if (toggle && !isLegacyToggle) {
        toggle.addEventListener("click", () => {
          const isOpen =
            toggle.getAttribute("aria-expanded") === "true";

          setMenuState(!isOpen);
        });
      }

      if (toggle && isLegacyToggle) {
        toggle.addEventListener("click", updateToggleIcon);
      }

      navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          setMenuState(false);
        });
      });

      document.addEventListener("click", (event) => {
        if (!navigation.contains(event.target)) {
          closeSubmenus();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeSubmenus();
          setMenuState(false);
        }
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 1100) {
          setMenuState(false);
        }
      }, { passive: true });
    });
  }

  function initProjectVideos() {
    const projectVideos = Array.from(
      document.querySelectorAll(".project-video")
    );

    if (!projectVideos.length) return;

    projectVideos.forEach((video) => {
      video.addEventListener("play", () => {
        projectVideos.forEach((otherVideo) => {
          if (otherVideo !== video && !otherVideo.paused) {
            otherVideo.pause();
          }
        });
      });

      video.addEventListener("error", () => {
        const card = video.closest(".project-card");

        if (!card || card.querySelector(".video-error-note")) return;

        const note = document.createElement("p");
        note.className = "video-error-note";
        note.textContent =
          "This video format may not be supported by your browser.";
        note.setAttribute("role", "status");
        card.appendChild(note);
      });
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        projectVideos.forEach((video) => video.pause());
      }
    });
  }

  function initHeroVideo() {
    const heroVideo = document.querySelector(".hero-video");
    if (!heroVideo) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

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
