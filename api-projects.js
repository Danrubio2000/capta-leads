/**
 * CAPTA LEADS - API Project Routes
 * Endpoints para gerenciar projetos e seus dados
 */

import DataManager from "./data-manager.js";

export async function handleProjectAPI(req, res, url, method) {
  const parts = url.pathname.replace("/api/projects/", "").split("/").filter(Boolean);

  /**
   * POST /api/projects/create
   */
  if (parts[0] === "create" && method === "POST") {
    const body = await parseBody(req);
    const project = DataManager.createProject(body.name || "Novo Projeto", body.config);
    return json(res, { success: true, project });
  }

  /**
   * GET /api/projects/list
   */
  if (parts[0] === "list" && method === "GET") {
    const projects = DataManager.listProjects();
    return json(res, { success: true, projects });
  }

  /**
   * GET /api/projects/{projectId}
   */
  if (parts.length === 1 && method === "GET") {
    const project = DataManager.getProject(parts[0]);
    if (!project) return json(res, { error: "Projeto não encontrado" }, 404);
    return json(res, { success: true, project });
  }

  /**
   * LEADS
   */

  // POST /api/projects/{projectId}/leads/add
  if (parts.length >= 3 && parts[1] === "leads" && parts[2] === "add" && method === "POST") {
    const projectId = parts[0];
    const body = await parseBody(req);
    const lead = DataManager.addLead(projectId, body);
    return json(res, { success: true, lead });
  }

  // GET /api/projects/{projectId}/leads
  if (parts.length === 2 && parts[1] === "leads" && method === "GET") {
    const projectId = parts[0];
    const leads = DataManager.getLeads(projectId);
    return json(res, { success: true, leads, total: leads.length });
  }

  // GET /api/projects/{projectId}/leads/{leadId}
  if (parts.length === 3 && parts[1] === "leads" && method === "GET") {
    const projectId = parts[0];
    const leadId = parts[2];
    const lead = DataManager.getLead(projectId, leadId);
    if (!lead) return json(res, { error: "Lead não encontrado" }, 404);
    return json(res, { success: true, lead });
  }

  // PUT /api/projects/{projectId}/leads/{leadId}
  if (parts.length === 3 && parts[1] === "leads" && method === "PUT") {
    const projectId = parts[0];
    const leadId = parts[2];
    const body = await parseBody(req);
    const lead = DataManager.updateLead(projectId, leadId, body);
    if (!lead) return json(res, { error: "Lead não encontrado" }, 404);
    return json(res, { success: true, lead });
  }

  /**
   * LANDING PAGES
   */

  // POST /api/projects/{projectId}/pages/create
  if (parts.length >= 3 && parts[1] === "pages" && parts[2] === "create" && method === "POST") {
    const projectId = parts[0];
    const body = await parseBody(req);
    const page = DataManager.createLandingPage(projectId, body);
    return json(res, { success: true, page });
  }

  // GET /api/projects/{projectId}/pages
  if (parts.length === 2 && parts[1] === "pages" && method === "GET") {
    const projectId = parts[0];
    const pages = DataManager.getLandingPages(projectId);
    return json(res, { success: true, pages, total: pages.length });
  }

  // GET /api/projects/{projectId}/pages/{pageId}
  if (parts.length === 3 && parts[1] === "pages" && method === "GET") {
    const projectId = parts[0];
    const pageId = parts[2];
    const page = DataManager.getLandingPage(projectId, pageId);
    if (!page) return json(res, { error: "Página não encontrada" }, 404);
    return json(res, { success: true, page });
  }

  // PUT /api/projects/{projectId}/pages/{pageId}
  if (parts.length === 3 && parts[1] === "pages" && method === "PUT") {
    const projectId = parts[0];
    const pageId = parts[2];
    const body = await parseBody(req);
    const page = DataManager.updateLandingPage(projectId, pageId, body);
    if (!page) return json(res, { error: "Página não encontrada" }, 404);
    return json(res, { success: true, page });
  }

  /**
   * CAMPANHAS DE EMAIL
   */

  // POST /api/projects/{projectId}/campaigns/create
  if (parts.length >= 3 && parts[1] === "campaigns" && parts[2] === "create" && method === "POST") {
    const projectId = parts[0];
    const body = await parseBody(req);
    const campaign = DataManager.createCampaign(projectId, body);
    return json(res, { success: true, campaign });
  }

  // GET /api/projects/{projectId}/campaigns
  if (parts.length === 2 && parts[1] === "campaigns" && method === "GET") {
    const projectId = parts[0];
    const campaigns = DataManager.getCampaigns(projectId);
    return json(res, { success: true, campaigns, total: campaigns.length });
  }

  // GET /api/projects/{projectId}/campaigns/{campaignId}
  if (parts.length === 3 && parts[1] === "campaigns" && method === "GET") {
    const projectId = parts[0];
    const campaignId = parts[2];
    const campaign = DataManager.getCampaign(projectId, campaignId);
    if (!campaign) return json(res, { error: "Campanha não encontrada" }, 404);
    return json(res, { success: true, campaign });
  }

  // POST /api/projects/{projectId}/campaigns/{campaignId}/send
  if (parts.length === 4 && parts[1] === "campaigns" && parts[3] === "send" && method === "POST") {
    const projectId = parts[0];
    const campaignId = parts[2];
    const campaign = DataManager.sendCampaign(projectId, campaignId);
    if (!campaign) return json(res, { error: "Campanha não encontrada" }, 404);
    return json(res, { success: true, campaign });
  }

  // 404
  return json(res, { error: "Endpoint not found" }, 404);
}

function json(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

async function parseBody(req) {
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
