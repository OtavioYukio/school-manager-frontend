# SchoolHub - Gerenciador de Escolas

Plataforma de gerenciamento escolar limpa, responsiva e com animações suaves.

## 📁 Estrutura do Projeto

```
school-manager-front/
├── public/
│   └── style/
│       ├── style.css              # Arquivo principal (importa os demais)
│       ├── variables.css          # Variáveis globais e resetagem
│       ├── hotbar.css             # Estilos da barra de navegação
│       ├── footer.css             # Estilos do rodapé
│       ├── forms.css              # Estilos de formulários e botões
│       ├── landing-page.css       # Estilos da página inicial
│       ├── login.css              # Estilos da página de login
│       └── cadastro.css           # Estilos das páginas de cadastro
│
├── src/
│   ├── script.js                  # Arquivo principal (documentação)
│   ├── menu-controls.js           # Controles de menu mobile
│   ├── navigation.js              # Navegação e redirecionamentos
│   ├── animations.js              # Animações e efeitos visuais
│   ├── login-form.js              # Funcionalidades de login
│   └── cadastro-form.js           # Funcionalidades de cadastro
│
└── view/
    ├── LandingPage.html           # Página inicial
    ├── Login.html                 # Página de login
    ├── Cadastro.html              # Página de cadastro (etapa 1)
    └── CadastroFinal.html         # Página de cadastro (etapa 2)
```

## 🎨 CSS - Organização por Módulos

### **variables.css**
- Variáveis de cores e transições
- Resetagem global
- Animações globais (slideDownIn, fadeIn, float, pulse)

### **forms.css**
- Componentes de formulário (inputs, labels, selects)
- Botões primários e secundários
- Checkboxes e toggles
- Responsividade de formulários

### **hotbar.css**
- Barra de navegação fixa
- Menu mobile e hamburger
- Botões de ação (Entrar, Cadastrar)
- Responsividade da hotbar

### **footer.css**
- Estilos do rodapé
- Seções de conteúdo
- Responsividade do footer

### **landing-page.css**
- Seção Hero (título, subtítulo, botões)
- Seção Recursos (grid de cards)
- Seção Promoção
- Seção Sobre
- Responsividade completa

### **login.css**
- Página de login (container, card)
- Cabeçalho e formulário
- Links e divisores
- Responsividade

### **cadastro.css**
- Páginas de cadastro (container, card)
- Indicador de progresso (1/2, 2/2)
- Cabeçalho e formulários
- Requisitos de senha
- Responsividade

### **style.css**
Arquivo principal que importa todos os módulos CSS na ordem correta.

## 📜 JavaScript - Organização por Funcionalidade

### **menu-controls.js**
Responsável por:
- Toggle do menu mobile
- Fechar menu ao clicar em um link
- Fechar menu ao clicar fora
- Efeito de sombra na hotbar ao scroll

### **navigation.js**
Responsável por:
- `handleVamosComecar()` - Redireciona para Cadastro
- `handleCadastrar()` - Redireciona para Cadastro
- `handleEntrar()` - Redireciona para Login

### **animations.js**
Responsável por:
- Intersection Observer para animação de cards
- Smooth scroll para links com âncora (#)

### **login-form.js**
Responsável por:
- `togglePassword()` - Mostra/esconde senha
- `handleLogin()` - Validação e envio do formulário
- Persistência de email com localStorage
- Recuperação de email salvo ao carregar

### **cadastro-form.js**
Responsável por:
- Etapa 1: `handleCadastroEtapa1()` - Validação do nome da escola
- Etapa 2: Toggle de senhas
- Validação em tempo real de requisitos de senha
- `validarRequisitossenha()` - Valida requisitos
- `handleCadastroFinal()` - Validação e conclusão do cadastro
- `voltarEtapa()` - Volta para etapa 1
- Persistência com sessionStorage

### **script.js**
Arquivo central com documentação da ordem correta de carregamento dos scripts.

## 🔗 Inclusão de Scripts no HTML

**Ordem obrigatória:**

```html
<script src="../src/menu-controls.js"></script>
<script src="../src/navigation.js"></script>
<!-- Escolher UNO dos scripts abaixo conforme a página: -->
<script src="../src/animations.js"></script>  <!-- Landing Page -->
<script src="../src/login-form.js"></script>  <!-- Login -->
<script src="../src/cadastro-form.js"></script> <!-- Cadastro -->
```

## 📱 Responsividade

Breakpoints definidos:
- **Acima de 768px**: Desktop/Tablet grande
- **768px - 480px**: Tablet pequeno
- **Abaixo de 480px**: Mobile

Todos os estilos incluem media queries para adaptação perfeita.

## 🎨 Paleta de Cores

```css
--cor-primaria: #6366f1         /* Azul/Índigo */
--cor-primaria-escuro: #4f46e5  /* Azul escuro */
--cor-secundaria: #ec4899       /* Rosa */
--cor-destaque: #f97316         /* Laranja */
--cor-fundo: #f8fafc            /* Cinza muito claro */
--cor-texto: #1e293b            /* Cinza escuro */
--cor-texto-claro: #64748b      /* Cinza médio */
--cor-borda: #e2e8f0            /* Cinza claro */
```

## 📝 Páginas

### LandingPage.html
- Hero section com call-to-action
- Grid de 6 recursos principais
- Seção de promoção
- Informações sobre a plataforma
- Footer com links

### Login.html
- Campos: Email, Senha
- Opção "Lembrar-me" (localStorage)
- Link "Esqueceu a senha?"
- Botão para criar nova instituição

### Cadastro.html (Etapa 1)
- Campo: Nome da Instituição
- Indicador de progresso (1/2)
- Botão "Avançar"

### CadastroFinal.html (Etapa 2)
- Campos: Email, Senha, Confirmar Senha
- Validação de requisitos de senha em tempo real:
  - ✅ Mínimo 8 caracteres
  - ✅ Uma letra maiúscula
  - ✅ Um número
- Checkbox de termos
- Indicador de progresso (2/2)
- Botão "Cadastrar Instituição"

## 🚀 Como Usar

1. Abra `LandingPage.html` no navegador
2. Clique em "Vamos Começar" para iniciar o cadastro
3. Ou clique em "Entrar" para fazer login
4. Todos os dados são validados antes do envio (simulação)

## 📦 Dependências

Apenas HTML5, CSS3 e JavaScript vanilla (sem frameworks externos).

## ✅ Funcionalidades

- ✅ Hotbar fixa e responsiva
- ✅ Menu mobile com hamburger
- ✅ Formulários com validação
- ✅ Animações suaves
- ✅ Indicador de progresso em cadastro
- ✅ Validação de senha em tempo real
- ✅ Armazenamento local (localStorage/sessionStorage)
- ✅ Totalmente responsivo
- ✅ Código organizado e bem comentado

---

**Desenvolvido com ❤️ para SchoolHub**
