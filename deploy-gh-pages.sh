#!/bin/bash

# Script de déploiement GitHub Pages pour le projet React MERN

echo "🚀 Début du déploiement GitHub Pages..."

# Aller au répertoire frontend et construire l'application
echo "📦 Construction de l'application React..."
cd frontend
npm run build

# Retour au répertoire racine
cd ..

# Sauvegarder la branche actuelle
current_branch=$(git branch --show-current)

# Checkout de la branche gh-pages (créer si elle n'existe pas)
echo "🔀 Basculement vers la branche gh-pages..."
git checkout gh-pages 2>/dev/null || git checkout --orphan gh-pages

# Nettoyer la branche gh-pages (sauf .git)
echo "🧹 Nettoyage de la branche gh-pages..."
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} \;

# Copier les fichiers de build
echo "📋 Copie des fichiers de build..."
cp -r frontend/build/* .

# Ajouter et commiter
echo "💾 Commit des modifications..."
git add .
git commit -m "Deploy to GitHub Pages - $(date)"

# Push vers GitHub
echo "🌐 Push vers GitHub Pages..."
git push origin gh-pages

# Retourner à la branche d'origine
echo "🔙 Retour à la branche $current_branch..."
git checkout $current_branch

echo "✅ Déploiement terminé ! Votre site sera disponible à :"
echo "🔗 https://Yohannkp.github.io/React-MERN-Project"
echo ""
echo "⏰ Il peut falloir quelques minutes pour que les changements soient visibles."
