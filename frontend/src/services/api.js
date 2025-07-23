import axios from 'axios';

// Configuration de l'URL de base de l'API
const getBaseURL = () => {
  // Si une variable d'environnement est définie, l'utiliser
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Si c'est en production sur GitHub Pages
  if (window.location.hostname === 'yohannkp.github.io') {
    // ⚠️ IMPORTANT: Remplacez cette URL par votre vraie URL Codespaces !
    // Exemple: 'https://abcd1234-5000.preview.app.github.dev/api'
    
    // Pour l'instant, nous affichons une erreur claire
    console.error('🚨 BACKEND NON CONFIGURÉ !');
    console.log('📋 Pour connecter votre backend :');
    console.log('1. Créez un Codespace sur GitHub');
    console.log('2. Démarrez le backend dans Codespaces');
    console.log('3. Copiez l\'URL et remplacez dans api.js');
    console.log('4. Redéployez le frontend');
    
    // URL temporaire qui va échouer (pour alerter l'utilisateur)
    return 'https://CONFIGUREZ-VOTRE-BACKEND-CODESPACES.exemple.com/api';
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
