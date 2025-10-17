// --- START OF FILE script.js ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Typewriter Effect for Hero Subtitle ---
    const typewriteElement = document.querySelector('.typewrite');
    if (typewriteElement) {
        const dataText = JSON.parse(typewriteElement.getAttribute('data-type'));
        const period = parseInt(typewriteElement.getAttribute('data-period'), 10) || 2000;
        let loopNum = 0;
        let isDeleting = false;
        let txt = '';
        let delta = 200 - Math.random() * 100;

        function tick() {
            const i = loopNum % dataText.length;
            const fullTxt = dataText[i];

            if (isDeleting) {
                txt = fullTxt.substring(0, txt.length - 1);
            } else {
                txt = fullTxt.substring(0, txt.length + 1);
            }

            typewriteElement.querySelector('.wrap').textContent = txt;

            delta = 200 - Math.random() * 100;
            if (isDeleting) { delta /= 2; }

            if (!isDeleting && txt === fullTxt) {
                delta = period;
                isDeleting = true;
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                loopNum++;
                delta = 500;
            }

            setTimeout(() => tick(), delta);
        }
        tick();
    }

    // --- Matrix Digital Rain Effect for Hero Section ---
    const matrixCanvas = document.getElementById('matrixCanvas');
    if (matrixCanvas) {
        const ctx = matrixCanvas.getContext('2d');

        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const chinese = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()";
        const font_size = 16;
        const columns = matrixCanvas.width / font_size;
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawMatrix() {
            ctx.fillStyle = "rgba(26, 33, 46, 0.05)"; // Dark background with transparency
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            ctx.fillStyle = "#00bcd4"; // Primary color for the text
            ctx.font = font_size + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = chinese[Math.floor(Math.random() * chinese.length)];
                ctx.fillText(text, i * font_size, drops[i] * font_size);

                if (drops[i] * font_size > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 33);

        // Adjust canvas size on window resize
        window.addEventListener('resize', () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            // Re-calculate columns and reset drops array
            const newColumns = matrixCanvas.width / font_size;
            for (let x = 0; x < newColumns; x++) {
                if (drops[x] === undefined) {
                    drops[x] = 1;
                }
            }
            drops.length = newColumns; // Trim if window gets smaller
        });
    }

    // --- Scroll Animation for Sections (is-visible class) ---
    const sectionsToAnimate = document.querySelectorAll('.section-title, .about-content, .skill-category, .project-card, .certificate-card, .contact-content');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Special handling for skill bars animation
                if (entry.target.classList.contains('skill-category')) {
                    const skillLevels = entry.target.querySelectorAll('.skill-level');
                    skillLevels.forEach(skillLevel => {
                        const width = skillLevel.parentElement.getAttribute('aria-valuenow');
                        skillLevel.style.width = width + '%';
                    });
                }

                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // --- Active Nav Link on Scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust offset as needed
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Add active class to first link on load if at top
    if (window.scrollY === 0) {
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
    }

});
// --- END OF FILE script.js ---