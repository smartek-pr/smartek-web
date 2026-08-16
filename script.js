// Mobile navigation toggle (Hamburger menu)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile navigation menu on clicking link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// Header shadow and opacity change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    } else {
        header.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Toggle flip card on button click (mobile support)
document.querySelectorAll('.flip-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardInner = button.closest('.flip-card-inner');
        if (cardInner) {
            cardInner.classList.toggle('flipped');
        }
    });
});

// Permite voltear las tarjetas al tocar el botón o la tarjeta en móviles
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Verifica si estamos en un dispositivo táctil
        const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
        
        if (isTouchDevice) {
            const cardInner = card.querySelector('.flip-card-inner');
            if (cardInner) {
                cardInner.classList.toggle('flipped');
            }
        }
    });
});

// --- MANEJO INTERACTIVO DEL FORMULARIO DE CONTACTO ---
const contactForm = document.getElementById('contact-form');
const formAlert = document.getElementById('form-alert');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Estado de carga en el botón
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Request...';
        submitBtn.disabled = true;

        // Ocultar alertas previas
        formAlert.style.display = 'none';
        formAlert.className = 'form-alert';

        const formData = new FormData(contactForm);

        try {
            // Envío en segundo plano mediante FormSubmit AJAX
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Mensaje interactivo de éxito
                formAlert.classList.add('success');
                formAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your request has been sent successfully. We will get back to you shortly.';
                formAlert.style.display = 'block';

                // Limpiar la información ingresada para reutilizar la funcionalidad
                contactForm.reset();
            } else {
                throw new Error('Response not OK');
            }
        } catch (error) {
            // Mensaje de error si falla el envío
            formAlert.classList.add('error');
            formAlert.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Oops! Something went wrong while sending your request. Please try again.';
            formAlert.style.display = 'block';
        } finally {
            // Restablecer el botón de envío
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Ocultar automáticamente el mensaje después de 6 segundos
            setTimeout(() => {
                formAlert.style.display = 'none';
            }, 6000);
        }
    });
}

// --- INDUSTRY TABS SWITCHER FOR PROJECTS SECTION ---
const industryTabs = document.querySelectorAll('.industry-tab');
const projectPanels = document.querySelectorAll('.project-panel');

industryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover clase activa de todas las pestañas
        industryTabs.forEach(t => t.classList.remove('active'));
        // Remover clase activa de todos los paneles
        projectPanels.forEach(p => p.classList.remove('active'));

        // Activar la pestaña cliqueada
        tab.classList.add('active');

        // Mostrar el panel correspondiente
        const targetTab = tab.getAttribute('data-tab');
        const activePanel = document.getElementById(`tab-${targetTab}`);
        if (activePanel) {
            activePanel.classList.add('active');
        }
    });
});