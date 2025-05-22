Excellent, voici **un fichier `README.md` complet** en **pur format Markdown**, sans annotations parasites, 100 % propre et structuré, prêt à être collé dans ton dépôt GitHub :

---

```markdown
# 🛒 Le Bon Coin - Clone MERN Stack

Une application complète MERN (MongoDB, Express, React, Node.js) inspirée de "Le Bon Coin", permettant aux utilisateurs de publier, consulter et gérer des petites annonces.

## 🔧 Technologies utilisées

- **Frontend** : React, React Router DOM, Axios
- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB
- **Sécurité** : Bcrypt.js, JSON Web Token (JWT)

## 🧰 Fonctionnalités

### 🔐 Authentification
- Inscription sécurisée avec hachage de mot de passe (bcrypt)
- Connexion utilisateur avec génération de token JWT
- Gestion du token via `localStorage`
- Routes protégées selon l'état de connexion

### 📋 Annonces
- Liste publique de toutes les annonces
- Création d'annonce (protégée par authentification)
- Suppression / Modification d'annonce (non restreinte aux auteurs)
- Détails d’une annonce (titre, description, prix, catégorie, auteur)
- Filtrage par catégorie (bonus)

### 🔀 Navigation conditionnelle
- Redirection automatique vers `/ads` à l’ouverture
- Pages de connexion et d’inscription **inaccessibles si connecté**
- Page de création d’annonce **protégée** via `PrivateRoute`
- Navbar dynamique selon l’état de connexion

## 📁 Structure du projet

```

/backend
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js

/frontend
├── src/
├── components/
├── pages/
├── services/
└── App.js

````

## ▶️ Installation et exécution

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/boncoin-mern.git
cd boncoin-mern
````

### 2️⃣ Lancer le backend

```bash
cd backend
npm install
```

Créer un fichier `.env` à la racine de `/backend` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/boncoin
JWT_SECRET=monSuperSecretJWT
```

Puis démarrer le serveur :

```bash
npm start
```

### 3️⃣ Lancer le frontend

```bash
cd ../frontend
npm install
npm start
```

Accéder à : [http://localhost:3000](http://localhost:3000)

## 📸 Pages incluses

* `/register` : Formulaire d’inscription
* `/login` : Connexion utilisateur
* `/ads` : Liste publique des annonces
* `/ads/:id` : Détail d'une annonce
* `/create` : Création d’une annonce (requiert connexion)

## ✅ Contraintes respectées

* Token JWT utilisé pour authentifier les requêtes backend
* ID de l’auteur injecté automatiquement depuis le token
* CRUD des annonces fonctionnel
* État géré uniquement avec `useState` et `useEffect`
* Pas d’accès aux pages protégées sans connexion
* Navigation redirigée selon l’état de l’utilisateur

## 📌 Auteur

Développé dans le cadre d’un **TP individuel MERN** pour mettre en pratique l’architecture complète d’une application web moderne.

## 📬 Contact

💡 Pour toute suggestion ou amélioration, n'hésitez pas à ouvrir une issue ou un pull request.

```

---

