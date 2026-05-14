/**
 * Stripe Payment Manager
 * Handles payment processing and subscription management
 */

import Stripe from "stripe";
import crypto from "crypto";

class StripeManager {
  constructor(apiKey, webhookSecret) {
    this.stripe = new Stripe(apiKey);
    this.webhookSecret = webhookSecret;
    this.customers = new Map();
  }

  /**
   * Create checkout session for payment
   */
  async createCheckoutSession(email, productName, priceInCents = 8000) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "brl",
              product_data: {
                name: productName,
                description: "Acesso mensal ao " + productName
              },
              unit_amount: priceInCents
            },
            quantity: 1
          }
        ],
        mode: "payment",
        success_url: "{success_url}",
        cancel_url: "{cancel_url}",
        customer_email: email,
        metadata: {
          email: email,
          product: productName
        }
      });

      return session;
    } catch (error) {
      console.error("Stripe checkout error:", error);
      throw error;
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhook(body, signature) {
    try {
      return this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.webhookSecret
      );
    } catch (error) {
      console.error("Webhook verification error:", error);
      return null;
    }
  }

  /**
   * Generate auth token for customer
   */
  generateAuthToken(email) {
    const token = crypto
      .randomBytes(32)
      .toString("hex");
    const hash = crypto
      .createHash("sha256")
      .update(email + token)
      .digest("hex");

    return {
      token,
      hash,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
    };
  }

  /**
   * Validate auth token
   */
  validateAuthToken(email, hash) {
    // In production, this should be checked against database
    // For now, we'll do a simple validation
    return true;
  }
}

export default StripeManager;
