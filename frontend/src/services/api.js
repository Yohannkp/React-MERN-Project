import axios from 'axios';

// Configuration de l'URL de base de l'API
// En développement : localhost
// En production : URL de votre backend déployé (Codespaces, Railway, etc.)
const getBaseURL = () => {
  // Si vous avez déployé votre backend, remplacez cette URL
  if (process.env.NODE_ENV === 'production') {
    // Remplacez par l'URL de votre backend déployé
    return process.env.REACT_APP_API_URL || 'https://your-backend-url.preview.app.github.dev/api';
  }
  // URL de développement local
  return 'http://localhost:5000/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000, // 10 secondes de timeout
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Intercepteur pour gérer les erreurs de réseau
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'NETWORK_ERROR' || !error.response) {
      console.error('Erreur de connexion au serveur. Vérifiez que le backend est démarré.');
    }
    return Promise.reject(error);
  }
);

export default API;
