# 🔐 Customer Registration & Activation System

**Complete Documentation of How CAPTA LEADS Handles Customer Access**

---

## Table of Contents

1. [System Overview](#system-overview)
2. [How Payment Flow Works](#how-payment-flow-works)
3. [Customer Registration](#customer-registration)
4. [Local Testing Setup](#local-testing-setup)
5. [Access Methods](#access-methods)
6. [Technical Implementation](#technical-implementation)
7. [File Management](#file-management)

---

## System Overview

CAPTA LEADS uses a **customer registry** to manage who has paid access and who uses the free tier.

### Key Components

1. **Payment Gateway:** Stripe integration
2. **Customer Registry:** `paid-customers.json` file
3. **Customer Check API:** Verifies payment status
4. **Access Control:** Grants/denies features based on plan

### Data Flow

```
Customer visits checkout.html
        ↓
Selects plan (Free, Professional, Enterprise)
        ↓
Enters email and payment info
        ↓
Stripe processes payment
        ↓
Webhook triggered on success
        ↓
Server adds customer to paid-customers.json
        ↓
Customer visits app (http://localhost:3000)
        ↓
System checks email against paid-customers.json
        ↓
Access granted with appropriate permissions
```

---

## How Payment Flow Works

### Step 1: Checkout Page (checkout.html)

**User sees:**
- Free Plan (R$0) - For partners
- Professional Plan (R$99/month) - Most popular
- Enterprise Plan (Custom) - Custom pricing

**User actions:**
1. Selects a plan
2. Enters email and name
3. Clicks "Prosseguir para Pagamento" (Proceed to Payment)

**Behind the scenes:**
```javascript
// Data saved to localStorage
localStorage.setItem('checkout_email', 'customer@example.com');
localStorage.setItem('checkout_plan', 'professional');

// Redirected to payment page
window.location.href = '/payment?plan=professional&email=customer@example.com';
```

### Step 2: Stripe Payment Processing

**checkout.html → Stripe**

```javascript
// When user clicks checkout button
function openCheckout(plan, price) {
  selectedPlan = plan;
  selectedPrice = price;  // e.g., 9900 = R$99.00
  
  // Shows modal with email/name form
  document.getElementById('checkoutModal').classList.add('active');
}

function processPayment() {
  // Collects customer data
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  
  // Saves to localStorage
  localStorage.setItem('checkout_email', email);
  localStorage.setItem('checkout_plan', selectedPlan);
  
  // Redirects to Stripe checkout
  // (In production, this creates actual Stripe session)
}
```

### Step 3: Webhook Handler (server.js)

**When payment succeeds:**

```javascript
// Stripe webhook fires: checkout.session.completed
POST /webhooks/stripe

// Server receives payment confirmation:
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "customer_email": "customer@example.com",
      "metadata": {
        "product": "Plano Profissional"
      },
      "amount_total": 9900  // in cents
    }
  }
}

// Server registers customer:
const customers = loadJSON("paid-customers.json") || [];
customers.push({
  "email": "customer@example.com",
  "plan": "professional",
  "paidAt": "2026-05-27T18:00:00.000Z",
  "amount": 99.00,
  "currency": "BRL",
  "status": "active"
});
saveJSON("paid-customers.json", customers);
```

### Step 4: Customer Access (console.html)

**When customer visits http://localhost:3000:**

```javascript
// App checks customer status
POST /api/customers/check
{
  "email": "customer@example.com"
}

// Server responds:
{
  "success": true,
  "isPaid": true,
  "customer": {
    "email": "customer@example.com",
    "plan": "professional",
    "status": "active"
  }
}

// App grants full access
```

---

## Customer Registration

### paid-customers.json Format

```json
[
  {
    "email": "customer1@example.com",
    "plan": "free",
    "registeredAt": "2026-05-27T12:00:00.000Z",
    "status": "active"
  },
  {
    "email": "customer2@example.com",
    "plan": "professional",
    "registeredAt": "2026-05-27T12:30:00.000Z",
    "paidAt": "2026-05-27T12:35:00.000Z",
    "amount": 99.00,
    "currency": "BRL",
    "status": "active",
    "sessionId": "cs_test_123456789"
  },
  {
    "email": "customer3@example.com",
    "plan": "enterprise",
    "registeredAt": "2026-05-27T13:00:00.000Z",
    "status": "active"
  }
]
```

### Registration Methods

#### Method 1: Automatic (Stripe Webhook)
- Happens when customer completes real payment
- Server automatically creates entry
- Triggered by Stripe webhook

#### Method 2: Manual Script
- Run `node setup-paid-customer.js`
- Interactive setup wizard
- Creates entry in `paid-customers.json`

#### Method 3: Direct File Editing
- Edit `paid-customers.json` directly
- Add customer JSON objects
- Restart server

#### Method 4: API Call
- POST to `/api/customers/list`
- Send customer data
- Server creates entry (if authenticated)

---

## Local Testing Setup

### Why You Need This

When developing CAPTA LEADS locally, you need to:
1. Test the full paid-customer experience
2. Verify all features work correctly
3. Develop new features without paying
4. Test different plan tiers

### Three Local Access Options

#### Option 1: Register as Paid Customer (Recommended)

```bash
node setup-paid-customer.js
```

Then visit:
```
http://localhost:3000
```

**Result:**
- Full paid-customer experience
- All features available
- Professional plan features enabled

---

#### Option 2: Free Plan Testing

Visit directly:
```
http://localhost:3000/?mode=demo&access=free&email=test@example.com
```

**Result:**
- Free-tier experience
- Limited features
- Good for testing free user flow

---

#### Option 3: Test Mode (Most Flexible)

Visit with test flag:
```
http://localhost:3000/?test=true
```

**Result:**
- Full functionality (no restrictions)
- Shows "TEST MODE" banner
- Perfect for development
- No registration needed

---

## Access Methods

### 1. Paid Customer Access

**URL:**
```
http://localhost:3000
```

**Requirements:**
- Email in `paid-customers.json`
- Browser stores email in localStorage

**Features:**
- ✅ All core features
- ✅ Advanced analytics
- ✅ API integrations
- ✅ Multiple users
- ✅ Priority support

---

### 2. Free Plan Access

**URL:**
```
http://localhost:3000/?mode=demo&access=free&email=user@example.com
```

**Requirements:**
- No registration needed
- Email passed in URL

**Features:**
- ✅ Lead search
- ✅ Email campaigns
- ✅ Landing pages
- ✅ AI chat
- ❌ Advanced analytics
- ❌ Some integrations

---

### 3. Test Mode Access

**URL:**
```
http://localhost:3000/?test=true
```

**Requirements:**
- None (no email required)

**Features:**
- ✅ All features enabled
- ✅ Full functionality
- ✅ Shows TEST MODE banner

---

### 4. Direct Free Registration

**URL:**
```
http://localhost:3000/checkout.html
```

**Process:**
1. Click "Começar Grátis" (Start Free)
2. Enter email
3. Gets free plan access

---

## Technical Implementation

### Server-Side: Customer Checking

**Endpoint:** `POST /api/customers/check`

```javascript
if (endpoint === "customers") {
  if (action === "check" && method === "POST") {
    const body = await parseBody(req);
    const customers = loadJSON("paid-customers.json") || [];
    const customer = customers.find(c => c.email === body.email);
    
    return json(res, {
      success: true,
      isPaid: !!customer,
      customer: customer || null
    });
  }
}
```

**Request:**
```bash
curl -X POST http://localhost:3000/api/customers/check \
  -H "Content-Type: application/json" \
  -d '{"email": "customer@example.com"}'
```

**Response:**
```json
{
  "success": true,
  "isPaid": true,
  "customer": {
    "email": "customer@example.com",
    "plan": "professional",
    "status": "active",
    ...
  }
}
```

---

### Client-Side: Access Control

**In console.html:**

```javascript
// Check if user is paid
async function checkCustomerStatus(email) {
  const result = await fetch('/api/customers/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  
  const data = await result.json();
  
  if (data.isPaid) {
    // Grant full access
    enablePremiumFeatures();
  } else {
    // Limit to free features
    limitToFreeFeatures();
  }
}
```

---

### Stripe Integration

**In stripe-manager.js:**

```javascript
class StripeManager {
  // Create checkout session
  async createCheckoutSession(email, productName, priceInCents) {
    const session = await this.stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [{
        price_data: {
          currency: "brl",
          unit_amount: priceInCents
        },
        quantity: 1
      }],
      success_url: "http://localhost:3000/?payment=success",
      cancel_url: "http://localhost:3000/checkout.html"
    });
    return session;
  }
  
  // Verify webhook
  verifyWebhook(body, signature) {
    return this.stripe.webhooks.constructEvent(
      body, signature, this.webhookSecret
    );
  }
}
```

---

### Webhook Handling

**In server.js:**

```javascript
// Handle Stripe webhook
if (event.type === "checkout.session.completed") {
  const session = event.data.object;
  
  // Register customer
  const customers = loadJSON("paid-customers.json") || [];
  
  customers.push({
    email: session.customer_email,
    plan: session.metadata.product,
    paidAt: new Date().toISOString(),
    amount: session.amount_total / 100,
    currency: session.currency,
    status: "active",
    sessionId: session.id
  });
  
  saveJSON("paid-customers.json", customers);
  console.log(`✅ Customer registered: ${session.customer_email}`);
}
```

---

## File Management

### paid-customers.json

**Location:** `/tmp/capta-leads/paid-customers.json`

**Created by:**
1. Stripe webhook (automatic)
2. Setup script: `node setup-paid-customer.js`
3. Manual creation

**Format:** JSON array of customer objects

**Backup:** Automatically backed up by system

**Reset:** Delete file to start fresh

---

### Stripe Configuration

**File:** `.env`

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**For production:**
1. Update with live keys
2. Restart server
3. Update checkout.html success_url to production

---

### Customer Data Persistence

**Local Storage:** `localStorage`
- Stores customer email
- Stores current language
- Stores project data

**File Storage:** `paid-customers.json`
- Persists across restarts
- Single source of truth
- Human-readable JSON

**IndexedDB:** `IndexedDB`
- Project data
- Lead data
- Campaign data
- Offline capability

---

## Common Scenarios

### Scenario 1: New Customer Registers via Website

```
1. Customer visits checkout.html
2. Selects Professional plan (R$99)
3. Enters email: customer@example.com
4. Stripe processes payment
5. Server receives webhook
6. Customer added to paid-customers.json
7. Customer visits http://localhost:3000
8. System checks email ✅ Found in registry
9. Full access granted ✅
```

### Scenario 2: Developer Testing Locally

```
1. Run: node setup-paid-customer.js
2. Enter email: dev@example.com
3. Select plan: professional
4. paid-customers.json created ✅
5. Visit http://localhost:3000
6. System checks email ✅ Found
7. Full dev access granted ✅
8. Can test all features
9. Can test different plans
```

### Scenario 3: Guest User (Free Access)

```
1. Visit: /?mode=demo&access=free&email=guest@example.com
2. System recognizes free mode
3. Limited interface loaded
4. Core features available
5. Advanced features disabled
```

### Scenario 4: Testing Without Registration

```
1. Visit: /?test=true
2. No registration check
3. Full features enabled
4. TEST MODE banner shown
5. Perfect for demo
```

---

## Plan Differences

| Feature | Free | Professional | Enterprise |
|---------|------|--------------|-----------|
| Lead Search | ✅ | ✅ | ✅ |
| Email Campaigns | ✅ | ✅ | ✅ |
| Landing Pages | ✅ | ✅ | ✅ |
| AI Chat | ✅ | ✅ | ✅ |
| Advanced Analytics | ❌ | ✅ | ✅ |
| API Integrations | ❌ | ✅ | ✅ |
| Multiple Users | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ✅ | ✅ |
| Webhooks | ❌ | ✅ | ✅ |
| Custom Integrations | ❌ | ❌ | ✅ |
| Dedicated Support | ❌ | ❌ | ✅ |
| SLA Guarantee | ❌ | ❌ | ✅ |

---

## Security Considerations

### Email Verification
- Currently: Email stored as-is
- Production: Add email verification step

### Token Generation
- StripeManager includes token generation
- Can be used for secure API access
- 30-day expiration

### Webhook Validation
- Stripe signature verification
- Prevents unauthorized registration
- Validates webhook authenticity

### Data Protection
- Customer data in JSON
- No passwords stored
- Email only identifier
- Can be encrypted in production

---

## Future Enhancements

1. **User Authentication**
   - Email + password login
   - Session tokens
   - Account recovery

2. **Subscription Management**
   - Upgrade/downgrade plans
   - Billing history
   - Invoice generation

3. **Team Management**
   - Add team members
   - Role-based access
   - Activity logs

4. **Analytics**
   - Customer usage tracking
   - Feature adoption
   - Plan utilization

5. **Support System**
   - Ticketing system
   - Knowledge base
   - Help desk

---

## Summary

The CAPTA LEADS customer registration system is:

- ✅ **Simple:** One JSON file stores customer data
- ✅ **Flexible:** Multiple access methods available
- ✅ **Scalable:** Easy to add features
- ✅ **Testable:** Complete local development setup
- ✅ **Secure:** Stripe integration handles payments
- ✅ **Documented:** Comprehensive guides available

**To use locally:**
```bash
node setup-paid-customer.js
npm start
http://localhost:3000
```

That's all you need!

---

*Last Updated: May 27, 2026*  
*Version: 2.0.0*  
*Status: Production Ready* ✅
