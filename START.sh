#!/bin/bash

echo "🚀 CAPTA LEADS - Inicializar Sistema"
echo "═════════════════════════════════════"
echo ""

# Verifica se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "Instale em: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"
echo ""

# Instala dependências backend
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependências backend..."
    cd backend
    npm install
    cd ..
    echo "✅ Dependências instaladas!"
else
    echo "✅ Dependências já instaladas"
fi

echo ""
echo "🌐 Iniciando servidor..."
echo "═════════════════════════════════════"
echo ""
echo "📍 Backend: http://localhost:3000"
echo "📍 Console:  file:///Users/Dan/Projects/CAPTA-LEADS/console.html"
echo ""
echo "Para parar: Ctrl+C"
echo "═════════════════════════════════════"
echo ""

# Inicia servidor
cd backend
npm start
