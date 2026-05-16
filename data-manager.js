/**
 * CAPTA LEADS - Data Manager
 * Gerencia projetos, leads, landing pages e campanhas isolados por projeto
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DATA_DIR = path.join(__dirname, "data", "teams");

// Team key para isolamento de dados
let currentTeamKey = "default";

// Garantir que o diretório base existe
if (!fs.existsSync(BASE_DATA_DIR)) {
  fs.mkdirSync(BASE_DATA_DIR, { recursive: true });
}

class DataManager {
  static setTeamKey(teamKey) {
    currentTeamKey = teamKey || "default";
  }

  static getTeamDataDir() {
    const teamDir = path.join(BASE_DATA_DIR, currentTeamKey, "projects");
    if (!fs.existsSync(teamDir)) {
      fs.mkdirSync(teamDir, { recursive: true });
    }
    return teamDir;
  }
  /**
   * PROJETOS
   */

  createProject(projectName, config = {}) {
    const projectId = Date.now().toString();
    const projectDir = path.join(DataManager.getTeamDataDir(), projectId);

    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    const project = {
      id: projectId,
      name: projectName,
      createdAt: new Date().toISOString(),
      config: {
        industry: config.industry || "generic",
        currency: config.currency || "BRL",
        ...config
      },
      stats: {
        totalLeads: 0,
        totalCampaigns: 0,
        totalPages: 0,
        conversions: 0
      }
    };

    this.saveProjectData(projectId, "project.json", project);
    return project;
  }

  getProject(projectId) {
    try {
      return this.loadProjectData(projectId, "project.json");
    } catch {
      return null;
    }
  }

  listProjects() {
    try {
      const dirs = fs.readdirSync(DataManager.getTeamDataDir());
      return dirs.map(dir => {
        try {
          return this.loadProjectData(dir, "project.json");
        } catch {
          return null;
        }
      }).filter(Boolean);
    } catch {
      return [];
    }
  }

  /**
   * LEADS
   */

  addLead(projectId, lead) {
    const leads = this.getLeads(projectId);
    const leadId = Date.now().toString();

    const newLead = {
      id: leadId,
      ...lead,
      addedAt: new Date().toISOString(),
      status: "novo",
      emails_sent: 0,
      opens: 0,
      clicks: 0
    };

    leads.push(newLead);
    this.saveProjectData(projectId, "leads.json", leads);

    // Atualizar stats
    const project = this.getProject(projectId);
    project.stats.totalLeads = leads.length;
    this.saveProjectData(projectId, "project.json", project);

    return newLead;
  }

  getLeads(projectId, filters = {}) {
    try {
      let leads = this.loadProjectData(projectId, "leads.json");

      // Filtrar por campos se necessário
      if (filters.status) {
        leads = leads.filter(l => l.status === filters.status);
      }
      if (filters.specialty) {
        leads = leads.filter(l => l.specialty === filters.specialty);
      }

      return leads;
    } catch {
      return [];
    }
  }

  getLead(projectId, leadId) {
    const leads = this.getLeads(projectId);
    return leads.find(l => l.id === leadId) || null;
  }

  updateLead(projectId, leadId, updates) {
    const leads = this.getLeads(projectId);
    const index = leads.findIndex(l => l.id === leadId);

    if (index === -1) return null;

    leads[index] = { ...leads[index], ...updates, updatedAt: new Date().toISOString() };
    this.saveProjectData(projectId, "leads.json", leads);
    return leads[index];
  }

  /**
   * LANDING PAGES
   */

  createLandingPage(projectId, pageData) {
    const pages = this.getLandingPages(projectId);
    const pageId = Date.now().toString();

    const newPage = {
      id: pageId,
      title: pageData.title || "Nova Landing Page",
      slug: pageData.slug || this.generateSlug(pageData.title),
      description: pageData.description || "",
      template: pageData.template || "modern",
      url: `/pages/${projectId}/${pageId}`,
      createdAt: new Date().toISOString(),
      sections: pageData.sections || [],
      settings: {
        favicon: "",
        seoTitle: pageData.title,
        seoDescription: pageData.description,
        seoKeywords: []
      },
      stats: {
        views: 0,
        conversions: 0,
        conversionRate: 0
      }
    };

    pages.push(newPage);
    this.saveProjectData(projectId, "pages.json", pages);

    // Gerar HTML da página
    this.generatePageHTML(projectId, pageId, newPage);

    // Atualizar stats
    const project = this.getProject(projectId);
    project.stats.totalPages = pages.length;
    this.saveProjectData(projectId, "project.json", project);

    return newPage;
  }

  getLandingPages(projectId) {
    try {
      return this.loadProjectData(projectId, "pages.json");
    } catch {
      return [];
    }
  }

  getLandingPage(projectId, pageId) {
    const pages = this.getLandingPages(projectId);
    return pages.find(p => p.id === pageId) || null;
  }

  updateLandingPage(projectId, pageId, updates) {
    const pages = this.getLandingPages(projectId);
    const index = pages.findIndex(p => p.id === pageId);

    if (index === -1) return null;

    pages[index] = { ...pages[index], ...updates, updatedAt: new Date().toISOString() };
    this.saveProjectData(projectId, "pages.json", pages);

    // Regenerar HTML
    this.generatePageHTML(projectId, pageId, pages[index]);

    return pages[index];
  }

  generatePageHTML(projectId, pageId, page) {
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.seoTitle || page.title}</title>
  <meta name="description" content="${page.seoDescription || page.description}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 20px; text-align: center; }
    h1 { font-size: 2.5em; margin-bottom: 10px; }
    .description { font-size: 1.1em; opacity: 0.95; margin-bottom: 30px; }
    .content { background: white; padding: 40px; margin: 20px 0; border-radius: 10px; }
    .btn { display: inline-block; background: #009B3A; color: white; padding: 15px 40px; border-radius: 5px; text-decoration: none; margin-top: 20px; }
    .btn:hover { background: #007A2E; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${page.title}</h1>
    <p class="description">${page.description}</p>
  </div>
  <div class="container">
    <div class="content">
      <p>Landing Page: ${page.title}</p>
      <p>Views: ${page.stats.views} | Conversões: ${page.stats.conversions}</p>
      <a href="/" class="btn">← Voltar</a>
    </div>
  </div>
</body>
</html>`;

    const pagesDir = path.join(DataManager.getTeamDataDir(), projectId, "pages");
    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }

    fs.writeFileSync(path.join(pagesDir, `${pageId}.html`), html);
  }

  /**
   * CAMPANHAS DE EMAIL
   */

  createCampaign(projectId, campaignData) {
    const campaigns = this.getCampaigns(projectId);
    const campaignId = Date.now().toString();

    const newCampaign = {
      id: campaignId,
      name: campaignData.name || "Nova Campanha",
      subject: campaignData.subject || "",
      body: campaignData.body || "",
      template: campaignData.template || "introduction",
      leads: campaignData.leads || [],
      status: "draft",
      createdAt: new Date().toISOString(),
      scheduledAt: campaignData.scheduledAt || null,
      stats: {
        total_sent: 0,
        opens: 0,
        clicks: 0,
        conversions: 0
      }
    };

    campaigns.push(newCampaign);
    this.saveProjectData(projectId, "campaigns.json", campaigns);

    // Atualizar stats
    const project = this.getProject(projectId);
    project.stats.totalCampaigns = campaigns.length;
    this.saveProjectData(projectId, "project.json", project);

    return newCampaign;
  }

  getCampaigns(projectId) {
    try {
      return this.loadProjectData(projectId, "campaigns.json");
    } catch {
      return [];
    }
  }

  getCampaign(projectId, campaignId) {
    const campaigns = this.getCampaigns(projectId);
    return campaigns.find(c => c.id === campaignId) || null;
  }

  updateCampaign(projectId, campaignId, updates) {
    const campaigns = this.getCampaigns(projectId);
    const index = campaigns.findIndex(c => c.id === campaignId);

    if (index === -1) return null;

    campaigns[index] = { ...campaigns[index], ...updates, updatedAt: new Date().toISOString() };
    this.saveProjectData(projectId, "campaigns.json", campaigns);
    return campaigns[index];
  }

  sendCampaign(projectId, campaignId) {
    const campaign = this.getCampaign(projectId, campaignId);
    if (!campaign) return null;

    // Simular envio
    const updatedCampaign = {
      ...campaign,
      status: "sent",
      stats: {
        total_sent: campaign.leads.length,
        opens: 0,
        clicks: 0,
        conversions: 0
      },
      sentAt: new Date().toISOString()
    };

    this.updateCampaign(projectId, campaignId, updatedCampaign);
    return updatedCampaign;
  }

  /**
   * UTILIDADES
   */

  saveProjectData(projectId, filename, data) {
    const projectDir = path.join(DataManager.getTeamDataDir(), projectId);
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }
    fs.writeFileSync(path.join(projectDir, filename), JSON.stringify(data, null, 2));
  }

  loadProjectData(projectId, filename) {
    const filepath = path.join(DataManager.getTeamDataDir(), projectId, filename);
    if (!fs.existsSync(filepath)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(filepath, "utf8"));
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
}

export default new DataManager();
