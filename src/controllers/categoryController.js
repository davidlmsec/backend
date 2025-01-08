// controllers/categoryController.js - Gestion des catégories
const Category = require('../models/Category');
const logger = require('../utils/logger');

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.getAll();
            res.json(categories);
        } catch (error) {
            logger.error('Erreur lors de la récupération des catégories:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.getById(id);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ error: 'Catégorie non trouvée' });
            }
        } catch (error) {
            logger.error('Erreur lors de la récupération de la catégorie:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de la catégorie' });
        }
    }
};

module.exports = categoryController;