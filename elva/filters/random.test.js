import { describe, it, expect } from 'vitest';
import random from './random.js';

describe('random', () => {
    it('returns a one-item array', () => {
        const coll = [{ url: '/a/' }, { url: '/b/' }, { url: '/c/' }];
        const out = random(coll, { url: '/a/' });
        expect(Array.isArray(out)).toBe(true);
        expect(out.length).toBe(1);
    });
    it('never returns the avoided item', () => {
        const coll = [{ url: '/a/' }, { url: '/b/' }];
        for (let i = 0; i < 50; i++) {
            expect(random(coll, { url: '/a/' })[0].url).toBe('/b/');
        }
    });

    // Regression target for plan 005: must terminate when the only item IS the
    // avoided one (currently infinite-loops). Skipped until 005 lands.
    it('terminates when the collection is just the avoided item', () => {
        const coll = [{ url: '/a/' }];
        const out = random(coll, { url: '/a/' });
        expect(out.length).toBe(1);
    });
});
