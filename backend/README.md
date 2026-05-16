# CAPTA LEADS - Backend Server

Backend Node.js para o sistema de marketing automation CAPTA LEADS.

## ✨ Funcionalidades

- ✅ Busca de leads em massa (100-200 por busca)
- ✅ Criação e gerenciamento de campanhas
- ✅ Envio de emails em massa
- ✅ Criação de landing pages
- ✅ Dashboard com analytics

## 📋 Requisitos

- Node.js 16+
- npm ou yarn

## 🚀 Instalação Rápida

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar ambiente
```bash
cp .env.example .env
# Edita .env com suas chaves (opcional para teste)
```

### 3. Iniciar servidor
```bash
npm start
```

Servidor rodará em: **http://localhost:3000**

## 🔌 Endpoints Disponíveis

### Leads
- `POST /api/leads/search` - Buscar leads
  ```json
  {
    "keywords": "restaurantes",
    "location": "São Paulo",
    "type": "business"
  }
  ```

### Campanhas
- `POST /api/campaigns/create` - Criar campanha
- `GET /api/campaigns/list` - Listar campanhas
- `POST /api/campaigns/send` - Enviar emails
- `POST /api/campaigns/test-email` - Testar email

### Landing Pages
- `POST /api/pages/create` - Criar página
- `GET /api/pages/list` - Listar páginas

### Health Check
- `GET /api/health` - Verificar status do servidor

## 🔐 Configurações Opcionais

### Hunter.io (Busca Real de Leads)
1. Cria conta em https://hunter.io
2. Copia a API key
3. Coloca em `.env`: `HUNTER_API_KEY=your_key`

### Mailtrap (Email Testing)
1. Cria conta em https://mailtrap.io
2. Copia as credenciais SMTP
3. Coloca em `.env`:
   ```
   EMAIL_HOST=smtp.mailtrap.io
   EMAIL_PORT=465
   EMAIL_USER=seu_usuario
   EMAIL_PASS=sua_senha
   ```

## 📱 Usar com console.html

O `console.html` já está configurado para usar este backend:
- API URL: `http://localhost:3000/api`

Quando o servidor está rodando, todas as buscas, campanhas e landing pages funcionam!

## 🧪 Testar

```bash
# Health check
curl http://localhost:3000/api/health

# Buscar leads
curl -X POST http://localhost:3000/api/leads/search \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": "dentista",
    "location": "São Paulo"
  }'
```

## 📊 Estrutura de Dados

### Lead
```json
{
  "name": "Carlos Silva",
  "email": "carlos.silva@gmail.com",
  "website": "https://www.silva.com.br",
  "score": 85
}
```

### Campaign
```json
{
  "id": "camp_1234567890",
  "subject": "Promoção especial",
  "body": "Conteúdo do email...",
  "fromEmail": "noreply@captaleads.com",
  "recipients": 150,
  "status": "sent"
}
```

## 🚦 Troubleshooting

**Erro: "Cannot find module 'express'"**
- Solução: `npm install`

**Erro: "Port 3000 already in use"**
- Mude a porta em `.env`: `PORT=3001`

**Leads não aparecem no console.html**
- Certifique que servidor está rodando: `npm start`
- Verifique se está em localhost:3000
- Abra F12 (DevTools) e veja erros no Console

## 📝 Próximos Passos

1. Integrar com banco de dados (MongoDB/PostgreSQL)
2. Adicionar autenticação
3. Integrar com Hunter.io para busca real
4. Integrar com Resend/SendGrid para emails reais
5. Deploy em produção (Heroku/Railway/Vercel)

## 📞 Suporte

Para bugs ou sugestões, abra uma issue no GitHub!
