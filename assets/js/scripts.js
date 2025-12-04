// PROJECT DATA
const projectsData = {
  "project-1": {
    title: "Design Portfolio",
    category: "UI/UX Design",
    image: "./assets/images/design.png",
    challenge: "To create a visually striking portfolio that showcases design skills without overwhelming the user. The goal was to balance aesthetics with usability.",
    solution: "Implemented a clean, grid-based layout with high-quality imagery and subtle hover effects. Used Figma for prototyping and ensuring a consistent design system.",
    techs: ["Figma", "Prototyping", "User Research", "Wireframing"],
    liveLink: "https://www.figma.com/design/q4wZ5oq6X6pW9tGN7HT1EG/Moon-Medicine-Prototyping?node-id=0-1&t=fP22r70UJYeoetwg-1",
    codeLink: "#"
  },
  "project-2": {
    title: "E-Learning Platform",
    category: "Web Development",
    image: "./assets/images/thumbnail-project-2-large.webp",
    challenge: "Building a responsive landing page for an e-learning platform that effectively communicates value and converts visitors.",
    solution: "Developed a mobile-first landing page using semantic HTML and CSS Grid. Optimized images and assets for fast load times.",
    techs: ["HTML5", "CSS3", "Responsive Design"],
    liveLink: "#",
    codeLink: "#"
  },
  "project-3": {
    title: "Task Master App",
    category: "React Application",
    image: "./assets/images/thumbnail-project-3-large.webp",
    challenge: "Creating a functional To-Do application with state management and local storage persistence.",
    solution: "Built with React hooks (useState, useEffect) to manage tasks. Implemented drag-and-drop reordering and a dark mode toggle.",
    techs: ["React", "JavaScript", "LocalStorage", "CSS Modules"],
    liveLink: "#",
    codeLink: "#"
  },
  "project-4": {
    title: "Entertainment Hub",
    category: "Web App",
    image: "./assets/images/thumbnail-project-4-large.webp",
    challenge: "Developing a multi-page entertainment web app that fetches data from a local JSON file and allows bookmarking.",
    solution: "Used vanilla JavaScript to fetch data and dynamically render movies/series. Implemented a custom search filter and bookmarking system.",
    techs: ["JavaScript", "JSON", "Grid Layout", "Async/Await"],
    liveLink: "#",
    codeLink: "#"
  }
};

// DOM ELEMENTS
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.header__link');
const sections = document.querySelectorAll('section');
const modal = document.getElementById('modal');
const closeModalBtns = document.querySelectorAll('[data-close-modal]');
const projectCards = document.querySelectorAll('.project-card');

// STICKY NAVIGATION
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ACTIVE LINK ON SCROLL (SCROLL SPY)
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// SCROLL ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
  observer.observe(el);
});

// MODAL LOGIC
function openModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  // Populate Modal
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-image').src = data.image;
  document.getElementById('modal-challenge').textContent = data.challenge;
  document.getElementById('modal-solution').textContent = data.solution;
  document.getElementById('modal-live').href = data.liveLink;
  document.getElementById('modal-code').href = data.codeLink;

  // Populate Techs
  const techContainer = document.getElementById('modal-techs');
  techContainer.innerHTML = '';
  data.techs.forEach(tech => {
    const span = document.createElement('span');
    span.className = 'tech-tag';
    span.textContent = tech;
    techContainer.appendChild(span);
  });

  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    openModal(id);
  });
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', closeModal);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

// FORM HANDLING
const form = document.getElementById("my-form");
const popup = document.getElementById("thank-you-popup");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';

    const data = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        popup.classList.add("show");
        setTimeout(() => {
          popup.classList.remove("show");
        }, 5000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error sending message.");
    } finally {
      btn.textContent = originalText;
    }
  });
}
