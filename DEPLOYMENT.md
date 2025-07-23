# 🚀 Guide de Déploiement GitHub Pages

Ce guide explique comment déployer votre application React "Le Bon Coin Clone" sur GitHub Pages.

## ✅ Déploiement Initial - TERMINÉ

Le déploiement initial a été effectué avec succès ! Votre application est maintenant disponible à :

**🔗 [https://Yohannkp.github.io/React-MERN-Project](https://Yohannkp.github.io/React-MERN-Project)**

## 🔄 Redéploiements Futurs

Pour déployer les nouvelles modifications, vous avez plusieurs options :

### Option 1 : Script Automatique (Recommandé)

#### Windows (PowerShell) :
```powershell
.\deploy-gh-pages.ps1
```

#### Linux/Mac (Bash) :
```bash
chmod +x deploy-gh-pages.sh
./deploy-gh-pages.sh
```

### Option 2 : Commandes Manuelles

```bash
# 1. Construire l'application
cd frontend
npm run build
cd ..

# 2. Aller à la branche gh-pages
git checkout gh-pages

# 3. Copier les nouveaux fichiers
cp -r frontend/build/* .

# 4. Commiter et pousser
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# 5. Retourner à main
git checkout main
```

### Option 3 : Utiliser npm deploy

```bash
cd frontend
npm run deploy
```

## ⚙️ Configuration

Les fichiers suivants ont été configurés pour GitHub Pages :

- `frontend/package.json` : Ajout du homepage et des scripts de déploiement
- `frontend/src/App.js` : Configuration du basename pour le router
- `frontend/public/index.html` : Script de redirection pour les SPAs
- `frontend/public/404.html` : Page 404 pour gérer les routes côté client

## 🌐 Activation GitHub Pages

Si ce n'est pas encore fait, activez GitHub Pages dans les paramètres de votre dépôt :

1. Allez sur votre dépôt GitHub
2. Cliquez sur **Settings**
3. Faites défiler jusqu'à **Pages**
4. Sélectionnez **Source** : `Deploy from a branch`
5. Choisissez **Branch** : `gh-pages` et **/ (root)**
6. Cliquez sur **Save**

## 🔧 Dépannage

### Problème : Routes ne fonctionnent pas
- Vérifiez que `basename="/React-MERN-Project"` est présent dans `App.js`
- Assurez-vous que les fichiers `404.html` et le script dans `index.html` sont présents

### Problème : Ressources 404
- Vérifiez la propriété `homepage` dans `package.json`
- Reconstruisez avec `npm run build`

### Problème : Site non accessible
- Attendez 5-10 minutes après le déploiement
- Vérifiez que GitHub Pages est activé dans les paramètres

## 📝 Notes Importantes

⚠️ **Important** : GitHub Pages sert uniquement des fichiers statiques. Votre backend MongoDB/Express ne sera pas accessible. Pour un déploiement complet, considérez :

- **Frontend** : GitHub Pages (gratuit)
- **Backend** : Heroku, Railway, Render, ou Vercel (certains gratuits)
- **Base de données** : MongoDB Atlas (gratuit)

## 🎯 Prochaines Étapes

1. **Backend** : Déployez votre API sur une plateforme comme Heroku
2. **Variables d'environnement** : Configurez les URLs de production
3. **Domaine personnalisé** : (Optionnel) Configurez un domaine personnalisé
4. **HTTPS** : GitHub Pages active automatiquement HTTPS
