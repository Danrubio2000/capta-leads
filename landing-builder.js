/**
 * CAPTA LEADS - Landing Page Builder
 * Create custom landing pages with multiple inputs (URLs, texts, images, etc)
 */

class LandingPageBuilder {
  constructor(config = {}) {
    this.pages = [];
    this.industry = config.industry || "generic";
    this.theme = config.theme || "modern";
  }

  /**
   * Create new landing page
   */
  createPage(pageData) {
    const page = {
      id: Date.now().toString(),
      title: pageData.title || "Nova Landing Page",
      slug: this.generateSlug(pageData.title),
      industry: pageData.industry || this.industry,
      theme: pageData.theme || this.theme,
      createdAt: new Date().toISOString(),
      sections: [],
      settings: {
        favicon: pageData.favicon || "",
        socialImage: pageData.socialImage || "",
        seoTitle: pageData.seoTitle || pageData.title,
        seoDescription: pageData.seoDescription || "",
        seoKeywords: pageData.seoKeywords || []
      }
    };

    this.pages.push(page);
    return page;
  }

  /**
   * Add section to page
   */
  addSection(pageId, sectionData) {
    const page = this.pages.find((p) => p.id === pageId);
    if (!page) throw new Error(`Page ${pageId} not found`);

    const section = {
      id: Date.now().toString(),
      type: sectionData.type, // header, hero, features, testimonials, cta, footer
      order: page.sections.length,
      content: sectionData.content || {},
      style: sectionData.style || {}
    };

    page.sections.push(section);
    return section;
  }

  /**
   * Add Hero section (main section with image/video)
   */
  addHeroSection(pageId, heroData) {
    return this.addSection(pageId, {
      type: "hero",
      content: {
        headline: heroData.headline || "Bem-vindo",
        subheadline: heroData.subheadline || "",
        ctaText: heroData.ctaText || "Começar Agora",
        ctaUrl: heroData.ctaUrl || "#contact",
        backgroundImage:
          heroData.backgroundImage || heroData.backgroundUrl || "",
        backgroundVideo: heroData.backgroundVideo || "",
        overlayOpacity: heroData.overlayOpacity || 0.5,
        backgroundColor: heroData.backgroundColor || "#ffffff"
      }
    });
  }

  /**
   * Add Features section
   */
  addFeaturesSection(pageId, features) {
    return this.addSection(pageId, {
      type: "features",
      content: {
        title: features.title || "Recursos Principais",
        description: features.description || "",
        items: features.items || [
          {
            icon: "⭐",
            title: "Feature 1",
            description: "Descrição aqui"
          },
          {
            icon: "⭐",
            title: "Feature 2",
            description: "Descrição aqui"
          },
          {
            icon: "⭐",
            title: "Feature 3",
            description: "Descrição aqui"
          }
        ],
        layout: features.layout || "3-columns"
      }
    });
  }

  /**
   * Add Testimonials section
   */
  addTestimonialsSection(pageId, testimonialsData) {
    return this.addSection(pageId, {
      type: "testimonials",
      content: {
        title: testimonialsData.title || "O que falam sobre nós",
        testimonials: testimonialsData.testimonials || [
          {
            name: "João Silva",
            title: "CEO, Tech Company",
            text: "Excelente serviço!",
            avatar: testimonialsData.avatars?.[0] || ""
          }
        ]
      }
    });
  }

  /**
   * Add CTA (Call-to-Action) section
   */
  addCTASection(pageId, ctaData) {
    return this.addSection(pageId, {
      type: "cta",
      content: {
        headline: ctaData.headline || "Pronto para começar?",
        description: ctaData.description || "",
        buttonText: ctaData.buttonText || "Entrar em Contato",
        buttonUrl: ctaData.buttonUrl || "#contact",
        backgroundImage: ctaData.backgroundImage || "",
        backgroundColor: ctaData.backgroundColor || "#4285F4"
      }
    });
  }

