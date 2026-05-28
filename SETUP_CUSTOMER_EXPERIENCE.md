# 👥 Customer Experience Setup Guide

## What Customers Receive After Payment

When a customer completes payment on the CAPTA LEADS website, they receive:

1. **Confirmation email** with their order details
2. **Instant access** to the full application
3. **Pre-configured account** ready to use
4. **Tutorial** available in the app dashboard

---

## How It Works (Technical Flow)

```
Customer Flow:
┌─────────────┐      ┌──────────────┐      ┌────────────┐
│   Checkout  │ ──→  │  Stripe Pay  │ ──→  │ Registered │
│   Page      │      │              │      │  Customer  │
└─────────────┘      └──────────────┘      └────────────┘
                           │
                           ↓
                    Webhook fires
                           │
                           ↓
                  Email added to
              paid-customers.json
                           │
                           ↓
                      App detects
                    paid status
                           │
                           ↓
                    Full access
                     granted
```

---

## Setting Up Your Local Version

### Method 1: Quick Setup Script (Easiest) ⭐

This is what we recommend. It's the simplest way to get the full customer experience locally.

**In your terminal:**

```bash
cd /tmp/capta-leads
node setup-paid-customer.js
```

**What it does:**
1. Asks for your email
2. Asks which plan you want (Free, Professional, Enterprise)
3. Registers you as a paid customer
4. Optionally starts the server

**That's it!** Your app will work exactly like a paying customer's experience.

---

### Method 2: Manual File Creation

If you prefer to manually create the customer registration:

**Create this file: `/tmp/capta-leads/paid-customers.json`**

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

Then start the server:
```bash
npm start
```

---

## Three Ways to Access the App

### 1. As a Registered Paid Customer (Recommended)

**Prerequisites:** 
- You've run the setup script OR created `paid-customers.json`

**Access:**
```
http://localhost:3000
```

**What happens:**
- System checks your browser for email (via localStorage or URL parameter)
- Matches it against `paid-customers.json`
- Shows full paid-customer interface

**Features available:**
- ✅ All core features (leads, campaigns, pages, chat)
- ✅ Advanced analytics
- ✅ API integrations
- ✅ Multiple users
- ✅ Priority support features

---

### 2. As a Free Customer (Guest Access)

**Access:**
```
http://localhost:3000/?mode=demo&access=free&email=your@email.com
```

**What happens:**
- System treats you as a free-tier customer
- Shows "Free Plan" indicator
- Limits some advanced features

**Features available:**
- ✅ Lead search
- ✅ Email campaigns
- ✅ Landing pages
- ✅ AI chat
- ❌ Advanced analytics
- ❌ Some API features

---

### 3. Test Mode (Perfect for Quick Testing)

**Access:**
```
http://localhost:3000/?test=true
```

**What happens:**
- Shows "TEST MODE" banner
- No customer registration needed
- Full functionality enabled
- All data stored locally

**Perfect for:**
- Testing new features
- Demo purposes
- Development work
- No email required

---

## The Complete Experience

### What a Customer Sees When They Visit

```
1. LOADING
   ↓
2. CHECK REGISTRATION
   "Is your email in paid-customers.json?"
   ↓
3. YES → FULL APP LOADS
   - Dashboard
   - All menus active
   - All features available
   - Auto-save enabled
   ↓
4. THEY START USING IT
   - Create projects
   - Search leads
   - Create campaigns
   - Build pages
   - Chat with AI
```

---

## Verification: Check Your Registration

**To confirm you're registered correctly:**

```bash
# Check if paid-customers.json exists
cat /tmp/capta-leads/paid-customers.json

# Should show your email and plan
```

**Or check via API:**
```bash
curl -X POST http://localhost:3000/api/customers/check \
  -H "Content-Type: application/json" \
  -d '{"email": "your@email.com"}'
```

**Should return:**
```json
{
  "success": true,
  "isPaid": true,
  "customer": {
    "email": "your@email.com",
    "plan": "professional",
    ...
  }
}
```

---

## File Structure for Local Setup

