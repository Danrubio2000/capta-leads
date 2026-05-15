// Comprehensive translation system for CAPTA LEADS secondary pages
const translationsPages = {
  pt: {},
  en: {},
  es: {},
  fr: {}
};

// Complete text mapping for all page content
const allTranslations = {
  pt: {
    "📚 Tutorial Completo - CAPTA LEADS": "📚 Tutorial Completo - CAPTA LEADS",
    "Guia passo a passo para dominar a plataforma": "Guia passo a passo para dominar a plataforma",
    "📋 Sumário": "📋 Sumário",
    "Introdução": "Introdução",
    "Setup Inicial": "Setup Inicial",
    "Como Buscar Leads": "Como Buscar Leads",
    "Criar Campanhas de Email": "Criar Campanhas de Email",
    "Criar Landing Pages": "Criar Landing Pages",
    "Recursos Avançados": "Recursos Avançados",
    "Perguntas Frequentes": "Perguntas Frequentes",
    "🎯 Introdução": "🎯 Introdução",
    "⚙️ Setup Inicial (5 minutos)": "⚙️ Setup Inicial (5 minutos)",
    "🎯 Como Buscar Leads (10 minutos)": "🎯 Como Buscar Leads (10 minutos)",
    "📧 Criar Campanhas de Email (10 minutos)": "📧 Criar Campanhas de Email (10 minutos)",
    "🎨 Criar Landing Pages (10 minutos)": "🎨 Criar Landing Pages (10 minutos)",
    "🚀 Recursos Avançados": "🚀 Recursos Avançados",
    "❓ Perguntas Frequentes": "❓ Perguntas Frequentes",
    "CAPTA LEADS - Tutorial Completo": "CAPTA LEADS - Tutorial Completo",
    "Desenvolvido com ❤️ para pequenos negócios": "Desenvolvido com ❤️ para pequenos negócios",
    "🎬 CAPTA LEADS - Demonstração": "🎬 CAPTA LEADS - Demonstração",
    "Veja como usar a plataforma para gerar leads, enviar campanhas e criar landing pages": "Veja como usar a plataforma para gerar leads, enviar campanhas e criar landing pages",
    "Bem-vindo ao CAPTA LEADS": "Bem-vindo ao CAPTA LEADS",
    "A solução completa e integrada para geração de leads, email marketing e criação de landing pages": "A solução completa e integrada para geração de leads, email marketing e criação de landing pages"
  },
  en: {
    "📚 Tutorial Completo - CAPTA LEADS": "📚 Complete Tutorial - CAPTA LEADS",
    "Guia passo a passo para dominar a plataforma": "Step-by-step guide to master the platform",
    "📋 Sumário": "📋 Table of Contents",
    "Introdução": "Introduction",
    "Setup Inicial": "Initial Setup",
    "Como Buscar Leads": "How to Search Leads",
    "Criar Campanhas de Email": "Create Email Campaigns",
    "Criar Landing Pages": "Create Landing Pages",
    "Recursos Avançados": "Advanced Features",
    "Perguntas Frequentes": "Frequently Asked Questions",
    "🎯 Introdução": "🎯 Introduction",
    "⚙️ Setup Inicial (5 minutos)": "⚙️ Initial Setup (5 minutes)",
    "🎯 Como Buscar Leads (10 minutos)": "🎯 How to Search Leads (10 minutes)",
    "📧 Criar Campanhas de Email (10 minutos)": "📧 Create Email Campaigns (10 minutes)",
    "🎨 Criar Landing Pages (10 minutos)": "🎨 Create Landing Pages (10 minutes)",
    "🚀 Recursos Avançados": "🚀 Advanced Features",
    "❓ Perguntas Frequentes": "❓ Frequently Asked Questions",
    "CAPTA LEADS - Tutorial Completo": "CAPTA LEADS - Complete Tutorial",
    "Desenvolvido com ❤️ para pequenos negócios": "Made with ❤️ for small businesses",
    "🎬 CAPTA LEADS - Demonstração": "🎬 CAPTA LEADS - Demo",
    "Veja como usar a plataforma para gerar leads, enviar campanhas e criar landing pages": "See how to use the platform to generate leads, send campaigns and create landing pages",
    "Bem-vindo ao CAPTA LEADS": "Welcome to CAPTA LEADS",
    "A solução completa e integrada para geração de leads, email marketing e criação de landing pages": "The complete and integrated solution for lead generation, email marketing and landing page creation"
  },
  es: {
    "📚 Tutorial Completo - CAPTA LEADS": "📚 Tutorial Completo - CAPTA LEADS",
    "Guia passo a passo para dominar a plataforma": "Guía paso a paso para dominar la plataforma",
    "📋 Sumário": "📋 Tabla de Contenidos",
    "Introdução": "Introducción",
    "Setup Inicial": "Configuración Inicial",
    "Como Buscar Leads": "Cómo Buscar Leads",
    "Criar Campanhas de Email": "Crear Campañas de Email",
    "Criar Landing Pages": "Crear Landing Pages",
    "Recursos Avançados": "Funcionalidades Avanzadas",
    "Perguntas Frequentes": "Preguntas Frecuentes",
    "🎯 Introdução": "🎯 Introducción",
    "⚙️ Setup Inicial (5 minutos)": "⚙️ Configuración Inicial (5 minutos)",
    "🎯 Como Buscar Leads (10 minutos)": "🎯 Cómo Buscar Leads (10 minutos)",
    "📧 Criar Campanhas de Email (10 minutos)": "📧 Crear Campañas de Email (10 minutos)",
    "🎨 Criar Landing Pages (10 minutos)": "🎨 Crear Landing Pages (10 minutos)",
    "🚀 Recursos Avançados": "🚀 Funcionalidades Avanzadas",
    "❓ Perguntas Frequentes": "❓ Preguntas Frecuentes",
    "CAPTA LEADS - Tutorial Completo": "CAPTA LEADS - Tutorial Completo",
    "Desenvolvido com ❤️ para pequenos negócios": "Hecho con ❤️ para pequeños negocios",
    "🎬 CAPTA LEADS - Demonstração": "🎬 CAPTA LEADS - Demostración",
    "Veja como usar a plataforma para gerar leads, enviar campanhas e criar landing pages": "Vea cómo usar la plataforma para generar leads, enviar campañas y crear landing pages",
    "Bem-vindo ao CAPTA LEADS": "Bienvenido a CAPTA LEADS",
    "A solução completa e integrada para geração de leads, email marketing e criação de landing pages": "La solución completa e integrada para generación de leads, email marketing y creación de landing pages"
  },
  fr: {
    "📚 Tutorial Completo - CAPTA LEADS": "📚 Tutoriel Complet - CAPTA LEADS",
    "Guia passo a passo para dominar a plataforma": "Guide étape par étape pour maîtriser la plateforme",
    "📋 Sumário": "📋 Table des Matières",
    "Introdução": "Introduction",
    "Setup Inicial": "Configuration Initiale",
    "Como Buscar Leads": "Comment Rechercher des Leads",
    "Criar Campanhas de Email": "Créer des Campagnes Email",
    "Criar Landing Pages": "Créer des Landing Pages",
    "Recursos Avançados": "Fonctionnalités Avancées",
    "Perguntas Frequentes": "Questions Fréquemment Posées",
    "🎯 Introdução": "🎯 Introduction",
    "⚙️ Setup Inicial (5 minutos)": "⚙️ Configuration Initiale (5 minutes)",
    "🎯 Como Buscar Leads (10 minutos)": "🎯 Comment Rechercher des Leads (10 minutes)",
    "📧 Criar Campanhas de Email (10 minutos)": "📧 Créer des Campagnes Email (10 minutes)",
    "🎨 Criar Landing Pages (10 minutos)": "🎨 Créer des Landing Pages (10 minutes)",
    "🚀 Recursos Avançados": "🚀 Fonctionnalités Avancées",
    "❓ Perguntas Frequentes": "❓ Questions Fréquemment Posées",
    "CAPTA LEADS - Tutorial Completo": "CAPTA LEADS - Tutoriel Complet",
    "Desenvolvido com ❤️ para pequenos negócios": "Fait avec ❤️ pour les petites entreprises",
    "🎬 CAPTA LEADS - Demonstração": "🎬 CAPTA LEADS - Démonstration",
    "Veja como usar a plataforma para gerar leads, enviar campanhas e criar landing pages": "Voyez comment utiliser la plateforme pour générer des leads, envoyer des campagnes et créer des landing pages",
    "Bem-vindo ao CAPTA LEADS": "Bienvenue sur CAPTA LEADS",
    "A solução completa e integrada para geração de leads, email marketing e criação de landing pages": "La solution complète et intégrée pour la génération de leads, le email marketing et la création de landing pages"
  }
};

// Replace all text in page with translations
function applyPageTranslations(lang = 'pt') {
  if (!allTranslations[lang]) lang = 'pt';
  const translations = allTranslations[lang];

  // Update page title
  document.title = translations["📚 Tutorial Completo - CAPTA LEADS"] || document.title;

  // Replace all text in body using innerHTML manipulation
  let html = document.documentElement.innerHTML;

  for (const [ptText, translatedText] of Object.entries(translations)) {
    // Use global replace for all occurrences
    const regex = new RegExp(ptText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    html = html.replace(regex, translatedText);
  }

  document.documentElement.innerHTML = html;

  // Re-attach language selector event listener
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = lang;
    langSelector.removeEventListener('change', handleLanguageChange);
    langSelector.addEventListener('change', handleLanguageChange);
  }

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Save preference
  localStorage.setItem('preferredLanguage', lang);
}

function handleLanguageChange(e) {
  applyPageTranslations(e.target.value);
}

// Auto-apply translations on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLanguage') || 'pt';
  applyPageTranslations(savedLang);

  // Attach event listener to language selector
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.addEventListener('change', handleLanguageChange);
  }
});