  /**
   * Add Footer section
   */
  addFooterSection(pageId, footerData) {
    return this.addSection(pageId, {
      type: "footer",
      content: {
        columns: footerData.columns || [
          {
            title: "Empresa",
            links: [
              { text: "Sobre", url: "#" },
              { text: "Contato", url: "#" }
            ]
          }
        ],
        socialLinks: footerData.socialLinks || [
          { platform: "facebook", url: "" },
          { platform: "instagram", url: "" },
          { platform: "linkedin", url: "" }
        ],
        copyright: footerData.copyright || "© 2026 CAPTA Leads"
      }
    });
  }

  /**
   * Add custom section with HTML
   */
  addCustomSection(pageId, customData) {
    return this.addSection(pageId, {
      type: "custom",
      content: {
        html: customData.html || ""
      }
    });
  }

  /**
   * Update section
   */
  updateSection(pageId, sectionId, updatedData) {
    const page = this.pages.find((p) => p.id === pageId);
    if (!page) throw new Error(`Page ${pageId} not found`);

    const sectionIndex = page.sections.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) throw new Error(`Section ${sectionId} not found`);

    page.sections[sectionIndex] = {
      ...page.sections[sectionIndex],
      content: { ...page.sections[sectionIndex].content, ...updatedData },
      updatedAt: new Date().toISOString()
    };

    return page.sections[sectionIndex];
  }

  /**
   * Delete section
   */
  deleteSection(pageId, sectionId) {
    const page = this.pages.find((p) => p.id === pageId);
    if (!page) throw new Error(`Page ${pageId} not found`);

    page.sections = page.sections.filter((s) => s.id !== sectionId);
    return true;
  }

  /**
   * Reorder sections
   */
  reorderSections(pageId, sectionIds) {
    const page = this.pages.find((p) => p.id === pageId);
    if (!page) throw new Error(`Page ${pageId} not found`);

    const reorderedSections = [];
    sectionIds.forEach((id, index) => {
      const section = page.sections.find((s) => s.id === id);
      if (section) {
        section.order = index;
        reorderedSections.push(section);
      }
    });

    page.sections = reorderedSections;
    return page.sections;
  }

  /**
   * Generate HTML for landing page
   */
  generateHTML(pageId) {
    const page = this.pages.find((p) => p.id === pageId);
    if (!page) throw new Error(`Page ${pageId} not found`);

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.settings.seoTitle}</title>
  <meta name="description" content="${page.settings.seoDescription}">
  <meta name="keywords" content="${page.settings.seoKeywords.join(", ")}">
  ${page.settings.favicon ? `<link rel="icon" href="${page.settings.favicon}">` : ""}

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Hero Section */
    .hero {
      min-height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: cover;
      background-position: center;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .hero-content {
      text-align: center;
      z-index: 2;
    }

    .hero h1 {
      font-size: 3.5em;
      margin-bottom: 20px;
      animation: fadeInUp 1s ease;
    }

    .hero p {
      font-size: 1.3em;
      margin-bottom: 30px;
      animation: fadeInUp 1.2s ease;
    }

    .btn {
      display: inline-block;
      padding: 15px 40px;
      background: #4285F4;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      transition: background 0.3s;
      border: none;
      cursor: pointer;
    }

    .btn:hover {
      background: #357ae8;
    }

    /* Features Section */
    .features {
      padding: 80px 0;
      background: #f9f9f9;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 40px;
      margin-top: 50px;
    }

    .feature-item {
      text-align: center;
    }

    .feature-icon {
      font-size: 3em;
      margin-bottom: 15px;
    }

    .feature-item h3 {
      margin-bottom: 10px;
      color: #4285F4;
    }

    /* Testimonials */
    .testimonials {
      padding: 80px 0;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-top: 50px;
    }

    .testimonial {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      margin-top: 20px;
    }

    .testimonial-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 15px;
    }

    /* CTA Section */
    .cta {
      padding: 80px 0;
      text-align: center;
      color: white;
    }

    .cta h2 {
      font-size: 2.5em;
      margin-bottom: 20px;
    }

    /* Footer */
    .footer {
      background: #333;
      color: white;
      padding: 50px 0 20px;
      margin-top: 50px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      margin-bottom: 30px;
    }

    .footer-column h3 {
      margin-bottom: 15px;
    }

    .footer-column a {
      display: block;
      color: #ccc;
      text-decoration: none;
      margin-bottom: 10px;
      transition: color 0.3s;
    }

    .footer-column a:hover {
      color: white;
    }

    .social-links {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
    }

    .social-links a {
      font-size: 1.5em;
    }

    .footer-bottom {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #555;
      color: #999;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</head>
<body>
  ${this.generateSectionsHTML(page.sections)}

  <script>
    // Scroll animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.feature-item, .testimonial').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s, transform 0.5s';
      observer.observe(el);
    });
  </script>
