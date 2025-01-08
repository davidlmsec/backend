// src/server.js - Point d'entrée principale de l'application
const app = require('./app');
const logger = require('./utils/logger');
const dotenv = require('dotenv');

// Chargement des variables d'environnement
dotenv.config();

// Définition du port
const PORT = process.env.PORT || 3001;

// Gestion des erreurs non capturées
process.on('uncaughtException', (error) => {
    logger.error('Erreur non capturée:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    logger.error('Promesse rejetée non gérée:', error);
    process.exit(1);
});

// Démarrage du serveur
const server = app.listen(PORT, () => {
    logger.info(`Serveur démarré sur le port ${PORT}`);
});

// Gestion gracieuse de l'arrêt
process.on('SIGTERM', () => {
    logger.info('Signal SIGTERM reçu. Arrêt gracieux...');
    server.close(() => {
        logger.info('Serveur arrêté.');
        process.exit(0);
    });
});

module.exports = server;