# 🎯 CAPTA LEADS - Local Setup for Paid Customers

**Purpose:** Get CAPTA LEADS running locally exactly as paying customers experience it after checkout.

**Status:** ✅ Ready to Use  
**Last Updated:** May 27, 2026

---

## 📋 Quick Start (5 Minutes)

### Option 1: Automatic Setup (Easiest)
```bash
cd /tmp/capta-leads

# Run setup script to register as paid customer
node setup-paid-customer.js
```

This will:
- ✅ Ask for your email address
- ✅ Register you as a paid customer
- ✅ Start the server
- ✅ Open the app in your browser

### Option 2: Manual Setup
```bash
cd /tmp/capta-leads

# 1. Start the server
npm start

# 2. Open in browser
http://localhost:3000

# 3. Use as free customer or test mode
```

---

## 🔑 Understanding the System

### How Customer Registration Works

The system tracks paid customers in a file called `paid-customers.json`:

```json
[
  {
    "email": "you@example.com",
    "plan": "professional",
    "registeredAt": "2026-05-27T18:00:00.000Z",
    "status": "active"
  }
]
```

When you access the app:
1. The system checks if your email is in `paid-customers.json`
2. If yes → You get **full access** (paid plan features)
3. If no → You get **free access** (limited features)

---

## 🚀 Three Ways to Access

### 1️⃣ As a Free Customer
```
http://localhost:3000/?mode=demo&access=free&email=your@email.com
```
- ✅ Full lead search
- ✅ Email campaigns
- ✅ Landing pages
- ✅ AI chat
- ❌ No advanced analytics
- ❌ No API integrations
- ❌ No priority support

### 2️⃣ As a Paid Customer (Registered Email)
```
http://localhost:3000
```
First, register your email as paid (see setup section below):
```bash
node setup-paid-customer.js
```

Then access the app normally. The system will:
- ✅ Recognize your email as paid
- ✅ Grant full access
- ✅ Enable all premium features

### 3️⃣ Test Mode (No Email Required)
```
http://localhost:3000/?test=true
```
- Perfect for testing before committing an email
- Shows a "TEST MODE" banner
- Full functionality
- Data stored locally

---

## 📧 Register as Paid Customer

### Method 1: Using Setup Script (Recommended)

```bash
cd /tmp/capta-leads
node setup-paid-customer.js
```

The script will:
1. Ask for your email
2. Ask which plan (free, professional, enterprise)
3. Create `paid-customers.json` with your registration
4. Display verification
5. Optionally start the server

**Example output:**
```
✅ Customer registered successfully!

Email: daniel@example.com
Plan: professional
Registered at: 2026-05-27T18:00:00.000Z

You can now access the full app at:
http://localhost:3000
```

### Method 2: Create paid-customers.json Manually

Create the file `/tmp/capta-leads/paid-customers.json`:

```json
[
  {
    "email": "your@email.com",
    "plan": "professional",
    "registeredAt": "2026-05-27T18:00:00.000Z",
    "status": "active",
    "paidAt": "2026-05-27T18:00:00.000Z",
    "amount": 99.00,
    "currency": "BRL"
  }
]
```

Then restart the server:
```bash
npm start
```

### Method 3: Using API Endpoint (Advanced)

After server is running, register via API:

```bash
curl -X POST http://localhost:3000/api/customers/list \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your@email.com",
    "plan": "professional",
    "registeredAt": "2026-05-27T18:00:00.000Z",
    "status": "active"
  }'
```

---

## ✅ Verify Your Registration

Check if your email is registered as paid:

```bash
# Via API
curl -X POST http://localhost:3000/api/customers/check \
  -H "Content-Type: application/json" \
  -d '{"email": "your@email.com"}'
```

Expected response:
```json
{
  "success": true,
  "isPaid": true,
  "customer": {
    "email": "your@email.com",
    "plan": "professional",
    "registeredAt": "2026-05-27T18:00:00.000Z",
    "status": "active"
  }
}
```

---

## 🎨 What's Included in Each Plan

### Free Plan ($0/month)
- ✅ Unlimited lead search
- ✅ Unlimited email campaigns
- ✅ Unlimited landing pages
- ✅ AI chat assistant
- ✅ Project management
- ✅ Auto-save (IndexedDB)
- ❌ Advanced analytics
- ❌ API integrations
- ❌ Multiple users

### Professional Plan (R$ 99/month)
**Everything in Free +**
- ✅ Advanced analytics and reports
- ✅ Data export (CSV, JSON)
- ✅ API integrations (Hunter.io, Clearbit, Resend)
- ✅ Multiple user support
- ✅ Priority email support
- ✅ Webhook integrations

### Enterprise Plan (Custom)
**Everything in Professional +**
- ✅ Dedicated customizations
- ✅ CRM integrations
- ✅ Advanced webhooks
- ✅ SLA guarantees
- ✅ 24/7 support
- ✅ Custom training

---

## 🔧 Configuration Files

### `.env` - Environment Variables

Already created with defaults. Current values:

```bash
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000

# Payment Processing
STRIPE_SECRET_KEY=sk_test_no_key_for_test
STRIPE_WEBHOOK_SECRET=whsec_no_key_for_test
STRIPE_PUBLISHABLE_KEY=pk_test_no_key_for_test

# Email Service
RESEND_API_KEY=re_test_no_key

# AI Integration
ANTHROPIC_API_KEY=sk_ant_test

# Default Settings
DEFAULT_INDUSTRY=generic
```

