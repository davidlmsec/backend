// controllers/mediaController.js - Gestion des médias
const Media = require('../models/Media');
const logger = require('../utils/logger');

const mediaController = {
    getAllMedia: async (req, res) => {
        try {
            const medias = await Media.getAll();
            res.json(medias);
        } catch (error) {
            logger.error('Erreur lors de la récupération des médias:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des médias' });
        }
    },

    getMediaByCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const medias = await Media.getByCategory(categoryId);
            res.json(medias);
        } catch (error) {
            logger.error('Erreur lors de la récupération des médias par catégorie:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des médias' });
        }
    },

    createMedia: async (req, res) => {
        try {
            const mediaData = {
                ...req.body,
                file_path: req.file ? `/uploads/${req.file.filename}` : null
            };
            const mediaId = await Media.create(mediaData);
            res.status(201).json({ id: mediaId, ...mediaData });
        } catch (error) {
            logger.error('Erreur lors de la création du média:', error);
            res.status(500).json({ error: 'Erreur lors de la création du média' });
        }
    },

    updateMedia: async (req, res) => {
        try {
            const { id } = req.params;
            const success = await Media.update(id, req.body);
            if (success) {
                res.json({ message: 'Média mis à jour avec succès' });
            } else {
                res.status(404).json({ error: 'Média non trouvé' });
            }
        } catch (error) {
            logger.error('Erreur lors de la mise à jour du média:', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour du média' });
        }
    },

    deleteMedia: async (req, res) => {
        try {
            const { id } = req.params;
            const success = await Media.delete(id);
            if (success) {
                res.json({ message: 'Média supprimé avec succès' });
            } else {
                res.status(404).json({ error: 'Média non trouvé' });
            }
        } catch (error) {
            logger.error('Erreur lors de la suppression du média:', error);
            res.status(500).json({ error: 'Erreur lors de la suppression du média' });
        }
    }
};

module.exports = mediaController;