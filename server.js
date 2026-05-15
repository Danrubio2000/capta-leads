#!/usr/bin/env node
/**
 * CAPTA LEADS - Backend Server
 * Integrated Lead Generation, Email Marketing & Landing Page Builder
 * http://localhost:3000
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize with defaults
let SERVER_CONFIG = { DATA_DIR: "./data", UPLOADS_DIR: "./uploads", PORT: 3000 };

// Initialize modules with dynamic imports and error handling
let LeadsHunter, EmailSender, LandingPageBuilder, StripeManager, Anthropic;
let INDUSTRIES, EMAIL_TEMPLATES;
let leadsHunter, emailSender, landingBuilder, claude, stripeManager;

async function initializeModules() {
  try {
    const mod1 = await import("./leads-hunter.js");
    LeadsHunter = mod1.default;
  } catch (e) {
    console.warn("⚠️ LeadsHunter import failed:", e.message);
  }

  try {
    const mod2 = await import("./email-sender.js");
    EmailSender = mod2.default;
  } catch (e) {
    console.warn("⚠️ EmailSender import failed:", e.message);
  }

  try {
    const mod3 = await import("./landing-builder.js");
    LandingPageBuilder = mod3.default;
  } catch (e) {
    console.warn("⚠️ LandingPageBuilder import failed:", e.message);
  }

  try {
    const mod4 = await import("./stripe-manager.js");
    StripeManager = mod4.default;
  } catch (e) {
    console.warn("⚠️ StripeManager import failed:", e.message);
  }

  try {
    const mod5 = await import("./config.js");
    INDUSTRIES = mod5.INDUSTRIES || [];
    EMAIL_TEMPLATES = mod5.EMAIL_TEMPLATES || [];
    SERVER_CONFIG = mod5.SERVER_CONFIG || { DATA_DIR: "./data", UPLOADS_DIR: "./uploads", PORT: 3000 };
  } catch (e) {
    console.warn("⚠️ Config import failed:", e.message);
    INDUSTRIES = [];
    EMAIL_TEMPLATES = [];
    SERVER_CONFIG = { DATA_DIR: "./data", UPLOADS_DIR: "./uploads", PORT: 3000 };
  }

  try {
    const mod6 = await import("@anthropic-ai/sdk");
    Anthropic = mod6.default;
  } catch (e) {
    console.warn("⚠️ Anthropic SDK import failed:", e.message);
  }

  // Initialize instances
  if (LeadsHunter) {
    try {
      leadsHunter = new LeadsHunter({
        hunterKey: process.env.HUNTER_API_KEY,
        clearbitKey: process.env.CLEARBIT_API_KEY
      });
    } catch (e) {
      console.warn("⚠️ LeadsHunter initialization failed:", e.message);
    }
  }

  if (EmailSender) {
    try {
      emailSender = new EmailSender({
        resendKey: process.env.RESEND_API_KEY,
        fromEmail: process.env.FROM_EMAIL || "noreply@captaleads.com",
        fromName: process.env.FROM_NAME || "CAPTA Leads"
      });
    } catch (e) {
      console.warn("⚠️ EmailSender initialization failed:", e.message);
    }
  }

  if (LandingPageBuilder) {
    try {
      landingBuilder = new LandingPageBuilder({
        industry: process.env.DEFAULT_INDUSTRY || "generic"
      });
    } catch (e) {
      console.warn("⚠️ LandingPageBuilder initialization failed:", e.message);
    }
  }

  if (Anthropic) {
    try {
      claude = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY || "sk-ant-test"
      });
    } catch (e) {
      console.warn("⚠️ Claude initialization failed:", e.message);
    }
  }

  if (StripeManager) {
    try {
      stripeManager = new StripeManager(
        process.env.STRIPE_SECRET_KEY,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (e) {
      console.warn("⚠️ StripeManager initialization failed:", e.message);
    }
  }

  // Create data directories
  const DATA_DIR = SERVER_CONFIG.DATA_DIR;
  const UPLOADS_DIR = SERVER_CONFIG.UPLOADS_DIR;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function saveJSON(file, data) {
  try {
    fs.writeFileSync(path.join(SERVER_CONFIG.DATA_DIR || "./data", file), JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Error saving JSON:", e.message);
  }
}

function loadJSON(file) {
  const filepath = path.join(SERVER_CONFIG.DATA_DIR || "./data", file);
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf8"));
  } catch {
    return null;
  }
}

function json(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// API ROUTES
// ═══════════════════════════════════════════════════════════════

async function handleAPI(req, res, url, method) {
  const parts = url.pathname.replace("/api/", "").split("/").filter(Boolean);
  const endpoint = parts[0];
  const action = parts[1];

  // 🎯 LEADS HUNTING
  if (endpoint === "leads") {
    if (action === "search" && method === "POST" && leadsHunter) {
      const body = await parseBody(req);
      try {
        const leads = await leadsHunter.searchLeads(
          body.keywords,
          body.location || "International",
          body.type || "business"
        );
        return json(res, { success: true, leads });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "list" && method === "GET" && leadsHunter) {
      return json(res, { leads: leadsHunter.results || [] });
    }

    if (action === "enrich" && method === "POST" && leadsHunter) {
      const body = await parseBody(req);
      try {
        const enriched = await leadsHunter.enrichLead(body.email, body.domain);
        return json(res, { success: true, enriched });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "export" && method === "GET" && leadsHunter) {
      const format = new URL(req.url, `http://${req.headers.host}`).searchParams.get("format") || "csv";
      if (format === "json") {
        return json(res, { data: leadsHunter.exportToJSON ? leadsHunter.exportToJSON() : [] });
      } else {
        res.writeHead(200, { "Content-Type": "text/csv" });
        return res.end(leadsHunter.exportToCSV ? leadsHunter.exportToCSV() : "");
      }
    }
  }

  // 📧 EMAIL CAMPAIGNS
  if (endpoint === "campaigns") {
    if (action === "create" && method === "POST" && emailSender) {
      const body = await parseBody(req);
      try {
        const campaign = emailSender.createCampaign(body);
        saveJSON("campaigns.json", emailSender.campaigns);
        return json(res, { success: true, campaign });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "list" && method === "GET" && emailSender) {
      return json(res, { campaigns: emailSender.listCampaigns ? emailSender.listCampaigns() : [] });
    }

    if (action === "send" && method === "POST" && emailSender) {
      const body = await parseBody(req);
      try {
        const result = await emailSender.sendCampaign(body.campaignId, body.leads);
        saveJSON("campaigns.json", emailSender.campaigns);
        return json(res, { success: true, result });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "test-email" && method === "POST" && emailSender) {
      const body = await parseBody(req);
      try {
        const result = await emailSender.testEmail(body.email);
        return json(res, { success: result.success, ...result });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "settings" && method === "GET" && emailSender) {
      return json(res, { settings: emailSender.getSettings ? emailSender.getSettings() : {} });
    }

    if (action === "settings" && method === "POST" && emailSender) {
      const body = await parseBody(req);
      try {
        const updated = emailSender.updateSettings(body);
        return json(res, { success: true, settings: updated });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }
  }

  // 🎨 LANDING PAGES
  if (endpoint === "pages") {
    if (action === "create" && method === "POST" && landingBuilder) {
      const body = await parseBody(req);
      try {
        const page = landingBuilder.createPage(body);
        saveJSON("pages.json", landingBuilder.pages);
        return json(res, { success: true, page });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "list" && method === "GET" && landingBuilder) {
      return json(res, { pages: landingBuilder.listPages ? landingBuilder.listPages() : [] });
    }

    if (action === "add-section" && method === "POST" && landingBuilder) {
      const body = await parseBody(req);
      try {
        const section = landingBuilder.addSection(body.pageId, body.section);
        saveJSON("pages.json", landingBuilder.pages);
        return json(res, { success: true, section });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "update-section" && method === "POST" && landingBuilder) {
      const body = await parseBody(req);
      try {
        const section = landingBuilder.updateSection(
          body.pageId,
          body.sectionId,
          body.updates
        );
        saveJSON("pages.json", landingBuilder.pages);
        return json(res, { success: true, section });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "delete-section" && method === "POST" && landingBuilder) {
      const body = await parseBody(req);
      try {
        landingBuilder.deleteSection(body.pageId, body.sectionId);
        saveJSON("pages.json", landingBuilder.pages);
        return json(res, { success: true });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "preview" && method === "GET" && landingBuilder) {
      const pageId = new URL(req.url, `http://${req.headers.host}`).searchParams.get("pageId");
      try {
        const html = landingBuilder.generateHTML(pageId);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(html);
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "export" && method === "GET" && landingBuilder) {
      const pageId = new URL(req.url, `http://${req.headers.host}`).searchParams.get("pageId");
      try {
        const data = landingBuilder.exportPageJSON(pageId);
        return json(res, { success: true, data: JSON.parse(data) });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }
  }

  // 🤖 FREE LOCAL AI CHAT (100% Open Source - Zero API Costs)
  if (endpoint === "chat") {
    if (action === "message" && method === "POST") {
      const body = await parseBody(req);
      const userMessage = (body.message || "").toLowerCase().trim();

      // Intelligent local response generator - completely free, no external API needed
      const responses = {
        // Greetings
        "oi": "Olá! 👋 Bem-vindo ao CAPTA LEADS. Como posso ajudá-lo com busca de leads, campanhas de email ou criação de landing pages?",
        "olá": "Olá! 👋 Bem-vindo ao CAPTA LEADS. Como posso ajudá-lo com busca de leads, campanhas de email ou criação de landing pages?",
        "opa": "E aí! 🚀 Bem-vindo ao CAPTA LEADS. O que você gostaria de fazer?",

        // Benefits
        "benefícios": "✨ CAPTA LEADS oferece:\n• Busca de leads qualificados e verificados\n• Campanhas de email automáticas\n• Criação de landing pages profissionais\n• IA especializada para estratégias de vendas\n• Tudo sem custos de API (100% gratuito!)",
        "vantagens": "✨ CAPTA LEADS oferece:\n• Busca de leads qualificados e verificados\n• Campanhas de email automáticas\n• Criação de landing pages profissionais\n• IA especializada para estratégias de vendas\n• Tudo sem custos de API (100% gratuito!)",
        "ajuda": "🆘 Posso ajudá-lo com:\n1. **Busca de Leads** - Find prospects by industry, location, and type\n2. **Email Marketing** - Create and send targeted campaigns\n3. **Landing Pages** - Build professional pages without coding\n4. **Estratégias** - Get AI-powered sales strategies\nO que você precisa?",

        // Features
        "leads": "🎯 **Busca de Leads**\nEncontre profissionais qualificados:\n• Filtrar por indústria, especialidade, localização\n• Dados verificados e atualizados\n• Enriquecimento com informações de contato\n• Exportar em CSV ou JSON",
        "email": "📧 **Campanhas de Email**\nAutomatize suas estratégias:\n• Templates profissionais prontos para usar\n• Personalização em massa\n• Rastreamento de abertura e cliques\n• Agendamento de envios",
        "landing": "🎨 **Landing Pages**\nCrie páginas que convertem:\n• Templates responsivos\n• Construtor visual sem código\n• SEO otimizado\n• Integração com email",

        // Pricing
        "preço": "💰 **CAPTA LEADS é 100% GRATUITO!**\nNenhum custo de API, nenhuma taxa escondida.\nUse todas as funcionalidades sem limitações.",
        "valor": "💰 **CAPTA LEADS é 100% GRATUITO!**\nNenhum custo de API, nenhuma taxa escondida.\nUse todas as funcionalidades sem limitações.",
        "plano": "💰 **CAPTA LEADS é 100% GRATUITO!**\nNenhum custo de API, nenhuma taxa escondida.\nUse todas as funcionalidades sem limitações.",

        // How to
        "como": "📚 **Como Usar CAPTA LEADS:**\n1. Acesse o console\n2. Escolha a funcionalidade (Leads, Email ou Pages)\n3. Configure seus critérios\n4. Gere resultados\n5. Exporte ou implemente\n\nTem dúvida em algum passo?",
        "começar": "🚀 **Para Começar:**\n1. Acesse http://localhost:3000\n2. Explore o console\n3. Teste a busca de leads\n4. Crie uma campanha de email\n5. Construa uma landing page\n\nVocê tem alguma dúvida específica?",

        // Contact
        "contato": "📞 **Entre em Contato:**\nEmail: danrubio_2000@yahoo.com\nWhatsApp: +55 11 98765-4321\n\nEstou aqui para ajudá-lo!",
        "suporte": "🤝 **Suporte**\nSe tiver problemas:\n1. Verifique a documentação\n2. Teste as funcionalidades básicas\n3. Envie feedback\n\nEmail: danrubio_2000@yahoo.com",
      };

      // Find matching response
      let responseText = null;
      for (const [key, value] of Object.entries(responses)) {
        if (userMessage.includes(key)) {
          responseText = value;
          break;
        }
      }

      // Default response if no match found
      if (!responseText) {
        const keywords = userMessage.split(" ");
        if (keywords.some(w => ["busca", "search", "find"].includes(w))) {
          responseText = "🎯 Posso ajudá-lo com **busca de leads**! Diga-me:\n• Qual tipo de profissional você procura?\n• Qual região ou localização?\n• Alguma especialidade específica?\n\nExemplo: 'Dentistas em São Paulo' ou 'Advogados em Rio de Janeiro'";
        } else if (keywords.some(w => ["email", "campaign", "campanha"].includes(w))) {
          responseText = "📧 Para **campanhas de email**:\n1. Escolha seus leads\n2. Selecione um template\n3. Personalize a mensagem\n4. Agende e envie\n\nQual é seu público-alvo?";
        } else if (keywords.some(w => ["landing", "página", "page"].includes(w))) {
          responseText = "🎨 Para criar uma **landing page**:\n1. Escolha um template\n2. Customize o design\n3. Adicione seus conteúdos\n4. Publique em segundos\n\nQual é seu objetivo de página?";
        } else {
          responseText = "💡 Posso ajudá-lo com:\n• **Busca de Leads** - encontre seus prospects\n• **Email Marketing** - crie campanhas\n• **Landing Pages** - construa páginas\n\nO que você gostaria de fazer?";
        }
      }

      return json(res, { success: true, response: responseText });
    }
  }

  // ⚙️ CONFIGURATION
  if (endpoint === "config") {
    if (action === "industries" && method === "GET") {
      return json(res, { industries: INDUSTRIES });
    }

    if (action === "templates" && method === "GET") {
      return json(res, { templates: EMAIL_TEMPLATES });
    }
  }

  // 💳 PAYMENTS (Stripe)
  if (endpoint === "payments") {
    if (action === "checkout" && method === "POST" && stripeManager) {
      const body = await parseBody(req);
      try {
        const session = await stripeManager.createCheckoutSession(
          body.email,
          "CAPTA LEADS - Acesso Mensal",
          8000 // R$80.00 em centavos
        );
        return json(res, { success: true, sessionId: session.id, url: session.url });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "verify" && method === "POST") {
      const body = await parseBody(req);
      // In production, verify against database
      return json(res, { success: true, verified: true });
    }
  }

  // 💳 CUSTOMER REGISTRY (Paid Customers)
  if (endpoint === "customers") {
    if (action === "list" && method === "GET") {
      const customers = loadJSON("paid-customers.json") || [];
      return json(res, { customers });
    }

    if (action === "check" && method === "POST") {
      const body = await parseBody(req);
      const customers = loadJSON("paid-customers.json") || [];
      const customer = customers.find(c => c.email === body.email);
      return json(res, {
        success: true,
        isPaid: !!customer,
        customer: customer || null
      });
    }
  }

  // 🔐 WEBHOOKS
  if (endpoint === "webhooks" && action === "stripe" && method === "POST" && stripeManager) {
    const signature = req.headers["stripe-signature"];
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const event = stripeManager.verifyWebhook(body, signature);
        if (!event) {
          return json(res, { error: "Invalid signature" }, 400);
        }

        // Handle payment success
        if (event.type === "checkout.session.completed") {
          const session = event.data.object;
          console.log("Payment successful:", session.customer_email);

          // Save customer to registry
          const customers = loadJSON("paid-customers.json") || [];
          const existingCustomer = customers.find(c => c.email === session.customer_email);

          if (!existingCustomer) {
            customers.push({
              email: session.customer_email,
              product: session.metadata?.product || "Unknown",
              sessionId: session.id,
              paidAt: new Date().toISOString(),
              amount: session.amount_total / 100, // Convert cents to reais
              currency: session.currency?.toUpperCase()
            });
            saveJSON("paid-customers.json", customers);
            console.log(`✅ Customer registered: ${session.customer_email}`);
          }
        }

        return json(res, { received: true });
      } catch (error) {
        console.error("Webhook error:", error);
        return json(res, { error: error.message }, 500);
      }
    });
    return;
  }

  return json(res, { error: "Endpoint not found" }, 404);
}

// ═══════════════════════════════════════════════════════════════
// STATIC FILE SERVING
// ═══════════════════════════════════════════════════════════════

function serveStatic(res, filepath, contentType) {
  try {
    if (!fs.existsSync(filepath)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("File not found");
    }
    const content = fs.readFileSync(filepath, "utf8");
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    });
    res.end(content);
  } catch (error) {
    console.error(`Error serving ${filepath}:`, error.message);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal server error");
  }
}

// ═══════════════════════════════════════════════════════════════
// SERVER
// ═══════════════════════════════════════════════════════════════

const server = http.createServer(async (req, res) => {
  try {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      return res.end();
    }

    const url = new URL(req.url, `http://${req.headers.host}`);

    // API routes
    if (url.pathname.startsWith("/api/")) {
      return await handleAPI(req, res, url, req.method);
    }

    // Static files
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return serveStatic(res, path.join(__dirname, "console-simple.html"), "text/html");
    }

    if (url.pathname === "/tutorial.html") {
      return serveStatic(res, path.join(__dirname, "tutorial.html"), "text/html");
    }

    if (url.pathname === "/video.html") {
      return serveStatic(res, path.join(__dirname, "video.html"), "text/html");
    }

    if (url.pathname === "/landing.html") {
      return serveStatic(res, path.join(__dirname, "landing.html"), "text/html");
    }

    if (url.pathname === "/chat-widget.js") {
      return serveStatic(res, path.join(__dirname, "chat-widget.js"), "application/javascript");
    }

    if (url.pathname === "/logo.png") {
      return serveStatic(res, path.join(__dirname, "logo.png"), "image/png");
    }

    // 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  } catch (error) {
    console.error("Server error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

// Initialize modules on startup
await initializeModules();

// Export for Vercel Serverless
export default server;

// Start server locally if not in Vercel
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || SERVER_CONFIG?.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║              🚀 CAPTA LEADS v2.0.0 Iniciado                  ║
║                                                               ║
║  📱 Console: http://localhost:${PORT}                         ║
║  🎯 Busca de Leads: /api/leads                               ║
║  📧 Campanhas: /api/campaigns                                 ║
║  🎨 Landing Pages: /api/pages                                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
    `);
  });
}
// Updated: Thu May 14 16:19:51 EDT 2026
