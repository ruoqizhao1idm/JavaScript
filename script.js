// This script controls the image slider behavior: 
// Automatically plays slides when the mouse is NOT hovering
// Pauses autoplay when the mouse is hovering over the slide
// Displays left/right arrows during hover for manual navigation

// ===========================
// Image Slider (OOP structure)
// ===========================
class Slider {
  constructor(data, containerId, interval = 2000) {
    this.data = data;
    this.container = document.getElementById(containerId);
    this.intervalTime = interval;
    this.currentIndex = 0;
    this.autoSlideInterval = null;
    this.slides = [];
    this.leftArrow = null;
    this.rightArrow = null;
    this.init();
  }

  // Initialize: create slides, create arrows, bind events, start auto-slide
  init() {
    this.createSlides();
    this.createArrows();
    this.addEvents();
    this.startAutoSlide();
  }

  // Create each slide element
  createSlides() {
    this.data.forEach((slide, i) => {
      const div = document.createElement("div");
      div.className = "hero-slide";
      if (i === 0) div.classList.add("active");
      div.style.backgroundImage = `url('${slide.image}')`;

      const inner = document.createElement("div");
      inner.className = "hero-inner";
      inner.style.backgroundColor = slide.color;
      inner.innerHTML = `
        <h1 class="hero-title">${slide.title}</h1>
        <p class="hero-subtitle">${slide.subtitle}</p >
      `;

      div.appendChild(inner);
      this.container.appendChild(div);
    });
    this.slides = this.container.querySelectorAll(".hero-slide");
  }

  // Create left and right arrows
  createArrows() {
    this.leftArrow = document.createElement("div");
    this.leftArrow.className = "hero-arrow left";
    this.leftArrow.innerHTML = "&#10094;";

    this.rightArrow = document.createElement("div");
    this.rightArrow.className = "hero-arrow right";
    this.rightArrow.innerHTML = "&#10095;";

    this.container.append(this.leftArrow, this.rightArrow);
  }

  // Bind events for arrows and hover pause
  addEvents() {
    this.leftArrow.addEventListener("click", () => this.prev());
    this.rightArrow.addEventListener("click", () => this.next());
    this.container.addEventListener("mouseenter", () => this.stopAutoSlide());
    this.container.addEventListener("mouseleave", () => this.startAutoSlide());
  }

  // Display a specific slide
  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  // Show next slide
  next() {
    this.stopAutoSlide();
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(this.currentIndex);
  }

  // Show previous slide
  prev() {
    this.stopAutoSlide();
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentIndex);
  }

  // Start automatic sliding
  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.showSlide(this.currentIndex);
    }, this.intervalTime);
  }

  // Stop automatic sliding
  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }
}

// ===========================
// Slider data
// ===========================
const slidesData = [
  {
    image: "pt/back.png",
    title: "Qi’s Portfolio",
    subtitle: "Exploring creativity through design, interaction, and storytelling.",
    color: "rgba(44, 82, 130, 0.7)"
  },
  {
    image: "pt/back1.png",
    title: "Qi’s Creative Space",
    subtitle: "Turning inspiration into tangible design experiences.",
    color: "rgba(68, 93, 133, 0.7)"
  },
  {
    image: "pt/back2.png",
    title: "Focus on Emotion and User Experience",
    subtitle: "Designing meaningful interactions that connect people.",
    color: "rgba(90, 70, 120, 0.7)"
  },
  {
    image: "pt/back3.png",
    title: "Qi’s Design Lab",
    subtitle: "Exploring challenges through creativity and problem solving.",
    color: "rgba(115, 60, 135, 0.7)"
  },
  {
    image: "pt/back4.png",
    title: "Focus on Women’s Development",
    subtitle: "Empowering stories and designing for equality.",
    color: "rgba(40, 100, 70, 0.7)"
  }
];

// Initialize slider (only if exists)
document.addEventListener("DOMContentLoaded", () => {
  const heroSlider = document.getElementById("hero-slider");
  if (heroSlider) {
    new Slider(slidesData, "hero-slider");
  }
});

// ===========================
// Contact form behavior
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email")?.value.trim() || "(Not provided)";
    const message = document.getElementById("message")?.value.trim() || "(No message)";

    console.log(`
========= New Form Submission =========
Email: ${email}
Message: ${message}
=========================================
    `);

    alert("Thank you for your message! Your information has been submitted.");
    contactForm.reset();
  });
});

// ===========================
// Rolling text ticker 
// ===========================
class LoopTicker {
  constructor(container, texts, speed = 1.5) {
    this.container = container;
    this.texts = texts;
    this.speed = speed;
    this.position = container.offsetWidth;
    this.setup();
    this.loop();
  }

  setup() {
    this.container.innerHTML = this.texts.map(t => `<span>${t}</span>`).join('');
  }

  loop() {
    this.position -= this.speed;
    this.container.style.left = this.position + 'px';

    if (this.position < -this.container.scrollWidth) {
      this.position = this.container.parentElement.offsetWidth;
    }

    requestAnimationFrame(() => this.loop());
  }
}

// Initialize ticker (only on project page)
document.addEventListener("DOMContentLoaded", () => {
  const ticker = document.getElementById("ticker");
  if (!ticker) return;

  const sentences = [
    'Design meets interaction — exploring creative technology.',
    'Bringing ideas to life with code and imagination.',
    'Always learning, always creating.'
  ];
  new LoopTicker(ticker, sentences, 1.5);
});