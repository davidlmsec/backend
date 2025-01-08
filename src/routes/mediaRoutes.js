const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

// Routes publiques
router.get('/medias', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT m.*, c.name as category_name FROM medias m JOIN categories c ON m.category_id = c.id'
        );
        console.log('Données récupérées:', rows);
        res.json(rows);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories');
        console.log('Catégories récupérées:', rows);
        res.json(rows);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;