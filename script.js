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

document.addEventListener('touchmove', function(e) {
    if (navMenu.classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });

closeMenu();

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