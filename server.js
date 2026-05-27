const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables from .env file if it exists
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key) {
        process.env[key] = valueParts.join('=').trim();
      }
    }
  });
  console.log('✅ .env file loaded');
}

const PORT = process.env.PORT || 3000;
const HUNTER_API_KEY = process.env.HUNTER_API_KEY || '';
const CLEARBIT_API_KEY = process.env.CLEARBIT_API_KEY || '';

// Try to load LeadsHunter module
let LeadsHunter = null;
try {
  LeadsHunter = require('./leads-hunter.js');
  console.log('✅ LeadsHunter module loaded');
} catch (e) {
  console.warn('⚠️ LeadsHunter import failed:', e.message);
  console.log('💡 Using mock lead generation only');
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Remove trailing slash
  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // ═══════════════════════════════════════════════════════════════
  // API ROUTES
  // ═══════════════════════════════════════════════════════════════

  if (pathname === '/api/leads/search') {
    if (req.method !== 'GET' && req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    try {
      const query = parsedUrl.query;
      const keywords = query.keywords || '';
      const location = query.location || 'Brasil';
      const businessType = query.businessType || 'Geral';
      const searchType = query.type || 'business';

      console.log(`📍 API Request: /api/leads/search?keywords=${keywords}&location=${location}&businessType=${businessType}`);

      if (!LeadsHunter) {
        throw new Error('LeadsHunter module not loaded');
      }

      const hunter = new LeadsHunter({
        hunterKey: HUNTER_API_KEY,
        clearbitKey: CLEARBIT_API_KEY
      });

      hunter.searchLeads(keywords, location, searchType, businessType).then(leads => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          count: leads.length,
          data: leads,
          source: HUNTER_API_KEY ? '🔗 Hunter.io API' : '📊 Mock Data (Configure HUNTER_API_KEY for real leads)'
        }));
      }).catch(error => {
        console.error('❌ Search error:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: error.message,
          tip: 'Make sure HUNTER_API_KEY is set in .env file'
        }));
      });

    } catch (error) {
      console.error('❌ API Error:', error.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: error.message,
        tip: 'Make sure HUNTER_API_KEY is set in .env file'
      }));
    }
    return;
  }

  if (pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'running',
      version: '2.0.0',
      hunterApiConfigured: !!HUNTER_API_KEY,
      timestamp: new Date().toISOString(),
      tip: 'Configure HUNTER_API_KEY in .env to enable real lead searches'
    }));
    return;
  }

  // ═══════════════════════════════════════════════════════════════
  // STATIC FILE SERVING
  // ═══════════════════════════════════════════════════════════════

  // HTML Routes
  if (pathname === '' || pathname === '/') {
    serveFile(res, 'index.html', 'text/html');
  } else if (pathname === '/dashboard') {
    serveFile(res, 'dashboard.html', 'text/html');
  } else if (pathname === '/tutorial') {
    serveFile(res, 'tutorial.html', 'text/html');
  } else if (pathname === '/test-modal') {
    serveFile(res, 'test-modal.html', 'text/html');
  } else {
    // Try to serve static file
    const filePath = path.join(__dirname, pathname);

    // Security: don't allow path traversal
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<h1>404 - File not found</h1><p>Request: ${pathname}</p>`);
        return;
      }

      if (stats.isDirectory()) {
        serveFile(res, path.join(pathname, 'index.html'), 'text/html');
      } else {
        const ext = path.extname(filePath);
        let contentType = 'application/octet-stream';

        switch(ext) {
          case '.html': contentType = 'text/html'; break;
          case '.js': contentType = 'application/javascript'; break;
          case '.css': contentType = 'text/css'; break;
          case '.json': contentType = 'application/json'; break;
          case '.png': contentType = 'image/png'; break;
          case '.jpg':
          case '.jpeg': contentType = 'image/jpeg'; break;
          case '.gif': contentType = 'image/gif'; break;
          case '.svg': contentType = 'image/svg+xml'; break;
          case '.ico': contentType = 'image/x-icon'; break;
          case '.webp': contentType = 'image/webp'; break;
        }

        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        });

        fs.createReadStream(filePath).pipe(res);
      }
    });
  }
});

function serveFile(res, fileName, contentType) {
  const filePath = path.join(__dirname, fileName);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`<h1>404 - File not found</h1><p>${fileName}</p>`);
      console.error(`File not found: ${filePath}`);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  });
}

server.listen(PORT, () => {
  console.log('');
  console.log('🚀 CAPTA LEADS - Servidor Local');
  console.log('=====================================');
  console.log('');
  console.log('✅ Servidor rodando em:');
  console.log(`   📍 http://localhost:${PORT}`);
  console.log('');
  console.log('📄 Páginas disponíveis:');
  console.log(`   🏠 Landing page: http://localhost:${PORT}`);
  console.log(`   💼 Dashboard:    http://localhost:${PORT}/dashboard`);
  console.log(`   🎬 Tutorial:     http://localhost:${PORT}/tutorial`);
  console.log(`   🧪 Test Modal:   http://localhost:${PORT}/test-modal`);
  console.log('');
  console.log('🔗 API Endpoints:');
  console.log(`   🎯 Buscar Leads: http://localhost:${PORT}/api/leads/search?keywords=dentista&location=São Paulo`);
  console.log(`   📊 Status:       http://localhost:${PORT}/api/status`);
  console.log('');
  if (HUNTER_API_KEY) {
    console.log('✅ HUNTER_API_KEY configurado - Usando Hunter.io API real! 🎉');
  } else {
    console.log('⚠️  HUNTER_API_KEY não configurado');
    console.log('   📋 Próximas passos:');
    console.log('   1. Crie conta em: https://hunter.io/users/sign_up');
    console.log('   2. Obtenha API Key: https://hunter.io/account/api');
    console.log('   3. Crie arquivo .env com: HUNTER_API_KEY=seu_chave_aqui');
    console.log('   4. Reinicie o servidor: npm start');
    console.log('');
    console.log('   Por enquanto, usando dados simulados para testes ✅');
  }
  console.log('');
  console.log('🛑 Para parar o servidor: Ctrl+C');
  console.log('');
});

// Error handling
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Erro: Porta ${PORT} já está em uso!`);
    console.error('Opções:');
    console.error('  1. Feche outras aplicações que usam essa porta');
    console.error('  2. Mude a porta: PORT=3001 npm start');
    console.error('  3. Encontre e finalize o processo:\n');
    console.error(`     Windows: netstat -ano | findstr :${PORT}`);
    console.error(`     Mac/Linux: lsof -i :${PORT}\n`);
  } else {
    console.error('Erro no servidor:', err);
  }
  process.exit(1);
});
