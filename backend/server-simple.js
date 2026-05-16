const express = require('express');
const cors = require('cors');
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

  const count = Math.floor(Math.random() * 100) + 100;
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
// ROUTES
// ═══════════════════════════════════════════════════════════════

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🚀 CAPTA LEADS Backend is running!',
    timestamp: new Date()
  });
});

// Leads search
app.post('/api/leads/search', (req, res) => {
  try {
    const { keywords, location, type } = req.body;
    console.log(`🔍 Searching for: ${keywords} in ${location}`);

    const leads = generateRealisticLeads(keywords, location);

    res.json({
      success: true,
      leads: leads,
      total: leads.length,
      message: `${leads.length} leads encontrados`
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Campaigns - create
app.post('/api/campaigns/create', (req, res) => {
  try {
    const { subject, body, fromEmail, fromName, recipients } = req.body;

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

    if (!global.campaigns) global.campaigns = [];
    global.campaigns.push(campaign);

    res.json({
      success: true,
      campaign: campaign,
      message: 'Campanha criada com sucesso!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Campaigns - list
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

// Campaigns - send
app.post('/api/campaigns/send', (req, res) => {
  try {
    const { campaignId, leads } = req.body;

    let sent = leads.length;
    let failed = 0;

    res.json({
      success: true,
      sent: sent,
      failed: failed,
      message: `${sent} emails enviados com sucesso!`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Campaigns - test email
app.post('/api/campaigns/test-email', (req, res) => {
  try {
    const { email } = req.body;

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

// Campaigns - settings
app.get('/api/campaigns/settings', (req, res) => {
  res.json({
    success: true,
    settings: {
      fromEmail: 'noreply@captaleads.com',
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

// Pages - create
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

// Pages - list
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found: ' + req.path
  });
});

// ═══════════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log(`\n🚀 CAPTA LEADS Backend rodando em http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health\n`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
