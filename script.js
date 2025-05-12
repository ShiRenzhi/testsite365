// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('bg-gray-900');
  } else {
    nav.classList.remove('bg-gray-900');
  }
});

// Language switcher
fetch('languages.json')
  .then(response => response.json())
  .then(languages => {
    const buttons = document.querySelectorAll('.lang-btn');
    const elements = document.querySelectorAll('[data-key]');

    function updateLanguage(lang) {
      elements.forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = languages[lang][key] || element.textContent; // Fallback to current text
      });
      document.documentElement.lang = lang;
      localStorage.setItem('language', lang);
    }

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        updateLanguage(button.getAttribute('data-lang'));
      });
    });

    // Set default language
    const savedLang = localStorage.getItem('language') || 'en';
    updateLanguage(savedLang);
  })
  .catch(error => console.error('Error loading languages:', error));

// Carousel
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentIndex = 0;

function updateCarousel() {
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
});

// Auto-play carousel
setInterval(() => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
}, 5000);

// Handle image loading errors
document.querySelectorAll('.carousel-item img').forEach(img => {
  img.addEventListener('error', () => {
    img.src = 'https://via.placeholder.com/1200x400?text=Image+Not+Found';
    img.alt = 'Image Not Found';
  });
});