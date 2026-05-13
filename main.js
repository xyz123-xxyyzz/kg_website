document.addEventListener('DOMContentLoaded', () => {
    // Language Switcher Logic
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });
    }

    document.addEventListener('click', () => {
        if (langDropdown) langDropdown.classList.remove('show');
    });

    window.changeLang = (lang) => {
        const elements = document.querySelectorAll('[data-tr]');
        elements.forEach(el => {
            const tr = el.getAttribute('data-tr');
            const en = el.getAttribute('data-en');
            
            if (lang === 'tr') {
                el.innerHTML = tr;
            } else {
                el.innerHTML = en;
            }
        });
        
        // Update button text
        if (langBtn) langBtn.innerText = lang.toUpperCase();
        
        // Save preference
        localStorage.setItem('preferred-lang', lang);
    };

    // Load preferred language
    const savedLang = localStorage.getItem('preferred-lang');
    if (savedLang) changeLang(savedLang);

    // Mouse move effect for glow
    const mouseGlow = document.getElementById('mouse-glow');
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            requestAnimationFrame(() => {
                mouseGlow.style.left = `${x - 300}px`;
                mouseGlow.style.top = `${y - 300}px`;
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Mobile Menu Logic
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
