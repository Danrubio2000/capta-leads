# 🎯 CAPTA LEADS - Setup Local

Guia completo para rodar o CAPTA LEADS no seu computador para testes e desenvolvimento.

---

## 📋 OPÇÃO 1: Rápido (Sem instalação)

Se você só quer testar rapidinho, sem instalar nada:

### Passo 1: Baixe os arquivos
```bash
git clone https://github.com/Danrubio2000/capta-leads.git
cd capta-leads
```

### Passo 2: Abra o dashboard
Simplesmente **dê double-click** em:
- `dashboard.html` - Abre no navegador padrão

**Pronto!** O app roda 100% local no seu computador.

---

## 🚀 OPÇÃO 2: Recomendada (Com servidor Node.js)

Para testar como se fosse de verdade, com servidor local:

### Pré-requisitos
- **Node.js** instalado ([Download aqui](https://nodejs.org/))
  - Versão mínima: 14.0.0
  - Teste: `node --version`

### Passo 1: Clone o repositório
```bash
git clone https://github.com/Danrubio2000/capta-leads.git
cd capta-leads
```

### Passo 2: Instale dependências
```bash
npm install
```

### Passo 3: Inicie o servidor local
```bash
npm start
```

**Você verá:**
```
Server running on http://localhost:3000
Dashboard: http://localhost:3000/dashboard
Landing page: http://localhost:3000
```

### Passo 4: Abra no navegador
Acesse: **http://localhost:3000**

---

## 📂 Estrutura de Pastas

```
capta-leads/
├── index.html           ← Landing page
├── dashboard.html       ← App principal (teste aqui!)
├── tutorial.html        ← Vídeo tutorial
├── server.js           ← Servidor local (Node.js)
├── package.json        ← Configurações
├── .env                ← Variáveis de ambiente
├── TESTING.md          ← Guia de testes
├── MARKETING.md        ← Estratégia de marketing
└── README.md           ← Este arquivo
```

---

## 🎮 Como Usar o Dashboard Localmente

### 1️⃣ DESCOBRIR LEADS
1. Abra o dashboard
2. Clique em **"Buscar Leads"**
3. Configure:
   - 🎯 Indústria (ex: Construção, Consultoria)
   - 📍 Localização
   - 💼 Tamanho da empresa
4. Clique **"Buscar"**
5. Veja a lista de contatos encontrados

### 2️⃣ ORGANIZAR LEADS
- [ ] Salve leads em **listas**
- [ ] Marque como **favorito** ⭐
- [ ] Anote **observações** pessoais
- [ ] Defina **status** (Novo, Contatado, Qualificado)

### 3️⃣ ENVIAR PROPOSTAS
1. Selecione um lead
2. Clique **"Gerar Proposta"**
3. Escolha template
4. Personalize o texto
5. Clique **"Enviar"** (salva localmente)

### 4️⃣ ACOMPANHAR CAMPANHA
- Veja **histórico** de contatos
- Monitore **conversão**
- Analise **próximos passos**

---

## 🔧 Comandos Úteis

### Iniciar servidor
```bash
npm start
```

### Parar servidor
```
Ctrl + C (Windows/Linux)
Cmd + C (Mac)
```

### Reinstalar dependências
```bash
npm install
```

### Ver versão do Node
```bash
node --version
npm --version
```

---

## 🐛 Troubleshooting

### Erro: "npm: command not found"
**Solução:** Instale Node.js do site oficial: https://nodejs.org/

### Erro: "Port 3000 already in use"
**Solução:** Outra aplicação está usando a porta. Mude no `server.js`:
```javascript
const PORT = 3001; // Mude de 3000 para 3001
```

### Página branca ou não carrega
**Solução:**
1. Limpe o cache: `Ctrl+Shift+Delete` (Chrome)
2. Recarregue: `Ctrl+F5`
3. Abra console: `F12` e procure erros

### "Cannot find module"
**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 💾 Salvar Dados Localmente

### Dados salvos no navegador
Os dados são armazenados em **localStorage** (sua máquina):
- Leads
- Listas
- Propostas
- Preferências

**Não se perdem** ao recarregar a página!

### Exportar dados
```javascript
// Cole no console (F12 → Console):
JSON.stringify(localStorage)
```

### Limpar todos os dados
```javascript
// Console:
localStorage.clear()
```

---

## 🔒 Segurança (Local)

Como você está testando **localmente**:
- ✅ Seus dados ficam no seu PC
- ✅ Nada é enviado para internet
- ✅ Seguro para dados sensíveis
- ✅ Funciona offline

---

## 📱 Acessar de Outro Computador (Mesma rede)

Se quiser testar de outro PC na mesma rede Wi-Fi:

1. Descubra seu IP local:
   ```bash
   ipconfig (Windows)
   ifconfig (Mac/Linux)
   ```
   Procure por algo como: `192.168.1.100`

2. No outro computador, acesse:
   ```
   http://192.168.1.100:3000
   ```

---

## 📊 Testar com Dados Reais

### Importar lista de contatos
1. Crie um arquivo CSV:
   ```
   Nome,Email,Empresa,Telefone
   João Silva,joao@email.com,Tech Ltda,(11) 98765-4321
   Maria Santos,maria@email.com,Consultoria XYZ,(21) 99999-8888
   ```

2. No dashboard:
   - Clique **"Importar"**
   - Selecione seu arquivo CSV
   - Pronto! Os contatos aparecem

---

## 🎯 Checklist de Testes Locais

Quando estiver testando no seu PC:

- [ ] Dashboard abre sem erros
- [ ] Consegue criar nova lista
- [ ] Consegue adicionar contatos
- [ ] Consegue gerar proposta
- [ ] Dados persistem ao recarregar
- [ ] Funciona offline
- [ ] Console sem erros (F12)

---

## 🚀 Próximos Passos

### Depois de testar localmente:

1. **Melhorar o app:**
   - Adicione sua logo
   - Customize cores (branding)
   - Crie templates de proposta

2. **Preparar para lançamento:**
   - Teste com 10 clientes
   - Coleta feedback
   - Ajuste interface

3. **Deploy na nuvem:**
   - Vercel (frontend)
   - Railway/Heroku (backend)
   - Banco de dados (Firebase, MongoDB)

---

## 📞 Problemas?

Se algo não funcionar:

1. Verifique erros no console: `F12 → Console`
2. Copie a mensagem de erro
3. Reinicie o servidor: `Ctrl+C` e `npm start`
4. Se persistir, avise para correção

---

## 💡 Dica Pro

Para simular funcionalidades avançadas, use o console do navegador:

```javascript
// Adicionar lead simulado
const novoLead = {
  id: Date.now(),
  nome: "João Silva",
  empresa: "Tech Ltda",
  email: "joao@tech.com.br",
  telefone: "(11) 98765-4321",
  criado: new Date().toLocaleDateString('pt-BR')
};

localStorage.setItem('lead_' + novoLead.id, JSON.stringify(novoLead));
```

Depois recarregue a página e o lead aparecerá!

---

## 📝 Versões

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0.0 | 2025-05-27 | Lançamento inicial |
| 1.1.0 | Próxima | Backend com database |
| 2.0.0 | Futura | App mobile |

---

## 📄 Licença

Privado - Uso pessoal apenas

---

**Bom teste! 🚀**
