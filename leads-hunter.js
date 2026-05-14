/**
 * CAPTA LEADS - Lead Hunter
 * Integrated lead search from multiple sources
 * Based on PROCURA-ALVO technology
 */

import axios from "axios";

const HUNTER_API = "https://api.hunter.io/v2";
const CLEARBIT_API = "https://company-stream.clearbit.com/v1";

class LeadsHunter {
  constructor(config = {}) {
    this.hunterKey = config.hunterKey || process.env.HUNTER_API_KEY;
    this.clearbitKey = config.clearbitKey || process.env.CLEARBIT_API_KEY;
    this.googleKey = config.googleKey || process.env.GOOGLE_API_KEY;
    this.results = [];
  }

  /**
   * Search leads with keywords and location
   * @param {string} keywords - Search terms
   * @param {string} location - Location (e.g., "São Paulo, Brazil", "International")
   * @param {string} type - Type (business, foundation, ngo)
   * @returns {Promise<Array>} List of leads
   */
  async searchLeads(keywords, location = "International", type = "business") {
    console.log(`🔍 Searching leads: "${keywords}" in ${location} (${type})`);

    const results = [];

    // Try Hunter.io first (best for corporate emails)
    if (this.hunterKey) {
      try {
        const hunterResults = await this.searchHunter(keywords, location);
        results.push(...hunterResults);
      } catch (err) {
        console.warn("⚠️ Hunter.io search failed:", err.message);
      }
    }

    // Try Clearbit for company data
    if (this.clearbitKey) {
      try {
        const clearbitResults = await this.searchClearbit(keywords, location);
        results.push(...clearbitResults);
      } catch (err) {
        console.warn("⚠️ Clearbit search failed:", err.message);
      }
    }

    // Mock local database for instant results
    const mockResults = this.getMockLeads(keywords, location, type);
    results.push(...mockResults);

    // Remove duplicates by email
    const uniqueResults = Array.from(
      new Map(results.map((item) => [item.email, item])).values()
    );

    console.log(`✅ Found ${uniqueResults.length} leads`);
    this.results = uniqueResults;
    return uniqueResults;
  }

  /**
   * Search using Hunter.io
   */
  async searchHunter(domain, location) {
    const url = `${HUNTER_API}/domain-search`;
    const response = await axios.get(url, {
      params: {
        domain: domain,
        api_key: this.hunterKey,
        limit: 50
      }
    });

    if (response.data?.data?.emails) {
      return response.data.data.emails.map((email) => ({
        nome: email.value.split("@")[0],
        email: email.value,
        website: domain,
        fonte: "Hunter.io",
        score: 85,
        localizacao: location,
        tipo: "empresa"
      }));
    }

    return [];
  }

  /**
   * Search using Clearbit
   */
  async searchClearbit(domain, location) {
    const url = `${CLEARBIT_API}/domains/${domain}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.clearbitKey}`
      }
    });

    const data = response.data;
    return [
      {
        nome: data.name || domain,
        email: data.contact?.email || data.email || "",
        telefone: data.phone || "",
        responsavel: data.founder?.name || data.ceo?.name || "",
        website: domain,
        fonte: "Clearbit",
        score: 80,
        localizacao: location,
        descricao: data.description || "",
        tipo: "empresa"
      }
    ];
  }

  /**
   * Get mock leads for testing (from built-in database)
   */
  getMockLeads(keywords, location, type) {
    const mockDatabase = [
      // Cinema/Documentário
      {
        nome: "Frameline Completion Fund",
        email: "grants@frameline.org",
        website: "https://frameline.org",
        fonte: "Database",
        score: 95,
        localizacao: "USA",
        tipo: "fundação",
        descricao: "Maior festival LGBTQ+ dos EUA"
      },
      {
        nome: "Sundance Documentary Fund",
        email: "documentary@sundance.org",
        website: "https://sundance.org",
        fonte: "Database",
        score: 95,
        localizacao: "USA",
        tipo: "fundação",
        descricao: "Fundo para documentários independentes"
      },
      {
        nome: "Ford Foundation JustFilms",
        email: "justfilms@fordfoundation.org",
        website: "https://fordfoundation.org",
        fonte: "Database",
        score: 90,
        localizacao: "International",
        tipo: "fundação",
        descricao: "Filmes com impacto social"
      },
      // Healthcare
      {
        nome: "Cleveland Clinic",
        email: "contact@clevelandclinic.org",
        website: "https://clevelandclinic.org",
        fonte: "Database",
        score: 85,
        localizacao: "USA",
        tipo: "hospital",
        descricao: "Clínica especializada"
      },
      // Tech
      {
        nome: "Y Combinator",
        email: "apply@ycombinator.com",
        website: "https://ycombinator.com",
        fonte: "Database",
        score: 90,
        localizacao: "USA",
        tipo: "acelerador",
        descricao: "Acelerador de startups"
      }
    ];

    // Filter by keywords
    const filtered = mockDatabase.filter((lead) => {
      const searchText = `${lead.nome} ${lead.descricao} ${lead.tipo}`.toLowerCase();
      return keywords.toLowerCase().split(" ").some((k) => searchText.includes(k));
    });

    return filtered;
  }

  /**
   * Enrich lead with additional data
   */
  async enrichLead(email, domain) {
    const enriched = {
      email,
      domain,
      enrichedAt: new Date().toISOString(),
      data: {}
    };

    // Try to get more info from Clearbit
    if (this.clearbitKey && domain) {
      try {
        const response = await axios.get(
          `${CLEARBIT_API}/domains/${domain}`,
          {
            headers: { Authorization: `Bearer ${this.clearbitKey}` }
          }
        );
        enriched.data = response.data;
      } catch (err) {
        console.warn("Could not enrich lead");
      }
    }

    return enriched;
  }

  /**
   * Validate leads (check if emails are valid format)
   */
  validateLeads(leads) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return leads
      .filter((lead) => {
        const isValid = emailRegex.test(lead.email);
        if (!isValid) {
          console.warn(`❌ Invalid email: ${lead.email}`);
        }
        return isValid;
      })
      .map((lead) => ({
        ...lead,
        status: "validated",
        validatedAt: new Date().toISOString()
      }));
  }

  /**
   * Export leads to CSV format
   */
  exportToCSV() {
    if (this.results.length === 0) {
      return null;
    }

    const headers = Object.keys(this.results[0]);
    const csv = [
      headers.join(","),
      ...this.results.map((lead) =>
        headers.map((h) => `"${lead[h] || ""}"`).join(",")
      )
    ].join("\n");

    return csv;
  }

  /**
   * Export leads to JSON
   */
  exportToJSON() {
    return JSON.stringify(this.results, null, 2);
  }
}

export default LeadsHunter;
