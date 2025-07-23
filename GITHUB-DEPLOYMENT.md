# 🚀 Déploiement Backend sur GitHub

Ce guide explique comment déployer et exécuter le backend directement sur GitHub.

## 🌐 Méthode 1 : GitHub Codespaces (Recommandé)

### Étapes :

1. **Ouvrir dans Codespaces :**
   - Allez sur votre dépôt GitHub
   - Cliquez sur le bouton vert **"< > Code"**
   - Sélectionnez l'onglet **"Codespaces"**
   - Cliquez sur **"Create codespace on main"**

2. **Configuration automatique :**
   - Codespaces va automatiquement installer les dépendances
   - Le serveur backend démarrera automatiquement sur le port 5000

3. **Accéder à l'API :**
   - Codespaces va vous proposer d'ouvrir le port 5000
   - Votre API sera accessible via une URL comme : `https://abcd1234-5000.preview.app.github.dev`

### Configuration des variables d'environnement :

1. Dans le terminal Codespaces, créez votre fichier `.env` :
   ```bash
   cd backend
   cp .env.example .env
   nano .env  # ou code .env
   ```

2. Remplissez vos valeurs MongoDB et JWT :
   ```env
   MONGO_URI=mongodb+srv://votre-connexion-mongodb
   JWT_SECRET=votre-cle-secrete-jwt
   PORT=5000
   ```

## 🔧 Méthode 2 : Exécution manuelle

### Dans un terminal Codespaces :

```bash
# Donner les permissions d'exécution au script
chmod +x start-backend.sh

# Exécuter le script
./start-backend.sh
```

### Ou manuellement :

```bash
cd backend
npm install
npm start
```

## 🌍 Méthode 3 : GitHub Actions (Déploiement automatique)

Le workflow `.github/workflows/deploy.yml` se déclenche automatiquement :
- À chaque push sur la branche `main`
- Teste le backend et frontend
- Déploie le frontend sur GitHub Pages

## 🔗 Connecter le Frontend à l'API

Une fois votre backend déployé sur Codespaces, vous devez mettre à jour l'URL de l'API dans le frontend :

1. **Copiez l'URL de votre API Codespaces** (quelque chose comme `https://abcd1234-5000.preview.app.github.dev`)

2. **Modifiez le fichier API du frontend :**
   ```javascript
   // frontend/src/services/api.js
   const API = axios.create({
     baseURL: 'https://VOTRE-URL-CODESPACES.preview.app.github.dev/api',
   });
   ```

3. **Redéployez le frontend :**
   ```bash
   cd frontend
   npm run build
   npm run deploy
   ```

## 📋 Variables d'environnement requises

### Pour MongoDB Atlas (Recommandé) :
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=votre-cle-secrete-super-longue
PORT=5000
```

### Configuration MongoDB Atlas :
1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créez un nouveau cluster (gratuit)
3. Ajoutez votre IP à la whitelist (ou 0.0.0.0/0 pour permettre toutes les connexions)
4. Créez un utilisateur de base de données
5. Copiez la chaîne de connexion

## 🎯 URLs importantes

- **Frontend déployé :** `https://Yohannkp.github.io/React-MERN-Project`
- **Backend Codespaces :** `https://VOTRE-CODESPACE-5000.preview.app.github.dev`
- **API Health Check :** `https://VOTRE-CODESPACE-5000.preview.app.github.dev/`

## 🔍 Dépannage

### Problème : Port non accessible
- Assurez-vous que Codespaces a ouvert le port 5000
- Vérifiez l'onglet "Ports" dans VS Code

### Problème : Erreur MongoDB
- Vérifiez votre chaîne de connexion MONGO_URI
- Assurez-vous que votre IP est autorisée sur MongoDB Atlas

### Problème : CORS
- L'URL de votre frontend doit être dans la liste CORS du backend
- Modifiez `server.js` si nécessaire

## 💡 Conseils

1. **Gardez Codespaces actif :** Les Codespaces s'arrêtent après 30 minutes d'inactivité
2. **Utilisez MongoDB Atlas :** Plus fiable que MongoDB local
3. **Sécurisez vos variables :** Ne commitez jamais le fichier `.env`
4. **Surveillez l'utilisation :** GitHub offre 120 heures gratuites de Codespaces par mois
