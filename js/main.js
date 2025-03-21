document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const contactForm = document.getElementById('contactForm');
    
    // Inicializar AOS (si se implementa)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true
        });
    }
    
    // Menú móvil toggle
    let menuOpen = false;
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (!menuOpen) {
                menuBtn.classList.add('open');
                navLinks.classList.add('active');
                menuOpen = true;
            } else {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('active');
                menuOpen = false;
            }
        });
    }
    
    // Cerrar menú al hacer clic en cualquier parte de la página
    document.addEventListener('click', (e) => {
        if (menuOpen && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            menuOpen = false;
        }
    })
    
    // Cerrar menú al hacer clic en un enlace (en móvil)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (menuOpen) {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('active');
                menuOpen = false;
            }
        });
    });
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animación de números (si se implementa)
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.number-counter');
        
        numberElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateNumber = () => {
                current += step;
                if (current < target) {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    el.textContent = target;
                }
            };
            
            updateNumber();
        });
    }
    
    // Observador de intersección para activar animaciones cuando los elementos son visibles
    const observerOptions = {
        threshold: 0.25
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Si es la sección de estadísticas, iniciar animación de números
                if (entry.target.id === 'statistics') {
                    animateNumbers();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar secciones para animaciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Manejar envío del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se implementaría la lógica para enviar el formulario
            // Por ahora, solo mostraremos un mensaje de éxito simulado
            const formElements = contactForm.elements;
            let isValid = true;
            
            // Validación básica
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit' && formElements[i].value.trim() === '') {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else if (formElements[i].type !== 'submit') {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // Simulación de envío exitoso
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                setTimeout(() => {
                    contactForm.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>¡Mensaje Enviado!</h3><p>Gracias por contactarme. Te responderé lo antes posible.</p></div>';
                }, 1500);
            }
        });
    }
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});