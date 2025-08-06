# Widget de Chat - Instruções de Integração

## 📋 Visão Geral

Este widget de chat é uma solução completa e responsiva que se integra com seu fluxo n8n via webhook. Ele oferece uma experiência otimizada tanto para desktop quanto para dispositivos móveis.

## 🚀 Características Principais

- ✅ **Totalmente Responsivo**: Adapta-se automaticamente a diferentes tamanhos de tela
- ✅ **Mobile-First**: Interface otimizada para dispositivos móveis
- ✅ **Integração n8n**: Conecta diretamente com seu webhook
- ✅ **Vanilla JavaScript**: Sem dependências externas
- ✅ **Acessível**: Suporte a navegação por teclado e leitores de tela
- ✅ **Animações Suaves**: Transições e efeitos visuais profissionais

## 📱 Comportamento Responsivo

### Desktop (> 768px)
- Modal centralizado (400px × 600px)
- Pode ser fechado clicando fora do modal
- Botão flutuante no canto inferior direito

### Mobile (≤ 768px)
- Modal em tela cheia (100% largura e altura)
- Animação de slide-up
- Tipografia e espaçamentos otimizados
- Botão flutuante menor

## 🔧 Como Integrar no Projeto

### Opção 1: Integração Completa no index.html

1. **Adicione os arquivos CSS e JS no `<head>` do seu index.html:**

```html
<head>
    <!-- Seus outros links CSS -->
    <link rel="stylesheet" href="chat-widget.css">
</head>
```

2. **Adicione o HTML do widget antes do fechamento do `<body>`:**

```html
<!-- Adicione este código antes do </body> -->

<!-- Botão flutuante do chat -->
<div id="chatButton" class="chat-button">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="white"/>
        <path d="M7 9H17V11H7V9ZM7 12H15V14H7V12Z" fill="white"/>
    </svg>
</div>

<!-- Modal do chat -->
<div id="chatModal" class="chat-modal">
    <div class="chat-container">
        <!-- Cabeçalho do chat -->
        <div class="chat-header">
            <div class="chat-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
                </svg>
                <span>Chat de Atendimento</span>
            </div>
            <button id="chatClose" class="chat-close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white"/>
                </svg>
            </button>
        </div>

        <!-- Área de mensagens -->
        <div id="chatMessages" class="chat-messages">
            <div class="message bot-message">
                <div class="message-content">
                    Olá! Como posso ajudá-lo hoje?
                </div>
                <div class="message-time"></div>
            </div>
        </div>

        <!-- Indicador de digitação -->
        <div id="typingIndicator" class="typing-indicator" style="display: none;">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span class="typing-text">Digitando...</span>
        </div>

        <!-- Área de input -->
        <div class="chat-input-area">
            <div class="chat-input-container">
                <input type="text" id="chatInput" placeholder="Digite sua mensagem..." maxlength="500">
                <button id="chatSend" class="chat-send-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<!-- JavaScript do chat -->
<script src="chat-widget.js"></script>
```

### Opção 2: Integração via Include/Import

Se preferir manter os arquivos separados, você pode incluir apenas as referências:

```html
<head>
    <link rel="stylesheet" href="chat-widget.css">
</head>
<body>
    <!-- Seu conteúdo existente -->
    
    <!-- Include do widget -->
    <div id="chat-widget-container"></div>
    
    <script src="chat-widget.js"></script>
    <script>
        // Carregar o HTML do widget dinamicamente
        fetch('chat-widget.html')
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const chatButton = doc.getElementById('chatButton');
                const chatModal = doc.getElementById('chatModal');
                
                document.body.appendChild(chatButton);
                document.body.appendChild(chatModal);
            });
    </script>
</body>
```

## ⚙️ Configuração do Webhook

O widget está configurado para usar seu webhook n8n:
```
https://n8n.tripos.com.br/webhook/b1820dd4-1bc1-4ca0-b058-a37f658d09aa/chat
```

### Formato do Payload Enviado
```json
{
    "message": "Mensagem do usuário",
    "sessionId": "chat_1234567890_abc123",
    "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Formato de Resposta Esperado
```json
{
    "message": "Resposta do bot",
    "status": "success"
}
```

## 🎨 Personalização

### Cores e Tema
Edite as variáveis CSS no início do arquivo `chat-widget.css`:

```css
:root {
    --primary-color: #7b0707;        /* Cor principal (já alinhada com seu site) */
    --primary-hover: #5a0505;        /* Cor hover */
    --background-color: #f8fafc;     /* Cor de fundo */
    --text-color: #333;              /* Cor do texto */
    --border-color: #e2e8f0;         /* Cor das bordas */
}
```

### Posição do Botão
Para alterar a posição do botão flutuante, edite a classe `.chat-button`:

```css
.chat-button {
    bottom: 20px;  /* Distância do fundo */
    right: 20px;   /* Distância da direita */
    /* Para posicionar à esquerda: left: 20px; right: auto; */
}
```

### Tamanho do Modal (Desktop)
Para alterar o tamanho do modal em desktop:

```css
.chat-container {
    width: 400px;   /* Largura */
    height: 600px;  /* Altura */
}
```

## 🔧 API JavaScript

O widget expõe métodos globais para controle programático:

```javascript
// Abrir o chat
window.ChatWidget.open();

// Fechar o chat
window.ChatWidget.close();

// Adicionar mensagem programaticamente
window.ChatWidget.addMessage("Olá!", true); // true = bot, false = usuário

// Limpar histórico do chat
window.ChatWidget.clearChat();

// Alterar URL do webhook
window.ChatWidget.setWebhookUrl("nova-url");

// Obter ID da sessão atual
const sessionId = window.ChatWidget.getSessionId();

// Resetar sessão (novo ID + limpar chat)
window.ChatWidget.resetSession();
```

## 📱 Testes de Responsividade

### Desktop
- Teste em resoluções 1920x1080, 1366x768, 1024x768
- Verifique se o modal aparece centralizado
- Teste fechar clicando fora do modal

### Tablet
- Teste em 768x1024 (iPad)
- Verifique transição entre layouts

### Mobile
- Teste em 375x667 (iPhone), 360x640 (Android)
- Verifique se ocupa tela cheia
- Teste orientação portrait/landscape

## 🐛 Solução de Problemas

### Chat não abre
- Verifique se todos os arquivos CSS e JS foram carregados
- Confirme se os IDs dos elementos estão corretos
- Verifique o console do navegador para erros

### Webhook não funciona
- Confirme se a URL do webhook está correta
- Verifique se o n8n está ativo e acessível
- Teste a URL diretamente com Postman/curl

### Problemas de responsividade
- Verifique se a meta tag viewport está presente:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

## 🔒 Segurança

- O widget não armazena dados sensíveis
- Session IDs são gerados localmente
- Todas as comunicações são via HTTPS
- Não há persistência de dados no localStorage

## 📈 Performance

- CSS otimizado com will-change para animações
- JavaScript vanilla (sem dependências)
- Lazy loading de mensagens
- Debounce em eventos de input

---

**Desenvolvido para Turistar Viagens** 🧳✈️