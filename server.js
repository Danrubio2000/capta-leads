#!/usr/bin/env node
/**
 * CAPTA LEADS - Minimal Backend Server for Vercel
 * Serves static files and basic API endpoints
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// Simple static file server
function serveStatic(res, filepath, contentType) {
  try {
    if (!fs.existsSync(filepath)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("File not found");
    }
    const content = fs.readFileSync(filepath, "utf8");
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (error) {
    console.error(`Error serving ${filepath}:`, error.message);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal server error");
  }
}

// Create and start HTTP server
const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Route console.html to root
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return serveStatic(res, path.join(__dirname, "console.html"), "text/html");
    }

    // Route landing.html
    if (url.pathname === "/landing.html") {
      return serveStatic(res, path.join(__dirname, "landing.html"), "text/html");
    }

    // Route static files
    const staticFiles = {
      "/tutorial.html": "text/html",
      "/video.html": "text/html",
      "/chat-widget.js": "application/javascript",
      "/logo.png": "image/png"
    };

    if (staticFiles[url.pathname]) {
      return serveStatic(
        res,
        path.join(__dirname, url.pathname),
        staticFiles[url.pathname]
      );
    }

    // API routes - minimal placeholders
    if (url.pathname.startsWith("/api/")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({
        message: "API endpoint placeholder",
        path: url.pathname
      }));
    }

    // 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  } catch (error) {
    console.error("Server error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║              🚀 CAPTA LEADS v2.0.0 Iniciado                  ║
║                                                               ║
║  📱 Console: http://localhost:${PORT}                         ║
║  🎯 API: /api/...                                             ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});
