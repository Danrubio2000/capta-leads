# 🎯 Guia Completo: Conectar Hunter.io para Leads Reais

Bem-vindo! Este guia vai te ajudar a configurar o CAPTA LEADS para buscar **leads reais** usando a API do Hunter.io.

---

## ⚡ Resumo Rápido

1. **Crie conta no Hunter.io** (5 minutos)
2. **Configure a API Key** (1 minuto)
3. **Reinicie o servidor** (30 segundos)
4. **Teste buscas reais** (instantâneo)

---

## 📋 Pré-requisitos

Você já deve ter feito:
- ✅ Instalado Node.js
- ✅ Executado `npm install`
- ✅ Servidor rodando com `npm start`

Se não fez, veja `SETUP-LOCAL.md`

---

## 🔐 Passo 1: Obter API Key do Hunter.io

### 1.1 Crie sua conta

1. Acesse: **https://hunter.io/users/sign_up**
2. Preencha:
   - Email
   - Senha
   - Nome (seu ou da empresa)
3. Clique: **Sign up**

### 1.2 Ative sua conta

1. Verifique seu email
2. Clique no link de confirmação
3. Complete seu perfil se solicitado

### 1.3 Obtenha a API Key

1. Faça login em: **https://hunter.io/account/api**
2. Você verá sua **API Key** (uma string longa)
3. **Copie** a API Key (não compartilhe!)

Exemplo de API Key:
```
0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p
```

---

## ✅ Passo 2: Configurar .env

### 2.1 Copiar arquivo de exemplo

No terminal, na pasta do projeto:

```bash
# Mac/Linux:
cp .env.example .env

# Windows (PowerShell):
Copy-Item .env.example .env

# Windows (CMD):
copy .env.example .env
```

### 2.2 Editar .env

Abra o arquivo `.env` que foi criado:

**Antes:**
```
HUNTER_API_KEY=seu_hunter_api_key_aqui
```

**Depois:**
```
HUNTER_API_KEY=0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p
```

Salve o arquivo!

---

## 🚀 Passo 3: Reiniciar o servidor

Se o servidor está rodando:

```bash
# No terminal onde o servidor está:
Ctrl + C
```

Você verá:
```
^C
```

Inicie novamente:

```bash
npm start
```

Você verá na tela:

```
✅ HUNTER_API_KEY configurado - Usando Hunter.io API real! 🎉
```

Perfeito! ✅

---

## 🧪 Passo 4: Testar

### 4.1 Via Dashboard

1. Abra: **http://localhost:3000/dashboard**
2. Clique em: **🎯 Buscar Leads**
3. Digite:
   - Keywords: `dentista` (ou seu negócio)
   - Localização: `São Paulo` (ou sua cidade)
4. Clique: **🔍 Buscar Leads**

Você verá **leads REAIS** do Hunter.io! 🎉

### 4.2 Via API diretamente

Abra em seu navegador:

```
http://localhost:3000/api/leads/search?keywords=dentista&location=São Paulo
```

Você receberá JSON com os leads encontrados:

```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "name": "Dr. João Silva",
      "email": "joao@clinicasilva.com.br",
      "website": "https://clinicasilva.com.br",
      "score": 85,
      "phone": "(11) 99876-5432",
      "specialty": "Implantologia",
      "businessType": "Dentista",
      "verified": true
    },
    // ... mais leads
  ],
  "source": "🔗 Hunter.io API"
}
```

---

## 🎯 Usando Leads Reais

Depois de buscar leads reais:

### Salvar leads

1. Clique **➕ Salvar** para cada lead que quiser
2. Os leads são salvos no seu projeto
3. Veja em **📊 Dashboard** → seção "Leads Encontrados"

### Exportar leads

1. Clique **📥 Baixar CSV** ou **📥 Baixar JSON**
2. Use em suas campanhas de email
3. Envie propostas para os contatos

### Criar campanha de email

1. Vá em: **📧 Campanhas**
2. Clique: **✉️ Criar Campanha**
3. Digite:
   - Assunto
   - Corpo (use {nome}, {email}, {empresa} para personalizações)
4. Salve a campanha

---

## 💡 Dicas Importantes

### Sobre a API Key

- ✅ Mantenha segura - não compartilhe
- ✅ Pode regenerar em https://hunter.io/account/api a qualquer momento
- ✅ Nunca faça commit do `.env` no Git
- ✅ Use `.gitignore` para proteger

Verifique seu `.gitignore`:

```bash
cat .gitignore
```

Deve conter:
```
.env
node_modules/
```

### Plano gratuito do Hunter.io

- ✅ **100 buscas/mês** gratuitas
- ✅ Perfeito para testes
- ✅ Buscas sem limite são premium ($29+)
- ✅ Veja planos em: https://hunter.io/pricing

### Buscas manuais no Hunter.io

Se quiser testar manualmente:

1. Acesse: **https://hunter.io**
2. Digite uma empresa (ex: "Apple")
3. Clique "Search"
4. Veja emails encontrados

Isso usa sua API Key também!

---

## 🔄 Qualquer coisa deu errado?

### Erro: "HUNTER_API_KEY not configured"

**Solução:**
1. Verifique se `.env` existe
2. Verifique se tem `HUNTER_API_KEY=...` dentro
3. Reinicie o servidor: `npm start`

### Erro: "Hunter.io API failed"

**Possíveis causas:**
1. API Key inválida - copia novamente de https://hunter.io/account/api
2. Limite de buscas atingido - espere até amanhã (buscas reseteiam diariamente)
3. Conexão com internet - verifique sua conexão

### Vendo apenas "Mock Data"

**Significa que:**
- HUNTER_API_KEY não está configurado
- Ou está rodando sem `.env`
- Siga os Passos 1-3 acima

---

## 🎉 Sucesso!

Se você conseguiu:
- ✅ Criar conta Hunter.io
- ✅ Configurar API Key
- ✅ Ver "HUNTER_API_KEY configurado" ao iniciar
- ✅ Buscar e ver leads REAIS no dashboard

**Parabéns! 🎉 Você tem CAPTA LEADS 100% funcional!**

---

## 📞 Próximos passos

Depois de conectar Hunter.io:

1. **Teste com seus negócios**
   - Busque leads para seus produtos/serviços
   - Salve os melhores leads

2. **Configure email marketing**
   - Crie campanhas personalizadas
   - Prepare templates de proposta

3. **Customize o app**
   - Mude cores para sua marca
   - Adicione logo
   - Configure templates

4. **Deploy na nuvem**
   - Publicar em Vercel
   - Configurar banco de dados
   - Usar em produção

---

## 🔗 Recursos úteis

- **Hunter.io Docs**: https://hunter.io/api/documentation
- **Pricing Hunter**: https://hunter.io/pricing
- **CAPTA LEADS GitHub**: https://github.com/Danrubio2000/capta-leads
- **Support CAPTA**: danielrubio@captaleads.com

---

## ✨ Dúvidas?

Este guia cobrir 99% dos casos. Se algo não funcionou:

1. **Verifique o console:**
   - Terminal onde rodou `npm start`
   - Procure mensagens de erro

2. **Teste a API Key:**
   - Acesse: https://hunter.io/account/api
   - Sua chave está lá?

3. **Reinicie tudo:**
   ```bash
   npm start
   ```

4. **Limpe cache:**
   ```bash
   # Feche o navegador completamente
   # Abra novamente
   # Acesse http://localhost:3000/dashboard
   ```

---

**Bom teste! 🚀**

Qualquer dúvida, é só chamar.
