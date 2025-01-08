// tests/unit/validators.test.js - Tests unitaires pour les validateurs
const { mediaValidator } = require('../../src/utils/validators');

describe('Media Validator', () => {
    describe('validateCreateInput', () => {
        it('should validate correct input', () => {
            const input = {
                title: 'Test Title',
                category_id: 1,
                dimensions: '1200x800'
            };

            const result = mediaValidator.validateCreateInput(input);
            expect(result.isValid).toBeTruthy();
            expect(result.errors).toHaveLength(0);
        });

        it('should reject invalid dimensions format', () => {
            const input = {
                title: 'Test Title',
                category_id: 1,
                dimensions: '1200px'
            };

            const result = mediaValidator.validateCreateInput(input);
            expect(result.isValid).toBeFalsy();
            expect(result.errors).toContain('Format des dimensions invalide (exemple valide: 1200x800)');
        });
    });
});