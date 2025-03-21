/**
 * Script para mejorar la visualización de certificados
 * Implementa efectos visuales y funcionalidades adicionales
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todas las tarjetas de certificados
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    // Añadir efectos de hover y animaciones a las tarjetas
    certificateCards.forEach((card, index) => {
        // Añadir delay a la animación inicial basado en el índice
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
        
        // Añadir evento para mostrar vista previa al hacer clic
        card.addEventListener('click', function(e) {
            // Evitar que se active si se hace clic en el botón de descarga
            if (e.target.tagName === 'A' || e.target.tagName === 'I' || e.target.closest('a')) {
                return;
            }
            
            // Obtener la ruta del PDF
            const pdfPath = this.querySelector('a').getAttribute('href');
            const certificateTitle = this.querySelector('h3').textContent;
            
            // Crear modal para vista previa
            showCertificatePreview(pdfPath, certificateTitle);
        });
    });
    
    // Función para mostrar vista previa del certificado
    function showCertificatePreview(pdfPath, title) {
        // Crear elementos del modal
        const modal = document.createElement('div');
        modal.className = 'certificate-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'certificate-modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'certificate-modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.classList.remove('modal-open');
        });
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = title;
        
        const pdfEmbed = document.createElement('embed');
        pdfEmbed.src = pdfPath;
        pdfEmbed.type = 'application/pdf';
        pdfEmbed.className = 'certificate-pdf-preview';
        
        const downloadBtn = document.createElement('a');
        downloadBtn.href = pdfPath;
        downloadBtn.className = 'btn btn-primary';
        downloadBtn.download = '';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Descargar';
        
        // Construir modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(pdfEmbed);
        modalContent.appendChild(downloadBtn);
        modal.appendChild(modalContent);
        
        // Añadir modal al body
        document.body.appendChild(modal);
        document.body.classList.add('modal-open');
        
        // Cerrar modal al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.classList.remove('modal-open');
            }
        });
    }
    
    // Filtro de certificados
    const searchInput = document.getElementById('certificate-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            certificateCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});