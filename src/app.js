const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./utils/logger');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log toutes les requêtes
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes statiques
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes API
app.use('/api', mediaRoutes);

// Route de test
app.get('/test', (req, res) => {
    res.json({ message: 'API fonctionnelle' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    logger.error('Erreur:', err);
    res.status(500).json({ error: 'Erreur serveur' });
});

module.exports = app;