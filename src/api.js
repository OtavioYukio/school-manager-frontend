/* ============================================
   API - REQUISIÇÕES AO BACKEND
   ============================================ */

const API_BASE_URL = 'http://localhost:8080/auth';

// Função genérica para fazer requisições
async function fazerRequisicao(endpoint, metodo, dados = null) {
    try {
        const opcoes = {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Adicionar token ao header se existir
        const token = localStorage.getItem('schoolhub_token');
        if (token) {
            opcoes.headers['Authorization'] = `Bearer ${token}`;
        }

        // Adicionar corpo da requisição se houver dados
        if (dados) {
            opcoes.body = JSON.stringify(dados);
        }

        const resposta = await fetch(`${API_BASE_URL}${endpoint}`, opcoes);
        const dados_resposta = await resposta.json();

        if (!resposta.ok) {
            console.error('Erro completo do backend:', dados_resposta);
            throw new Error(JSON.stringify(dados_resposta));
        }

        return dados_resposta;
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        throw erro;
    }
}

// ============================================
// FUNÇÕES DE AUTENTICAÇÃO
// ============================================

async function login(email, password) {
    try {
        const resposta = await fazerRequisicao('/login', 'POST', { email, password });
        
        // Armazenar token
        if (resposta.token) {
            localStorage.setItem('schoolhub_token', resposta.token);
            localStorage.setItem('schoolhub_name', resposta.name || '');
            localStorage.setItem('schoolhub_email', resposta.email || '');
            localStorage.setItem('schoolhub_role', resposta.role || '');
            localStorage.setItem('schoolhub_createdAt', resposta.createdAt || '');
        }
        
        return resposta;
    } catch (erro) {
        throw erro;
    }
}

async function registrar(email, password, name) {
    try {
        const resposta = await fazerRequisicao('/register', 'POST', {
            name,
            email,
            password
        });
        
        
        // Armazenar token
        if (resposta.token) {
            localStorage.setItem('schoolhub_token', resposta.token);
            localStorage.setItem('schoolhub_email', resposta.email || '');
            localStorage.setItem('schoolhub_name', resposta.name || '');
            localStorage.setItem('schoolhub_role', resposta.role || '');
            localStorage.setItem('schoolhub_createdAt', resposta.createdAt || '');
        }
        
        return resposta;
    } catch (erro) {
        throw erro;
    }
}

function logout() {
    localStorage.removeItem('schoolhub_token');
    localStorage.removeItem('schoolhub_name');
    localStorage.removeItem('schoolhub_email');
    localStorage.removeItem('schoolhub_role');
    localStorage.removeItem('schoolhub_createdAt');
    window.location.href = 'LandingPage.html';
}

function confirmarLogout() {
    showConfirmDialog(
        'Sair da Conta',
        'Tem certeza que deseja sair da sua conta?',
        logout
    );
}

function obterToken() {
    return localStorage.getItem('schoolhub_token');
}

function obterName() {
    return localStorage.getItem('schoolhub_name');
}

function obterEmail() {
    return localStorage.getItem('schoolhub_email');
}

function obterRole() {
    return localStorage.getItem('schoolhub_role') || 'ADMIN';
}
function obterCreatedAt() {
    return localStorage.getItem('schoolhub_createdAt');
}

function estaAutenticado() {
    return !!localStorage.getItem('schoolhub_token');
}
