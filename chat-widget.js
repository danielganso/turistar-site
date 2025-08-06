class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.sessionId = this.generateSessionId();
        this.webhookUrl = 'https://n8n.tripos.com.br/webhook/b1820dd4-1bc1-4ca0-b058-a37f658d09aa/chat';
        this.isLoading = false;
        
        this.initializeElements();
        this.bindEvents();
        this.setupNewRequestButton();
        this.addInitialMessage();
    }

    initializeElements() {
        this.chatButton = document.getElementById('chatButton');
        this.chatModal = document.getElementById('chatModal');
        this.chatClose = document.getElementById('chatClose');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.typingIndicator = document.getElementById('typingIndicator');
    }

    bindEvents() {
        // Event listeners
        this.chatButton.addEventListener('click', () => this.openChat());
        this.chatClose.addEventListener('click', () => this.closeChat());
        
        // Fechar ao clicar fora do modal (apenas em desktop)
        this.chatModal.addEventListener('click', (e) => {
            if (e.target === this.chatModal && window.innerWidth > 768) {
                this.closeChat();
            }
        });
        
        // Enviar mensagem
        this.chatSend.addEventListener('click', () => this.sendMessage());
        
        // Enviar com Enter
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
        
        // Auto-resize do input
        this.chatInput.addEventListener('input', () => {
            this.adjustInputHeight();
        });
        
        // Manter foco no input quando clicar na área de mensagens
        this.chatMessages.addEventListener('click', () => {
            this.chatInput.focus();
        });
        
        // Prevenir perda de foco ao clicar no container do chat
        this.chatModal.querySelector('.chat-container').addEventListener('click', (e) => {
            // Só focar se não clicou em um botão ou link
            if (!e.target.closest('button') && !e.target.closest('a')) {
                this.chatInput.focus();
            }
        });
    }

    generateSessionId() {
        // Verificar se já existe um sessionId armazenado
        let existingSessionId = localStorage.getItem('chatSessionId');
        
        if (existingSessionId) {
            return existingSessionId;
        }
        
        // Gerar UUID v4 válido
        const newSessionId = this.generateUUID();
        localStorage.setItem('chatSessionId', newSessionId);
        
        return newSessionId;
    }

    generateUUID() {
        // Gerar UUID v4 (formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    openChat() {
        this.isOpen = true;
        this.chatModal.classList.add('active');
        document.body.style.overflow = window.innerWidth <= 768 ? 'hidden' : 'auto';
        
        // Focus no input após animação
        setTimeout(() => {
            this.chatInput.focus();
            // Garantir que o cursor fique no final do texto
            this.chatInput.setSelectionRange(this.chatInput.value.length, this.chatInput.value.length);
            
            // Enviar mensagem automática se for a primeira vez que abre o chat
            if (this.chatMessages.children.length <= 1) {
                this.chatInput.value = 'Gostaria de um orçamento.';
                this.sendMessage();
            }
        }, 300);
    }

    closeChat() {
        this.isOpen = false;
        this.chatModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    addInitialMessage() {
        const welcomeMessage = {
            content: 'Olá! Como posso ajudá-lo hoje?',
            isBot: true,
            timestamp: new Date()
        };
        this.renderMessage(welcomeMessage);
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        
        if (!message || this.isLoading) {
            return;
        }

        // Limpar input
        this.chatInput.value = '';
        this.adjustInputHeight();

        // Renderizar mensagem do usuário
        const userMessage = {
            content: message,
            isBot: false,
            timestamp: new Date()
        };
        this.renderMessage(userMessage);

        // Mostrar indicador de digitação
        this.showTypingIndicator();
        this.setLoadingState(true);

        try {
            // Enviar para o webhook
            const response = await this.callWebhook(message);
            
            // Debug: Log da resposta completa
            console.log('Resposta do n8n:', response);
            
            // Esconder indicador de digitação
            this.hideTypingIndicator();
            
            // Renderizar resposta do bot
            // Tentar diferentes propriedades da resposta
            let botContent = response.message || response.output || response.text || response.response || response.content;
            
            if (!botContent && typeof response === 'string') {
                botContent = response;
            }
            
            if (!botContent) {
                console.warn('Nenhuma mensagem encontrada na resposta:', response);
                botContent = 'Desculpe, não consegui processar sua mensagem.';
            }
            
            const botMessage = {
                content: botContent,
                isBot: true,
                timestamp: new Date()
            };
            
            console.log('Mensagem do bot a ser renderizada:', botMessage);
            this.renderMessage(botMessage);
            
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            
            this.hideTypingIndicator();
            
            // Mensagem de erro
            const errorMessage = {
                content: 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.',
                isBot: true,
                timestamp: new Date(),
                isError: true
            };
            this.renderMessage(errorMessage);
        } finally {
            this.setLoadingState(false);
            // Manter foco no input após enviar mensagem
            setTimeout(() => {
                this.chatInput.focus();
            }, 100);
        }
    }

    async callWebhook(message) {
        const payload = {
            chatInput: message,
            sessionId: this.sessionId,
            timestamp: new Date().toISOString()
        };

        const response = await fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.isBot ? 'bot-message' : 'user-message'}`;
        
        if (message.isError) {
            messageElement.classList.add('error-message');
        }

        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        
        // Converter quebras de linha em HTML
        const formattedContent = message.content
            .replace(/\\n/g, '<br>')  // \n escapado
            .replace(/\n/g, '<br>');   // \n normal
        contentElement.innerHTML = formattedContent;

        const timeElement = document.createElement('div');
        timeElement.className = 'message-time';
        timeElement.textContent = this.formatTime(message.timestamp);

        messageElement.appendChild(contentElement);
        messageElement.appendChild(timeElement);

        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }

    formatTime(timestamp) {
        return timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }

    setLoadingState(loading) {
        this.isLoading = loading;
        this.chatSend.disabled = loading;
        this.chatInput.disabled = loading;
        
        if (loading) {
            this.chatSend.classList.add('loading');
        } else {
            this.chatSend.classList.remove('loading');
        }
    }

    adjustInputHeight() {
        this.chatInput.style.height = 'auto';
        const maxHeight = 120; // máximo de ~4 linhas
        const newHeight = Math.min(this.chatInput.scrollHeight, maxHeight);
        this.chatInput.style.height = newHeight + 'px';
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    // Método público para adicionar mensagens programaticamente
    addMessage(content, isBot = true) {
        const message = {
            content: content,
            isBot: isBot,
            timestamp: new Date()
        };
        this.renderMessage(message);
    }

    // Método público para limpar o chat
    clearChat() {
        this.chatMessages.innerHTML = '';
        this.addInitialMessage();
    }

    // Método público para definir novo webhook URL
    setWebhookUrl(url) {
        this.webhookUrl = url;
    }

    // Método público para obter session ID
    getSessionId() {
        return this.sessionId;
    }

    // Método público para resetar sessão
    resetSession() {
        // Limpar sessionId do localStorage para forçar criação de novo
        localStorage.removeItem('chatSessionId');
        this.sessionId = this.generateSessionId();
        this.clearChat();
    }
    
    setupNewRequestButton() {
        const newRequestBtn = this.chatModal.querySelector('.new-request-btn');
        if (newRequestBtn) {
            newRequestBtn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja iniciar uma nova conversa? O histórico atual será perdido.')) {
                    this.resetSession();
                }
            });
        }
    }
}

// Inicializar o widget quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.chatWidget = new ChatWidget();
});

// Expor métodos globais para uso externo
window.ChatWidget = {
    open: () => window.chatWidget?.openChat(),
    close: () => window.chatWidget?.closeChat(),
    addMessage: (content, isBot) => window.chatWidget?.addMessage(content, isBot),
    clearChat: () => window.chatWidget?.clearChat(),
    setWebhookUrl: (url) => window.chatWidget?.setWebhookUrl(url),
    getSessionId: () => window.chatWidget?.getSessionId(),
    resetSession: () => window.chatWidget?.resetSession()
};

// Tratamento de erros globais
window.addEventListener('error', (e) => {
    console.error('Erro no Chat Widget:', e.error);
});

// Tratamento de promessas rejeitadas
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rejeitada no Chat Widget:', e.reason);
});