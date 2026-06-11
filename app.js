document.addEventListener("DOMContentLoaded", () => {
  // --- MOBILE HAMBURGER MENU ---
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- STICKY NAV BACKGROUND ---
  const nav = document.querySelector(".nav");
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
  }


  // --- FRAMEWORK PENTAGON INTERACTIVE ---
  // Each .node.svc has style="left:X%;top:Y%" and maps to a data-node-id via order
  const svcNodes = document.querySelectorAll(".node.svc");
  const flowPaths = document.querySelectorAll(".flow");

  // Assign data-node-id based on DOM order (1-5)
  svcNodes.forEach((node, i) => {
    node.setAttribute("data-node-id", String(i + 1));
  });

  let activeNodeId = "1";
  let autoCycleInterval = null;
  let isUserInteracting = false;

  const setActiveNode = (id) => {
    svcNodes.forEach((node) => {
      const nodeId = node.getAttribute("data-node-id");
      const card = node.querySelector(".svc-card");
      if (card) {
        if (nodeId === id) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
      }
    });

    // Highlight corresponding flow path
    flowPaths.forEach((path, i) => {
      if (String(i + 1) === id) {
        path.style.opacity = "1";
        path.style.animationPlayState = "running";
      } else {
        path.style.opacity = "";
        path.style.animationPlayState = "";
      }
    });

    activeNodeId = id;
  };

  const startAutoplay = () => {
    autoCycleInterval = setInterval(() => {
      if (!isUserInteracting) {
        let nextId = parseInt(activeNodeId) + 1;
        if (nextId > 5) nextId = 1;
        setActiveNode(nextId.toString());
      }
    }, 3500);
  };

  const stopAutoplay = () => {
    clearInterval(autoCycleInterval);
  };

  svcNodes.forEach((node) => {
    const id = node.getAttribute("data-node-id");
    const card = node.querySelector(".svc-card");
    if (!card) return;

    card.addEventListener("click", () => {
      isUserInteracting = true;
      stopAutoplay();
      setActiveNode(id);
    });

    card.addEventListener("mouseenter", () => {
      setActiveNode(id);
    });
  });

  // Initialize
  setActiveNode("1");
  startAutoplay();

  // --- SCROLL REVEAL (INTERSECTION OBSERVER) ---
  const revealElements = document.querySelectorAll(".risk, .bcard, .dcard, .vp-text, .vp-visual, .details-card-centered");
  
  // Add reveal class to targets
  revealElements.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target); // Trigger animation only once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- ACTIVE NAV LINK CORRESPONDING TO SCROLL POSITION ---
  const sections = document.querySelectorAll("section[id], header[id]");
  const activeLinkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-20% 0px -60% 0px" // Focus center area of viewport
    }
  );

  sections.forEach((sec) => activeLinkObserver.observe(sec));
});
