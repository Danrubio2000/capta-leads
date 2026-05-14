/**
 * CAPTA LEADS - Email Sender
 * Send campaigns to leads via Resend
 */

import { Resend } from "resend";

class EmailSender {
  constructor(config = {}) {
    this.resendKey = config.resendKey || process.env.RESEND_API_KEY || "re_test_key";
    // Only initialize Resend if we have a real key
    if (this.resendKey && this.resendKey !== "re_test_key") {
      this.resend = new Resend(this.resendKey);
    } else {
      this.resend = null;
    }
    this.fromEmail = config.fromEmail || "noreply@capta.leads";
    this.fromName = config.fromName || "CAPTA Leads";
    this.campaigns = [];
  }

  /**
   * Create new campaign
   */
  createCampaign(campaignData) {
    const campaign = {
      id: Date.now().toString(),
      ...campaignData,
      createdAt: new Date().toISOString(),
      status: "draft",
      recipients: campaignData.recipients || [],
      sentCount: 0,
      openedCount: 0,
      clickedCount: 0
    };

    this.campaigns.push(campaign);
    return campaign;
  }

  /**
   * Send campaign to selected leads
   * @param {string} campaignId - Campaign ID
   * @param {Array} leads - List of leads to send to
   * @returns {Promise<Object>} Send result
   */
  async sendCampaign(campaignId, leads) {
    const campaign = this.campaigns.find((c) => c.id === campaignId);
    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }

    console.log(`📧 Sending campaign "${campaign.subject}" to ${leads.length} leads...`);

    const results = {
      success: 0,
      failed: 0,
      errors: [],
      details: []
    };

    // Send emails sequentially with delay to avoid rate limits
    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];

      try {
        // Personalize email
        const personalizedBody = this.personalizeEmail(
          campaign.body,
          lead
        );

        // Send via Resend
        if (this.resend && this.resendKey && this.resendKey !== "re_test_key") {
          const response = await this.resend.emails.send({
            from: `${campaign.fromName} <${campaign.fromEmail}>`,
            to: lead.email,
            subject: campaign.subject,
            html: this.bodyToHTML(personalizedBody),
            text: personalizedBody
          });

          if (response.error) {
            throw new Error(response.error.message);
          }
        } else {
          // Test mode
          console.log(`✅ [TEST] Email to ${lead.email}`);
        }

        results.success++;
        results.details.push({
          email: lead.email,
          status: "sent",
          timestamp: new Date().toISOString()
        });

        // Delay to avoid rate limiting (100ms between emails)
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        results.failed++;
        results.errors.push({
          email: lead.email,
          error: error.message
        });

        console.error(`❌ Failed to send to ${lead.email}:`, error.message);
      }
    }

    // Update campaign
    campaign.status = "sent";
    campaign.sentCount = results.success;
    campaign.sentAt = new Date().toISOString();

    console.log(
      `\n✅ Campaign sent: ${results.success} success, ${results.failed} failed`
    );

    return results;
  }

  /**
   * Personalize email with lead data
   */
  personalizeEmail(template, lead) {
    let personalized = template;

    // Replace common variables
    personalized = personalized.replace(/{nome}/g, lead.nome || lead.name || "");
    personalized = personalized.replace(/{empresa}/g, lead.empresa || lead.company || "");
    personalized = personalized.replace(/{email}/g, lead.email || "");
    personalized = personalized.replace(/{telefone}/g, lead.telefone || lead.phone || "");

    return personalized;
  }

  /**
   * Convert plain text to HTML
   */
  bodyToHTML(text) {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto;">
            ${text
              .split("\n\n")
              .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
              .join("")}
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Test email send
   */
  async testEmail(toEmail) {
    console.log(`🧪 Testing email to ${toEmail}...`);

    try {
      if (this.resend && this.resendKey && this.resendKey !== "re_test_key") {
        const response = await this.resend.emails.send({
          from: `${this.fromName} <${this.fromEmail}>`,
          to: toEmail,
          subject: "🧪 Teste CAPTA Leads",
          html: `
            <h2>Teste de Email</h2>
            <p>Este é um email de teste do CAPTA Leads.</p>
            <p>Se você recebeu este email, a configuração está funcionando! ✅</p>
          `,
          text: "Email de teste do CAPTA Leads"
        });

        if (response.error) {
          throw new Error(response.error.message);
        }

        console.log("✅ Test email sent successfully!");
        return { success: true };
      } else {
        console.log("⚠️ RESEND_API_KEY not configured. Test mode only.");
        return { success: false, message: "API key not configured" };
      }
    } catch (error) {
      console.error("❌ Test email failed:", error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get campaign status
   */
  getCampaignStatus(campaignId) {
    const campaign = this.campaigns.find((c) => c.id === campaignId);
    if (!campaign) {
      return null;
    }

    return {
      id: campaign.id,
      subject: campaign.subject,
      status: campaign.status,
      createdAt: campaign.createdAt,
      sentAt: campaign.sentAt || null,
      sentCount: campaign.sentCount,
      openedCount: campaign.openedCount,
      clickedCount: campaign.clickedCount,
      totalRecipients: campaign.recipients.length
    };
  }

  /**
   * List all campaigns
   */
  listCampaigns() {
    return this.campaigns.map((campaign) => ({
      id: campaign.id,
      subject: campaign.subject,
      status: campaign.status,
      createdAt: campaign.createdAt,
      sentCount: campaign.sentCount,
      recipients: campaign.recipients.length
    }));
  }

  /**
   * Update email settings
   */
  updateSettings(newSettings) {
    if (newSettings.fromEmail) this.fromEmail = newSettings.fromEmail;
    if (newSettings.fromName) this.fromName = newSettings.fromName;
    if (newSettings.resendKey) {
      this.resendKey = newSettings.resendKey;
      this.resend = new Resend(newSettings.resendKey);
    }

    return {
      fromEmail: this.fromEmail,
      fromName: this.fromName,
      configured: !!this.resendKey
    };
  }

  /**
   * Get current settings
   */
  getSettings() {
    return {
      fromEmail: this.fromEmail,
      fromName: this.fromName,
      resendConfigured: !!this.resendKey && this.resendKey !== "re_test_key",
      apiKeyExists: !!this.resendKey
    };
  }
}

export default EmailSender;
