// app.js - Point d'entrée de l'application
const express = require('express');
const configureServer = require('./config/server');
const mediaRoutes = require('./routes/mediaRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const logger = require('./utils/logger');

const app = express();
configureServer(app);

// Routes
app.use('/api', mediaRoutes);
app.use('/api', categoryRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    logger.error('Erreur non gérée:', err);
    res.status(500).json({ error: 'Une erreur est survenue' });
});

module.exports = app;