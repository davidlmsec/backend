// routes/mediaRoutes.js - Routes pour les médias
const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Routes publiques
router.get('/medias', mediaController.getAllMedia);
router.get('/medias/category/:categoryId', mediaController.getMediaByCategory);

// Routes protégées
router.post('/medias', authMiddleware, upload.single('file'), mediaController.createMedia);
router.put('/medias/:id', authMiddleware, mediaController.updateMedia);
router.delete('/medias/:id', authMiddleware, mediaController.deleteMedia);

module.exports = router;