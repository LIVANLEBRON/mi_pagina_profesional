/**
 * Script para manejar el formulario de contacto
 * Implementa validación y envío de datos
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Validación del formulario
        const validateForm = () => {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Validar nombre
            if (name.value.trim() === '') {
                showError(name, 'Por favor ingresa tu nombre');
                isValid = false;
            } else {
                removeError(name);
            }
            
            // Validar email
            if (email.value.trim() === '') {
                showError(email, 'Por favor ingresa tu email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor ingresa un email válido');
                isValid = false;
            } else {
                removeError(email);
            }
            
            // Validar asunto
            if (subject.value.trim() === '') {
                showError(subject, 'Por favor ingresa un asunto');
                isValid = false;
            } else {
                removeError(subject);
            }
            
            // Validar mensaje
            if (message.value.trim() === '') {
                showError(message, 'Por favor ingresa tu mensaje');
                isValid = false;
            } else {
                removeError(message);
            }
            
            return isValid;
        };
        
        // Mostrar mensaje de error
        const showError = (input, message) => {
            const formGroup = input.parentElement;
            formGroup.classList.add('error');
            
            // Verificar si ya existe un mensaje de error
            let errorMessage = formGroup.querySelector('.error-message');
            
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                formGroup.appendChild(errorMessage);
            }
            
            errorMessage.textContent = message;
        };
        
        // Remover mensaje de error
        const removeError = (input) => {
            const formGroup = input.parentElement;
            formGroup.classList.remove('error');
            
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                formGroup.removeChild(errorMessage);
            }
        };
        
        // Validar formato de email
        const isValidEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
        
        // Manejar envío del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Limpiar cualquier mensaje de error previo
                const prevError = contactForm.querySelector('.form-error');
                if (prevError) {
                    contactForm.removeChild(prevError);
                }
                
                // Limpiar cualquier indicador de carga previo
                const prevLoading = contactForm.querySelector('.loading-indicator');
                if (prevLoading) {
                    contactForm.removeChild(prevLoading);
                }
                
                // Obtener datos del formulario
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                // Cambiar estado del botón
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                // Mostrar indicador de carga
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'loading-indicator';
                loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando mensaje...';
                contactForm.prepend(loadingIndicator);
                
                // Enviar datos al servidor PHP
                fetch('./php/send_email.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Mostrar mensaje de éxito
                        contactForm.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>¡Mensaje Enviado!</h3><p>Gracias por contactarme. Te responderé lo antes posible.</p></div>';
                    } else {
                        // Mostrar mensaje de error
                        const formError = document.createElement('div');
                        formError.className = 'form-error';
                        formError.textContent = data.message || 'Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.';
                        contactForm.prepend(formError);
                        
                        // Restaurar botón
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Mostrar mensaje de error
                    const formError = document.createElement('div');
                    formError.className = 'form-error';
                    formError.textContent = 'Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.';
                    contactForm.prepend(formError);
                    
                    // Restaurar botón
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
            }
        });
        
        // Limpiar errores al escribir
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                removeError(this);
            });
        });
    }
});