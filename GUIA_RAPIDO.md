# 🚀 CAPTA LEADS v2.0 - Guia Rápido de Uso

## ✅ Sistema COMPLETO e CONFIGURADO

O CAPTA LEADS agora está totalmente funcional com **busca de negócios e leads** em qualquer localização!

---

## 📍 Como Usar

### 1️⃣ Acesse o Console
```
http://localhost:3000
```

### 2️⃣ Use a Busca de Negócios & Leads

**Exemplos de buscas:**

#### 🍽️ Restaurantes
- `"restaurantes"` em `"Astoria"` → 42 resultados
- `"restaurantes"` em `"São Paulo"` → 15 resultados

#### ⚖️ Advogados
- `"advogados"` em `"São Paulo"` → 16 resultados
- `"advogados"` em `"Rio de Janeiro"` → 5 resultados

#### 🔧 Oficinas Mecânicas
- `"oficinas"` em `"São Paulo"` → 15 resultados

#### 🛒 Supermercados
- `"supermercados"` em `"São Paulo"` → 6 resultados
- `"supermercados"` em `"Rio de Janeiro"` → 2 resultados

#### 🦷 Dentistas
- `"dentista"` em `"Rio de Janeiro"` → 8 resultados

#### 💇 Salões de Beleza
- `"beleza"` em `"Rio de Janeiro"` → 6 resultados

#### 🏠 Imobiliárias
- `"imobiliaria"` em `"São Paulo"` → 6 resultados

#### 🎨 Fundações de Arte
- `"arte"` em `"New York"` → 2 resultados

---

## 📊 Dados Retornados

Cada negócio/lead inclui:
- **Nome** - Nome do negócio
- **Email** - Email de contato
- **Telefone** - Telefone de contato
- **Website** - Website/domínio
- **Localização** - Localização geográfica
- **Descrição** - Descrição do negócio
- **Score** - Confiabilidade (0-100)
- **Fonte** - Origem dos dados (Base Local ou SerpAPI)

---

## 💡 Caso de Uso Prático

**Cenário: Vendedor de canetas para advogados**

1. Busca por: `"advogados"` em `"São Paulo"`
2. Recebe: Lista completa de 16+ escritórios de advocacia
3. Exporta: Todos os dados em CSV ou JSON
4. Contata: Email/telefone de cada um

---

## 🔄 Fluxo Completo

```
1. Buscar Negócios
   ↓
2. Visualizar Resultados (até 150)
   ↓
3. Adicionar à Lista (botão ➕)
   ↓
4. Exportar CSV/JSON
   ↓
5. Criar Campanha de Email
   ↓
6. Enviar Emails
```

---

## 🔑 Chaves de Configuração

### `.env`
```
# Negócio/Locais (Google Search)
SERPAPI_KEY=          # Deixar vazio = usa database local

# Emails corporativos
HUNTER_API_KEY=75dec74ce9db7038849d4c2b29b1f3ec3210b5d6

# Outras APIs (opcionais)
GOOGLE_PLACES_KEY=
CLEARBIT_API_KEY=
```

---

## 📋 Categorias Disponíveis

| Categoria | Local | Qtd |
|-----------|-------|-----|
| Restaurantes | Astoria, SP, RJ | 42+ |
| Advogados | SP, RJ, BH, Brasília, Salvador, Recife | 25+ |
| Oficinas | SP, RJ, Astoria | 18+ |
| Supermercados | SP, RJ, BH, Astoria | 10+ |
| Fundações/Arte | New York, San Francisco, Madrid, México | 10+ |
| Dentistas | RJ, SP, BH, Astoria | 8+ |
| Salões | RJ, SP, BH, Astoria | 6+ |
| Imobiliárias | SP, RJ, BH, NY | 6+ |

---

## 🚀 Próximas Melhorias

- [ ] Adicionar SerpAPI para busca em tempo real via Google
- [ ] Expandir database local com mais categorias
- [ ] Suporte para busca internacional (China, Hong Kong, Chile)
- [ ] API de enriquecimento de dados
- [ ] Integração com LinkedIn

---

## 📧 Suporte

Email: danrubio_2000@yahoo.com

---

**Última atualização:** 28 de Maio de 2026
**Versão:** 2.0.0
