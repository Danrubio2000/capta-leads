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
import LeadsHunter from "./leads-hunter.js";
import EmailSender from "./email-sender.js";
import LandingPageBuilder from "./landing-builder.js";
import StripeManager from "./stripe-manager.js";
import { INDUSTRIES, EMAIL_TEMPLATES, SERVER_CONFIG } from "./config.js";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = SERVER_CONFIG.DATA_DIR;
const UPLOADS_DIR = SERVER_CONFIG.UPLOADS_DIR;
const PORT = SERVER_CONFIG.PORT;

// Create directories
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Initialize modules
const leadsHunter = new LeadsHunter({
  hunterKey: process.env.HUNTER_API_KEY,
  clearbitKey: process.env.CLEARBIT_API_KEY
});

const emailSender = new EmailSender({
  resendKey: process.env.RESEND_API_KEY,
  fromEmail: process.env.FROM_EMAIL || "noreply@captaleads.com",
  fromName: process.env.FROM_NAME || "CAPTA Leads"
});

const landingBuilder = new LandingPageBuilder({
  industry: process.env.DEFAULT_INDUSTRY || "generic"
});

// Initialize Claude API
const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "sk-ant-test"
});

// Initialize Stripe Manager
const stripeManager = new StripeManager(
  process.env.STRIPE_SECRET_KEY,
  process.env.STRIPE_WEBHOOK_SECRET
);

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function saveJSON(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), "utf8");
}

function loadJSON(file) {
  const filepath = path.join(DATA_DIR, file);
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

  // ──────────────────────────────────────────────────────────
  // 🎯 LEADS HUNTING
  // ──────────────────────────────────────────────────────────

  if (endpoint === "leads") {
    if (action === "search" && method === "POST") {
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

    if (action === "list" && method === "GET") {
      return json(res, { leads: leadsHunter.results });
    }

    if (action === "enrich" && method === "POST") {
      const body = await parseBody(req);
      try {
        const enriched = await leadsHunter.enrichLead(body.email, body.domain);
        return json(res, { success: true, enriched });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "export" && method === "GET") {
      const format = new URL(req.url, `http://${req.headers.host}`).searchParams.get("format") || "csv";
      if (format === "json") {
        return json(res, { data: leadsHunter.exportToJSON() });
      } else {
        res.writeHead(200, { "Content-Type": "text/csv" });
        return res.end(leadsHunter.exportToCSV());
      }
    }
  }

  // ──────────────────────────────────────────────────────────
  // 📧 EMAIL CAMPAIGNS
  // ──────────────────────────────────────────────────────────

  if (endpoint === "campaigns") {
    if (action === "create" && method === "POST") {
      const body = await parseBody(req);
      const campaign = emailSender.createCampaign(body);
      saveJSON("campaigns.json", emailSender.campaigns);
      return json(res, { success: true, campaign });
    }

    if (action === "list" && method === "GET") {
      return json(res, { campaigns: emailSender.listCampaigns() });
    }

    if (action === "send" && method === "POST") {
      const body = await parseBody(req);
      try {
        const result = await emailSender.sendCampaign(body.campaignId, body.leads);
        saveJSON("campaigns.json", emailSender.campaigns);
        return json(res, { success: true, result });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "test-email" && method === "POST") {
      const body = await parseBody(req);
      try {
        const result = await emailSender.testEmail(body.email);
        return json(res, { success: result.success, ...result });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "settings" && method === "GET") {
      return json(res, { settings: emailSender.getSettings() });
    }

    if (action === "settings" && method === "POST") {
      const body = await parseBody(req);
      const updated = emailSender.updateSettings(body);
      return json(res, { success: true, settings: updated });
    }
  }

  // ──────────────────────────────────────────────────────────
  // 🎨 LANDING PAGES
  // ──────────────────────────────────────────────────────────

  if (endpoint === "pages") {
    if (action === "create" && method === "POST") {
      const body = await parseBody(req);
      const page = landingBuilder.createPage(body);
      saveJSON("pages.json", landingBuilder.pages);
      return json(res, { success: true, page });
    }

    if (action === "list" && method === "GET") {
      return json(res, { pages: landingBuilder.listPages() });
    }

    if (action === "add-section" && method === "POST") {
      const body = await parseBody(req);
      try {
        const section = landingBuilder.addSection(body.pageId, body.section);
        saveJSON("pages.json", landingBuilder.pages);
        return json(res, { success: true, section });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "update-section" && method === "POST") {
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

    if (action === "delete-section" && method === "POST") {
      const body = await parseBody(req);
      try {
        landingBuilder.deleteSection(body.pageId, body.sectionId);
        saveJSON("pages.json", landingBuilder.pages);
        return json(res, { success: true });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "preview" && method === "GET") {
      const pageId = new URL(req.url, `http://${req.headers.host}`).searchParams.get("pageId");
      try {
        const html = landingBuilder.generateHTML(pageId);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(html);
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }

    if (action === "export" && method === "GET") {
      const pageId = new URL(req.url, `http://${req.headers.host}`).searchParams.get("pageId");
      try {
        const data = landingBuilder.exportPageJSON(pageId);
        return json(res, { success: true, data: JSON.parse(data) });
      } catch (error) {
        return json(res, { error: error.message }, 400);
      }
    }
  }

  // ──────────────────────────────────────────────────────────
  // 🤖 CLAUDE AI CHAT
  // ──────────────────────────────────────────────────────────

  if (endpoint === "chat") {
    if (action === "message" && method === "POST") {
      const body = await parseBody(req);
      try {
        const message = await claude.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: body.message || "Olá! Como posso ajudá-lo com CAPTA LEADS?"
            }
          ],
          system: "Você é um assistente especializado em CAPTA LEADS. Ajude os usuários com perguntas sobre busca de leads, campanhas de email e criação de landing pages. Seja amigável e conciso."
        });
        const responseText = message.content[0]?.text || "Desculpe, não consegui processar sua solicitação.";
        return json(res, { success: true, response: responseText });
      } catch (error) {
        return json(res, { success: false, error: error.message }, 500);
      }
    }
  }

  // ──────────────────────────────────────────────────────────
  // ⚙️ CONFIGURATION
  // ──────────────────────────────────────────────────────────

  if (endpoint === "config") {
    if (action === "industries" && method === "GET") {
      return json(res, { industries: INDUSTRIES });
    }

    if (action === "templates" && method === "GET") {
      return json(res, { templates: EMAIL_TEMPLATES });
    }
  }

  // ──────────────────────────────────────────────────────────
  // 💳 PAYMENTS (Stripe)
  // ──────────────────────────────────────────────────────────

  if (endpoint === "payments") {
    if (action === "checkout" && method === "POST") {
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

  // ──────────────────────────────────────────────────────────
  // 🔐 WEBHOOKS
  // ──────────────────────────────────────────────────────────

  if (endpoint === "webhooks" && action === "stripe" && method === "POST") {
    const signature = req.headers["stripe-signature"];
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const event = stripeManager.verifyWebhook(body, signature);
      if (!event) {
        return json(res, { error: "Invalid signature" }, 400);
      }

      // Handle payment success
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log("Payment successful:", session.customer_email);
        // Save to database in production
      }

      return json(res, { received: true });
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
    const content = fs.readFileSync(filepath, "utf8");
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File not found");
  }
}

// ═══════════════════════════════════════════════════════════════
// SERVER
// ═══════════════════════════════════════════════════════════════

const server = http.createServer(async (req, res) => {
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
    return serveStatic(res, path.join(__dirname, "console.html"), "text/html");
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
});

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
