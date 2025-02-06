const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

  const tripRoutes = require('./routes/trips');
  const bookingRoutes = require('./routes/bookings');

app.use('/api', tripRoutes);
app.use('/bookings', bookingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
