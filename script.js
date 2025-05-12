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
    nav.classList.add('bg-blue-800');
  } else {
    nav.classList.remove('bg-blue-800');
  }
});

// Language switcher
fetch('languages.json')
  .then(response => response.json())
  .then(languages => {
    const switcher = document.getElementById('language-switcher');
    const elements = document.querySelectorAll('[data-key]');

    function updateLanguage(lang) {
      elements.forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = languages[lang][key];
      });
      document.documentElement.lang = lang;
    }

    switcher.addEventListener('change', () => {
      updateLanguage(switcher.value);
    });

    // Set default language based on browser or stored preference
    const savedLang = localStorage.getItem('language') || 'en';
    switcher.value = savedLang;
    updateLanguage(savedLang);
  });