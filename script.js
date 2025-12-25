// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

function openMenu() {
    navMenu.classList.add('active');
    overlay.classList.add('active');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = 'auto';
}

mobileMenuBtn.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

overlay.addEventListener('click', closeMenu);

document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

window.addEventListener('orientationchange', () => {
    if (navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// FAQ Toggle Function
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');

    answer.classList.toggle('open');

    if (answer.classList.contains('open')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            if (window.innerWidth <= 768) {
                closeMenu();
            }

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('header').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('#navMenu a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('touchmove', function (e) {
    if (navMenu.classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });

closeMenu();

// ==================== Banner Slider ====================

const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });

    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'block';

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 10000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopSlider();
    startSlider();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopSlider();
    startSlider();
});

dots.forEach(dot => {
    dot.addEventListener('click', function () {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
        stopSlider();
        startSlider();
    });
});

const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopSlider);
sliderContainer.addEventListener('mouseleave', startSlider);

sliderContainer.addEventListener('touchstart', stopSlider);
sliderContainer.addEventListener('touchend', startSlider);

function initSlider() {
    showSlide(0);
    startSlider();
}

document.addEventListener('DOMContentLoaded', initSlider);

window.addEventListener('resize', () => {
    stopSlider();
    startSlider();
});

// ==================== Video Slider ====================

const videoSource = document.getElementById('videoSource');
const currentVideoName = document.getElementById('currentVideoName');
const currentVideoDesc = document.getElementById('currentVideoDesc');
const videoDots = document.querySelectorAll('.video-dot');
const prevVideoBtn = document.querySelector('.prev-video-btn');
const nextVideoBtn = document.querySelector('.next-video-btn');
const videoItems = document.querySelectorAll('.video-item');

let currentVideoIndex = 0;

function changeVideo(index) {
    if (index >= videoDots.length) {
        currentVideoIndex = 0;
    } else if (index < 0) {
        currentVideoIndex = videoDots.length - 1;
    } else {
        currentVideoIndex = index;
    }

    const selectedDot = videoDots[currentVideoIndex];
    const videoSrc = selectedDot.getAttribute('data-src');
    const videoName = selectedDot.getAttribute('data-name');
    const videoDesc = selectedDot.getAttribute('data-desc');

    const videoPlayer = document.querySelector('video');
    videoPlayer.pause();

    videoSource.src = videoSrc;

    currentVideoName.textContent = videoName;
    currentVideoDesc.textContent = videoDesc;

    videoPlayer.load();

    videoDots.forEach(dot => dot.classList.remove('active'));
    selectedDot.classList.add('active');

    videoItems.forEach(item => item.classList.remove('active'));
    videoItems[0].classList.add('active');
}

function nextVideo() {
    changeVideo(currentVideoIndex + 1);
}

function prevVideo() {
    changeVideo(currentVideoIndex - 1);
}

prevVideoBtn.addEventListener('click', prevVideo);
nextVideoBtn.addEventListener('click', nextVideo);

videoDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        changeVideo(index);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextVideo();
    } else if (e.key === 'ArrowLeft') {
        prevVideo();
    }
});

function initVideoSlider() {
    changeVideo(0);
}

document.addEventListener('DOMContentLoaded', initVideoSlider);

// ==================== Scroll progress indicator ====================
const scrollProgressBar = document.getElementById('scrollProgressBar');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgressBar.style.width = `${scrolled}%`;
});

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function smoothScrollToTop() {
    const currentPosition = window.scrollY;

    if (currentPosition > 0) {
        window.requestAnimationFrame(smoothScrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 8);
    }
}

backToTop.addEventListener('click', (e) => {
    e.preventDefault();

    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        smoothScrollToTop();
    }
});

let scrollTimeout;
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;

    scrollProgressBar.style.width = `${scrolled}%`;

    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }

    clearTimeout(scrollTimeout);
    scrollProgressBar.style.opacity = '1';

    scrollTimeout = setTimeout(() => {
        scrollProgressBar.style.opacity = '0.7';
    }, 150);
});

window.dispatchEvent(new Event('scroll'));

function updateProgressBarColor() {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;

    if (scrolled < 30) {
        scrollProgressBar.style.background = 'linear-gradient(90deg, var(--secondary-color), #e6c34a)';
    } else if (scrolled < 70) {
        scrollProgressBar.style.background = 'linear-gradient(90deg, #e6c34a, var(--primary-color))';
    } else {
        scrollProgressBar.style.background = 'linear-gradient(90deg, var(--primary-color), var(--accent-color))';
    }
}

window.addEventListener('scroll', updateProgressBarColor);

backToTop.setAttribute('aria-label', 'بازگشت به بالای صفحه');
backToTop.setAttribute('role', 'button');
backToTop.setAttribute('tabindex', '0');

backToTop.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

let firstShow = true;
window.addEventListener('scroll', () => {
    if (window.scrollY > 300 && firstShow) {
        backToTop.style.animation = 'heartbeat 1.5s ease-in-out';
        setTimeout(() => {
            backToTop.style.animation = '';
        }, 1500);
        firstShow = false;
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes heartbeat {
        0% { transform: scale(1); }
        25% { transform: scale(1.1); }
        50% { transform: scale(1); }
        75% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);