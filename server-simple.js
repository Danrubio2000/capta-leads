#!/usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    if (req.url === "/" || req.url === "/index.html") {
      const html = fs.readFileSync(path.join(__dirname, "console.html"), "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } else if (req.url === "/landing.html") {
      const html = fs.readFileSync(path.join(__dirname, "landing.html"), "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } else if (req.url === "/tutorial.html") {
      const html = fs.readFileSync(path.join(__dirname, "tutorial.html"), "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } else if (req.url === "/api/test") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  } catch (error) {
    console.error("Server error:", error);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

export default server;

if (!process.env.VERCEL) {
  server.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
  });
}
