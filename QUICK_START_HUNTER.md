# ⚡ QUICK START: Hunter.io Integration (5 minutos)

Seu CAPTA LEADS agora está pronto para buscar **leads REAIS** do Hunter.io! 

---

## 🎯 O que mudou?

✅ **Antes:** Apenas dados simulados/fake
✅ **Agora:** Conectado ao Hunter.io para leads REAIS!

---

## 🚀 3 Passos para Começar

### PASSO 1: Criar conta Hunter.io (2 minutos)

Acesse: https://hunter.io/users/sign_up

- Email: seu email
- Senha: escolha uma
- Clique: Sign up

Confirme seu email (clique no link que receberá)

### PASSO 2: Obter API Key (1 minuto)

1. Faça login em: https://hunter.io/account/api
2. Copie sua **API Key** (é um código longo)

### PASSO 3: Configurar (1 minuto)

**Na pasta do projeto, crie arquivo `.env`:**

```bash
cp .env.example .env
```

**Abra `.env` e preencha:**

```
HUNTER_API_KEY=cole_sua_chave_aqui
```

**Reinicie o servidor:**

```bash
npm start
```

Você verá:
```
✅ HUNTER_API_KEY configurado - Usando Hunter.io API real! 🎉
```

---

## ✅ Testar

1. Abra: http://localhost:3000/dashboard
2. Clique: **🎯 Buscar Leads**
3. Digite: `dentista` ou seu negócio
4. Clique: **🔍 Buscar Leads**

🎉 **Você verá LEADS REAIS do Hunter.io!**

---

## 📚 Documentação Completa

Para mais detalhes, veja:

- **HUNTER_SETUP.md** - Guia completo com screenshots e dicas
- **SETUP-LOCAL.md** - Como rodar o servidor localmente
- **README.md** - Visão geral do projeto

---

## 🆘 Problema?

**Erro: "HUNTER_API_KEY not configured"**

- Verifique se `.env` existe
- Verifique se tem `HUNTER_API_KEY=...` dentro
- Reinicie: `npm start`

**Vendo apenas "Mock Data"**

- API Key não configurado corretamente
- Siga PASSO 2 acima

**Erro na busca**

- Verifique se tem internet
- Teste: https://hunter.io/account/api (sua chave está lá?)
- API Key expirada? Regenere em https://hunter.io/account/api

---

## 🎉 Pronto!

Seu CAPTA LEADS está 100% funcional com leads reais! 

**Próximos passos:**
1. ✅ Busque leads para seus negócios
2. ✅ Salve os melhores leads
3. ✅ Crie campanhas de email
4. ✅ Customize o app com sua marca

**Bom teste! 🚀**
