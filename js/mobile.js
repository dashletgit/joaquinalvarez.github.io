// Espera a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.container-navLinks');
    const navLinks = document.querySelectorAll('.aNav'); 

    if (navToggle && navMenu) {

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('is-open');
            
            if (navMenu.classList.contains('is-open')) {
                navToggle.innerHTML = '&times;'; 
                navToggle.setAttribute('aria-label', 'Cerrar menú');
            } else {
                navToggle.innerHTML = '☰'; 
                navToggle.setAttribute('aria-label', 'Abrir menú');
            }
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-open');
                navToggle.innerHTML = '☰'; 
                navToggle.setAttribute('aria-label', 'Abrir menú');
            });
        });
    }
});