// models/Category.js - Modèle pour la gestion des catégories
const pool = require('../config/database');

class Category {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM categories');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(categoryData) {
        const { name, slug } = categoryData;
        const [result] = await pool.query(
            'INSERT INTO categories (name, slug) VALUES (?, ?)',
            [name, slug]
        );
        return result.insertId;
    }
}

module.exports = Category;
