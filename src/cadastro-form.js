/* ============================================
   CADASTRO - ETAPA 1 (ESCOLA)
   ============================================ */

function handleCadastroEtapa1(event) {
    event.preventDefault();
    
    const nomeEscola = document.getElementById('nomeEscola').value;
    
    if (!nomeEscola) {
        showErrorInContainer('cadastro-container', 'Por favor, preencha o nome da instituição!');
        return;
    }
    
    // Salvar dados na sessionStorage para próxima etapa
    sessionStorage.setItem('cadastro_nomeEscola', nomeEscola);
    
    console.log('Cadastro Etapa 1:', { nomeEscola });
    
    // Ir para etapa 2
    window.location.href = 'CadastroFinal.html';
}

/* ============================================
   CADASTRO - ETAPA 2 (CREDENCIAIS)
   ============================================ */

function togglePasswordCadastro() {
    const senhaInput = document.getElementById('senhaCadastro');
    const toggleBtn = event.target;
    
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        toggleBtn.textContent = '👁️‍🗨️';
    } else {
        senhaInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

function togglePasswordConfirm() {
    const confirmarInput = document.getElementById('confirmarSenha');
    const toggleBtn = event.target;
    
    if (confirmarInput.type === 'password') {
        confirmarInput.type = 'text';
        toggleBtn.textContent = '👁️‍🗨️';
    } else {
        confirmarInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

function validarRequisitossenha() {
    const senha = document.getElementById('senhaCadastro').value;
    
    // Validar comprimento
    const reqLength = document.getElementById('req-length');
    if (reqLength) {
        if (senha.length >= 8) {
            reqLength.classList.add('valid');
        } else {
            reqLength.classList.remove('valid');
        }
    }
    
    // Validar letra maiúscula
    const reqUppercase = document.getElementById('req-uppercase');
    if (reqUppercase) {
        if (/[A-Z]/.test(senha)) {
            reqUppercase.classList.add('valid');
        } else {
            reqUppercase.classList.remove('valid');
        }
    }
    
    // Validar número
    const reqNumber = document.getElementById('req-number');
    if (reqNumber) {
        if (/[0-9]/.test(senha)) {
            reqNumber.classList.add('valid');
        } else {
            reqNumber.classList.remove('valid');
        }
    }
}

function handleCadastroFinal(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailCadastro').value;
    const password = document.getElementById('senhaCadastro').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const termos = document.getElementById('termos').checked;
    
    if (!email || !password || !confirmarSenha) {
        showErrorInContainer('cadastro-container', 'Por favor, preencha todos os campos!');
        return;
    }
    
    if (!email.includes('@')) {
        showErrorInContainer('cadastro-container', 'Por favor, insira um email válido!');
        return;
    }
    
    if (password.length < 8) {
        showErrorInContainer('cadastro-container', 'A senha deve ter pelo menos 8 caracteres!');
        return;
    }
    
    if (!/[A-Z]/.test(password)) {
        showErrorInContainer('cadastro-container', 'A senha deve conter pelo menos uma letra maiúscula!');
        return;
    }
    
    if (!/[0-9]/.test(password)) {
        showErrorInContainer('cadastro-container', 'A senha deve conter pelo menos um número!');
        return;
    }
    
    if (password !== confirmarSenha) {
        showErrorInContainer('cadastro-container', 'As senhas não coincidem!');
        return;
    }
    
    if (!termos) {
        showErrorInContainer('cadastro-container', 'Por favor, aceite os termos de serviço!');
        return;
    }
    
    // Recuperar dados da etapa 1
    const name = sessionStorage.getItem('cadastro_nomeEscola');
    
    // Fazer registro via API
    registrar(email, password, name)
        .then(resposta => {
            console.log('Cadastro bem-sucedido:', resposta);
            
            // Limpar dados da sessão
            sessionStorage.removeItem('cadastro_nomeEscola');
            
            showSuccessInContainer('cadastro-container', `Cadastro realizado com sucesso! Bem-vindo, ${name}!`);
            
            // Redirecionar para Dashboard após 2 segundos
            setTimeout(() => {
                window.location.href = 'Dashboard.html';
            }, 2000);
        })
        .catch(erro => {
            console.error('Erro ao fazer cadastro:', erro);
            showErrorInContainer('cadastro-container', 'Erro ao fazer cadastro: ' + erro.message);
        });
}

function voltarEtapa() {
    window.location.href = 'Cadastro.html';
}

// Validar requisitos de senha em tempo real
document.addEventListener('DOMContentLoaded', () => {
    const senhaInput = document.getElementById('senhaCadastro');
    
    if (senhaInput) {
        senhaInput.addEventListener('input', validarRequisitossenha);
    }
});
