#!/usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mock lead database for demo
const mockLeads = {
  "dentistas astória": [
    { name: "Dr. Carlos Silva", email: "carlos.silva@dental.com", website: "https://drcarlossilva.com", score: 92, phone: "(718) 555-0101", specialty: "Ortodontia" },
    { name: "Dra. Maria Santos", email: "maria.santos@dentistry.com", website: "https://mariasantosdentist.com", score: 88, phone: "(718) 555-0102", specialty: "Implantologia" },
    { name: "Consultório Dental Astória", email: "contato@astoriadental.com", website: "https://astoriadental.com", score: 85, phone: "(718) 555-0103", specialty: "Geral" },
    { name: "Dr. João Oliveira", email: "joao@dentalclinic.com", website: "https://joaodental.com", score: 82, phone: "(718) 555-0104", specialty: "Endodontia" },
    { name: "Dra. Ana Costa", email: "ana.costa@smile.com", website: "https://anacostadental.com", score: 79, phone: "(718) 555-0105", specialty: "Estética" }
  ],
  "dentistas queens": [
    { name: "Queens Dental Group", email: "info@queensdental.com", website: "https://queensdentalgroup.com", score: 90, phone: "(718) 555-0201", specialty: "Geral" },
    { name: "Dr. Roberto Lima", email: "roberto@dentist.com", website: "https://robertolimadental.com", score: 87, phone: "(718) 555-0202", specialty: "Periodontia" },
    { name: "Bright Smile Dental", email: "contact@brightsmile.com", website: "https://brightsmilequeen.com", score: 84, phone: "(718) 555-0203", specialty: "Clareamento" }
  ],
  "dentistas nova york": [
    { name: "NYC Dental Excellence", email: "contact@nycdental.com", website: "https://nycdental.com", score: 95, phone: "(212) 555-0301", specialty: "Todos" },
    { name: "Dr. Michael Johnson", email: "michael@nycsmile.com", website: "https://michaeljohnsondmd.com", score: 91, phone: "(212) 555-0302", specialty: "Cosmética" },
    { name: "Advanced Dental NYC", email: "info@advanceddentalnyc.com", website: "https://advanceddentalnyc.com", score: 88, phone: "(212) 555-0303", specialty: "Implantes" }
  ]
};

function getMockLeads(keywords, location) {
  const searchKey = `${keywords.toLowerCase()} ${location.toLowerCase()}`;

  // Try exact match first
  if (mockLeads[searchKey]) {
    return mockLeads[searchKey];
  }

  // Try partial matches
  for (const key in mockLeads) {
    if (key.includes(keywords.toLowerCase()) || searchKey.includes("dentista")) {
      return mockLeads[key];
    }
  }

  // Default: return some generic results
  return [
    { name: `Consultório Dental - ${location}`, email: "contato@dental.com", website: "https://dentistlocal.com", score: 75, phone: "(XXX) 555-0001", specialty: "Geral" },
    { name: `${keywords} Specialist`, email: "specialist@dental.com", website: "https://specialist.com", score: 70, phone: "(XXX) 555-0002", specialty: keywords }
  ];
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    // CORS Headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Content-Type", "application/json");

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    if (pathname === "/" || pathname === "/index.html") {
      res.setHeader("Content-Type", "text/html");
      const html = fs.readFileSync(path.join(__dirname, "console.html"), "utf8");
      res.writeHead(200);
      res.end(html);
    } else if (pathname === "/landing.html") {
      res.setHeader("Content-Type", "text/html");
      const html = fs.readFileSync(path.join(__dirname, "landing.html"), "utf8");
      res.writeHead(200);
      res.end(html);
    } else if (pathname === "/tutorial.html") {
      res.setHeader("Content-Type", "text/html");
      const html = fs.readFileSync(path.join(__dirname, "tutorial.html"), "utf8");
      res.writeHead(200);
      res.end(html);
    } else if (pathname === "/api/test") {
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true }));
    } else if (pathname === "/api/leads/search" && req.method === "POST") {
      const body = await parseBody(req);
      const { keywords = "", location = "Internacional", type = "all" } = body;

      const leads = getMockLeads(keywords, location);

      res.writeHead(200);
      res.end(JSON.stringify({
        leads,
        total: leads.length,
        query: { keywords, location, type }
      }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  } catch (error) {
    console.error("Server error:", error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Internal Server Error", message: error.message }));
  }
});

export default server;

if (!process.env.VERCEL) {
  server.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
  });
}
