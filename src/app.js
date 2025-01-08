// app.js - Point d'entrée de l'application
const express = require('express');
const configureServer = require('./config/server');
const mediaRoutes = require('./routes/mediaRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const logger = require('./utils/logger');
const cors = require('cors');
const path = require('path');

const app = express();
configureServer(app);

// Routes
// Configuration CORS
app.use(cors());
app.use('/api', mediaRoutes);
app.use('/api', categoryRoutes);

// Gestion des erreurs
// Configuration pour les fichiers statiques
console.log('Chemin des uploads:', path.join(__dirname, '../uploads'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Test route pour vérifier que le serveur fonctionne
app.get('/test', (req, res) => {
    res.json({ message: 'Le serveur fonctionne' });
});

// Ajoutez cette route de test pour les images
app.get('/test-image/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, '../uploads/images', req.params.imageName);
    console.log('Tentative d\'accès à l\'image:', imagePath);
    res.sendFile(imagePath);
});

app.use((err, req, res, next) => {
    logger.error('Erreur non gérée:', err);
    res.status(500).json({ error: 'Une erreur est survenue' });
});

module.exports = app;