To enable real integrations, add your actual API keys:

```bash
# Real Hunter.io (lead search)
HUNTER_API_KEY=your_key_here

# Real Clearbit (lead enrichment)
CLEARBIT_API_KEY=your_key_here

# Real Resend (email sending)
RESEND_API_KEY=re_your_key_here

# Real Stripe (payments)
STRIPE_SECRET_KEY=sk_live_your_key_here
```

### `paid-customers.json` - Paid Customer Registry

Auto-created by:
1. Setup script
2. Stripe webhook (after real payment)
3. Manual creation

Format:
```json
[
  {
    "email": "customer@example.com",
    "plan": "professional",
    "registeredAt": "2026-05-27T18:00:00.000Z",
    "status": "active",
    "paidAt": "2026-05-27T18:00:00.000Z",
    "amount": 99.00,
    "currency": "BRL",
    "sessionId": "stripe_session_id"
  }
]
```

---

## 🎯 Complete Workflow

### Step 1: Start Server
```bash
cd /tmp/capta-leads
npm start
```

Output should show:
```
✅ Server running on http://localhost:3000
✅ CORS enabled
✅ All modules initialized
```

### Step 2: Register as Paid Customer
```bash
# In another terminal
node setup-paid-customer.js
```

Or manually create `paid-customers.json`.

### Step 3: Access the App
```
http://localhost:3000
```

### Step 4: Create Your First Project
1. Click "Novo Projeto" (New Project)
2. Give it a name
3. Click "Criar Projeto" (Create Project)

### Step 5: Use Features
- 🎯 **Search Leads** - Find leads by keywords
- 📧 **Email Campaigns** - Create and send campaigns
- 🎨 **Landing Pages** - Build landing pages
- 🤖 **AI Chat** - Talk to AI assistant
- ⚙️ **Settings** - Configure project settings

---

## 🆘 Troubleshooting

### Problem: "Server won't start"
```bash
# Check if port 3000 is in use
lsof -i :3000

# Use a different port
PORT=3001 npm start
```

### Problem: "App says I'm not a paid customer"
```bash
# Verify your email is in paid-customers.json
cat paid-customers.json

# Make sure you're using the same email to access
# Clear browser cookies/cache and reload
```

### Problem: "Can't find paid-customers.json"
```bash
# Create it manually
node setup-paid-customer.js

# Or create it directly
cat > paid-customers.json << 'EOF'
[{
  "email": "your@email.com",
  "plan": "professional",
  "registeredAt": "2026-05-27T18:00:00.000Z",
  "status": "active"
}]
EOF
```

### Problem: "API endpoints return errors"
```bash
# Check .env file exists
ls -la .env

# Verify dependencies are installed
npm install

# Check server logs for errors
npm start
```

---

## 📚 Files You Might Need

| File | Purpose |
|------|---------|
| `server.js` | Backend API server |
| `console.html` | Main application interface |
| `.env` | Configuration (API keys, port) |
| `paid-customers.json` | Customer registry (created by setup) |
| `setup-paid-customer.js` | Setup wizard (creates paid-customers.json) |

---

## 🚀 Next Steps

### 1. Test All Features
- [ ] Search for leads (try "documentário")
- [ ] Create email campaign
- [ ] Build landing page
- [ ] Chat with AI
- [ ] Export lead data

### 2. Optional: Enable Real APIs
- [ ] Get Hunter.io key for real leads
- [ ] Get Resend key for real emails
- [ ] Get Stripe key for real payments
- [ ] Update `.env` file with keys

### 3. Customize for Your Use Case
- [ ] Set default industry
- [ ] Configure project settings
- [ ] Add team members
- [ ] Set up automations

---

## 💡 Key Concepts

### Projects
- Each user can have multiple projects
- Data is isolated per project
- Projects store leads, campaigns, pages, settings

### Local Storage
- **IndexedDB**: Primary storage (offline-capable)
- **localStorage**: Backup storage
- **JSON files**: Server-side persistence

### Test Mode
- Access with `?test=true`
- Perfect for testing without registration
- Data stored locally
- Shows "TEST MODE" banner

### Free vs Paid
- Free users: Access all core features
- Paid users: Access core + advanced analytics
- Both see same interface
- Distinction is in advanced features

---

## 🎓 Tutorial

The app includes a built-in tutorial accessible from the Dashboard:

1. **Dashboard Tab** → Look for "📚 Tutorial" button
2. Covers all main features
3. Step-by-step instructions
4. In Portuguese (with other languages available)

---

## 📞 Support

For questions about:
- **Setup:** See "Quick Start" section above
- **Features:** Click "📚 Tutorial" in the app
- **Troubleshooting:** See "Troubleshooting" section above
- **API Integration:** See "Configuration Files" section
- **Custom Setup:** Edit `paid-customers.json` directly

---

## ✨ Summary

You now have:
- ✅ CAPTA LEADS running locally
- ✅ Registered as a paid customer
- ✅ Full access to all features
- ✅ Complete documentation
- ✅ Step-by-step setup guide

**Start using it:**
```bash
cd /tmp/capta-leads
npm start
# Then open http://localhost:3000
```

Enjoy! 🚀

---

*Last Updated: May 27, 2026*  
*Version: 2.0.0*
