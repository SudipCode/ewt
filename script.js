 document.addEventListener('DOMContentLoaded', function() {

        // --- LOADER ---
        const loader = document.getElementById('loader');
        const hideLoader = () => loader.classList.add('hidden');
        // Hide loader on window load or after 900ms, whichever comes first
        Promise.race([
            new Promise(resolve => window.addEventListener('load', resolve)),
            new Promise(resolve => setTimeout(resolve, 900))
        ]).then(hideLoader);

        // --- MOBILE NAVIGATION ---
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navLinkItems = document.querySelectorAll('.nav-links li a');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile nav when a link is clicked
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });

        // --- HERO SLIDER ---
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.slider-arrow.prev');
        const nextBtn = document.querySelector('.slider-arrow.next');
        const dotContainer = document.querySelector('.slider-nav');
        let currentSlide = 0;
        let slideInterval;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.slide = i;
            dotContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.slider-dot');

        const goToSlide = (slideIndex) => {
            slides.forEach((s, i) => {
                s.classList.remove('active');
                dots[i].classList.remove('active');
            });
            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active');
            currentSlide = slideIndex;
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        };

        // Autoplay
        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider();
        });

        dotContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('slider-dot')) {
                const slideIndex = parseInt(e.target.dataset.slide);
                goToSlide(slideIndex);
                stopSlider();
                startSlider();
            }
        });

        document.querySelector('#hero').addEventListener('mouseenter', stopSlider);
        document.querySelector('#hero').addEventListener('mouseleave', startSlider);

        // Swipe support for mobile
        let touchstartX = 0;
        let touchendX = 0;
        const sliderEl = document.querySelector('.slider');

        sliderEl.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        });

        sliderEl.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchendX < touchstartX - 50) { // Swiped left
                nextSlide();
            }
            if (touchendX > touchstartX + 50) { // Swiped right
                prevSlide();
            }
            // Reset and restart autoplay after manual swipe
            stopSlider();
            startSlider();
        }

        startSlider(); // Initial start

        // --- INTERSECTION OBSERVER FOR SCROLL REVEAL ---
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // --- INTERSECTION OBSERVER FOR SCROLL SPY (NAV HIGHLIGHT) ---
        const sections = document.querySelectorAll('section');
        const navHighlighter = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Highlight when section is in the middle of the viewport
            threshold: 0
        });

        sections.forEach(section => navHighlighter.observe(section));

        // --- CONTACT FORM SUBMISSION (PREVENT DEFAULT) ---
        const contactForm = document.querySelector('.contact-form');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically handle form submission, e.g., via AJAX
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });

    });