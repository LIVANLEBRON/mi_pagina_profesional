/**
 * Animaciones y efectos interactivos para la sección Sobre Mí
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos de código decorativos
    createCodeElements();
    
    // Efecto de typing para los elementos de código
    initTypingEffect();
    
    // Añadir observador para la sección Sobre Mí
    observeAboutSection();
});

/**
 * Crea elementos de código decorativos con efecto de typing
 */
function createCodeElements() {
    const codeElements = document.querySelectorAll('.code-element');
    
    codeElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.setAttribute('data-text', text);
    });
}

/**
 * Inicializa el efecto de escritura para los elementos de código
 */
function initTypingEffect() {
    const codeElements = document.querySelectorAll('.code-element');
    
    codeElements.forEach(element => {
        element.classList.add('typing-ready');
    });
}

/**
 * Efecto de escritura para un elemento
 */
function typeText(element) {
    const text = element.getAttribute('data-text');
    let index = 0;
    
    // Limpiar cualquier contenido existente
    element.textContent = '';
    
    // Función para añadir caracteres uno por uno
    function addCharacter() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(addCharacter, Math.random() * 50 + 30); // Velocidad variable para efecto más realista
        }
    }
    
    // Iniciar el efecto de escritura
    addCharacter();
}

/**
 * Observa la sección Sobre Mí para activar animaciones cuando sea visible
 */
function observeAboutSection() {
    const aboutSection = document.getElementById('sobre-mi');
    
    if (!aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Activar efecto de escritura en los elementos de código
                const codeElements = aboutSection.querySelectorAll('.code-element');
                codeElements.forEach((element, index) => {
                    setTimeout(() => {
                        typeText(element);
                    }, index * 1000); // Retrasar el inicio de cada elemento
                });
                
                // Añadir efecto de hover a las insignias tecnológicas
                const techBadges = aboutSection.querySelectorAll('.tech-badge');
                techBadges.forEach(badge => {
                    badge.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateY(-8px) scale(1.1)';
                    });
                    
                    badge.addEventListener('mouseleave', function() {
                        this.style.transform = '';
                    });
                });
                
                // Desconectar el observador una vez que se han activado las animaciones
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(aboutSection);
}