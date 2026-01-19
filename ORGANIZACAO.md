# 📊 Guia de Organização de Arquivos

## CSS - Estrutura Modular

```
public/style/
├── style.css              ← IMPORTA TODOS (comece por aqui)
│
├── variables.css          → Cores, transições, animações globais
├── forms.css              → Inputs, botões, checkboxes
├── hotbar.css             → Barra de navegação
├── footer.css             → Rodapé
│
├── landing-page.css       → Seções da página inicial
├── login.css              → Página de login
└── cadastro.css           → Páginas de cadastro (1/2 e 2/2)
```

**Como funciona:**
- `style.css` faz @import de todos os arquivos
- Cada arquivo é independente e reutilizável
- Responsividade em cada arquivo (não há arquivo separado)

---

## JavaScript - Estrutura Funcional

```
src/
├── script.js              ← Documentação central (inicia tudo)
│
├── menu-controls.js       → Menu mobile, hamburger, scroll
├── navigation.js          → Redirecionamentos entre páginas
├── animations.js          → Fade-in, smooth scroll
│
├── login-form.js          → Lógica de login
└── cadastro-form.js       → Lógica de cadastro (etapas 1 e 2)
```

**Como funciona:**
- Cada funcionalidade em seu próprio arquivo
- Não há dependências entre os arquivos
- Basta incluir no HTML os scripts necessários

---

## HTML - Inclusão de Scripts

### Landing Page
```html
<script src="../src/menu-controls.js"></script>
<script src="../src/navigation.js"></script>
<script src="../src/animations.js"></script>
```

### Login Page
```html
<script src="../src/menu-controls.js"></script>
<script src="../src/navigation.js"></script>
<script src="../src/login-form.js"></script>
```

### Cadastro Page
```html
<script src="../src/menu-controls.js"></script>
<script src="../src/navigation.js"></script>
<script src="../src/cadastro-form.js"></script>
```

---

## 📝 Nomes Descritivos

### CSS
- `variables.css` - Tudo que é variável
- `forms.css` - Todos os componentes de entrada
- `hotbar.css` - Barra superior de navegação
- `footer.css` - Rodapé
- `landing-page.css` - Página inicial (hero, recursos, etc)
- `login.css` - Página de login
- `cadastro.css` - Páginas de cadastro

### JavaScript
- `menu-controls.js` - Controle do menu
- `navigation.js` - Navegar entre páginas
- `animations.js` - Animar elementos
- `login-form.js` - Formulário de login
- `cadastro-form.js` - Formulário de cadastro

---

## ✨ Benefícios da Organização

✅ **Fácil de manter** - Cada funcionalidade em um arquivo
✅ **Fácil de encontrar** - Nomes descritivos e claros
✅ **Reutilizável** - Componentes podem ser usados em várias páginas
✅ **Escalável** - Adicionar novas páginas é simples
✅ **Sem conflitos** - CSS modular sem sobrescrita
✅ **Performance** - Carregar apenas o necessário por página

---

## 🚀 Adicionando Nova Página

1. Crie `NovaPage.html` em `/view/`
2. Use a mesma `hotbar` (copie de outra página)
3. Crie novo CSS em `public/style/nova-page.css`
4. Importe em `public/style/style.css`
5. Crie novo JS em `src/nova-funcionalidade.js` (se necessário)
6. Inclua os scripts no HTML

---

**Tudo bem organizado e pronto para crescer! 🚀**
