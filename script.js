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

    // 3. AUTO-PLAY DE CARRUSELES (4 PROYECTOS)
    setInterval(() => {
        for (let i = 1; i <= 4; i++) {
            moveSlide(i, 1);
        }
    }, 5000);

    // 4. DETECTAR ÉXITO EN ENVÍO (Muestra alerta si la URL tiene ?success=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const alertBox = document.createElement('div');
        alertBox.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold animate-bounce flex items-center gap-3';
        alertBox.innerHTML = `<span>✅</span> ¡Mensaje enviado con éxito!`;
        document.body.appendChild(alertBox);

        window.history.replaceState({}, document.title, window.location.pathname);
        setTimeout(() => {
            alertBox.style.transition = 'opacity 1s';
            alertBox.style.opacity = '0';
            setTimeout(() => alertBox.remove(), 1000);
        }, 4000);
    }
});

// 5. LÓGICA DEL MODAL (Fuera del DOMContentLoaded para acceso global)
function toggleModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.toggle('hidden');
        document.body.style.overflow = modal.classList.contains('hidden') ? 'auto' : 'hidden';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) { toggleModal(); }
}

// 6. LÓGICA DE CARRUSELES
const projectIndices = { 1: 0, 2: 0, 3: 0, 4: 0 };

function moveSlide(projectId, step) {
    const track = document.getElementById(`carousel-${projectId}`);
    if (!track) return;
    
    const slides = track.querySelectorAll('img');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    projectIndices[projectId] = (projectIndices[projectId] + step + totalSlides) % totalSlides;
    const offset = -(projectIndices[projectId] * 100);
    track.style.transform = `translateX(${offset}%)`;
}

// Dentro de document.addEventListener('DOMContentLoaded', () => { ... })

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
    const alertBox = document.createElement('div');
    // Usamos las clases de Tailwind que ya tienes configuradas
    alertBox.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold animate-bounce flex items-center gap-3';
    alertBox.innerHTML = `<span>✅</span> ¡Mensaje enviado con éxito!`;
    
    document.body.appendChild(alertBox);

    // Esto limpia la URL (?success=true) para que no salga el mensaje cada vez que refresques
    window.history.replaceState({}, document.title, window.location.pathname);

    setTimeout(() => {
        alertBox.style.transition = 'opacity 1s';
        alertBox.style.opacity = '0';
        setTimeout(() => alertBox.remove(), 1000);
    }, 4000);
}