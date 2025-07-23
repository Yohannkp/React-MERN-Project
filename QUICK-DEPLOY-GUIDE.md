# 🚀 Guide Rapide : Connecter le Frontend au Backend GitHub Codespaces

## Étape 1 : Démarrer le Backend sur Codespaces

1. **Créer un Codespace :**
   - Allez sur https://github.com/Yohannkp/React-MERN-Project
   - Cliquez sur "< > Code" > "Codespaces" > "Create codespace on main"

2. **Dans le terminal Codespaces, configurez MongoDB :**
   ```bash
   cd backend
   cp .env.example .env
   code .env
   ```

3. **Ajoutez vos variables MongoDB dans .env :**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/leboncoin
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   ```

4. **Démarrez le backend :**
   ```bash
   npm install
   npm start
   ```

5. **Codespaces va vous proposer d'ouvrir le port 5000. Acceptez !**

6. **Copiez l'URL qui apparaît** (quelque chose comme `https://abcd1234-5000.preview.app.github.dev`)

## Étape 2 : Mettre à jour le Frontend

Une fois que vous avez l'URL de votre backend, modifiez le fichier `frontend/src/services/api.js` :

```javascript
// Remplacez cette ligne :
return process.env.REACT_APP_API_URL || 'https://your-backend-url.preview.app.github.dev/api';

// Par votre vraie URL :
return process.env.REACT_APP_API_URL || 'https://VOTRE-CODESPACE-URL-5000.preview.app.github.dev/api';
```

## Étape 3 : Redéployer le Frontend

```bash
cd frontend
npm run build
npm run deploy
```

## 🔄 Alternative : Variables d'environnement

Vous pouvez aussi créer un fichier `.env` dans le frontend :

```env
REACT_APP_API_URL=https://VOTRE-CODESPACE-URL-5000.preview.app.github.dev/api
```

Puis rebuilder et redéployer.

## 📋 MongoDB Atlas (Requis)

Pour que ça fonctionne, vous DEVEZ configurer MongoDB Atlas :

1. **Créez un compte gratuit sur [MongoDB Atlas](https://cloud.mongodb.com)**
2. **Créez un cluster gratuit**
3. **Ajoutez 0.0.0.0/0 à la whitelist des IPs**
4. **Créez un utilisateur de base de données**
5. **Copiez la string de connexion dans votre .env**

## 🎯 URL Finale

Votre application sera accessible avec :
- **Frontend :** https://Yohannkp.github.io/React-MERN-Project
- **Backend :** https://VOTRE-CODESPACE-5000.preview.app.github.dev
