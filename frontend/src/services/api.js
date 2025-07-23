import axios from 'axios';

// Configuration de l'URL de base de l'API
const getBaseURL = () => {
  // Si une variable d'environnement est définie, l'utiliser en priorité
  if (process.env.REACT_APP_API_URL) {
    console.log('✅ Utilisation de REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
    return process.env.REACT_APP_API_URL;
  }
  
  // Si c'est en production sur GitHub Pages
  if (window.location.hostname === 'yohannkp.github.io') {
    // ✅ URL de votre backend Codespaces configurée
    console.log('� Utilisation de l\'URL backend configurée');
    return 'https://psychic-halibut-jpjvww5vx96h97v-5000.app.github.dev';
  }
  
  // Si c'est dans GitHub Codespaces, utiliser l'URL de développement appropriée
  if (window.location.hostname.includes('.github.dev') || window.location.hostname.includes('.app.github.dev')) {
    console.log('🔧 Détection GitHub Codespaces, utilisation de l\'URL par défaut');
    return 'https://psychic-halibut-jpjvww5vx96h97v-5000.app.github.dev';
  }
  
  // URL de développement local
  return 'http://localhost:5000/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log pour aider au débogage
  console.log('🌐 Tentative de connexion à:', req.baseURL);
  
  return req;
});

// Intercepteur pour gérer les erreurs de réseau
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
      console.error('❌ Impossible de se connecter au backend');
      console.log('💡 Solutions :');
      console.log('1. Démarrez votre backend local: cd backend && npm start');
      console.log('2. Ou configurez votre backend Codespaces (voir QUICK-DEPLOY-GUIDE.md)');
    }
    return Promise.reject(error);
  }
);

export default API;
