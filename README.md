# 🚀 CAPTA LEADS v2.0

**All-in-One Lead Generation, Email Marketing & Landing Page Builder**

> Encontre leads, envie campanhas de email e crie landing pages—tudo em um único agente configurável.

---

## ⚡ Início Rápido (3 passos)

### 1️⃣ Instalar Dependências
```bash
cd /Users/Dan/Projects/CAPTA-LEADS
npm install
```

### 2️⃣ Configurar Variáveis de Ambiente
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env e adicionar suas chaves (opcional)
# RESEND_API_KEY=re_sua_chave
# HUNTER_API_KEY=sua_chave
```

### 3️⃣ Iniciar o Servidor
```bash
npm start
# ou
node server.js
```

**Acesso:** http://localhost:3000

---

## 🎯 O que é CAPTA LEADS?

CAPTA LEADS é a solução completa para:

| Funcionalidade | Descrição |
|---|---|
| 🎯 **Busca de Leads** | Encontre contatos de qualquer profissão/negócio |
| 📧 **Email Marketing** | Crie e envie campanhas em massa |
| 🎨 **Landing Pages** | Construtor de páginas sem código |
| ⚙️ **Configurável** | Adapte para sua industria específica |
| 🤖 **Otimizado** | Interface amigável e intuitiva |

---

## 📋 Funcionalidades

### 🎯 Lead Hunting
- **Busca Multi-Fonte:** Hunter.io, Clearbit, Google
- **Filtros:** Palavras-chave, localização, tipo
- **Validação:** Verificação de emails válidos
- **Exportação:** CSV, JSON
- **Dados:** 50+ leads pré-verificados no banco de dados

### 📧 Email Campaigns
- **Criação:** Interface simples para criar campanhas
- **Personalização:** Use {nome}, {empresa}, {email}
- **Envio:** Via Resend (100 emails/dia gratis)
- **Estatísticas:** Rastreio de enviados, abertos, clicados
- **Templates:** Prontos para usar

### 🎨 Landing Page Builder
- **Arrastar & Soltar:** Interface intuitiva
- **Múltiplas Seções:** Hero, Features, Testimonials, CTA, Footer
- **Suporte de Mídia:** Imagens, vídeos, URLs
- **Responsivo:** Funciona em desktop e mobile
- **SEO:** Meta tags, títulos, keywords
- **Exportação:** HTML, JSON

### ⚙️ Configurável por Indústria
```
✅ Genérico
✅ Cinema & Audiovisual
✅ Arte & Cultura
✅ Saúde & Medicina
✅ Tecnologia
✅ E-commerce & Varejo
✅ Imóveis
✅ Educação
```

---

## 📁 Estrutura do Projeto

```
CAPTA-LEADS/
├── server.js                 ← Backend integrado
├── console.html              ← Interface principal
├── leads-hunter.js           ← Busca de leads
├── email-sender.js           ← Envio de emails
├── landing-builder.js        ← Criador de landing pages
├── config.js                 ← Configurações e templates
├── package.json
├── .env.example
├── README.md                 ← Este arquivo
├── data/                     ← Dados salvos (JSON)
├── uploads/                  ← Imagens e mídia
└── .gitignore
```

---

## 🔧 APIs & Endpoints

### Lead Hunting
```
POST   /api/leads/search          - Buscar leads
GET    /api/leads/list            - Listar leads
POST   /api/leads/enrich          - Enriquecer lead
GET    /api/leads/export          - Exportar (CSV/JSON)
```

### Email Campaigns
```
POST   /api/campaigns/create      - Criar campanha
GET    /api/campaigns/list        - Listar campanhas
POST   /api/campaigns/send        - Enviar campanha
POST   /api/campaigns/test-email  - Testar email
GET    /api/campaigns/settings    - Obter configurações
POST   /api/campaigns/settings    - Atualizar configurações
```

### Landing Pages
```
POST   /api/pages/create          - Criar página
GET    /api/pages/list            - Listar páginas
POST   /api/pages/add-section     - Adicionar seção
POST   /api/pages/update-section  - Atualizar seção
POST   /api/pages/delete-section  - Deletar seção
GET    /api/pages/preview         - Visualizar página
GET    /api/pages/export          - Exportar página
```

### Configuração
```
GET    /api/config/industries     - Obter indústrias
GET    /api/config/templates      - Obter templates
```

---

## 🎬 Como Usar

### 1️⃣ Buscar Leads
1. Acesse **Buscar Leads**
2. Digite palavras-chave (ex: "fundação documentário")
3. Selecione localização e tipo
4. Clique em **Buscar**
5. Selecione os leads que interessam
6. Clique em **Adicionar** para cada lead

### 2️⃣ Criar Campanha de Email
1. Acesse **Campanhas**
2. Preencha o assunto e corpo do email
3. Use personalizações: {nome}, {empresa}
4. Configure email de origem
5. Clique em **Criar Campanha**
6. Clique em **Enviar** para enviar aos leads

### 3️⃣ Criar Landing Page
1. Acesse **Landing Pages**
2. Preencha título, indústria, SEO
3. Clique em **Criar Landing Page**
4. Clique em **Ver** para editar
5. Adicione seções (Hero, Features, etc)
6. Publique!

---

## 🔑 Configurar APIs (Opcional)

### Hunter.io (Busca de Emails)
1. Vá em https://hunter.io
2. Crie conta grátis
3. Copie sua API key
4. Adicione em **.env**: `HUNTER_API_KEY=sua_chave`

### Clearbit (Dados Corporativos)
1. Vá em https://clearbit.com
2. Crie conta grátis
3. Copie sua API key
4. Adicione em **.env**: `CLEARBIT_API_KEY=sua_chave`

### Resend (Email)
1. Vá em https://resend.com
2. Crie conta grátis (100 emails/dia)
3. Gere API key
4. Adicione em **.env**: `RESEND_API_KEY=re_sua_chave`

### Claude API (IA Sugestões)
1. Vá em https://console.anthropic.com
2. Gere API key
3. Adicione em **.env**: `ANTHROPIC_API_KEY=sk_sua_chave`

---

## 💡 Exemplos de Uso

### 📽️ Procurar Fundações para Documentários
```
Palavras-chave: "documentary grant, film funding"
Localização: "International"
Tipo: "Fundação"
```

### 🏥 Procurar Clínicas Médicas
```
Palavras-chave: "clinic, medical center"
Localização: "São Paulo, Brasil"
Tipo: "Negócio"
```

### 💼 Procurar Agências de Marketing
```
Palavras-chave: "marketing agency, digital"
Localização: "Miami, USA"
Tipo: "Negócio"
```

---

## 🐛 Troubleshooting

### "Porta 3000 em uso"
```bash
killall node
npm start
```

### "Console em branco"
- Recarregue (Cmd+R)
- Abra console (F12) e veja erros

### "Email não envia"
- Configure `RESEND_API_KEY` em `.env`
- Teste com "Testar Email"
- Verifique configurações de email

### "Nenhum lead encontrado"
- Tente palavras-chave diferentes
- Especifique a localização
- Verifique se APIs estão configuradas

---

## 📊 Limites Gratuitos

| Serviço | Limite | Upgrade |
|---------|--------|---------|
| Hunter.io | 100 buscas/mês | Planos pagos |
| Clearbit | 100 empresas/mês | Planos pagos |
| Resend | 100 emails/dia | Planos pagos |
| Google | 100 queries/dia | Planos pagos |

---

## 🤝 Stack Técnico

- **Backend:** Node.js + HTTP nativo
- **Frontend:** HTML5 + CSS3 + JavaScript vanilla
- **Armazenamento:** JSON Files (local)
- **APIs:** Hunter.io, Clearbit, Resend
- **Deploy:** Localhost, VPS, Heroku

---

## 📄 Licença & Contato

**Desenvolvido por:** Dan Rubio  
**Versão:** 2.0.0  
**Lançamento:** Maio 2026  
**Email:** danrubio_2000@yahoo.com  
**Site:** https://artver.com.br

---

## 🎁 Roadmap

- [ ] Integração com Claude API para IA sugestões
- [ ] Automação de follow-ups
- [ ] CRM integrado
- [ ] Dashboard com gráficos
- [ ] Integração com Zapier/Make
- [ ] App mobile
- [ ] Multi-usuários/Teams
- [ ] Webhooks

---

**Tudo pronto! Comece a gerar leads agora! 🚀**
