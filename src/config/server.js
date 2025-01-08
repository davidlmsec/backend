// config/server.js - Configuration du serveur Express
const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limite chaque IP à 100 requêtes par windowMs
});

const configureServer = (app) => {
    // Middleware de base
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(limiter);

    // Configuration des headers de sécurité
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });

    // Servir les fichiers statiques
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    return app;
};

module.exports = configureServer;