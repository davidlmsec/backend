// tests/integration/media.test.js - Tests d'intégration pour les médias
const request = require('supertest');
const app = require('../../src/app');
const pool = require('../../src/config/database');

describe('Media API Endpoints', () => {
    beforeAll(async () => {
        // Configuration de la base de test
        await pool.query('DELETE FROM medias');
        await pool.query('DELETE FROM categories');

        // Insertion des données de test
        await pool.query(`
            INSERT INTO categories (id, name, slug) 
            VALUES (1, 'Test Category', 'test-category')
        `);
    });

    afterAll(async () => {
        // Nettoyage après les tests
        await pool.query('DELETE FROM medias');
        await pool.query('DELETE FROM categories');
        await pool.end();
    });

    describe('GET /api/medias', () => {
        it('should return all media', async () => {
            const res = await request(app).get('/api/medias');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });
    });

    describe('POST /api/medias', () => {
        it('should create a new media', async () => {
            const res = await request(app)
                .post('/api/medias')
                .field('title', 'Test Media')
                .field('description', 'Test Description')
                .field('category_id', 1)
                .attach('file', 'tests/fixtures/test-image.jpg');

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
        });
    });
});
