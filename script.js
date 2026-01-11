document.addEventListener('DOMContentLoaded', () => {
    // 1. EFECTO TYPING
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

    // 2. NAVEGACIÓN Y SCROLL SUAVE 
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

    // 3. DETECTAR ÉXITO TRAS ENVIAR FORMULARIO
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const alertBox = document.createElement('div');
        alertBox.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold animate-bounce flex items-center gap-3';
        alertBox.innerHTML = `<span>✅</span> ¡Mensaje enviado con éxito! Te contactaré pronto.`;
        
        document.body.appendChild(alertBox);

        // Limpiar URL para evitar que la alerta salga al recargar
        window.history.replaceState({}, document.title, window.location.pathname);

        setTimeout(() => {
            alertBox.style.transition = 'opacity 1s';
            alertBox.style.opacity = '0';
            setTimeout(() => alertBox.remove(), 1000);
        }, 4000);
    }
});

// 4. LÓGICA DEL MODAL
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

window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) { toggleModal(); }
}


