# 🚀 CAPTA LEADS - Quick Access Guide

## ✅ Server Status
**The server is running on http://localhost:3000**

## 🎯 Access Points

### Main Application
- **Main Console:** http://localhost:3000
- **Dashboard:** http://localhost:3000/dashboard.html
- **Landing Page:** http://localhost:3000/index.html

### Features Available

#### 1. 🎯 Lead Hunting
```
URL: http://localhost:3000 → "Buscar Leads" tab
- Search for leads by keywords
- Filter by location
- Choose business type (Negócio, Fundação, ONG)
- Import CSV/JSON leads
- Export results as CSV/JSON
```

#### 2. 📧 Email Campaigns
```
URL: http://localhost:3000 → "Campanhas" tab
- Create email campaigns with templates
- Personalize with variables: {nome}, {empresa}, {email}
- Send to selected leads
- Test email configuration
```

#### 3. 🎨 Landing Pages
```
URL: http://localhost:3000 → "Landing Pages" tab
- Create pages for different industries
- Choose from 8 industries
- Add SEO title and description
- View preview
```

#### 4. 🤖 AI Chat
```
URL: http://localhost:3000 → "IA Chat" tab
- Ask about features
- Get help with usage
- Supported in Portuguese, English, Spanish, French
```

## 📱 Language Support
- 🇧🇷 Português (default)
- 🇺🇸 English
- 🇪🇸 Español
- 🇫🇷 Français

Use the language selector in the header to switch languages.

## 🧪 Test Credentials
No login required! The application is ready to use in test mode:
- Create projects
- Search leads (mock data)
- Create campaigns (test mode)
- Build landing pages
- Chat with AI

## 🔑 Optional Configuration

### To Enable Real Features
1. **Hunter.io Leads:**
   - Get API key from https://hunter.io
   - Add to `.env` file
   - Restart server

2. **Resend Email:**
   - Get API key from https://resend.com
   - Add RESEND_API_KEY to `.env`
   - Restart server

3. **Stripe Payments:**
   - Get keys from https://stripe.com
   - Add STRIPE_SECRET_KEY to `.env`
   - Restart server

## 🔧 Start/Stop Server

### Start
```bash
cd /tmp/capta-leads
npm start
```

### Stop
```bash
# Find process
lsof -i :3000
# Kill process (replace PID with actual process ID)
kill -9 <PID>
```

## 📊 API Endpoints

### Lead Management
```
POST   /api/leads/search       - Search for leads
GET    /api/leads/list         - List all leads
POST   /api/leads/enrich       - Enrich lead data
GET    /api/leads/export       - Export leads
```

### Email Campaigns
```
POST   /api/campaigns/create   - Create campaign
GET    /api/campaigns/list     - List campaigns
POST   /api/campaigns/send     - Send campaign
POST   /api/campaigns/test-email - Test email
GET    /api/campaigns/settings - Get settings
POST   /api/campaigns/settings - Update settings
```

### Landing Pages
```
POST   /api/pages/create       - Create page
GET    /api/pages/list         - List pages
POST   /api/pages/add-section  - Add section
GET    /api/pages/preview      - Preview page
```

### AI Chat
```
POST   /api/chat/message       - Send message
```

## 💡 Tips

1. **Project Management:**
   - Create different projects for different businesses
   - Each project has isolated data (leads, campaigns, pages)

2. **Lead Searching:**
   - Try keywords like "documentário", "fundação", "clínica"
   - Use "Internacional", "USA", "Brasil" for location
   - Results include score and contact info

3. **Email Campaigns:**
   - Use {nome}, {empresa}, {email} for personalization
   - Test with your email before sending
   - Emails are in test mode without real API key

4. **Landing Pages:**
   - Choose industry for relevant templates
   - Add SEO title and description
   - Preview before publishing

## 🆘 Troubleshooting

### Server Won't Start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process using port 3000
kill -9 <PID>

# Try different port
PORT=3001 npm start
```

### Features Not Working
1. Check server logs: `npm start`
2. Ensure .env file exists
3. Check API endpoint in console.html (should be http://localhost:3000/api)
4. Try clearing browser cache

### Language Not Changing
1. Select language from dropdown
2. Page should refresh automatically
3. Check browser console for errors

## 📞 Support

For issues or questions, check:
- COMPLETE_IMPLEMENTATION_REPORT.md (Technical details)
- README.md (Project overview)
- Server console logs

---

**Happy lead hunting! 🎯**
