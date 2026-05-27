# 🧪 Guia de Testes - CAPTA LEADS

## 1. LANDING PAGE - Teste de Funcionalidades

### 1.1 - Header & Navegação
- [ ] Logo "🎯 CAPTA LEADS" visível
- [ ] Seletor de idioma funciona (Português 🇧🇷, Espanhol 🇪🇸, Inglês 🇺🇸, Francês 🇫🇷)
- [ ] Mudar idioma atualiza TODO o texto da página
- [ ] Idioma persiste ao recarregar (localStorage)

### 1.2 - Hero Section
- [ ] Título: "Encontre novos **contatos** para seus produtos ou serviços"
- [ ] Subtítulo em português visível e correto
- [ ] Descrição explicando o produto

### 1.3 - Vídeo Modal (CRÍTICO)
- [ ] Clique no ▶️ abre modal **NA MESMA PÁGINA** (não nova janela)
- [ ] Modal tem fundo escuro (overlay)
- [ ] Botão × fecha o modal
- [ ] ESC fecha o modal
- [ ] Clicar fora do conteúdo fecha o modal
- [ ] Vídeo começa na cena 1 (Apresentação)
- [ ] Controles funcionam:
  - ⏸ Play/Pause alterna
  - ◀ Volta para cena anterior
  - ▶ Vai para próxima cena
  - Pontos (dots) permitem pular entre cenas
  - Barra de progresso é interativa
- [ ] Teclado funciona:
  - Space = Play/Pause
  - Seta direita = próxima cena
  - Seta esquerda = cena anterior
- [ ] Botão "Voltar para Landing Page ←" na última cena fecha modal
- [ ] Sem erros na Console (F12)

### 1.4 - Seções da Página
- [ ] Features (6 itens) todos visíveis
- [ ] Use Cases (6 itens) todos visíveis
- [ ] Pricing: Preço R$80 visível, botão "Comprar Agora" azul

### 1.5 - Botão "Comprar Agora"
- [ ] Abre link Mercado Pago: https://mpago.la/1py3Tgc
- [ ] Abre em nova aba (não quebra navegação)

### 1.6 - Footer
- [ ] Texto de copyright visível
- [ ] Links funcionam (se houver)

---

## 2. DASHBOARD - Teste de Configuração Fácil

Acesse: https://capta-leads.vercel.app/dashboard

### 2.1 - Header do Dashboard
- [ ] Logo CAPTA LEADS visível
- [ ] Cor azul (#0066CC) aplicada no header
- [ ] Menu/navegação visível

### 2.2 - Seções Principais
- [ ] Painel de controle visível
- [ ] Formulários de configuração acessíveis
- [ ] Campos obrigatórios marcados

### 2.3 - Fluxo de Onboarding (para novo cliente)
1. [ ] Cliente consegue entrar no dashboard
2. [ ] Interface é intuitiva
3. [ ] Instruções claras sobre o que fazer
4. [ ] Não há erros na console
5. [ ] Tempo para configurar: _____ minutos (você cronometra)

---

## 3. RESPONSIVIDADE

Teste em diferentes tamanhos de tela:

### 3.1 - Desktop (1920px)
- [ ] Layout correto
- [ ] Texto legível
- [ ] Imagens não estão esticadas

### 3.2 - Tablet (768px)
- [ ] Layout adaptativo
- [ ] Botões clicáveis (não pequenos demais)
- [ ] Vídeo modal redimensiona corretamente

### 3.3 - Mobile (375px)
- [ ] Header não fica muito pequeno
- [ ] Seletor de idioma acessível
- [ ] Botão de vídeo toca a tela
- [ ] Modal vídeo ajusta ao tamanho da tela

---

## 4. VERIFICAÇÃO DE CONSOLE (F12 → Console)

- [ ] Sem erros vermelhos (❌)
- [ ] Sem avisos críticos (⚠️)
- [ ] Mensagem de debug "Opening video modal" aparece ao clicar ▶️
- [ ] Mensagem "Video button clicked - opening modal" aparece
- [ ] Nenhuma exceção JavaScript não tratada

**Copie qualquer erro da console aqui:**
```
[Cole aqui]
```

---

## 5. TESTE DE PERFORMANCE

- [ ] Página carrega em menos de 3 segundos
- [ ] Vídeo modal abre suavemente (sem lag)
- [ ] Transições animadas são fluidas
- [ ] Não há freezing ao mudar idioma

---

## 6. TESTE DO CLIENTE (Simulação)

**Cenário:** Um novo cliente descobre o link e quer:
1. Entender o que é CAPTA LEADS
2. Ver como funciona
3. Comprar acesso
4. Começar a usar

**Teste:**
1. Abra a página fresh (sem saber nada)
2. Cronometre quanto tempo leva para:
   - [ ] Entender o produto: _____ segundos
   - [ ] Decidir se quer testar: _____ minutos
   - [ ] Completar o fluxo até o Mercado Pago: _____ minutos
3. [ ] O call-to-action (botão de compra) é claro
4. [ ] O preço (R$80) é atrativo
5. [ ] Não há dúvidas sobre o que você está comprando

**Feedback do teste:**
```
[Escreva suas impressões]
```

---

## 7. CHECKLIST FINAL

- [ ] Landing page funciona 100%
- [ ] Vídeo abre no modal (não em outra janela)
- [ ] Todas as 4 línguas funcionam
- [ ] Dashboard é fácil de usar
- [ ] Sem erros críticos na console
- [ ] Responsivo em mobile/tablet/desktop
- [ ] Botão de compra leva ao Mercado Pago

---

## 📝 Notas de Teste

Data do teste: _________
Navegador: ____________
Sistema Operacional: ____________
Observations:
```
[Espaço para anotações]
```

---

Se encontrar algum problema, anote aqui e refira o número (ex: "1.3 - Vídeo abre em nova janela")
