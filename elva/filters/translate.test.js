import { describe, it, expect } from 'vitest';
import translate from './translate.js';

const ctx = {
    page: { lang: 'en' },
    ctx: {
        translations: {
            en: {
                meta: { title: 'Aitor Lozano' },
                readingTime: { minutes: '{{ n }} minutes to read' }
            }
        }
    }
};

describe('translate', () => {
    it('looks up nested keys', () => {
        expect(translate.call(ctx, 'meta.title')).toBe('Aitor Lozano');
    });
    it('substitutes data', () => {
        expect(translate.call(ctx, 'readingTime.minutes', 'en', { n: 5 })).toBe('5 minutes to read');
    });
    it('throws on a missing key, so typos fail the build', () => {
        expect(() => translate.call(ctx, 'nope.missing')).toThrow();
    });
});
