# 🎯 SETUP LOCAL - Passo a Passo

Guia para rodar o CAPTA LEADS no seu PC em **5 minutos**.

---

## ⚡ OPÇÃO RÁPIDA (2 minutos - Sem instalação)

### Se você só quer testar rapidinho:

1. **Baixe os arquivos**
   - Acesse: https://github.com/Danrubio2000/capta-leads
   - Clique: `Code` → `Download ZIP`
   - Extraia a pasta

2. **Abra o app**
   - Na pasta extraída, dê **double-click** em: `dashboard.html`
   - Pronto! ✅ Abre no navegador

**Vantagem:** Sem instalação, funciona offline
**Desvantagem:** Mais lento, sem servidor

---

## 🚀 OPÇÃO RECOMENDADA (5 minutos - Com servidor)

Para testar como de verdade, com servidor local rodando:

### PASSO 1: Instale Node.js

1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (recomendada)
3. Instale (próximo, próximo, pronto)
4. Abra o Terminal/Prompt e confirme:
   ```
   node --version
   npm --version
   ```
   Você deve ver números de versão (ex: v18.0.0)

### PASSO 2: Baixe o código

**Opção A - Git** (recomendado)
```bash
git clone https://github.com/Danrubio2000/capta-leads.git
cd capta-leads
```

**Opção B - Arquivo ZIP**
1. Vá para: https://github.com/Danrubio2000/capta-leads
2. Clique `Code` → `Download ZIP`
3. Extraia a pasta
4. Abra Terminal/Prompt nessa pasta

### PASSO 3: Instale dependências

Digite no Terminal:
```bash
npm install
```

Espere um pouco... (vai aparecer várias linhas de log)

### PASSO 4: Inicie o servidor

Digite:
```bash
npm start
```

Você verá algo assim:
```
🚀 CAPTA LEADS - Servidor Local
=====================================

✅ Servidor rodando em:
   📍 http://localhost:3000

📄 Páginas disponíveis:
   🏠 Landing page: http://localhost:3000
   💼 Dashboard:    http://localhost:3000/dashboard
   🎬 Tutorial:     http://localhost:3000/tutorial
   🧪 Test Modal:   http://localhost:3000/test-modal

🛑 Para parar o servidor: Ctrl+C
```

### PASSO 5: Abra no navegador

Clique neste link ou copie na barra de endereços:
```
http://localhost:3000/dashboard
```

**Pronto! ✅** Agora você tem o CAPTA LEADS rodando localmente!

---

## 🎮 Primeiros Passos no Dashboard

### 1. Explore a interface
- [ ] Clique em cada menu
- [ ] Veja todas as seções
- [ ] Familiarize-se com layout

### 2. Teste adicionar lead
- [ ] Clique "Novo Lead" ou "Adicionar Contato"
- [ ] Preencha um contato de teste
- [ ] Salve
- [ ] Recarregue página (F5) - deve persistir!

### 3. Teste gerar proposta
- [ ] Selecione um lead
- [ ] Clique "Gerar Proposta"
- [ ] Veja o resultado

### 4. Abra o console
- Pressione: `F12` ou `Cmd+Option+I` (Mac)
- Vá para: Console
- Procure por erros (texto vermelho)
- Se houver, avise!

---

## 🛑 Parar o servidor

Quando quiser parar:

**No Terminal:**
```
Ctrl + C
```

(ou `Cmd + C` no Mac)

Você verá:
```
^C
```

Servidor parou ✓

---

## 🔄 Reiniciar o servidor

Se algo der errado, reinicie:

1. Parar: `Ctrl+C`
2. Iniciar: `npm start`

---

## ❓ Dúvidas Comuns

### "Port 3000 already in use"
**Solução:** Outra aplicação está usando a porta

Opção 1 - Use outra porta:
```bash
PORT=3001 npm start
```

Opção 2 - Feche o outro app que está usando 3000

### "npm: command not found"
**Solução:** Node.js não está instalado corretamente
- Reinstale Node.js do site oficial
- Reinicie o computador
- Tente novamente

### Página branca / não carrega
**Solução:**
1. Limpe cache: `Ctrl+Shift+Delete`
2. Recarregue: `Ctrl+F5` ou `Cmd+Shift+R`
3. Abra console (F12) e procure erros vermelhos

### Dados não salvam
**Solução:** Ativei localStorage (armazena no navegador)
- Dados salvam automaticamente
- Recarregue página para confirmar
- Console F12 → Application → Local Storage

---

## 🧪 Teste Completo

Siga este checklist:

- [ ] Server inicia sem erros
- [ ] http://localhost:3000 abre
- [ ] Dashboard carrega completo
- [ ] Consegue adicionar lead
- [ ] Dados persistem ao recarregar
- [ ] Consola (F12) não tem erros vermelhos
- [ ] Vídeo modal abre (se testar landing page)

---

## 📱 Acessar de outro dispositivo

Se quiser testar de outro PC/smartphone na mesma rede:

1. Descubra seu IP:
   ```bash
   ipconfig
   ```
   Procure por: `192.168.1.XXX`

2. No outro dispositivo, acesse:
   ```
   http://192.168.1.XXX:3000/dashboard
   ```

---

## 💾 Dados Locais

### Onde os dados são salvos?
- **Navegador local** (localStorage)
- Seu PC / seu navegador
- Nada é enviado para internet

### Exportar dados
Console (F12 → Console):
```javascript
JSON.stringify(localStorage)
```

### Limpar dados
Console:
```javascript
localStorage.clear()
```

### Fazer backup
1. Console
2. Copie o resultado de: `JSON.stringify(localStorage)`
3. Cole num arquivo .json

---

## 🚀 Próximos Passos

Depois de testar localmente:

1. **Teste com dados reais**
   - Busque contatos reais
   - Crie propostas de verdade
   - Veja se funciona conforme esperado

2. **Melhore o app**
   - Customize cores/logo
   - Crie seus templates
   - Adicione seus dados

3. **Antes de lançar**
   - Teste tudo (TESTING.md)
   - Peça feedback a amigos
   - Ajuste conforme feedback

---

## 📞 Problemas?

1. **Leia o erro** na tela ou console
2. **Google** o erro (copia-cola)
3. **Tente reiniciar** (parar + iniciar servidor)
4. **Se persistir**, avise com print do erro

---

## ✅ Tudo Pronto!

Se chegou aqui sem erros, significa que:

✅ Node.js está instalado
✅ Código foi baixado
✅ Dependências instaladas
✅ Servidor rodando
✅ App abre no navegador

**Parabéns! 🎉**

Agora você pode:
- 🧪 Testar o app
- 📊 Procurar leads
- 💼 Gerar propostas
- 🔍 Revisar funcionalidades

**Bom teste! Qualquer dúvida, é só chamar.** 💬
