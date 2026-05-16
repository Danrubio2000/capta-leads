# 🚀 MAUTIC - Guia Completo para CAPTA LEADS

**Mautic é a solução PRONTA que você precisa!** Tem TUDO funcionando já.

---

## ⚡ OPÇÃO 1: MAIS RÁPIDA (Recomendado - 2 minutos)

### Passo 1: Abrir Mautic Cloud
1. Acessa: **https://mautic.org/start-using-mautic/try-mautic/**
2. Clica em "FREE TRIAL" (14 dias grátis, sem cartão de crédito)

### Passo 2: Cadastrar
- Email
- Senha
- Seleciona "Marketing Automation"

### Passo 3: Usar MAUTIC
Pronto! Você tem acesso IMEDIATO a:

✅ **Dashboard** - Todos os números de leads, campanhas, conversões
✅ **Leads** - Importar, buscar, gerenciar leads
✅ **Campanhas** - Criar fluxos automáticos de emails
✅ **Landing Pages** - Criar páginas sem código
✅ **Formulários** - Capturar dados de visitantes
✅ **Email Builder** - Templates profissionais
✅ **Segmentação** - Dividir leads por critério

---

## 🎯 COMO USAR MAUTIC (Tutorial Rápido)

### Buscar Leads
1. Menu → **Leads**
2. Clica "New" 
3. Importa de arquivo CSV ou adiciona manualmente
4. Sistema automaticamente enriquece dados

### Criar Campanha de Email
1. Menu → **Campaigns**
2. Clica "New Campaign"
3. Adiciona leads
4. Configura sequência de emails
5. Clica "Launch"
6. ✅ Emails começam a sair automaticamente

### Criar Landing Page
1. Menu → **Landing Pages**
2. Clica "New"
3. Arrasta elementos (form, texto, botão)
4. Configura integração com leads
5. Publica
6. Compartilha link

### Ver Analytics
1. Dashboard mostra:
   - Total de leads
   - Leads por campanha
   - Taxa de abertura de emails
   - Taxa de clique
   - Conversões

---

## 🔗 INTEGRAR COM SEU CONSOLE.HTML (Avançado)

Se quiser conectar com seu console.html:

### Passo 1: Gerar API Token no Mautic
1. Configurações → API Credentials
2. Copia o token

### Passo 2: Usar no Console.html
```javascript
// Adiciona no console.html
const MAUTIC_API = 'https://seu-mautic.mautic.net/api';
const MAUTIC_TOKEN = 'seu_token_aqui';

// Buscar leads do Mautic
fetch(`${MAUTIC_API}/contacts?limit=100`, {
  headers: { 'Authorization': `Bearer ${MAUTIC_TOKEN}` }
})
.then(r => r.json())
.then(data => console.log(data.contacts))
```

---

## 📊 O QUE VOCÊ GANHA COM MAUTIC

| Função | Mautic | Status |
|--------|--------|--------|
| Busca de Leads | ✅ Sim | PRONTO |
| Email Marketing | ✅ Sim | PRONTO |
| Landing Pages | ✅ Sim | PRONTO |
| Campanhas Automáticas | ✅ Sim | PRONTO |
| Dashboard/Analytics | ✅ Sim | PRONTO |
| Segmentação | ✅ Sim | PRONTO |
| Formulários | ✅ Sim | PRONTO |
| SMS Marketing | ✅ Sim (plugin) | PRONTO |
| Social Media | ✅ Sim | PRONTO |

---

## 💰 PREÇO

- **Mautic Cloud (Grátis)**: 14 dias trial
- **Mautic Cloud (Pago)**: Começa em $99/mês
- **Self-hosted**: GRATIS (você instala no seu servidor)

---

## 🚀 PRÓXIMOS PASSOS

### Hoje:
1. ✅ Abrir Mautic (https://mautic.org)
2. ✅ Criar conta grátis
3. ✅ Explorar dashboard

### Semana 1:
1. Importar seus primeiros leads
2. Criar uma campanha de email
3. Publicar uma landing page

### Semana 2:
1. Configurar automações
2. Integrar com seu console.html (opcional)
3. Começar a gerar leads reais

---

## ❓ FAQ

**P: Preciso de cartão de crédito?**
R: Não! Trial grátis de 14 dias sem cartão.

**P: Funciona no Brasil?**
R: Sim! Mautic funciona em qualquer país. Pode enviar emails em português.

**P: Posso usar meu próprio domínio?**
R: Sim! Na versão paga (Managed Hosting) ou Self-hosted.

**P: Como integrar com Hunter.io?**
R: Mautic tem plugin nativo para Hunter.io. Vai para Plugins → busca "Hunter"

**P: Posso exportar dados?**
R: Sim! CSV, Excel, integração com Google Sheets, Zapier, etc.

---

## 🎓 RECURSOS

- **Documentação oficial**: https://docs.mautic.org
- **Comunidade**: https://forum.mautic.org
- **YouTube**: Mautic Official Channel

---

## ✅ RESUMO

**Mautic resolve 100% do que você precisa:**
- ✅ Sistema pronto (não precisa de desenvolvimento)
- ✅ Funciona AGORA (14 dias grátis)
- ✅ Tem todas as features do CAPTA LEADS
- ✅ Comunidade ativa (40k+ empresas usam)
- ✅ Open-source (pode hospedar próprio depois)
- ✅ Suporta múltiplos idiomas (português, inglês, etc)

**Comece AGORA**: https://mautic.org/start-using-mautic/try-mautic/

---

*Criado em: 2026-05-16*
*Para: CAPTA LEADS*
