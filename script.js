// JavaScript para interactividad de la página de Boca Juniors

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para enlaces de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de scroll en el header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animaciones de entrada para elementos
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

    // Aplicar animaciones a elementos
    const animatedElements = document.querySelectorAll('.news-card, .product-card, .news-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efecto hover para tarjetas de productos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto hover para botones
    const buttons = document.querySelectorAll('.hero-link, .app-button, .channel-button, .shop-button, .news-button, .ticket-button, .product-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0,102,204,0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Contador animado para estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Efecto parallax suave para el hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });

    // Bootstrap Navbar Enhancement
    const enhanceNavbar = () => {
        const navbar = document.querySelector('.navbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        // Smooth scroll para enlaces del navbar
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Cerrar el menú móvil si está abierto
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Cerrar menú móvil al hacer clic en un dropdown item
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
        
        // Efecto de transparencia en scroll
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled > 50) {
                navbar.style.background = 'rgba(30, 54, 83, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, #1e3653 0%, #004499 100%)';
                navbar.style.backdropFilter = 'none';
            }
        });
    };
    
    enhanceNavbar();

    // Carrusel Enhancement
    const enhanceCarousel = () => {
        const carousel = document.querySelector('#heroCarousel');
        if (carousel) {
            // Pausar carrusel al hacer hover
            carousel.addEventListener('mouseenter', function() {
                this.pause();
            });
            
            // Reanudar carrusel al quitar hover
            carousel.addEventListener('mouseleave', function() {
                this.cycle();
            });
            
            // Efecto de typing para títulos del carrusel
            const heroTitles = document.querySelectorAll('.hero-title');
            heroTitles.forEach((title, index) => {
                if (index === 0) {
                    // Aplicar typing effect al primer título
                    const originalText = title.textContent;
                    title.textContent = '';
                    
                    let i = 0;
                    const typeWriter = () => {
                        if (i < originalText.length) {
                            title.textContent += originalText.charAt(i);
                            i++;
                            setTimeout(typeWriter, 100);
                        }
                    };
                    
                    setTimeout(typeWriter, 500);
                }
            });
            
            // Aplicar typing effect cuando cambie de slide
            carousel.addEventListener('slid.bs.carousel', function(event) {
                const activeSlide = event.target.querySelector('.carousel-item.active');
                const title = activeSlide.querySelector('.hero-title');
                
                if (title) {
                    const originalText = title.textContent;
                    title.style.opacity = '0';
                    
                    setTimeout(() => {
                        title.textContent = '';
                        title.style.opacity = '1';
                        
                        let i = 0;
                        const typeWriter = () => {
                            if (i < originalText.length) {
                                title.textContent += originalText.charAt(i);
                                i++;
                                setTimeout(typeWriter, 80);
                            }
                        };
                        
                        typeWriter();
                    }, 300);
                }
            });
        }
    };
    
    enhanceCarousel();

    // Efecto de partículas en el hero (simulado con CSS)
    const createParticles = () => {
        const hero = document.querySelector('.hero');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 215, 0, 0.6);
                border-radius: 50%;
                animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
        
        // Añadir keyframes para la animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    };
    
    createParticles();

    // Efecto de hover para las noticias
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0,102,204,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });

    // Lazy loading para imágenes (si se añaden en el futuro)
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Efecto de scroll suave para toda la página
    document.documentElement.style.scrollBehavior = 'smooth';

    // Preloader (opcional)
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1e3653;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    preloader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 3rem; font-weight: 900; margin-bottom: 20px; color: #e1a730;">STORM</div>
            <div style="width: 50px; height: 50px; border: 3px solid #e1a730; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
    `;
    
    // Añadir keyframes para el spinner
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
    
    document.body.appendChild(preloader);
    
    // Remover preloader después de cargar
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });

    console.log('¡Bienvenido a la página de Club Storm Voleibol! 🏐⚡');
});
