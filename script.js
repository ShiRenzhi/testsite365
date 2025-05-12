```javascript
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
    const select = document.getElementById('lang-select');
    const elements = document.querySelectorAll('[data-key]');

    function updateLanguage(lang) {
      elements.forEach(element => {
        const key = element.getAttribute('data-key');
        element.textContent = languages[lang][key] || element.textContent;
      });
      document.documentElement.lang = lang;
      localStorage.setItem('language', lang);
    }

    if (select) {
      select.addEventListener('change', () => {
        updateLanguage(select.value);
      });
    }

    const savedLang = localStorage.getItem('language') || 'en';
    select.value = savedLang; // Set dropdown to saved language
    updateLanguage(savedLang);
  })
  .catch(error => console.error('Error loading languages:', error));

// Gallery filtering and lightbox
const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

galleryFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    const filterValue = filter.getAttribute('data-filter');
    galleryItems.forEach(item => {
      if (filterValue === 'all' || item.classList.contains(filterValue)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.getAttribute('data-image');
    lightbox.classList.remove('hidden');
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add('hidden');
  }
});

// Timeline dragging
const timelineTrack = document.querySelector('.timeline-track');
if (timelineTrack) {
  let isDragging = false;
  let startX, scrollLeft;

  timelineTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - timelineTrack.offsetLeft;
    scrollLeft = timelineTrack.scrollLeft;
    timelineTrack.style.cursor = 'grabbing';
  });

  timelineTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    timelineTrack.style.cursor = 'grab';
  });

  timelineTrack.addEventListener('mouseup', () => {
    isDragging = false;
    timelineTrack.style.cursor = 'grab';
  });

  timelineTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - timelineTrack.offsetLeft;
    const walk = (x - startX) * 2;
    timelineTrack.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  timelineTrack.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - timelineTrack.offsetLeft;
    scrollLeft = timelineTrack.scrollLeft;
  });

  timelineTrack.addEventListener('touchend', () => {
    isDragging = false;
  });

  timelineTrack.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - timelineTrack.offsetLeft;
    const walk = (x - startX) * 2;
    timelineTrack.scrollLeft = scrollLeft - walk;
  });
}

// Copy email
const copyButtons = document.querySelectorAll('.copy-email');
copyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const email = button.getAttribute('data-email');
    navigator.clipboard.writeText(email).then(() => {
      const lang = localStorage.getItem('language') || 'en';
      fetch('languages.json')
        .then(response => response.json())
        .then(languages => {
          alert(languages[lang]['contact_copy_success']);
        });
    });
  });
});

// Audio player toggle
const audioPlayer = document.getElementById('audio-player');
const audioToggle = document.getElementById('audio-toggle');
if (audioPlayer && audioToggle) {
  audioToggle.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      audioToggle.textContent = 'Pause';
    } else {
      audioPlayer.pause();
      audioToggle.textContent = 'Play';
    }
  });
}

// Download button interaction
const downloadButton = document.querySelector('.download-btn');
if (downloadButton) {
  downloadButton.addEventListener('click', () => {
    const lang = localStorage.getItem('language') || 'en';
    fetch('languages.json')
      .then(response => response.json())
      .then(languages => {
        alert(languages[lang]['download_alert'] || 'Download initiated! Check your downloads folder.');
      });
  });
}
```