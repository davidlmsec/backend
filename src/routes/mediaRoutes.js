const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Assurez-vous que le chemin est correct

router.get('/medias', async (req, res) => {
    try {
        console.log('Tentative de récupération des médias');
        const [rows] = await pool.query('SELECT * FROM medias');
        console.log('Médias récupérés:', rows);
        res.json(rows);
    } catch (error) {
        console.error('Erreur détaillée:', error);
        res.status(500).json({
            error: 'Erreur serveur',
            details: error.message
        });
    }
});

router.get('/categories', async (req, res) => {
    try {
        console.log('Tentative de récupération des catégories');
        const [rows] = await pool.query('SELECT * FROM categories');
        console.log('Catégories récupérées:', rows);
        res.json(rows);
    } catch (error) {
        console.error('Erreur détaillée:', error);
        res.status(500).json({
            error: 'Erreur serveur',
            details: error.message
        });
    }
});

module.exports = router;