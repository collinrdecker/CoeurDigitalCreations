// script.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // Lightbox/Modal Functionality
    const portfolioModal = document.getElementById('portfolioModal');
    const closeButton = document.querySelector('.close-button');
    const modalMediaWrapper = document.querySelector('.modal-media-wrapper');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryCounter = document.querySelector('.gallery-counter');
    const backBtn = document.querySelector('.gallery-back-btn');

    let currentGalleryImages = [];
    let currentImageIndex = 0;
    let currentModalMode = '';
    let currentGalleryName = '';
    let currentTitle = '';
    let currentDescription = '';

    const galleries = {
        "wedding-event-1": [
            "wedding-photo-1.jpg",
            "wedding-photo-2.jpg",
            "wedding-photo-3.jpg",
            "wedding-photo-4.jpg"
        ],
        "portrait-session-1": [
            "photo1.jpg",
            "photo2.jpg",
            "photo3.jpg"
        ]
    };

    function openGalleryGrid(galleryName, title, description) {
        modalMediaWrapper.innerHTML = '';
        modalMediaWrapper.classList.remove('single-image-view');
        modalMediaWrapper.classList.add('grid-view');
        backBtn.style.display = 'none';

        modalTitle.textContent = title;
        modalDescription.textContent = description;

        currentGalleryImages = galleries[galleryName].map(filename => ({
            filename: filename,
            galleryFolder: galleryName
        }));
        currentGalleryName = galleryName;
        currentTitle = title;
        currentDescription = description;

        currentGalleryImages.forEach((image, index) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            const img = document.createElement('img');
            img.src = `assets/images/photo/${image.galleryFolder}/${image.filename}`;
            img.alt = `${title} - Image ${index + 1}`;
            img.dataset.index = index;
            
            gridItem.appendChild(img);

            gridItem.addEventListener('click', () => {
                openSingleImageView(galleryName, title, description, index);
            });
            modalMediaWrapper.appendChild(gridItem);
        });

        currentModalMode = 'grid';
        portfolioModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openSingleImageView(galleryName, title, description, startIndex) {
        modalMediaWrapper.innerHTML = '';
        modalMediaWrapper.classList.remove('grid-view');
        modalMediaWrapper.classList.add('single-image-view');
        backBtn.style.display = 'block';

        currentGalleryImages = galleries[galleryName].map(filename => ({
            filename: filename,
            galleryFolder: galleryName
        }));
        currentImageIndex = startIndex;
        currentGalleryName = galleryName;
        currentTitle = title;
        currentDescription = description;

        modalTitle.textContent = title;
        modalDescription.textContent = description;

        displayCurrentSingleImage();

        currentModalMode = 'single-image';
        portfolioModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function displayCurrentSingleImage() {
        if (currentGalleryImages.length === 0) return;

        const image = currentGalleryImages[currentImageIndex];
        const img = document.createElement('img');
        img.src = `assets/images/photo/${image.galleryFolder}/${image.filename}`;
        img.alt = `${currentTitle} - Image ${currentImageIndex + 1}`;
        
        modalMediaWrapper.innerHTML = '';
        modalMediaWrapper.appendChild(img);

        galleryCounter.textContent = `${currentImageIndex + 1} of ${currentGalleryImages.length}`;
    }

    function openVideoView(mediaSrc, title, description) {
        modalMediaWrapper.innerHTML = '';
        modalMediaWrapper.classList.remove('grid-view', 'single-image-view');
        backBtn.style.display = 'none';

        modalTitle.textContent = title;
        modalDescription.textContent = description;

        const video = document.createElement('video');
        video.src = mediaSrc;
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.muted = false;
        video.setAttribute('playsinline', '');
        modalMediaWrapper.appendChild(video);
        currentGalleryImages = [];
        currentModalMode = 'video';
        
        portfolioModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openSingleStaticImageView(mediaSrc, title, description) {
        modalMediaWrapper.innerHTML = '';
        modalMediaWrapper.classList.remove('grid-view');
        modalMediaWrapper.classList.add('single-image-view');
        backBtn.style.display = 'none';

        const img = document.createElement('img');
        img.src = mediaSrc;
        img.alt = title;
        modalMediaWrapper.appendChild(img);
        
        modalTitle.textContent = title;
        modalDescription.textContent = description;

        currentGalleryImages = [];
        currentModalMode = 'single-static-image';

        portfolioModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = '';
        
        const currentVideo = modalMediaWrapper.querySelector('video');
        if (currentVideo) {
            currentVideo.pause();
            currentVideo.currentTime = 0;
        }
        currentGalleryImages = [];
        currentImageIndex = 0;
        currentModalMode = '';
        currentGalleryName = '';
        currentTitle = '';
        currentDescription = '';
    }

    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const galleryName = this.getAttribute('data-gallery');
            const title = this.querySelector('.portfolio-overlay h4').textContent;
            const description = this.querySelector('.portfolio-overlay p').textContent;

            if (category === 'video') {
                const mediaSrc = this.querySelector('video').src;
                openVideoView(mediaSrc, title, description);
            } else if (category === 'photo' && galleryName && galleries[galleryName]) {
                openGalleryGrid(galleryName, title, description);
            } else {
                const mediaSrc = this.querySelector('img').src;
                openSingleStaticImageView(mediaSrc, title, description);
            }
        });
    });

    prevBtn.addEventListener('click', function() {
        if (currentModalMode === 'single-image' && currentImageIndex > 0) {
            currentImageIndex--;
            displayCurrentSingleImage();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentModalMode === 'single-image' && currentImageIndex < currentGalleryImages.length - 1) {
            currentImageIndex++;
            displayCurrentSingleImage();
        }
    });

    backBtn.addEventListener('click', function() {
        if (currentModalMode === 'single-image') {
            openGalleryGrid(currentGalleryName, currentTitle, currentDescription);
        }
    });

    closeButton.addEventListener('click', closeModal);

    portfolioModal.addEventListener('click', function(e) {
        if (e.target === portfolioModal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
            closeModal();
        }
        if (portfolioModal.classList.contains('active') && currentModalMode === 'single-image' && currentGalleryImages.length > 0) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Backspace') {
                backBtn.click();
            }
        }
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');

        if (!name || !email || !service || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
            ${type === 'success' ? 'background: linear-gradient(45deg, #0ea5e9, #3b82f6);' : 'background: linear-gradient(45deg, #ef4444, #dc2626);'}
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }

    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;

            if (scrollTop > (sectionTop - windowHeight + sectionHeight / 4)) {
                section.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #3b82f6, #0ea5e9);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '0.7';
    });

    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });

    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
        });
    });

    const fadeInCSS = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .revealed {
            animation: fadeIn 0.8s ease-out;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = fadeInCSS;
    document.head.appendChild(style);

    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.textContent;
        
        contactForm.addEventListener('submit', function() {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #3b82f6, #0ea5e9);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    console.log('Coeur Digital Creations website loaded successfully!');
});