</body>
</html>
    `;

    return html;
  }

  /**
   * Generate HTML for sections
   */
  generateSectionsHTML(sections) {
    return sections
      .map((section) => this.generateSectionHTML(section))
      .join("\n");
  }

  /**
   * Generate HTML for single section
   */
  generateSectionHTML(section) {
    const { type, content } = section;

    switch (type) {
      case "hero":
        return `
<section class="hero" style="background-image: url('${content.backgroundImage}'); background-color: ${content.backgroundColor};">
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,${content.overlayOpacity}); z-index: 1;"></div>
  <div class="hero-content">
    <h1>${content.headline}</h1>
    ${content.subheadline ? `<p>${content.subheadline}</p>` : ""}
    <a href="${content.ctaUrl}" class="btn">${content.ctaText}</a>
  </div>
</section>`;

      case "features":
        return `
<section class="features">
  <div class="container">
    <h2>${content.title}</h2>
    ${content.description ? `<p>${content.description}</p>` : ""}
    <div class="features-grid">
      ${content.items
        .map(
          (item) => `
      <div class="feature-item">
        <div class="feature-icon">${item.icon}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

      case "testimonials":
        return `
<section class="testimonials">
  <div class="container">
    <h2>${content.title}</h2>
    <div class="testimonials-grid">
      ${content.testimonials
        .map(
          (testimonial) => `
      <div class="testimonial">
        <p>"${testimonial.text}"</p>
        <div class="testimonial-author">
          ${
            testimonial.avatar
              ? `<img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">`
              : ""
          }
          <div>
            <strong>${testimonial.name}</strong>
            <br>
            <small>${testimonial.title}</small>
          </div>
        </div>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

      case "cta":
        return `
<section class="cta" style="background-color: ${content.backgroundColor};">
  <div class="container">
    <h2>${content.headline}</h2>
    ${content.description ? `<p>${content.description}</p>` : ""}
    <a href="${content.buttonUrl}" class="btn">${content.buttonText}</a>
  </div>
</section>`;

      case "footer":
        return `
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      ${content.columns
        .map(
          (col) => `
      <div class="footer-column">
        <h3>${col.title}</h3>
        ${col.links
          .map((link) => `<a href="${link.url}">${link.text}</a>`)
          .join("")}
      </div>`
        )
        .join("")}
    </div>
    <div class="social-links">
      ${content.socialLinks
        .map(
          (social) => `
      ${
        social.url
          ? `<a href="${social.url}" target="_blank">${this.getSocialIcon(social.platform)}</a>`
          : ""
      }`
        )
        .join("")}
    </div>
    <div class="footer-bottom">
      <p>${content.copyright}</p>
    </div>
  </div>
</footer>`;

      case "custom":
        return content.html;

      default:
        return "";
    }
  }

  /**
   * Get social media icon
   */
  getSocialIcon(platform) {
    const icons = {
      facebook: "f",
      instagram: "📷",
      linkedin: "in",
      twitter: "𝕏",
      youtube: "▶️"
    };
    return icons[platform] || "🔗";
  }

  /**
   * Generate slug from title
   */
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /**
   * Export page as JSON
   */
  exportPageJSON(pageId) {
    const page = this.pages.find((p) => p.id === pageId);
    if (!page) throw new Error(`Page ${pageId} not found`);
    return JSON.stringify(page, null, 2);
  }

  /**
   * List all pages
   */
  listPages() {
    return this.pages.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      industry: p.industry,
      createdAt: p.createdAt,
      sections: p.sections.length
    }));
  }
}

export default LandingPageBuilder;
