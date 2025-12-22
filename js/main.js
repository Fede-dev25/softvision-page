
document.addEventListener('DOMContentLoaded', function() {
    
    initNavbar();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initScrollAnimations();
    initActiveNavLinks();
});

function initNavbar() {
    const navbar = document.getElementById('mainNavbar');
    const scrollThreshold = 80; 
    
    if (!navbar) {
        console.warn('Navbar no encontrado');
        return;
    }
    
    
    function handleNavbarScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                handleNavbarScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
    
    
    document.addEventListener('click', (event) => {
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            
            const isClickInsideNavbar = navbar.contains(event.target);
            
            if (!isClickInsideNavbar) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }
    });
    
    
    handleNavbarScroll();
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const navbarHeight = 70; 
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            
            if (!targetId || targetId === '#') {
                e.preventDefault();
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                e.preventDefault();
                
                
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initBackToTop() {
    
    let btnBackToTop = document.getElementById('btnBackToTop');
    
    if (!btnBackToTop) {
        
        btnBackToTop = document.createElement('button');
        btnBackToTop.id = 'btnBackToTop';
        btnBackToTop.className = 'btn-back-to-top';
        btnBackToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
        btnBackToTop.setAttribute('aria-label', 'Volver arriba');
        btnBackToTop.setAttribute('title', 'Volver arriba');
        document.body.appendChild(btnBackToTop);
        
        
        const style = document.createElement('style');
        style.textContent = `
            .btn-back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #0052CC, #0065FF);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
                transition: all 0.3s ease;
                z-index: 1000;
            }
            .btn-back-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 20px rgba(0, 82, 204, 0.4);
            }
            .btn-back-to-top.show {
                display: flex;
                animation: fadeInUp 0.3s ease;
            }
            @media (max-width: 768px) {
                .btn-back-to-top {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                    font-size: 1.25rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    const scrollThreshold = 300; 
    
    
    function toggleBackToTop() {
        if (window.scrollY > scrollThreshold) {
            btnBackToTop.classList.add('show');
        } else {
            btnBackToTop.classList.remove('show');
        }
    }
    
    
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                toggleBackToTop();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    
    btnBackToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    toggleBackToTop();
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.warn('Formulario de contacto no encontrado');
        return;
    }
    
    const EMAILJS_PUBLIC_KEY = 'Erk76FDZj76eHT0ps';  
    const EMAILJS_SERVICE_ID = 'service_softvision';  
    const EMAILJS_TEMPLATE_ID = 'template_etk5vsi'; 
    
    
    if (EMAILJS_PUBLIC_KEY !== 'TU_PUBLIC_KEY_AQUI') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    
    const nombreInput = document.getElementById('nombreContacto');
    const emailInput = document.getElementById('emailContacto');
    const empresaInput = document.getElementById('empresaContacto');
    const mensajeInput = document.getElementById('mensajeContacto');
    const privacidadCheck = document.getElementById('privacidadCheck');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        clearFormErrors();
        
        
        let isValid = true;
        const errors = [];
        
        
        if (!nombreInput.value.trim()) {
            isValid = false;
            errors.push('Por favor ingresa tu nombre completo.');
            markFieldAsInvalid(nombreInput);
        } else if (nombreInput.value.trim().length < 3) {
            isValid = false;
            errors.push('El nombre debe tener al menos 3 caracteres.');
            markFieldAsInvalid(nombreInput);
        }
        
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            isValid = false;
            errors.push('Por favor ingresa tu email.');
            markFieldAsInvalid(emailInput);
        } else if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            errors.push('Por favor ingresa un email válido.');
            markFieldAsInvalid(emailInput);
        }
        
        
        if (!mensajeInput.value.trim()) {
            isValid = false;
            errors.push('Por favor escribe un mensaje.');
            markFieldAsInvalid(mensajeInput);
        } else if (mensajeInput.value.trim().length < 10) {
            isValid = false;
            errors.push('El mensaje debe tener al menos 10 caracteres.');
            markFieldAsInvalid(mensajeInput);
        }
        
        
        if (!privacidadCheck.checked) {
            isValid = false;
            errors.push('Debes aceptar la política de privacidad.');
            markFieldAsInvalid(privacidadCheck);
        }
        
        
        if (!isValid) {
            showFormMessage(errors.join('<br>'), 'error');
            contactForm.classList.add('was-validated');
            return;
        }
        
        
        
        if (EMAILJS_PUBLIC_KEY === 'TU_PUBLIC_KEY_AQUI') {
            
            console.warn('⚠️ EmailJS no configurado. Configura las credenciales en main.js');
            showSuccessMessage(true); 
            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            }, 3000);
            return;
        }
        
        
        sendEmailViaEmailJS();
    });
    
    
    function sendEmailViaEmailJS() {
        
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
        
        
        const templateParams = {
            from_name: nombreInput.value.trim(),
            from_email: emailInput.value.trim(),
            company: empresaInput.value.trim() || 'No especificada',
            message: mensajeInput.value.trim(),
            to_email: 'softvision.business@hotmail.com' 
        };
        
        
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('✅ Email enviado exitosamente', response.status, response.text);
                showSuccessMessage(false); 
                
                
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }, 2000);
            })
            .catch(function(error) {
                console.error('❌ Error al enviar email:', error);
                showFormMessage('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente o contáctanos directamente.', 'error');
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
    }
    
    
    function markFieldAsInvalid(field) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
    }
    
    function clearFormErrors() {
        const fields = [nombreInput, emailInput, mensajeInput, privacidadCheck];
        fields.forEach(field => {
            field.classList.remove('is-invalid');
        });
        
        
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }
    
    function showFormMessage(message, type) {
        
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} form-message mt-3`;
        messageDiv.innerHTML = message;
        
        
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function showSuccessMessage(isDemo) {
        const demoWarning = isDemo ? '<p class="text-warning small mb-0"><i class="bi bi-exclamation-triangle me-1"></i>Modo demo: EmailJS no configurado</p>' : '';
        const successMessage = `
            <div class="text-center">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 3rem;"></i>
                <h4 class="mt-3">¡Gracias por tu mensaje!</h4>
                <p>Nos pondremos en contacto contigo muy pronto.</p>
                ${demoWarning}
            </div>
        `;
        showFormMessage(successMessage, 'success');
    }
}

function initScrollAnimations() {
    
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver no está disponible en este navegador');
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    
    const cards = document.querySelectorAll('.service-card, .case-card, .value-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100; 
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                
                navLinks.forEach(link => link.classList.remove('active'));
                
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                highlightActiveSection();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    
    highlightActiveSection();
}

function showToast(title, message, type = 'info') {
    
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white bg-${type === 'error' ? 'danger' : 'success'} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <strong>${title}</strong><br>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 4000 });
    toast.show();
    
    
    toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
    });
}

const SoftVisionUtils = {
    
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    
    
    getOffset: function(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    },
    
    
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

window.SoftVisionUtils = SoftVisionUtils;

console.log('%c🚀 SoftVision Consultora', 'color: #0052CC; font-size: 20px; font-weight: bold;');
console.log('%cLanding page inicializada correctamente', 'color: #28A745; font-size: 14px;');

