document.addEventListener('DOMContentLoaded', () => {
    // 1. EFECTO TYPING
    const typingTextElement = document.getElementById('typing-text');
    const phrases = ["Desarrolladora Full Stack", "Especialista en SQL", "Analista de Sistemas SAP", "Estudiante de Ingeniería"];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const current = phrases[phraseIndex];
        if(!typingTextElement) return;
        typingTextElement.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        
        let speed = isDeleting ? 50 : 150;
        if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 500; }
        setTimeout(type, speed);
    }
    type();

    // 2. NAVEGACIÓN Y SCROLL SUAVE
    document.querySelectorAll('nav a, #hero a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth' }); }
            }
        });
    });

 // 3. AUTO-PLAY DE CARRUSELES
    setInterval(() => {
        moveSlide(1, 1);
        moveSlide(2, 1);
        moveSlide(3, 1);
        // Agrega moveSlide(4, 1) si tienes un cuarto carrusel
    }, 5000);
});
// 4. LÓGICA DE CARRUSELES MULTIPROYECTO
// Objeto para rastrear la posición actual de cada carrusel de forma independiente
const projectIndices = { 1: 0, 2: 0, 3: 0, 4: 0 };

function moveSlide(projectId, step) {
    const track = document.getElementById(`carousel-${projectId}`);
    if (!track) return;
    
    const slides = track.querySelectorAll('img');
    const totalSlides = slides.length;

    // Actualizar el índice del proyecto específico
    projectIndices[projectId] = (projectIndices[projectId] + step + totalSlides) % totalSlides;
    
    // Aplicar la transformación (mover el carrusel)
    const percentage = -(projectIndices[projectId] * 100);
    track.style.transform = `translateX(${percentage}%)`;
}