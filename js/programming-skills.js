/**
 * Animaciones y efectos interactivos para resaltar habilidades de programación
 * Licencia: MIT License - Libre uso con atribución
 * Copyright (c) 2023 - Uso libre para Livan Lebrón
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar las animaciones de habilidades de programación
    initProgrammingSkills();
    
    // Crear fragmentos de código animados
    createCodeSnippets();
    
    // Inicializar barras de progreso
    initSkillProgressBars();
    
    // Efecto de typing para los fragmentos de código
    initTypingEffect();
});

/**
 * Inicializa la sección de habilidades de programación
 */
function initProgrammingSkills() {
    // Crear contenedor para las habilidades de código si no existe
    if (!document.querySelector('.code-skills-container')) {
        const skillsSection = document.getElementById('habilidades');
        if (skillsSection) {
            const container = skillsSection.querySelector('.container');
            const skillsContainer = document.querySelector('.skills-container');
            
            // Crear el nuevo contenedor de habilidades de código
            const codeSkillsContainer = document.createElement('div');
            codeSkillsContainer.className = 'code-skills-container';
            
            // Añadir fondo de matriz de código
            const matrixBg = document.createElement('div');
            matrixBg.className = 'code-matrix-bg';
            codeSkillsContainer.appendChild(matrixBg);
            
            // Insertar antes del contenedor de habilidades existente
            if (container && skillsContainer) {
                container.insertBefore(codeSkillsContainer, skillsContainer);
                
                // Añadir título de sección
                const sectionTitle = document.createElement('h3');
                sectionTitle.className = 'section-subtitle';
                sectionTitle.innerHTML = '<i class="fas fa-code"></i> Habilidades de Programación';
                codeSkillsContainer.appendChild(sectionTitle);
                
                // Crear tarjetas de habilidades de programación
                createProgrammingSkillCards(codeSkillsContainer);
            }
        }
    }
}

/**
 * Crea tarjetas para cada habilidad de programación
 */
function createProgrammingSkillCards(container) {
    // Definir las habilidades de programación con sus niveles
    const programmingSkills = [
        { name: 'JavaScript', icon: 'fab fa-js', level: 90, color: '#F7DF1E', textColor: '#000', 
          snippet: 'const desarrollarWeb = () => {\n  return "Soluciones elegantes y funcionales";\n};' },
        { name: 'HTML5', icon: 'fab fa-html5', level: 95, color: '#E44D26', textColor: '#fff',
          snippet: '<section class="hero">\n  <h1>Desarrollo Web Creativo</h1>\n  <p>Transformando ideas en experiencias digitales</p>\n</section>' },
        { name: 'CSS3', icon: 'fab fa-css3-alt', level: 85, color: '#264DE4', textColor: '#fff',
          snippet: '.animated {\n  transition: all 0.3s ease;\n  transform: translateY(0);\n}\n\n.animated:hover {\n  transform: translateY(-10px);\n}' },
        { name: 'Python', icon: 'fab fa-python', level: 80, color: '#306998', textColor: '#fff',
          snippet: 'def analizar_datos(dataset):\n  resultados = []\n  for dato in dataset:\n    resultados.append(dato * 2)\n  return resultados' },
        { name: 'Java', icon: 'fab fa-java', level: 75, color: '#5382A1', textColor: '#fff',
          snippet: 'public class Aplicacion {\n  public static void main(String[] args) {\n    System.out.println("Desarrollo de soluciones");\n  }\n}' },
        { name: 'SQL', icon: 'fas fa-database', level: 85, color: '#336791', textColor: '#fff',
          snippet: 'SELECT p.nombre, p.descripcion\nFROM proyectos p\nJOIN tecnologias t ON p.id = t.proyecto_id\nWHERE t.nombre = "JavaScript"\nORDER BY p.fecha DESC;' }
    ];
    
    // Crear una tarjeta para cada habilidad
    programmingSkills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'programming-skill-card';
        
        // Barra de código decorativa
        const codeBar = document.createElement('div');
        codeBar.className = 'code-bar';
        codeBar.style.background = `linear-gradient(to bottom, ${skill.color}, #2980b9)`;
        card.appendChild(codeBar);
        
        // Título de la habilidad
        const title = document.createElement('div');
        title.className = 'skill-title';
        title.innerHTML = `<i class="${skill.icon}"></i> ${skill.name}`;
        card.appendChild(title);
        
        // Contenedor de la barra de progreso
        const progressContainer = document.createElement('div');
        progressContainer.className = 'skill-progress-container';
        
        // Barra de progreso
        const progressBar = document.createElement('div');
        progressBar.className = 'skill-progress-bar';
        progressBar.style.width = '0%'; // Inicialmente en 0 para la animación
        progressBar.setAttribute('data-width', `${skill.level}%`);
        progressBar.style.background = `linear-gradient(90deg, ${skill.color}, #2980b9)`;
        
        // Porcentaje
        const percentage = document.createElement('div');
        percentage.className = 'skill-percentage';
        percentage.textContent = `${skill.level}%`;
        
        progressContainer.appendChild(progressBar);
        progressContainer.appendChild(percentage);
        card.appendChild(progressContainer);
        
        // Fragmento de código
        const codeAnimation = document.createElement('div');
        codeAnimation.className = 'code-animation';
        codeAnimation.setAttribute('data-text', skill.snippet);
        codeAnimation.style.backgroundColor = '#282c34';
        card.appendChild(codeAnimation);
        
        container.appendChild(card);
    });
}

