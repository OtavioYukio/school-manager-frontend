/* ============================================
   DASHBOARD - GERENCIAMENTO POR ROLE
   ============================================ */

function setupDashboardByRole() {
    const role = obterRole();
    const subtitle = document.getElementById('dashboard-subtitle');
    const adminContent = document.getElementById('admin-content');
    const teacherContent = document.getElementById('teacher-content');
    
    if (role === 'ADMIN') {
        // Área Administrativa
        subtitle.textContent = 'Área Administrativa';
        adminContent.style.display = 'block';
        teacherContent.style.display = 'none';
        loadAdminDashboard();
    } else if (role === 'TEACHER') {
        // Área Pedagógica
        subtitle.textContent = 'Área Pedagógica';
        adminContent.style.display = 'none';
        teacherContent.style.display = 'block';
        loadTeacherDashboard();
    }
}

function loadAdminDashboard() {
    const name = obterName();
    const email = obterEmail();
    const createdAt = localStorage.getItem('schoolhub_createdAt');
    
    // Preencher dados administrativos
    const userInstituicao = document.getElementById('user-instituicao');
    if (userInstituicao) {
        userInstituicao.textContent = name || 'Não informado';
    }
    
    const userData = document.getElementById('user-data');
    if (userData && createdAt) {
        const data = new Date(createdAt);
        userData.textContent = data.toLocaleDateString('pt-BR');
    } else if (userData) {
        userData.textContent = 'Não informado';
    }
}

function loadTeacherDashboard() {
    const name = obterName();
    
    // Preencher dados pedagógicos
    const teacherName = document.getElementById('teacher-name');
    if (teacherName) {
        teacherName.textContent = name || 'Não informado';
    }
    
    const disciplines = document.getElementById('teacher-disciplines');
    if (disciplines) {
        // TODO: Buscar disciplinas do backend
        disciplines.textContent = 'Carregando...';
    }
    
    // Carregar pedidos
    loadTeacherRequests();
}

// ============================================
// GERENCIAMENTO DE PEDIDOS
// ============================================

// Array para armazenar pedidos (será substituído por API mais tarde)
let teacherRequests = [];

function loadTeacherRequests() {
    const container = document.getElementById('requests-container');
    if (!container) return;
    
    // Recuperar pedidos do localStorage (temporário)
    const savedRequests = localStorage.getItem('teacher_requests');
    if (savedRequests) {
        teacherRequests = JSON.parse(savedRequests);
    }
    
    renderRequests();
}

function renderRequests() {
    const container = document.getElementById('requests-container');
    if (!container) return;
    
    if (teacherRequests.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Nenhum pedido no momento</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = teacherRequests.map((request, index) => `
        <div class="request-card">
            <div class="request-header">
                <span class="request-requester">👤 ${request.requester}</span>
                <span class="request-time">${formatarHorario(request.timestamp)}</span>
            </div>
            <div class="request-content">
                ${request.content}
            </div>
            <div class="request-actions">
                <button class="request-btn request-btn-accept" onclick="acceptRequest(${index})">
                    ✓ Aceitar
                </button>
                <button class="request-btn request-btn-decline" onclick="declineRequest(${index})">
                    ✕ Recusar
                </button>
            </div>
        </div>
    `).join('');
}

function formatarHorario(timestamp) {
    const date = new Date(timestamp);
    const hoje = new Date();
    const ehHoje = date.toDateString() === hoje.toDateString();
    
    if (ehHoje) {
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else {
        return date.toLocaleDateString('pt-BR', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

function acceptRequest(index) {
    const request = teacherRequests[index];
    showNotification(`Pedido de ${request.requester} aceito!`, 'success');
    teacherRequests.splice(index, 1);
    saveRequests();
    renderRequests();
}

function declineRequest(index) {
    const request = teacherRequests[index];
    showNotification(`Pedido de ${request.requester} recusado!`, 'warning');
    teacherRequests.splice(index, 1);
    saveRequests();
    renderRequests();
}

function saveRequests() {
    localStorage.setItem('teacher_requests', JSON.stringify(teacherRequests));
}

// Função para adicionar um pedido (será chamada pelo admin mais tarde)
function addRequestToTeacher(teacherEmail, requesterName, content) {
    const request = {
        requester: requesterName,
        content: content,
        timestamp: new Date().toISOString()
    };
    
    teacherRequests.push(request);
    saveRequests();
    renderRequests();
    showNotification('Novo pedido recebido!', 'info');
}

// Carregar ao inicializar a página
document.addEventListener('DOMContentLoaded', setupDashboardByRole);
