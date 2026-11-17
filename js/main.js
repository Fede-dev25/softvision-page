
document.addEventListener('DOMContentLoaded', function() {
    
    initNavbar();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initReveal();
    initActiveNavLinks();
    initProjectFilters();
    initScrollProgress();
    initSpotlight();
    initWhatsAppButton();
    initYear();
    initViewTabs();
});

function initViewTabs() {
    document.querySelectorAll('.pj-tabs').forEach(tablist => {
        const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
        const urlLabel = tablist.closest('.pj-bar').querySelector('[data-view-url]');

        function select(tab) {
            tabs.forEach(t => {
                const active = t === tab;
                t.setAttribute('aria-selected', active ? 'true' : 'false');
                t.tabIndex = active ? 0 : -1;
                document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
            });
            if (urlLabel) urlLabel.textContent = tab.dataset.url;
        }

        tabs.forEach((tab, i) => {
            tab.addEventListener('click', () => select(tab));
            tab.addEventListener('keydown', e => {
                if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
                select(next);
                next.focus();
            });
        });
    });
}

const WHATSAPP_NUMBER = '5493525406916';
const WHATSAPP_MESSAGE = 'Hola SoftVision! Quiero hacer una consulta sobre un proyecto.';

function initReveal() {
    if (!('IntersectionObserver' in window)) return;

    const targets = [];

    document.querySelectorAll('[data-reveal]').forEach(el => targets.push(el));
    document.querySelectorAll('[data-reveal-group]').forEach(group => {
        Array.from(group.children).forEach((child, i) => {
            child.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 0.08}s`);
            targets.push(child);
        });
    });

    if (targets.length === 0) return;

    targets.forEach(el => el.classList.add('reveal'));
    document.documentElement.classList.add('reveal-ready');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
}

function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    let ticking = false;
    function update() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        bar.style.transform = `scaleX(${progress})`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
}

function initSpotlight() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.querySelectorAll('.service-card, .value-card, .pj-card, .pj-sys, .other-card').forEach(card => {
        card.classList.add('spotlight');
        card.addEventListener('pointermove', e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });
}

function initWhatsAppButton() {
    if (document.querySelector('.whatsapp-float')) return;

    const link = document.createElement('a');
    link.className = 'whatsapp-float';
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Escribinos por WhatsApp');
    link.innerHTML = '<i class="bi bi-whatsapp"></i><span>¿Hablamos?</span>';
    document.body.appendChild(link);
}

function initProjectFilters() {
    const chips = document.querySelectorAll('.pj-chip');
    const items = document.querySelectorAll('.pj-card, .pj-private');

    if (chips.length === 0) return;

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const filter = chip.dataset.filter;

            chips.forEach(c => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));
            items.forEach(item => {
                item.hidden = !(filter === 'all' || item.dataset.cat === filter);
            });
        });
    });
}

function initNavbar() {
    const navbar = document.getElementById('mainNavbar');
    const scrollThreshold = 80; 
    
    if (!navbar) {
        console.warn('Navbar no encontrado');
        return;
    }
    
    
    function handleNavbarScroll() {
        if (window.scrollY > scrollThreshold || navbar.hasAttribute('data-solid')) {
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
    
    if (!contactForm) return;
    
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

function initYear() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = year; });
}
