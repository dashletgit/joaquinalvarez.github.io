document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const dotsNav = document.querySelector('.carousel-nav');
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');

    let slides = [];
    let dots = [];
    let autoPlayInterval;

    async function initCarousel() {
        try {
            const response = await fetch('./data/carousel.json');
            if (!response.ok) throw new Error('No se pudo cargar proyectos.json');
            const proyectos = await response.json();
            proyectos.forEach((proyecto, index) => {
                const slide = document.createElement('li');
                slide.className = 'carousel-slide';
                if (index === 0) slide.classList.add('current-slide'); 
                slide.innerHTML = `
                    <img src="${proyecto.imageUrl}" alt="${proyecto.altText}">
                    <div class="carousel-caption">
                        <h3>${proyecto.title}</h3>
                    </div>
                `;
                track.appendChild(slide);
                const dot = document.createElement('button');
                dot.className = 'carousel-indicator';
                if (index === 0) dot.classList.add('current-slide');
                dotsNav.appendChild(dot);
            });
            slides = Array.from(track.children);
            dots = Array.from(dotsNav.children);
            nextButton.addEventListener('click', e => handleNext());
            prevButton.addEventListener('click', e => handlePrev());
            dotsNav.addEventListener('click', e => handleDotClick(e));
            startAutoPlay();
            window.addEventListener('resize', () => {
                const currentSlide = track.querySelector('.current-slide');
                moveToSlide(currentSlide, currentSlide); // Recalcula
            });

        } catch (error) {
            console.error('Error al inicializar el carrusel:', error);
            // Opcional: Mostrar un mensaje de error en la UI
        }
    }

    const getSlideWidth = () => slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;

    const moveToSlide = (currentSlide, targetSlide) => {
        if (!targetSlide) return;
        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        const amountToMove = getSlideWidth() * targetIndex;
        
        track.style.transform = 'translateX(-' + amountToMove + 'px)';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        updateDots(targetSlide);
    };

    const updateDots = (targetSlide) => {
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        const targetDot = dots[targetIndex];
        
        if (currentDot) currentDot.classList.remove('current-slide');
        if (targetDot) targetDot.classList.add('current-slide');
    };

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            handleNext();
        }, 5000);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    function handleNext() {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        moveToSlide(currentSlide, nextSlide);
        resetAutoPlay();
    }

    function handlePrev() {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
        moveToSlide(currentSlide, prevSlide);
        resetAutoPlay();
    }

    function handleDotClick(e) {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(currentSlide, targetSlide);
        resetAutoPlay();
    }
    initCarousel();
});