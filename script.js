document.addEventListener("DOMContentLoaded", () => {
    
    // ===== Sticky Navbar =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== Mobile Navigation =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksList = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('nav-active');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinksList.classList.contains('nav-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksList.classList.contains('nav-active')) {
                navLinksList.classList.remove('nav-active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ===== Active Navigation Link on Scroll =====
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== Scroll Animations (Intersection Observer) =====
    const faders = document.querySelectorAll('.fade-in-up');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // ===== Minimal Interaction: Mouse Move Parallax on Orbs (Optional Enhancement) =====
    const orbs = document.querySelectorAll('.glow-orb');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        orbs.forEach((orb, index) => {
            const factor = (index + 1) * 20; 
            orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });

});
