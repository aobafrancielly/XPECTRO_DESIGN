// Captura os elementos essenciais da interface
const cursor = document.getElementById('custom-cursor');
const glow = document.getElementById('bg-glow');
const prism = document.querySelector('.flying-prism');
const magneticBtn = document.querySelector('.btn-magnetic');

// 1. EVENTO GERAL DE MOVIMENTO DO MOUSE (FUNDO, CURSOR E PARALLAX)
document.addEventListener('mousemove', (e) => {
    
    // Movimentação da luz roxa difusa de fundo
    if (glow) {
        glow.style.setProperty('--mouse-x', `${e.clientX}px`);
        glow.style.setProperty('--mouse-y', `${e.clientY}px`);
    }

    // Movimentação em tempo real da bolinha do cursor customizado
    if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    }

    // Efeito Parallax espacial e responsivo no Prisma da Home
    if (prism && window.innerWidth > 900) {
        // Calcula o deslocamento suave invertendo a direção do mouse
        const moveX = (window.innerWidth / 2 - e.clientX) * 0.025;
        const moveY = (window.innerHeight / 2 - e.clientY) * 0.025;
        
        prism.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// 2. DETECÇÃO DE HOVER EM ELEMENTOS INTERATIVOS PARA AUMENTAR A BOLINHA
const clickables = document.querySelectorAll('a, button, .pilar-card, [role="button"]');

clickables.forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add('hovered');
    });
    item.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('hovered');
    });
});

// 3. FÍSICA MAGNÉTICA APLICADA NO BOTÃO DE COTAÇÃO DA NAVBAR
if (magneticBtn) {
    magneticBtn.addEventListener('mousemove', (e) => {
        // Ignora a física se estiver acessando via telas mobile ou touch
        if (window.innerWidth <= 900) return;

        const bounding = magneticBtn.getBoundingClientRect();
        
        // Calcula a posição exata do ponteiro dentro do espaço interno do elemento
        const x = e.clientX - bounding.left - bounding.width / 2;
        const y = e.clientY - bounding.top - bounding.height / 2;
        
        // Atrai o botão em direção ao cursor aplicando força de 35%
        magneticBtn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    });

    // Devolve o botão suavemente ao centro quando o mouse se afasta
    magneticBtn.addEventListener('mouseleave', () => {
        magneticBtn.style.transform = 'translate(0px, 0px)';
    });
}
