const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Remover trailing slash
  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Roteamento
  if (pathname === '' || pathname === '/') {
    serveFile(res, 'index.html', 'text/html');
  } else if (pathname === '/dashboard') {
    serveFile(res, 'dashboard.html', 'text/html');
  } else if (pathname === '/tutorial') {
    serveFile(res, 'tutorial.html', 'text/html');
  } else if (pathname === '/test-modal') {
    serveFile(res, 'test-modal.html', 'text/html');
  } else {
    // Tentar servir arquivo estático
    const filePath = path.join(__dirname, pathname);

    // Segurança: não permitir acessar fora da pasta
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err) {
        // Arquivo não encontrado
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Arquivo não encontrado</h1><p>Requisição: ' + pathname + '</p>');
        return;
      }

      if (stats.isDirectory()) {
        // Se for diretório, tenta index.html
        serveFile(res, path.join(pathname, 'index.html'), 'text/html');
      } else {
        // Servir arquivo
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
      res.end('<h1>404 - Arquivo não encontrado</h1><p>' + fileName + '</p>');
      console.error(`Arquivo não encontrado: ${filePath}`);
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
  console.log('🛑 Para parar o servidor: Ctrl+C');
  console.log('');
  console.log('💡 Dica: Abra http://localhost:' + PORT + ' no navegador');
  console.log('');
});

// Tratamento de erros
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Erro: Porta ${PORT} já está em uso!`);
    console.error('Opções:');
    console.error('  1. Feche outras aplicações que usam essa porta');
    console.error('  2. Mude a porta no server.js: const PORT = 3001;');
    console.error('  3. Use: PORT=3001 npm start\n');
  } else {
    console.error('Erro no servidor:', err);
  }
  process.exit(1);
});
