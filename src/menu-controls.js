/* ============================================
   CONTROLES DE MENU MOBILE
   ============================================ */

function toggleMenu() {
    const menu = document.querySelector('.hotbar-menu');
    menu.classList.toggle('active');
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.hotbar-menu');
        menu.classList.remove('active');
    });
});

// Fechar menu mobile ao clicar fora
document.addEventListener('click', (e) => {
    const hotbar = document.querySelector('.hotbar');
    const menu = document.querySelector('.hotbar-menu');
    
    if (!hotbar.contains(e.target)) {
        menu.classList.remove('active');
    }
});

// Efeito de scroll na navbar
window.addEventListener('scroll', () => {
    const hotbar = document.querySelector('.hotbar');
    if (window.scrollY > 50) {
        hotbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
    } else {
        hotbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});
