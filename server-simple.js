#!/usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// COMPREHENSIVE LEAD DATABASE - Dynamic Professional Leads Generator
// Generates realistic leads based on configured business type

function generateProfessionalLeads(businessType = "Dentista", city = "Astória") {
  const firstNames = [
    "Dr. Carlos", "Dra. Maria", "Dr. João", "Dra. Ana", "Dr. Roberto",
    "Dra. Paula", "Dr. Fernando", "Dra. Juliana", "Dr. Ricardo", "Dra. Beatriz",
    "Dr. Miguel", "Dra. Fernanda", "Dr. Paulo", "Dra. Claudia", "Dr. Antonio",
    "Dra. Marina", "Dr. Diego", "Dra. Patricia", "Dr. Gustavo", "Dra. Adriana",
    "Dr. Lucas", "Dra. Cristina", "Dr. Pedro", "Dra. Viviana", "Dr. Marcos",
    "Dra. Marcela", "Dr. Felipe", "Dra. Daniela", "Dr. Rodrigo", "Dra. Sabrina",
    "Dr. André", "Dra. Natalia", "Dr. Bruno", "Dra. Camila", "Dr. Thiago",
    "Dra. Larissa", "Dr. Alex", "Dra. Rafaela", "Dr. Victor", "Dra. Isabella",
    "Dr. Enzo", "Dra. Valentina", "Dr. Nicolas", "Dra. Sofia", "Dr. Luciano"
  ];

  const lastNames = [
    "Silva", "Santos", "Oliveira", "Costa", "Lima", "Ferreira", "Rodrigues",
    "Martins", "Gomes", "Alves", "Pereira", "Carvalho", "Ribeiro", "Sousa",
    "Teixeira", "Menezes", "Barbosa", "Souza", "Monteiro", "Cavalcanti",
    "Rocha", "Dias", "Machado", "Andrade", "Freitas", "Pinto", "Nunes",
    "Moura", "Lemos", "Viana", "Campos", "Assis", "Rego", "Abreu"
  ];

  // Specialties mapping by business type
  const specialtiesMap = {
    "Dentista": ["Ortodontia", "Implantologia", "Endodontia", "Periodontia", "Estética", "Protética", "Clareamento", "Cirurgia Oral", "Geral", "Infantil", "Preventiva", "Reabilitação Oral"],
    "Advogado": ["Direito Civil", "Direito Penal", "Direito Trabalhista", "Direito Comercial", "Direito Ambiental", "Direito Administrativo", "Direito Tributário", "Direito Imobiliário"],
    "Encanador": ["Hidráulica", "Reparo de Tubulações", "Instalação de Pias", "Conserto de Vazamentos", "Desobstrução", "Instalação de Chuveiros", "Reparo de Canos", "Manutenção Preventiva"],
    "Professor": ["Matemática", "Português", "Inglês", "História", "Geografia", "Ciências", "Educação Física", "Artes", "Música"],
    "Professor de Yoga": ["Hatha Yoga", "Vinyasa", "Ashtanga", "Kundalini", "Yin Yoga", "Yoga Terapêutico", "Yoga para Iniciantes", "Meditação"],
    "Contador": ["Contabilidade Geral", "Imposto de Renda", "Contabilidade Fiscal", "Auditoria", "Consultoria Tributária", "Contabilidade Gerencial"],
    "Psicólogo": ["Psicologia Clínica", "Terapia Comportamental", "Psicanálise", "Terapia Familiar", "Psicologia Organizacional", "Avaliação Psicológica"],
    "Médico": ["Clínico Geral", "Cardiologia", "Dermatologia", "Ortopedia", "Neurologia", "Oftalmologia", "Pneumologia", "Gastroenterologia"],
    "Encanador": ["Instalação", "Manutenção", "Reparo", "Conserto", "Desobstrução"],
    "Consultor": ["Gestão Empresarial", "Estratégia", "Marketing", "Recursos Humanos", "Operações", "Financeiro"]
  };

  const specialties = specialtiesMap[businessType] || ["Geral", "Consultoria", "Assessoria"];
  const emailDomain = ["com.br", "net.br", "services.com", "pro.com", "email.com"][Math.floor(Math.random() * 5)];
  const streets = ["Ditmars Blvd", "Steinway St", "30th Ave", "Broadway", "21st Ave", "Rua Principal", "Avenida Central", "Rua de Comércio"];

  const leads = [];

  for (let i = 0; i < 120; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const specialty = specialties[Math.floor(Math.random() * specialties.length)];

    const baseScore = 65 + Math.floor(Math.random() * 30);
    const phone = `(${Math.floor(Math.random() * 85) + 11}) ${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 9000) + 1000}`;
    const firstNameClean = firstName.toLowerCase().replace("dr. ", "").replace("dra. ", "");
    const businessTypeSlug = businessType.toLowerCase().replace(/\s+/g, "-");

    leads.push({
      name: `${firstName} ${lastName}`,
      email: `${firstNameClean}.${lastName.toLowerCase()}@${businessTypeSlug}.${emailDomain}`,
      website: `https://${firstNameClean}-${lastName.toLowerCase()}-${businessTypeSlug}.com.br`,
      score: baseScore,
      phone: phone,
      specialty: specialty,
      businessType: businessType,
      location: city,
      address: `${Math.floor(Math.random() * 9000) + 1000} ${streets[Math.floor(Math.random() * streets.length)]}, ${city}`,
      verified: Math.random() > 0.3,
      foundDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }

  return leads;
}

// Cache for generated leads by business type and location
const leadsCache = {};

function getCachedLeads(businessType, location) {
  const cacheKey = `${businessType}_${location}`;
  if (!leadsCache[cacheKey]) {
    leadsCache[cacheKey] = generateProfessionalLeads(businessType, location);
  }
  return leadsCache[cacheKey];
}

function getMockLeads(businessType = "Dentista", location = "Astória") {
  const searchLocation = location.toLowerCase();

  // Map locations
  const locationMap = {
    "astória": "Astória",
    "astoria": "Astória",
    "queens": "Queens",
    "nova york": "Nova York",
    "new york": "Nova York",
    "ny": "Nova York",
    "brooklyn": "Brooklyn",
    "manhattan": "Manhattan"
  };

  const normalizedLocation = locationMap[searchLocation] || "Astória";

  // Return leads based on business type and location
  return getCachedLeads(businessType, normalizedLocation);
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
      const { keywords = "", location = "Astória", type = "all", businessType = "Dentista" } = body;

      const leads = getMockLeads(businessType, location);

      res.writeHead(200);
      res.end(JSON.stringify({
        leads,
        total: leads.length,
        query: { keywords, location, type, businessType }
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
