import { describe, it, expect } from 'vitest';
import V60Recipes from './v60-recipes.cjs';

const methods = ['tetsu', 'hoffmann', 'switch', 'iced'];

describe('V60 recipes — invariants', () => {
    const cases = [
        { coffee: 15, water: 250, taste: 'standard', strength: 'strong' },
        { coffee: 30, water: 500, taste: 'bright', strength: 'light' },
        { coffee: 20, water: 60,  taste: 'sweet', strength: 'medium' }, // low ratio, was the negative-pour case
    ];

    for (const method of methods) {
        for (const c of cases) {
            it(`${method} @ ${c.coffee}g/${c.water}ml has no negative pours`, () => {
                const steps = V60Recipes.steps({ ...c, method });
                expect(steps.length).toBeGreaterThan(0);
                for (const s of steps) {
                    if ('addAmount' in s) expect(s.addAmount).toBeGreaterThanOrEqual(0);
                }
            });
        }
    }

    it('tetsu final cumulative equals the target water exactly', () => {
        const steps = V60Recipes.steps({ method: 'tetsu', coffee: 15, water: 250, taste: 'standard', strength: 'strong' });
        const last = steps[steps.length - 1];
        expect(last.cumulative).toBe(250);
    });

    it('hoffmann reaches exactly the target water', () => {
        const steps = V60Recipes.steps({ method: 'hoffmann', coffee: 15, water: 250 });
        const withCum = steps.filter(s => 'cumulative' in s);
        expect(withCum[withCum.length - 1].cumulative).toBe(250);
    });

    it('iced hot-water pours sum to the 40% budget', () => {
        const steps = V60Recipes.steps({ method: 'iced', coffee: 15, water: 250 });
        const last = steps[steps.length - 1];
        expect(last.cumulative).toBe(Math.round(0.4 * 250)); // 100
    });

    it('returns [] for an unknown method', () => {
        expect(V60Recipes.steps({ method: 'nope', coffee: 15, water: 250 })).toEqual([]);
    });
});
