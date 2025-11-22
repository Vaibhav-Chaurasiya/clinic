// Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hide');
            }, 1000);
        });

        // Mobile Navigation
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Page Navigation
        function showPage(pageName) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageName).classList.add('active');
            
            // Update nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === pageName) {
                    link.classList.add('active');
                }
            });
            
            // Close mobile menu
            navMenu.classList.remove('active');
            mobileToggle.textContent = '☰';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Animate service cards
            if (pageName === 'services' || pageName === 'home') {
                setTimeout(() => {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }, 100);
            }
        }

        // Navigation Links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                if (page) {
                    showPage(page);
                }
            });
        });

        // Navbar Scroll Effect
        let lastScroll = 0;
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe service cards
        document.querySelectorAll('.service-card').forEach(card => {
            observer.observe(card);
        });

        // Form Submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('fname').value,
                lastName: document.getElementById('lname').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Show success message
            alert('Thank you for booking an appointment! We will contact you shortly to confirm your booking.');
            
            // Reset form
            e.target.reset();
        });

        // Smooth Scroll for Internal Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Initialize animations on load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelectorAll('.service-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
            }, 500);
        });

        // Gallery Image Click
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const overlay = item.querySelector('.gallery-overlay');
                if (overlay) {
                    const title = overlay.querySelector('h3').textContent;
                    alert(`Viewing: ${title}\n\nClick OK to continue browsing the gallery.`);
                }
            });
        });

        // Parallax Effect for Hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Floating Icons Animation
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 2}s`;
        });

        // Button Ripple Effect
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Testimonial Cards Hover Effect
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Service Card Icon Rotation
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.service-image');
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.service-image');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Auto-update current year in footer
        const currentYear = new Date().getFullYear();
        document.querySelector('.footer-bottom p').textContent = 
            `© ${currentYear} SuPav Speech Therapy & Hearing Aid Clinic. All rights reserved.`;

        // Lazy Loading for Gallery Images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '1';
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('.gallery-item img, .about-img img').forEach(img => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                imageObserver.observe(img);
            });
        }

        // Add entrance animation to info cards
        const infoCards = document.querySelectorAll('.info-card');
        const infoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        infoCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-30px)';
            card.style.transition = 'all 0.5s ease';
            infoObserver.observe(card);
        });

        // Add pulse animation to contact icon
        setInterval(() => {
            const contactIcon = document.querySelector('.contact-icon');
            if (contactIcon) {
                contactIcon.style.animation = 'none';
                setTimeout(() => {
                    contactIcon.style.animation = 'pulse 2s ease infinite';
                }, 10);
            }
        }, 5000);

        // Feature items entrance animation
        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.5s ease';
            featureObserver.observe(item);
        });

        // Social icons hover effect
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                icon.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 500);
            });
        });

        // Form input focus effects
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });

        // Prevent default for logo click
        document.querySelector('.logo').addEventListener('click', (e) => {
            e.preventDefault();
            showPage('home');
        });

        console.log('SuPav Clinic Website Loaded Successfully! 🎉');