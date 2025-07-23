# 🗄️ Migration SQLite - Guide de Déploiement

## ✅ Changements Effectués

### 🔄 Remplacement de MongoDB par SQLite
- ✅ **Package.json** : Mongoose → SQLite3 + Sequelize
- ✅ **Base de données** : Configuration SQLite locale
- ✅ **Modèles** : Migration Mongoose → Sequelize
- ✅ **Contrôleurs** : Adaptation des requêtes pour SQLite
- ✅ **Serveur** : Nouvelle logique de connexion SQLite

### 📦 Nouvelles Dépendances
```json
{
  "sqlite3": "^5.1.7",
  "sequelize": "^6.35.2",
  "express": "^4.21.1"
}
```

## 🚀 Déploiement GitHub-Only

### Option 1: GitHub Codespaces (Recommandé)
1. **Ouvrir dans Codespaces**
   ```bash
   # Le setup automatique installe tout
   cd backend && npm start
   ```

2. **URL du backend** : `https://CODESPACE-NAME-5000.app.github.dev`

### Option 2: GitHub Actions + Artifacts
1. **Push vers main** déclenche le workflow
2. **Télécharger l'artifact** backend-sqlite
3. **Déployer sur un hébergeur** (Railway, Render, etc.)

## 🔧 Configuration Frontend

### Mise à jour de `api.js`
```javascript
const getBaseURL = () => {
  // Pour GitHub Codespaces
  if (window.location.hostname.includes('github.dev')) {
    const codespace = window.location.hostname.split('-')[0];
    return `https://${codespace}-5000.app.github.dev`;
  }
  
  // Pour développement local
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }
  
  // URL de production (à définir selon votre hébergeur)
  return 'https://your-backend-url.com';
};
```

## 📊 Avantages SQLite

### ✅ Simplicité
- ✅ Aucune configuration externe
- ✅ Base de données en fichier local
- ✅ Parfait pour le développement et les prototypes

### ✅ Déploiement
- ✅ Compatible GitHub Codespaces
- ✅ Aucune dépendance MongoDB Atlas
- ✅ Données persistantes dans le fichier `database.sqlite`

### ✅ Performance
- ✅ Très rapide pour les petites/moyennes applications
- ✅ Pas de latence réseau
- ✅ Idéal pour les MVP et démos

## 🧪 Tests de Fonctionnalité

### Test API Local
```bash
cd backend
node server.js
# Tester: http://localhost:5000
```

### Test Codespaces
1. Ouvrir le repository dans Codespaces
2. Le serveur démarre automatiquement
3. Tester l'URL forwarded du port 5000

## 📝 Structure SQLite

### Tables Créées Automatiquement
```sql
-- Table users
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME
);

-- Table ads
CREATE TABLE ads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  author INTEGER REFERENCES users(id),
  createdAt DATETIME,
  updatedAt DATETIME
);
```

## 🚨 Points d'Attention

### ⚠️ Limitations SQLite
- **Concurrence** : Moins performant que PostgreSQL/MySQL pour plusieurs utilisateurs simultanés
- **Scaling** : Non adapté pour de gros volumes de données
- **Backup** : Sauvegarder le fichier `database.sqlite` régulièrement

### 🔄 Migration Future
Si besoin de passer à PostgreSQL/MySQL plus tard :
1. Sequelize facilite la migration
2. Changer la configuration de base de données
3. Les modèles restent identiques

## 🎯 Prochaines Étapes

1. **Tester le backend** en local
2. **Déployer sur Codespaces** pour avoir une URL publique
3. **Mettre à jour le frontend** avec la bonne URL API
4. **Tester l'authentification** et les CRUD
5. **Optimiser** selon les besoins
