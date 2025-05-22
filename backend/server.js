const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/listings', listingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(process.env.PORT, () =>
      console.log(`Serveur démarré sur le port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('Erreur MongoDB :', err));
