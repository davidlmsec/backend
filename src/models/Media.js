// models/Media.js - Modèle pour la gestion des médias
const pool = require('../config/database');

class Media {
    static async getAll() {
        const [rows] = await pool.query(
            'SELECT m.*, c.name as category_name FROM medias m JOIN categories c ON m.category_id = c.id'
        );
        return rows;
    }

    static async getByCategory(categoryId) {
        const [rows] = await pool.query(
            'SELECT m.*, c.name as category_name FROM medias m JOIN categories c ON m.category_id = c.id WHERE m.category_id = ?',
            [categoryId]
        );
        return rows;
    }

    static async create(mediaData) {
        const { title, description, file_path, file_type, category_id, dimensions } = mediaData;
        const [result] = await pool.query(
            'INSERT INTO medias (title, description, file_path, file_type, category_id, dimensions) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, file_path, file_type, category_id, dimensions]
        );
        return result.insertId;
    }

    static async update(id, mediaData) {
        const { title, description, category_id } = mediaData;
        const [result] = await pool.query(
            'UPDATE medias SET title = ?, description = ?, category_id = ? WHERE id = ?',
            [title, description, category_id, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM medias WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Media;