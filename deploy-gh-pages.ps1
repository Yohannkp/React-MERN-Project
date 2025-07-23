# Script de déploiement GitHub Pages pour le projet React MERN (PowerShell)

Write-Host "🚀 Début du déploiement GitHub Pages..." -ForegroundColor Green

# Aller au répertoire frontend et construire l'application
Write-Host "📦 Construction de l'application React..." -ForegroundColor Yellow
Set-Location frontend
npm run build

# Retour au répertoire racine
Set-Location ..

# Sauvegarder la branche actuelle
$currentBranch = git branch --show-current

# Checkout de la branche gh-pages
Write-Host "🔀 Basculement vers la branche gh-pages..." -ForegroundColor Yellow
git checkout gh-pages 2>$null
if ($LASTEXITCODE -ne 0) {
    git checkout --orphan gh-pages
}

# Nettoyer la branche gh-pages
Write-Host "🧹 Nettoyage de la branche gh-pages..." -ForegroundColor Yellow
Get-ChildItem -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force

# Copier les fichiers de build
Write-Host "📋 Copie des fichiers de build..." -ForegroundColor Yellow
Copy-Item -Path "frontend\build\*" -Destination "." -Recurse -Force

# Ajouter et commiter
Write-Host "💾 Commit des modifications..." -ForegroundColor Yellow
git add .
git commit -m "Deploy to GitHub Pages - $(Get-Date)"

# Push vers GitHub
Write-Host "🌐 Push vers GitHub Pages..." -ForegroundColor Yellow
git push origin gh-pages

# Retourner à la branche d'origine
Write-Host "🔙 Retour à la branche $currentBranch..." -ForegroundColor Yellow
git checkout $currentBranch

Write-Host "✅ Déploiement terminé ! Votre site sera disponible à :" -ForegroundColor Green
Write-Host "🔗 https://Yohannkp.github.io/React-MERN-Project" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏰ Il peut falloir quelques minutes pour que les changements soient visibles." -ForegroundColor Yellow
