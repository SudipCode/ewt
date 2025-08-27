    document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const links = document.querySelectorAll('.nav-links li a');

            // Toggle mobile navigation
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close mobile nav on link click
            links.forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                });
            });

            // Active nav link on scroll
            const sections = document.querySelectorAll('section');
            const navLi = document.querySelectorAll('.main-header .nav-links li a');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (pageYOffset >= sectionTop - 80) {
                        current = section.getAttribute('id');
                    }
                });

                navLi.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href').includes(current)) {
                        a.classList.add('active');
                    }
                });
            });

            // Contact Form Validation
            const contactForm = document.getElementById('contact-form');
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const goal = document.getElementById('goal').value.trim();

                if (name === '' || email === '' || goal === '') {
                    alert('Please fill out all fields.');
                    return;
                }

                if (!validateEmail(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                alert('Thank you! Your consultation request has been sent. We will be in touch shortly.');
                contactForm.reset();
            });

            function validateEmail(email) {
                const re = /^(([^<>()[\\]\\.,;:\s@\"]+(\.[^<>()[\\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
        });