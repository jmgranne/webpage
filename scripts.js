// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Disable right-click on images to prevent downloading
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.image-grid img').forEach(img => {
    img.addEventListener('click', function() {
        lightbox.style.display = 'flex';
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
    });
});

closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Close lightbox on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
    }
});

// Hero slideshow — rotate through 10 photos with fade
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
const slideInterval = 4000; // 4 seconds per slide

setInterval(function() {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
}, slideInterval);

// Masonry grid — set grid-row span based on image aspect ratio
function getColumnCount() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    return 3;
}

function setMasonrySpans() {
    const grid = document.querySelector('.image-grid');
    if (!grid) return;
    const cols = getColumnCount();
    const rowHeight = 10; // matches grid-auto-rows
    const gap = cols === 1 ? 16 : (cols === 2 ? 12 : 16); // matches gap values

    grid.querySelectorAll('img').forEach(img => {
        function applySpan() {
            if (!img.naturalWidth) return;
            const colWidth = grid.offsetWidth / cols;
            const imgHeight = (img.naturalHeight / img.naturalWidth) * colWidth;
            const span = Math.max(1, Math.round((imgHeight + gap) / (rowHeight + gap)));
            img.style.gridRow = `span ${span}`;
        }

        if (img.complete && img.naturalWidth) {
            applySpan();
        } else {
            img.addEventListener('load', applySpan);
        }
    });
}

// Run on load and resize
window.addEventListener('load', setMasonrySpans);
window.addEventListener('resize', setMasonrySpans);