/**
 * Inicializa las barras de progreso con animación
 */
function initSkillProgressBars() {
    // Usar Intersection Observer para animar las barras cuando sean visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                progressBars.forEach(bar => {
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width');
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observar el contenedor de habilidades
    const skillsContainer = document.querySelector('.code-skills-container');
    if (skillsContainer) {
        observer.observe(skillsContainer);
    }
}

/**
 * Crea fragmentos de código con sintaxis resaltada
 */
function createCodeSnippets() {
    // Crear sección de fragmentos de código si no existe
    const skillsSection = document.getElementById('habilidades');
    if (skillsSection && !document.querySelector('.code-snippets-section')) {
        const container = skillsSection.querySelector('.container');
        
        // Crear la sección de fragmentos de código
        const snippetsSection = document.createElement('div');
        snippetsSection.className = 'code-snippets-section';
        
        // Añadir título
        const snippetsTitle = document.createElement('h3');
        snippetsTitle.className = 'section-subtitle';
        snippetsTitle.innerHTML = '<i class="fas fa-laptop-code"></i> Ejemplos de Código';
        snippetsSection.appendChild(snippetsTitle);
        
        // Crear fragmentos de código de ejemplo
        const snippets = [
            {
                title: 'Función JavaScript',
                code: 'function optimizarRendimiento(codigo) {\n  // Analizar el código\n  const resultado = analizarPatrones(codigo);\n\n  // Aplicar optimizaciones\n  return resultado.map(fragmento => {\n    return mejorarAlgoritmo(fragmento);\n  });\n}'
            },
            {
                title: 'Componente React',
                code: 'const ProyectoCard = ({ titulo, descripcion, tecnologias }) => {\n  return (\n    <div className="proyecto-card">\n      <h3>{titulo}</h3>\n      <p>{descripcion}</p>\n      <div className="tecnologias">\n        {tecnologias.map(tech => (\n          <span key={tech}>{tech}</span>\n        ))}\n      </div>\n    </div>\n  );\n};'
            }
        ];
        
        // Crear un fragmento de código para cada ejemplo
        snippets.forEach(snippet => {
            const codeSnippet = createCodeSnippetElement(snippet.title, snippet.code);
            snippetsSection.appendChild(codeSnippet);
        });
        
        // Añadir la sección después del contenedor de habilidades de código
        const codeSkillsContainer = document.querySelector('.code-skills-container');
        if (container && codeSkillsContainer) {
            container.insertBefore(snippetsSection, codeSkillsContainer.nextSibling);
        }
    }
}

/**
 * Crea un elemento de fragmento de código con formato
 */
