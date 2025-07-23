#!/bin/bash

# Script pour démarrer le backend sur GitHub Codespaces
echo "🚀 Démarrage du backend Le Bon Coin Clone..."

# Vérifier si nous sommes dans le bon répertoire
if [ ! -d "backend" ]; then
    echo "❌ Erreur: Répertoire backend non trouvé"
    exit 1
fi

# Aller dans le répertoire backend
cd backend

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier les variables d'environnement
if [ -z "$MONGO_URI" ]; then
    echo "⚠️  Variable MONGO_URI non définie"
    echo "Utilisation de MongoDB par défaut pour le développement"
    export MONGO_URI="mongodb://localhost:27017/leboncoin"
fi

if [ -z "$PORT" ]; then
    export PORT=5000
fi

if [ -z "$JWT_SECRET" ]; then
    export JWT_SECRET="your-super-secret-jwt-key-here"
fi

echo "🌍 Variables d'environnement configurées:"
echo "   - PORT: $PORT"
echo "   - MONGO_URI: ${MONGO_URI:0:20}..."
echo "   - JWT_SECRET: ${JWT_SECRET:0:10}..."

# Démarrer le serveur
echo "🚀 Démarrage du serveur..."
npm start
