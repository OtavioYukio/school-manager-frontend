/* ============================================
   SISTEMA DE NOTIFICAÇÕES
   ============================================ */

// Criar container de notificações se não existir
function initNotifications() {
    if (!document.getElementById('notifications-container')) {
        const container = document.createElement('div');
        container.id = 'notifications-container';
        document.body.appendChild(container);
    }
}

// Mostrar notificação
function showNotification(message, type = 'info', duration = 5000) {
    initNotifications();
    
    const container = document.getElementById('notifications-container');
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} show`;
    
    // Ícones por tipo
    const icons = {
        'success': '✓',
        'error': '✕',
        'warning': '⚠',
        'info': 'ℹ'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || icons['info']}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(notification);
    
    // Auto-remover após duração
    if (duration > 0) {
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

// Mostrar modal de confirmação estilizado
function showConfirmDialog(title, message, onConfirm, onCancel) {
    initNotifications();
    
    const container = document.getElementById('notifications-container');
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog-overlay show';
    
    dialog.innerHTML = `
        <div class="confirm-dialog">
            <div class="confirm-header">
                <h3>${title}</h3>
                <button class="confirm-close" onclick="this.closest('.confirm-dialog-overlay').remove()">×</button>
            </div>
            <div class="confirm-body">
                <p>${message}</p>
            </div>
            <div class="confirm-footer">
                <button class="btn-cancel" onclick="this.closest('.confirm-dialog-overlay').remove()">Cancelar</button>
                <button class="btn-confirm">Confirmar</button>
            </div>
        </div>
    `;
    
    container.appendChild(dialog);
    
    // Event listeners
    const confirmBtn = dialog.querySelector('.btn-confirm');
    const overlay = dialog;
    
    confirmBtn.addEventListener('click', () => {
        overlay.remove();
        if (onConfirm) onConfirm();
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
            if (onCancel) onCancel();
        }
    });
}

// Mostrar mensagem de erro em um container específico
function showErrorInContainer(containerId, message) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Remover mensagem anterior se existir
    const existingError = container.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <span class="error-icon">✕</span>
        <span class="error-text">${message}</span>
    `;
    
    container.insertBefore(errorDiv, container.firstChild);
}

// Mostrar mensagem de sucesso em um container específico
function showSuccessInContainer(containerId, message) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Remover mensagem anterior se existir
    const existingMessage = container.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <span class="success-icon">✓</span>
        <span class="success-text">${message}</span>
    `;
    
    container.insertBefore(successDiv, container.firstChild);
    
    // Auto-remover após 3 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Inicializar ao carregar
window.addEventListener('DOMContentLoaded', initNotifications);
