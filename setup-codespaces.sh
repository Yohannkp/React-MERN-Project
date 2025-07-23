#!/bin/bash

echo "🔧 Configuration du projet pour GitHub Codespaces"

# Vérification de l'environnement
if [ "$CODESPACES" = "true" ]; then
    echo "✅ Détection de GitHub Codespaces"
    BACKEND_URL="https://$CODESPACE_NAME-5000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
    echo "🌐 URL du backend: $BACKEND_URL"
else
    echo "⚠️  Pas dans Codespaces, utilisation des valeurs par défaut"
    BACKEND_URL="http://localhost:5000"
fi

# Configuration du backend
echo "📦 Configuration du backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "📝 Création du fichier .env"
    cp .env.example .env
    
    # Mise à jour automatique des valeurs par défaut
    sed -i "s|PORT=5000|PORT=5000|g" .env
    
    if [ "$CODESPACES" = "true" ]; then
        echo "CODESPACES=true" >> .env
    fi
fi

echo "📦 Installation des dépendances backend..."
npm install

cd ..

# Configuration du frontend
echo "📦 Configuration du frontend..."
cd frontend

echo "📦 Installation des dépendances frontend..."
npm install

# Création du fichier .env pour le frontend avec l'URL du backend
if [ "$CODESPACES" = "true" ]; then
    echo "REACT_APP_API_URL=$BACKEND_URL/api" > .env
    echo "🔗 Configuration automatique de l'API URL: $BACKEND_URL/api"
fi

cd ..

echo "✅ Configuration terminée!"
echo ""
echo "🚀 Pour démarrer le projet:"
echo "   Backend:  cd backend && npm start"
echo "   Frontend: cd frontend && npm start"
echo ""
echo "🌐 URLs:"
echo "   Backend:  $BACKEND_URL"
echo "   Frontend: https://$CODESPACE_NAME-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-localhost:3000}"