function createCodeSnippetElement(title, code) {
    const snippet = document.createElement('div');
    snippet.className = 'code-snippet';
    
    // Cabecera del fragmento
    const header = document.createElement('div');
    header.className = 'code-snippet-header';
    
    // Título
    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    
    // Puntos decorativos
    const dots = document.createElement('div');
    dots.className = 'code-snippet-dots';
    
    const dotRed = document.createElement('div');
    dotRed.className = 'code-snippet-dot dot-red';
    
    const dotYellow = document.createElement('div');
    dotYellow.className = 'code-snippet-dot dot-yellow';
    
    const dotGreen = document.createElement('div');
    dotGreen.className = 'code-snippet-dot dot-green';
    
    dots.appendChild(dotRed);
    dots.appendChild(dotYellow);
    dots.appendChild(dotGreen);
    
    header.appendChild(dots);
    header.appendChild(titleSpan);
    snippet.appendChild(header);
    
    // Contenido del código
    const content = document.createElement('div');
    content.className = 'code-snippet-content';
    
    // Formatear el código con números de línea
    const lines = code.split('\n');
    lines.forEach((line, index) => {
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line';
        
        const lineNumber = document.createElement('div');
        lineNumber.className = 'line-number';
        lineNumber.textContent = index + 1;
        
        const lineContent = document.createElement('div');
        lineContent.className = 'line-content';
        lineContent.innerHTML = highlightSyntax(line);
        
        codeLine.appendChild(lineNumber);
        codeLine.appendChild(lineContent);
        content.appendChild(codeLine);
    });
    
    snippet.appendChild(content);
    return snippet;
}

/**
 * Resalta la sintaxis del código
 */
function highlightSyntax(code) {
    // Resaltar palabras clave
    code = code.replace(/\b(function|const|let|var|return|if|else|for|while|class|import|export|from|true|false|null|undefined|this|new|try|catch|throw|async|await)\b/g, '<span class="keyword">$1</span>');
    
    // Resaltar cadenas
    code = code.replace(/(['"])(.*?)\1/g, '<span class="string">$1$2$1</span>');
    
    // Resaltar comentarios
    code = code.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
    
    // Resaltar funciones
    code = code.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(');
    
    // Resaltar números
    code = code.replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
    
    return code;
}

/**
 * Inicializa el efecto de escritura para los elementos de código
 */
function initTypingEffect() {
    const codeAnimations = document.querySelectorAll('.code-animation');
    
    codeAnimations.forEach(element => {
        const text = element.getAttribute('data-text');
        if (text) {
            // Configurar para la animación de typing
            element.textContent = '';
            element.classList.add('typing-animation');
            
            // Usar Intersection Observer para iniciar la animación cuando sea visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeText(element, text);
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(element);
        }
    });
}

/**
 * Efecto de escritura para un elemento
 */
function typeText(element, text) {
    let index = 0;
    element.textContent = '';
    element.classList.add('typing-animation');
    
    function addChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(addChar, 50); // Velocidad de escritura
        } else {
            element.classList.remove('typing-animation');
        }
    }
    
    setTimeout(addChar, 500); // Retraso inicial
}

/**
 * Mejora las insignias de tecnología existentes
 */
document.addEventListener('DOMContentLoaded', function() {
    // Mejorar las insignias de tecnología existentes
    enhanceTechBadges();
});

function enhanceTechBadges() {
    const techBadges = document.querySelectorAll('.tech-badge');
    
    techBadges.forEach((badge, index) => {
        // Añadir clase mejorada
        badge.classList.add('tech-badge-enhanced');
        
        // Añadir clases específicas según la tecnología
        const text = badge.textContent.trim();
        if (text.includes('HTML')) {
            badge.classList.add('tech-html');
        } else if (text.includes('CSS')) {
            badge.classList.add('tech-css');
        } else if (text.includes('JavaScript')) {
            badge.classList.add('tech-js');
        } else if (text.includes('Python')) {
            badge.classList.add('tech-python');
        } else if (text.includes('Java')) {
            badge.classList.add('tech-java');
        } else if (text.includes('SQL')) {
            badge.classList.add('tech-sql');
        }
    });
}