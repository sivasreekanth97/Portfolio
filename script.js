document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const progressBars = document.querySelectorAll('.progress');
    const statNumbers = document.querySelectorAll('.stat-number');

    // Dynamic Experience Calculation
    const updateExperience = () => {
        const startDate = new Date('2023-06-01'); // Start date of current role
        const currentDate = new Date();
        // Calculate years with one decimal place
        const experienceYears = ((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);

        // Update text in paragraph
        const expTextElement = document.getElementById('exp-years-text');
        if (expTextElement) {
            // If greater than 2, show the calculated value, otherwise show 2 (fallback/minimum)
            // Using Math.floor to show full years for counting, or keep decimal? User said "2 years".
            // Let's use Math.floor for "2+" style, or rounded.
            const years = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25));
            expTextElement.textContent = years < 2 ? 2 : years;
        }

        // Update stat card number
        const expStatElement = document.getElementById('exp-years-stat');
        if (expStatElement) {
            const years = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25));
            // Ensure it's at least 2 to match original text
            expStatElement.setAttribute('data-target', years < 2 ? 2 : years);
        }
    };
    updateExperience();

    // Mobile Navigation Toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate burger icon
        const spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                // Reset burger icon
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Project Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    // Trigger reflow for animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animation on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate Progress Bars
                if (entry.target.classList.contains('skills')) {
                    progressBars.forEach(bar => {
                        // Get width from inline style
                        const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                        bar.style.width = width;
                    });
                }

                // Animate Stat Numbers
                if (entry.target.classList.contains('about')) {
                    statNumbers.forEach(stat => {
                        const target = +stat.getAttribute('data-target');
                        const increment = target / 50;
                        let current = 0;

                        const updateCount = () => {
                            if (current < target) {
                                current += increment;
                                if (current > target) current = target;
                                stat.innerText = Math.ceil(current) + (stat.previousElementSibling ? '' : '+');
                                setTimeout(updateCount, 40);
                            } else {
                                stat.innerText = target + '+';
                            }
                        };
                        updateCount();
                    });
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Typed Text Effect for Hero
    const dynamicText = document.querySelector('.dynamic-text .highlight');
    // Simple fade in/out or text replacement could go here if more complexity needed
    // For now, kept static as per design, but prepared for expansion
});
