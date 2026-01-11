document.addEventListener('DOMContentLoaded', () => {
    // EFECTO TYPING
    const typingTextElement = document.getElementById('typing-text');
    const phrases = ["Desarrolladora Full Stack", "Especialista en SQL", "Analista de Sistemas SAP", "Estudiante de Ingeniería"];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const current = phrases[phraseIndex];
        typingTextElement.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        
        let speed = isDeleting ? 50 : 150;
        if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 500; }
        setTimeout(type, speed);
    }
    type();

    // NAVEGACIÓN Y SCROLL SUAVE 
    const links = document.querySelectorAll('nav a, #hero a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 90,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// LÓGICA DEL MODAL (GLOBAL)
function toggleModal() {
    const modal = document.getElementById('contactModal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Cerrar si se hace clic afuera
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        toggleModal();
    }
}