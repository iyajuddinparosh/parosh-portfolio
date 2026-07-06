/* =====================================================================
   IYAJ UDDIN PAROSH — PORTFOLIO SCRIPT
   Plain JavaScript only. Each feature lives in its own small function
   so the file is easy to read and edit.
===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initPageLoader();
  initAOS();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initTypingEffect();
  initCounters();
  initBackToTop();
  initNetworkBackground();
});

/* ---------------------------------------------------------------------
   1. PAGE LOADER
   Hides the full-screen loader shortly after the page has loaded.
--------------------------------------------------------------------- */
function initPageLoader() {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  window.addEventListener("load", function () {
    setTimeout(function () {
      loader.classList.add("loaded");
    }, 300);
  });
}

/* ---------------------------------------------------------------------
   2. AOS (Animate On Scroll) INITIALISATION
--------------------------------------------------------------------- */
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }
}

/* ---------------------------------------------------------------------
   3. SCROLL PROGRESS BAR
   Fills the thin bar at the top of the page as the user scrolls down.
--------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = percent + "%";
  });
}

/* ---------------------------------------------------------------------
   4. NAVBAR
   - Adds a "scrolled" style once the page has scrolled a bit.
   - Highlights the nav link for whichever section is on screen.
--------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  if (!navbar) return;

  // Toggle the "scrolled" style on the navbar
  window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Highlight the active section link using IntersectionObserver
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navLinks.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + id) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/* ---------------------------------------------------------------------
   5. MOBILE MENU
   Opens/closes the mobile navigation panel.
--------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const navLinksWrap = document.getElementById("nav-links");

  if (!menuBtn || !navLinksWrap) return;

  menuBtn.addEventListener("click", function () {
    navLinksWrap.classList.toggle("open");

    const icon = menuBtn.querySelector("i");
    const isOpen = navLinksWrap.classList.contains("open");
    icon.className = isOpen ? "fas fa-xmark" : "fas fa-bars";
  });

  // Close the mobile menu whenever a link is clicked
  navLinksWrap.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinksWrap.classList.remove("open");
      menuBtn.querySelector("i").className = "fas fa-bars";
    });
  });
}

/* ---------------------------------------------------------------------
   6. TYPING EFFECT (Hero section)
   Types out a few short phrases, then deletes them and moves on
   to the next one, in a loop.
--------------------------------------------------------------------- */
function initTypingEffect() {
  const target = document.getElementById("typed-text");
  if (!target) return;

  const phrases = [
    "Exploring Artificial Intelligence.",
    "Learning Cybersecurity fundamentals.",
    "Building real-world projects.",
    "Preparing for research & higher studies.",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    target.textContent = currentPhrase.substring(0, charIndex);

    let typingSpeed = isDeleting ? 35 : 65;

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of the phrase before deleting
      typingSpeed = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 300;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ---------------------------------------------------------------------
   7. ANIMATED COUNTERS (Hero stats)
   Counts up to each number once it scrolls into view.
   Note: these numbers are real (languages, projects, interests) —
   not placeholder statistics.
--------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10) || 0;
        let current = 0;
        const duration = 900; // ms
        const stepTime = Math.max(Math.floor(duration / (target || 1)), 40);

        const timer = setInterval(function () {
          current++;
          el.textContent = current;
          if (current >= target) {
            clearInterval(timer);
          }
        }, stepTime);

        obs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

/* ---------------------------------------------------------------------
   8. BACK TO TOP BUTTON
--------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------------------
   9. ANIMATED NETWORK BACKGROUND (Hero canvas)
   Draws a handful of slow-moving dots and connects nearby ones with
   thin lines — a small nod to networking / cybersecurity / AI themes.
   Pure Canvas 2D, no external library.
--------------------------------------------------------------------- */
function initNetworkBackground() {
  const canvas = document.getElementById("network-canvas");
  if (!canvas) return;

  // Skip the animation for users who prefer reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let width, height, nodes;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createNodes() {
    const count = Math.min(60, Math.floor((width * height) / 18000));
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Move and draw each node
    nodes.forEach(function (node) {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 189, 248, 0.7)";
      ctx.fill();
    });

    // Connect nearby nodes with a faint line
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = "rgba(139, 92, 246, " + (1 - dist / 140) * 0.25 + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  createNodes();
  draw();

  window.addEventListener("resize", function () {
    resize();
    createNodes();
  });
}
