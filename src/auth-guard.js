/* ============================================
   AUTH GUARD - PROTEÇÃO DE ROTAS
   ============================================ */

// Verificar se o usuário está autenticado
// Se não estiver, redireciona para login
function protegerRota() {
    if (!estaAutenticado()) {
        console.warn('Acesso negado: Usuário não autenticado');
        window.location.href = 'Login.html';
        return false;
    }
    return true;
}

// Executar proteção ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    // Proteger se for página protegida
    if (document.body.classList.contains('pagina-protegida')) {
        protegerRota();
    }
});

// Função para verificar autenticação e mostrar informações
function atualizarInfoUsuario() {
    const name = obterName();
    const nomeUsuario = document.getElementById('nome-usuario');
    const btnLogout = document.getElementById('btn-logout');

    if (estaAutenticado() && name) {
        if (name) {
            nomeUsuario.textContent = name || 'Usuário';
        }
        if (btnLogout) {
            btnLogout.style.display = 'block';
        }
    } else {
        if (nomeUsuario) {
            nomeUsuario.textContent = '';
        }
        if (btnLogout) {
            btnLogout.style.display = 'none';
        }
    }
}

// Atualizar ao carregar a página
window.addEventListener('DOMContentLoaded', atualizarInfoUsuario);
