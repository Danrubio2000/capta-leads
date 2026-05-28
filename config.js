/**
 * CAPTA LEADS - Configuration
 * Industry-specific templates and default settings
 */

export const INDUSTRIES = {
  generic: {
    name: "Genérico",
    description: "Configuração padrão para qualquer negócio",
    color: "#4285F4",
    icon: "⚙️",
    templates: {
      email: "Olá {nome},\n\nGostaria de conversar com você sobre uma oportunidade...",
      landing: "Sua Solução Aqui",
      searchKeywords: ["empresa", "negócio", "serviço"]
    }
  },
  cinema: {
    name: "Cinema & Audiovisual",
    description: "Especializado em financiamento de filmes e documentários",
    color: "#FF6B6B",
    icon: "🎬",
    templates: {
      email: "Olá {nome},\n\nTenho um projeto de documentário/filme que acredito que sua fundação poderia apoiar...",
      landing: "Seu Documentário Merece Financiamento",
      searchKeywords: ["fundação filme", "documentary grant", "film funding"]
    }
  },
  arte: {
    name: "Arte & Cultura",
    description: "Para artistas, galerias e projetos culturais",
    color: "#9B59B6",
    icon: "🎨",
    templates: {
      email: "Olá {nome},\n\nSou artista e gostaria de conversar sobre uma colaboração ou apoio...",
      landing: "Sua Arte Precisa de Apoio",
      searchKeywords: ["arte grant", "cultural funding", "artist residency"]
    }
  },
  healthcare: {
    name: "Saúde & Medicina",
    description: "Para clínicas, hospitais e profissionais de saúde",
    color: "#27AE60",
    icon: "🏥",
    templates: {
      email: "Olá {nome},\n\nGostaria de oferecer nossos serviços de saúde à sua clínica/hospital...",
      landing: "Saúde de Qualidade para Todos",
      searchKeywords: ["clinic", "medical center", "healthcare provider"]
    }
  },
  tech: {
    name: "Tecnologia",
    description: "Para startups e empresas de software",
    color: "#3498DB",
    icon: "💻",
    templates: {
      email: "Olá {nome},\n\nTemos uma solução tech que pode revolucionar seu negócio...",
      landing: "Transforme seu Negócio com Tech",
      searchKeywords: ["software company", "tech startup", "SaaS"]
    }
  },
  ecommerce: {
    name: "E-commerce & Varejo",
    description: "Para lojas online e negócios de varejo",
    color: "#E74C3C",
    icon: "🛍️",
    templates: {
      email: "Olá {nome},\n\nTemos produtos que seus clientes vão adorar...",
      landing: "Sua Loja Online Completa",
      searchKeywords: ["ecommerce", "online store", "retail business"]
    }
  },
  realestate: {
    name: "Imóveis",
    description: "Para corretoras e desenvolvedoras imobiliárias",
    color: "#16A085",
    icon: "🏠",
    templates: {
      email: "Olá {nome},\n\nTenho propriedades excelentes para sua carteira...",
      landing: "Seu Imóvel dos Sonhos",
      searchKeywords: ["real estate", "property", "developer"]
    }
  },
  education: {
    name: "Educação",
    description: "Para escolas, universidades e plataformas educacionais",
    color: "#F39C12",
    icon: "🎓",
    templates: {
      email: "Olá {nome},\n\nTenho uma solução educacional inovadora...",
      landing: "Educação de Excelência",
      searchKeywords: ["university", "school", "scholarship", "course"]
    }
  }
};

export const LANDING_PAGE_FEATURES = {
  header: {
    title: true,
    subtitle: true,
    backgroundImage: true,
    logo: true,
    video: true
  },
  hero: {
    mainHeadline: true,
    subHeadline: true,
    cta: true,
    backgroundImage: true,
    video: true
  },
  features: {
    count: 3,
    icon: true,
    title: true,
    description: true,
    image: true
  },
  testimonials: {
    count: 3,
    name: true,
    title: true,
    text: true,
    avatar: true
  },
  cta: {
    headline: true,
    description: true,
    button: true,
    backgroundImage: true
  },
  footer: {
    links: true,
    social: true,
    copyright: true
  }
};

export const EMAIL_TEMPLATES = {
  introduction: {
    name: "Apresentação",
    subject: "Oportunidade para {empresa}",
    body: "Olá {nome},\n\nGostaria de apresentar uma oportunidade que acredito será valiosa para {empresa}...",
    variables: ["nome", "empresa", "seu_nome"]
  },
  followup: {
    name: "Follow-up",
    subject: "Re: Oportunidade para {empresa}",
    body: "Olá {nome},\n\nSeguindo nossa conversa anterior...",
    variables: ["nome", "empresa"]
  },
  partnership: {
    name: "Parceria",
    subject: "Proposta de Parceria",
    body: "Olá {nome},\n\nGostaria de discutir uma possível parceria entre nossas organizações...",
    variables: ["nome", "empresa", "seu_nome"]
  },
  sponsorship: {
    name: "Patrocínio",
    subject: "Oportunidade de Patrocínio",
    body: "Olá {nome},\n\nTemos um projeto especial que gostaríamos de contar com o apoio de {empresa}...",
    variables: ["nome", "empresa", "projeto"]
  }
};

export const LEAD_SOURCES = {
  hunter: {
    name: "Hunter.io",
    description: "Busca de emails corporativos",
    free_limit: 100,
    priority: 1
  },
  clearbit: {
    name: "Clearbit",
    description: "Dados corporativos completos",
    free_limit: 100,
    priority: 2
  },
  google: {
    name: "Google Search API",
    description: "Busca web genérica",
    free_limit: 100,
    priority: 3
  },
  manual: {
    name: "Importação Manual",
    description: "CSV, JSON ou entrada manual",
    free_limit: null,
    priority: 0
  }
};

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATA_DIR: "./data",
  UPLOADS_DIR: "./uploads",
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  CAMPAIGN_RETENTION: 90 // days
};
