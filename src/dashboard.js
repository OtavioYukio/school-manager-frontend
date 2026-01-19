/* ============================================
   DASHBOARD - EXIBIR INFORMAÇÕES DO USUÁRIO
   ============================================ */

window.addEventListener('DOMContentLoaded', () => {
    const name = obterName();
    const createdAt = obterCreatedAt();
    if (createdAt && name) {
        // Preencher instituição
        const userInstituicao = document.getElementById('user-instituicao');
        if (userInstituicao) {
            userInstituicao.textContent = name || 'Não informado';
        }

        // Preencher data de cadastro
        const userData = document.getElementById('user-data');
        if (userData) {
            if (createdAt) {
                const data = new Date(createdAt).toLocaleDateString('pt-BR');
                userData.textContent = data;
            } else {
                userData.textContent = 'Não informado';
            }
        }

        // Preencher nome do usuário na navbar
        const nomeUsuario = document.getElementById('nome-usuario');
        if (nomeUsuario) {
            nomeUsuario.textContent = name || 'Usuário';
        }
    }
});
