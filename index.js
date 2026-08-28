// ========== Theme Toggle ==========
const toggle = document.getElementById("theme-toggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);

toggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ========== Mobile Hamburger Menu ==========
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// ========== Typing Animation ==========
const typedText = document.getElementById("typed-text");
const texts = [
  "Java Backend Developer",
  "Spring Boot Enthusiast",
  "Cloud Native Engineer",
  "API Designer",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 400;
  }

  setTimeout(type, typeSpeed);
}

// Start typing after a short delay
setTimeout(type, 800);

// ========== Active Nav Highlight (Fixed) ==========
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

let isClickScrolling = false; // Flag to prevent observer interference during click

// Immediately set active class when clicking a nav link
navItems.forEach((link) => {
  link.addEventListener("click", (e) => {
    isClickScrolling = true;

    // Remove active from all
    navItems.forEach((item) => item.classList.remove("active"));
    // Add active to clicked link
    link.classList.add("active");

    // Re-enable observer after scrolling finishes
    setTimeout(() => {
      isClickScrolling = false;
    }, 1000); // 1 second is usually enough for smooth scroll
  });
});

// Intersection Observer (only works during normal scrolling)
const observerOptions = {
  root: null,
  rootMargin: "-25% 0px -60% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  if (isClickScrolling) return; // Ignore observer while clicking

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");

      navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// Clear active state when at the very top (Hero)
window.addEventListener("scroll", () => {
  if (isClickScrolling) return;

  if (window.scrollY < 150) {
    navItems.forEach((link) => link.classList.remove("active"));
  }
});
// ========== Back to Top Button ==========
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========== Project Filtering ==========
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const tech = card.getAttribute("data-tech");

      if (filter === "all" || tech.includes(filter)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ========== Copy Email Button ==========
const copyBtn = document.getElementById("copy-email");
const emailText = document.getElementById("email-text");

copyBtn.addEventListener("click", () => {
  const email = emailText.textContent;

  navigator.clipboard
    .writeText(email)
    .then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      copyBtn.style.background = "var(--accent)";
      copyBtn.style.color = "white";
      copyBtn.style.borderColor = "var(--accent)";

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = "";
        copyBtn.style.color = "";
        copyBtn.style.borderColor = "";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
});
