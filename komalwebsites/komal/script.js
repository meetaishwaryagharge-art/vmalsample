document.addEventListener('DOMContentLoaded', () => {
    const glassCard = document.querySelector('.glass-card-wrapper');
    const heroSection = document.querySelector('.hero-section');
    const navbar = document.querySelector('.custom-navbar');
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    // 1. Interactive 3D Mockup Parallax Calculations
    if (glassCard && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xNormalize = (x / rect.width) - 0.5;
            const yNormalize = (y / rect.height) - 0.5;

            const tiltX = (yNormalize * 15).toFixed(2);
            const tiltY = (xNormalize * -15).toFixed(2);

            glassCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            glassCard.style.transform = `perspective(1000px) rotateY(-12deg) rotateX(6deg) scale(1)`;
        });
    }

    // 2. Navigation State Tracking & Automated Reveal Observer
    const manageScrollState = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Trigger viewport entrance reveals
        scrollElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 80) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', manageScrollState);
    
    // Fallback invocation to reveal above-the-fold interface setups
    setTimeout(manageScrollState, 200);
});