/* ============================================
   LOGIN - FUNCIONALIDADES
   ============================================ */

function togglePassword() {
    const senhaInput = document.getElementById('senha');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        toggleBtn.textContent = '👁️‍🗨️';
    } else {
        senhaInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;
    const lembrar = document.getElementById('lembrar').checked;
    
    if (!email || !password) {
        showErrorInContainer('login-container', 'Por favor, preencha todos os campos!');
        return;
    }
    
    if (!email.includes('@')) {
        showErrorInContainer('login-container', 'Por favor, insira um email válido!');
        return;
    }
    
    if (password.length < 6) {
        showErrorInContainer('login-container', 'A senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    // Fazer login via API
    login(email, password)
        .then(resposta => {
            // Salvar email se "Lembrar-me" estiver marcado
            if (lembrar) {
                localStorage.setItem('schoolhub_email', email);
            } else {
                localStorage.removeItem('schoolhub_email');
            }
            
            console.log('Login bem-sucedido:', resposta);
            showSuccessInContainer('login-container', 'Login realizado com sucesso!');
            
            // Redirecionar para Dashboard após 1 segundo
            setTimeout(() => {
                window.location.href = 'Dashboard.html';
            }, 1000);
        })
        .catch(erro => {
            console.error('Erro ao fazer login:', erro);
            showErrorInContainer('login-container', 'Erro ao fazer login: ' + erro.message);
        });
}

// Preencher email salvo ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const emailSalvo = localStorage.getItem('schoolhub_email');
    if (emailSalvo) {
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = emailSalvo;
            const lembrarCheckbox = document.getElementById('lembrar');
            if (lembrarCheckbox) {
                lembrarCheckbox.checked = true;
            }
        }
    }
    
    // Verificar se já está autenticado
    if (estaAutenticado()) {
        window.location.href = 'Dashboard.html';
    }
});
