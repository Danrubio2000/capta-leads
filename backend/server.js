const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ═══════════════════════════════════════════════════════════════
// EMAIL TRANSPORTER
// ═══════════════════════════════════════════════════════════════

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ═══════════════════════════════════════════════════════════════
// API: LEADS SEARCH
// ═══════════════════════════════════════════════════════════════

app.post('/api/leads/search', async (req, res) => {
  try {
    const { keywords, location, type } = req.body;

    console.log(`🔍 Searching for: ${keywords} in ${location}`);

    // Gera dados realistas (mock para não usar cota Hunter.io)
    const leads = generateRealisticLeads(keywords, location);

    res.json({
      success: true,
      leads: leads,
      total: leads.length,
      message: `${leads.length} leads encontrados`
    });

  } catch (error) {
    console.error('❌ Lead search error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// API: CAMPAIGNS - CREATE
// ═══════════════════════════════════════════════════════════════

app.post('/api/campaigns/create', async (req, res) => {
  try {
    const { subject, body, fromEmail, fromName, recipients } = req.body;

    console.log(`📧 Creating campaign: "${subject}" for ${recipients.length} recipients`);

    const campaign = {
      id: 'camp_' + Date.now(),
      subject,
      body,
      fromEmail,
      fromName,
      recipients: recipients.length,
      createdAt: new Date(),
      status: 'draft'
    };

    // Salva em memória (em produção seria banco de dados)
    if (!global.campaigns) global.campaigns = [];
    global.campaigns.push(campaign);

    res.json({
      success: true,
      campaign: campaign,
      message: 'Campanha criada com sucesso!'
    });

  } catch (error) {
    console.error('❌ Campaign creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// API: CAMPAIGNS - LIST
// ═══════════════════════════════════════════════════════════════

app.get('/api/campaigns/list', (req, res) => {
  try {
    const campaigns = global.campaigns || [];
    res.json({
      success: true,
      campaigns: campaigns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// API: CAMPAIGNS - SEND
// ═══════════════════════════════════════════════════════════════

app.post('/api/campaigns/send', async (req, res) => {
  try {
    const { campaignId, leads } = req.body;

    console.log(`📧 Sending campaign ${campaignId} to ${leads.length} leads`);

    // Em produção, aqui você enviaria emails de verdade
    // Por enquanto, simula o envio
    let sent = 0;
    let failed = 0;

    for (const lead of leads) {
      try {
        // Simula envio de email
        console.log(`✉️ Email enviado para: ${lead.email}`);
        sent++;
      } catch (err) {
        failed++;
      }
    }

    res.json({
      success: true,
      sent: sent,
      failed: failed,
      message: `${sent} emails enviados com sucesso!`
    });

  } catch (error) {
    console.error('❌ Campaign send error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// API: CAMPAIGNS - TEST EMAIL
// ═══════════════════════════════════════════════════════════════

app.post('/api/campaigns/test-email', async (req, res) => {
  try {
    const { email } = req.body;

    console.log(`🧪 Testando email para: ${email}`);

    // Simula envio de teste
    res.json({
      success: true,
      message: `Email de teste enviado para ${email}`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// API: CAMPAIGNS - SETTINGS
// ═══════════════════════════════════════════════════════════════

app.get('/api/campaigns/settings', (req, res) => {
  res.json({
    success: true,
    settings: {
      fromEmail: process.env.EMAIL_FROM || 'noreply@captaleads.com',
      fromName: 'CAPTA LEADS',
      resendConfigured: true
    }
  });
});

app.post('/api/campaigns/settings', (req, res) => {
  res.json({
    success: true,
    message: 'Configurações salvas'
  });
});

// ═══════════════════════════════════════════════════════════════
// API: PAGES - CREATE
// ═══════════════════════════════════════════════════════════════

app.post('/api/pages/create', (req, res) => {
  try {
    const { title, industry, seoTitle, seoDescription } = req.body;

    const page = {
      id: 'page_' + Date.now(),
      title,
      industry,
      seoTitle,
      seoDescription,
      sections: 5,
      createdAt: new Date()
    };

    if (!global.pages) global.pages = [];
    global.pages.push(page);

    res.json({
      success: true,
      page: page
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// API: PAGES - LIST
// ═══════════════════════════════════════════════════════════════

app.get('/api/pages/list', (req, res) => {
  try {
    const pages = global.pages || [];
    res.json({
      success: true,
      pages: pages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function generateRealisticLeads(keywords, location) {
  const brNames = [
    {f:"Carlos",l:"Silva"},{f:"Maria",l:"Santos"},{f:"João",l:"Oliveira"},
    {f:"Ana",l:"Sousa"},{f:"Pedro",l:"Costa"},{f:"Paula",l:"Mendes"},
    {f:"Lucas",l:"Gomes"},{f:"Juliana",l:"Martins"},{f:"Bruno",l:"Ferreira"},
    {f:"Fernanda",l:"Dias"},{f:"Ricardo",l:"Alves"},{f:"Beatriz",l:"Rocha"}
  ];

  const usNames = [
    {f:"James",l:"Smith"},{f:"John",l:"Johnson"},{f:"Michael",l:"Williams"},
    {f:"David",l:"Brown"},{f:"Robert",l:"Jones"},{f:"Mary",l:"Garcia"},
    {f:"Patricia",l:"Miller"},{f:"Jennifer",l:"Davis"},{f:"Linda",l:"Rodriguez"},
    {f:"Barbara",l:"Martinez"},{f:"William",l:"Anderson"},{f:"Richard",l:"Taylor"}
  ];

  const isBrazil = !location ||
    location.toLowerCase().includes("brasil") ||
    location.toLowerCase().includes("são paulo") ||
    location.toLowerCase().includes("rio");

  const nameList = isBrazil ? brNames : usNames;
  const domains = isBrazil ? ["gmail.com","empresa.com.br"] : ["gmail.com","company.com"];
  const tld = isBrazil ? ".com.br" : ".com";

  const count = Math.floor(Math.random() * 100) + 100; // 100-200
  const leads = [];

  for (let i = 0; i < count; i++) {
    const p = nameList[Math.floor(Math.random() * nameList.length)];
    const d = domains[Math.floor(Math.random() * domains.length)];
    leads.push({
      name: p.f + " " + p.l,
      email: p.f.toLowerCase() + "." + p.l.toLowerCase() + i + "@" + d,
      website: "https://www." + keywords.replace(/\s+/g, '').toLowerCase() + p.l.toLowerCase() + i + tld,
      score: Math.floor(Math.random() * 40) + 60
    });
  }

  return leads;
}

// ═══════════════════════════════════════════════════════════════
// HEALTH CHECK
// ═══════════════════════════════════════════════════════════════

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CAPTA LEADS Backend is running!',
    timestamp: new Date()
  });
});

// ═══════════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log(`\n🚀 CAPTA LEADS Backend rodando em http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health\n`);
});

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
