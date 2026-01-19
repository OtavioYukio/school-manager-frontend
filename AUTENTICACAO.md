# 🔐 Guia de Autenticação - SchoolHub

## Sistema de Autenticação com Backend

O projeto agora está integrado com seu backend. Aqui está como funciona:

---

## 📡 Rotas do Backend

### Login
```
POST http://localhost:8080/auth/login
Headers: Content-Type: application/json
Body:
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

### Registro (Cadastro)
```
POST http://localhost:8080/auth/register
Headers: Content-Type: application/json
Body:
{
  "email": "usuario@email.com",
  "senha": "senha123",
  "nomeEscola": "Escola Teste"
}
```

---

## 🗂️ Estrutura de Arquivos de Autenticação

```
src/
├── api.js              ← Requisições ao backend
├── auth-guard.js       ← Proteção de rotas
├── login-form.js       ← Formulário de login (ATUALIZADO)
├── cadastro-form.js    ← Formulário de cadastro (ATUALIZADO)
└── dashboard.js        ← Dashboard do usuário
```

---

## 📝 Fluxo de Autenticação

### 1. **Login**
```
Usuário preenche email/senha
    ↓
Valida frontend (email, comprimento)
    ↓
Envia para http://localhost:8080/auth/login
    ↓
Backend valida e retorna token
    ↓
Frontend armazena token em localStorage
    ↓
Redireciona para Dashboard.html
```

### 2. **Registro (Cadastro)**
```
Etapa 1: Nome da Escola (salva em sessionStorage)
    ↓
Etapa 2: Email e Senha
    ↓
Valida (8+ caracteres, maiúscula, número)
    ↓
Envia para http://localhost:8080/auth/register
    ↓
Backend cria usuário e retorna token
    ↓
Frontend armazena token em localStorage
    ↓
Redireciona para Dashboard.html
```

### 3. **Proteção de Rota**
```
Usuário tenta acessar Dashboard.html
    ↓
auth-guard.js verifica se tem token
    ↓
Se não tem → Redireciona para Login.html
    ↓
Se tem → Mostra Dashboard com dados do usuário
```

---

## 🔑 Como o Token é Gerenciado

### Armazenamento
```javascript
// Token armazenado em localStorage
localStorage.getItem('schoolhub_token')
localStorage.getItem('schoolhub_user')
```

### Envio nas Requisições
```javascript
// Automaticamente adicionado ao header
headers: {
  'Authorization': 'Bearer TOKEN_AQUI'
}
```

### Logout
```javascript
logout() // Remove token e redireciona para LandingPage
```

---

## 📄 Páginas do Sistema

| Página | Tipo | Requer Autenticação | Script |
|--------|------|---------------------|--------|
| LandingPage.html | Pública | Não | menu-controls.js, navigation.js, animations.js |
| Login.html | Pública | Não | api.js, login-form.js, menu-controls.js |
| Cadastro.html | Pública | Não | cadastro-form.js, menu-controls.js |
| CadastroFinal.html | Pública | Não | api.js, cadastro-form.js, menu-controls.js |
| Dashboard.html | Protegida | **SIM** | api.js, auth-guard.js, dashboard.js, menu-controls.js |

---

## 🛡️ Segurança

### Frontend
- ✅ Validação de email
- ✅ Verificação de força de senha
- ✅ Proteção de rotas (redireciona se não autenticado)
- ✅ Token em localStorage

### Backend (Seu Backend)
- Validação de dados
- Criptografia de senha
- Geração de JWT token
- Verificação de permissões

---

## 🔄 Resposta Esperada do Backend

### Login/Register Sucesso
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "email": "usuario@email.com",
    "nomeEscola": "Escola Teste",
    "criadoEm": "2026-01-17T10:00:00Z"
  }
}
```

### Login/Register Erro
```json
{
  "message": "Email ou senha inválidos"
}
```

---

## ⚙️ Configuração

### Se o Backend estiver em outra URL
Edite `src/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/auth'; // ← MUDE AQUI
```

### Se o Backend estiver com CORS
Certifique-se de que seu backend permite requisições de:
```
http://localhost:8000 (ou qualquer porta do frontend)
```

---

## 🧪 Teste o Fluxo

### 1. Inicie o Backend
```bash
npm start
# ou
java -jar seu-backend.jar
```

### 2. Abra o Frontend
```
http://localhost:8000/view/LandingPage.html
```

### 3. Teste o Cadastro
- Clique em "Cadastrar Instituição"
- Preencha Nome da Escola
- Clique "Avançar"
- Preencha Email e Senha
- Clique "Cadastrar Instituição"
- Deve redirecionar para Dashboard

### 4. Teste o Login
- Vá para página de Login
- Use o email/senha cadastrados
- Deve redirecionar para Dashboard

### 5. Teste Proteção de Rota
- Abra DevTools (F12)
- Limpe localStorage
- Tente acessar Dashboard.html diretamente
- Deve redirecionar para Login.html

---

## 📱 Exemplo de Requisição com Curl

### Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "senha": "senha123"
  }'
```

### Register
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "senha": "senha123",
    "nomeEscola": "Escola Teste"
  }'
```

---

## 🐛 Debugging

### Ver token no console
```javascript
console.log(localStorage.getItem('schoolhub_token'));
```

### Ver usuário
```javascript
console.log(JSON.parse(localStorage.getItem('schoolhub_user')));
```

### Simular erro de autenticação
```javascript
localStorage.removeItem('schoolhub_token');
```

---

## 📚 Funções Disponíveis

### `src/api.js`
```javascript
login(email, senha)           // Fazer login
registrar(email, senha, nome) // Fazer cadastro
logout()                      // Fazer logout
obterToken()                  // Obter token armazenado
obterUsuario()                // Obter dados do usuário
estaAutenticado()             // Verificar autenticação
```

### `src/auth-guard.js`
```javascript
protegerRota()                // Verificar autenticação e redirecionar
atualizarInfoUsuario()        // Atualizar nome do usuário na navbar
```

---

## ✨ Próximas Melhorias

- [ ] Refresh token automático
- [ ] Verificação de expiração do token
- [ ] Cache de usuário
- [ ] Logout automático após inatividade
- [ ] 2FA (Autenticação de Dois Fatores)

---

**Sistema de autenticação totalmente integrado! 🚀**
