/**
 * Chat Widget Flutuante - CAPTA LEADS
 * Fonte: Times New Roman
 * Estilo: Clean & Professional
 */

function createChatWidget() {
  const widgetHTML = `
    <div id="chat-widget-container" style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      max-height: 550px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 5px 30px rgba(102, 126, 234, 0.2);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      font-family: 'Times New Roman', Times, serif;
      transition: all 0.3s ease;
      border-top: 4px solid #667eea;
    " data-expanded="true">

      <!-- Header -->
      <div style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
      " id="chat-widget-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.5em;">🤖</span>
          <div style="line-height: 1.3;">
            <div style="font-weight: bold; font-size: 1.05em;">Assistente IA</div>
            <div style="font-size: 0.75em; opacity: 0.85; font-style: italic;">Powered by Claude</div>
          </div>
        </div>
        <div style="display: flex; gap: 6px;">
          <button id="chat-widget-minimize" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 6px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.3s;
            font-weight: bold;
            font-family: 'Times New Roman', Times, serif;
          " title="Minimizar">_</button>
          <button id="chat-widget-close" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 6px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.3s;
            font-weight: bold;
            font-family: 'Times New Roman', Times, serif;
          " title="Fechar">✕</button>
        </div>
      </div>

      <!-- Messages Area -->
      <div id="chat-widget-messages" style="
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #f9f9f9;
        max-height: 350px;
        min-height: 280px;
        font-size: 0.95em;
        line-height: 1.6;
      ">
        <div style="
          padding: 15px;
          background: white;
          border-radius: 8px;
          color: #667eea;
          font-size: 0.9em;
          margin-bottom: 15px;
          border-left: 4px solid #667eea;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          line-height: 1.5;
          font-family: 'Times New Roman', Times, serif;
        ">
          <strong>Bem-vindo! 👋</strong><br>
          Como posso ajudá-lo com <strong>CAPTA LEADS</strong> hoje?
        </div>
      </div>

      <!-- Input Area -->
      <div style="
        padding: 15px 20px;
        border-top: 1px solid #eee;
        display: flex;
        gap: 10px;
      ">
        <input
          type="text"
          id="chat-widget-input"
          placeholder="Escreva sua pergunta..."
          style="
            flex: 1;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-family: 'Times New Roman', Times, serif;
            font-size: 0.95em;
            outline: none;
            transition: all 0.2s;
            color: #333;
            background: white;
          "
          onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)'"
          onblur="this.style.borderColor='#ddd'; this.style.boxShadow='none'"
        >
        <button id="chat-widget-send" style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
          font-size: 1em;
          font-family: 'Times New Roman', Times, serif;
        " title="Enviar">
          ↑
        </button>
      </div>
    </div>

    <!-- Botão Flutuante (quando minimizado) -->
    <button id="chat-widget-fab" style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.5em;
      box-shadow: 0 4px 16px rgba(102, 126, 234, 0.35);
      z-index: 9998;
      transition: all 0.3s ease;
      border: none;
      color: white;
      font-weight: bold;
    " title="Abrir Chat">
      🤖
    </button>
  `;

  // Adicionar ao body
  document.body.insertAdjacentHTML('beforeend', widgetHTML);

  // Event Listeners
  const container = document.getElementById('chat-widget-container');
  const header = document.getElementById('chat-widget-header');
  const minimize = document.getElementById('chat-widget-minimize');
  const close = document.getElementById('chat-widget-close');
  const send = document.getElementById('chat-widget-send');
  const input = document.getElementById('chat-widget-input');
  const fab = document.getElementById('chat-widget-fab');
  const messagesDiv = document.getElementById('chat-widget-messages');

  // Minimizar
  minimize.addEventListener('click', (e) => {
    e.stopPropagation();
    container.style.display = 'none';
    fab.style.display = 'flex';
  });

  // Fechar
  close.addEventListener('click', (e) => {
    e.stopPropagation();
    container.style.display = 'none';
    fab.style.display = 'none';
  });

  // FAB - Expandir
  fab.addEventListener('click', () => {
    container.style.display = 'flex';
    fab.style.display = 'none';
    input.focus();
  });

  // Enviar mensagem
  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    // Adicionar mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.style.cssText = `
      margin-bottom: 12px;
      padding: 12px 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
      text-align: right;
      margin-left: 40px;
      word-wrap: break-word;
      font-size: 0.95em;
      line-height: 1.5;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
      font-family: 'Times New Roman', Times, serif;
    `;
    userMsg.textContent = message;
    messagesDiv.appendChild(userMsg);
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Enviar para API
    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();

      // Adicionar resposta da IA
      const aiMsg = document.createElement('div');
      aiMsg.style.cssText = `
        margin-bottom: 12px;
        padding: 12px 15px;
        background: white;
        color: #333;
        border-radius: 8px;
        margin-right: 40px;
        word-wrap: break-word;
        font-size: 0.95em;
        line-height: 1.6;
        border-left: 4px solid #667eea;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        font-family: 'Times New Roman', Times, serif;
      `;
      aiMsg.textContent = data.response || 'Desculpe, não consegui processar sua solicitação.';
      messagesDiv.appendChild(aiMsg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
      const errorMsg = document.createElement('div');
      errorMsg.style.cssText = `
        margin-bottom: 12px;
        padding: 12px 15px;
        background: #FFE6E6;
        color: #E74C3C;
        border-radius: 8px;
        margin-right: 40px;
        font-size: 0.9em;
        border-left: 4px solid #E74C3C;
        line-height: 1.5;
        font-family: 'Times New Roman', Times, serif;
      `;
      errorMsg.textContent = '❌ Erro ao conectar com IA. Tente novamente.';
      messagesDiv.appendChild(errorMsg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  }

  // Botão Enviar
  send.addEventListener('click', sendMessage);

  // Enter key
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Hover effect no FAB
  fab.addEventListener('mouseover', () => {
    fab.style.transform = 'scale(1.1)';
  });
  fab.addEventListener('mouseout', () => {
    fab.style.transform = 'scale(1)';
  });

  // Hover effect no send button
  send.addEventListener('mouseover', () => {
    send.style.transform = 'scale(1.05)';
  });
  send.addEventListener('mouseout', () => {
    send.style.transform = 'scale(1)';
  });
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createChatWidget);
} else {
  createChatWidget();
}