```
/tmp/capta-leads/
├── server.js                    # Backend (runs on localhost:3000)
├── console.html                 # Main app interface
├── .env                         # Configuration
├── paid-customers.json          # ← Customer registry (created by setup)
├── setup-paid-customer.js       # ← Setup wizard
├── SETUP_LOCAL_PAID.md          # ← Detailed setup guide
└── SETUP_CUSTOMER_EXPERIENCE.md # ← This file
```

---

## Complete Setup Checklist

- [ ] Clone/download CAPTA LEADS
- [ ] Install dependencies: `npm install`
- [ ] Run setup script: `node setup-paid-customer.js`
- [ ] Choose your plan
- [ ] Verify setup: `cat paid-customers.json`
- [ ] Start server: `npm start`
- [ ] Open app: `http://localhost:3000`
- [ ] Create first project
- [ ] Test each feature

---

## What Each Feature Does

### 🎯 Lead Search
- Find leads by keywords
- Filter by location and type
- See lead details (email, website, score)
- Export as CSV/JSON

### 📧 Email Campaigns
- Create email templates
- Personalize with {nome}, {empresa}, {email}
- Send to selected leads
- Track campaign status

### 🎨 Landing Pages
- Choose from 8 industries
- Add sections (Hero, Features, Testimonials, CTA)
- Optimize SEO
- Preview and export

### 🤖 AI Chat
- Ask questions about the app
- Get usage tips
- Get strategy suggestions
- Available 24/7

### ⚙️ Settings
- Configure email sending
- Set business info
- Manage projects
- Configure integrations

---

## Real API Keys (Optional)

To use real services instead of test mode:

### Hunter.io (Real Leads)
1. Go to https://hunter.io
2. Create account and get API key
3. Edit `.env`: `HUNTER_API_KEY=your_key`
4. Restart server

### Resend (Real Email)
1. Go to https://resend.com
2. Create account and get API key
3. Edit `.env`: `RESEND_API_KEY=your_key`
4. Restart server

### Stripe (Real Payments)
1. Go to https://stripe.com
2. Create account and get secret key
3. Edit `.env`: `STRIPE_SECRET_KEY=your_key`
4. Restart server

---

## Troubleshooting

**Q: "App says I'm not registered"**
A: Make sure `paid-customers.json` exists and contains your email

**Q: "Server won't start"**
A: Check if port 3000 is in use: `lsof -i :3000`

**Q: "Features don't work"**
A: Try test mode first: `http://localhost:3000/?test=true`

**Q: "What's the difference between plans?"**
A: See "What Each Plan Includes" section in SETUP_LOCAL_PAID.md

---

## Multiple Customers (For Testing)

To test with multiple customer accounts:

```json
[
  {
    "email": "customer1@example.com",
    "plan": "free",
    "registeredAt": "2026-05-27T18:00:00.000Z",
    "status": "active"
  },
  {
    "email": "customer2@example.com",
    "plan": "professional",
    "registeredAt": "2026-05-27T18:00:00.000Z",
    "status": "active"
  },
  {
    "email": "customer3@example.com",
    "plan": "enterprise",
    "registeredAt": "2026-05-27T18:00:00.000Z",
    "status": "active"
  }
]
```

Each customer:
- Can access at `http://localhost:3000`
- Will be identified by their email
- Gets their corresponding plan features

---

## Summary

**Simple way to get started:**

```bash
# 1. Go to project folder
cd /tmp/capta-leads

# 2. Run setup
node setup-paid-customer.js

# 3. Choose professional plan
# 4. Enter your email
# 5. Start server

# 6. Open in browser
# http://localhost:3000

# 7. Create your first project and start using!
```

**That's all!** You now have a complete local setup that works exactly like what paying customers experience.

---

## Resources

- 📚 **Detailed Setup Guide:** SETUP_LOCAL_PAID.md
- 📊 **Summary:** 🎯_START_HERE_SUMMARY.txt
- 📋 **Complete Report:** COMPLETE_IMPLEMENTATION_REPORT.md
- 🎥 **Tutorial:** Available in app dashboard

---

**Questions?** Check the documentation files or refer to the in-app tutorial.

**Ready to go!** 🚀

---

*Created: May 27, 2026*  
*Version: 2.0.0*
