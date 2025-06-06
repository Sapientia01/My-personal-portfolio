// Custom cursor functionality
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 100);
});

// Handle cursor visibility
document.addEventListener("mouseleave", () => {
  cursor.style.display = "none";
  cursorFollower.style.display = "none";
});

document.addEventListener("mouseenter", () => {
  cursor.style.display = "block";
  cursorFollower.style.display = "block";
});

// Navigation functionality
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form handling
const contactForm = document.getElementById("contact-form");
const formStatus = document.querySelector(".form-status");
const submitBtn = contactForm.querySelector("button[type='submit']");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  try {
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      formStatus.textContent =
        "Message sent successfully! I'll get back to you soon.";
      formStatus.className = "form-status success";
      contactForm.reset();
    } else {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    formStatus.textContent =
      "Oops! Something went wrong. Please try again later.";
    formStatus.className = "form-status error";
  } finally {
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }
});

// Form validation
const inputs = contactForm.querySelectorAll("input, textarea");
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.validity.valid) {
      input.classList.remove("invalid");
    } else {
      input.classList.add("invalid");
    }
  });
});

// Navigation active state based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Scroll animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".skill-card, .project-card");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

window.addEventListener("load", animateOnScroll);
window.addEventListener("scroll", animateOnScroll);

// Touch device detection
const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

if (isTouchDevice()) {
  cursor.style.display = "none";
  cursorFollower.style.display = "none";
}

// Project cards functionality
const projectCards = document.querySelectorAll(".project-card");
const showPageButtons = document.querySelectorAll(".show-page");

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const handleProjectCardsAnimation = () => {
  projectCards.forEach((card) => {
    if (isInViewport(card)) {
      card.classList.add("visible");
    }
  });
};

handleProjectCardsAnimation();
window.addEventListener("scroll", handleProjectCardsAnimation);

// Project page button handling
showPageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const projectTitle = button
      .closest(".project-info")
      .querySelector("h3").textContent;
    alert(`Live demo for "${projectTitle}" coming soon!`);
  });
});

// Dynamic text animation
const dynamicTextContent = document.querySelector(".dynamic-text-content");
const texts = ["Frontend Developer", "Competitive Programmer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    dynamicTextContent.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    dynamicTextContent.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingDelay = 500;
  }

  setTimeout(typeText, typingDelay);
}

window.addEventListener("load", typeText);

// Image modal functionality
const modal = document.getElementById("imageModal");
const modalImg = modal.querySelector(".modal-image");
const closeBtn = modal.querySelector(".modal-close");

document.querySelectorAll(".project-image").forEach((img) => {
  img.addEventListener("click", function () {
    const imgSrc = this.querySelector("img").src;
    modalImg.src = imgSrc;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
});
