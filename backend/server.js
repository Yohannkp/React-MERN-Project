const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');

dotenv.config();
const app = express();

// Configuration CORS pour GitHub Pages et Codespaces
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://yohannkp.github.io',
    'https://Yohannkp.github.io',
    /https:\/\/.*\.github\.dev/, // Pour GitHub Codespaces
    /https:\/\/.*\.githubpreview\.dev/ // Pour GitHub Codespaces preview
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Route de santé pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API Le Bon Coin Clone - Serveur en fonctionnement',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes API
app.use('/api/auth', userRoutes);
app.use('/api/listings', listingRoutes);

// Gestion d'erreur globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/leboncoin';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    console.log(`📊 Base de données: ${MONGO_URI.split('@')[1] || 'localhost'}`);
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`🌍 API disponible sur: http://localhost:${PORT}`);
      console.log(`📖 Documentation: http://localhost:${PORT}/`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur MongoDB :', err.message);
    process.exit(1);
  });
