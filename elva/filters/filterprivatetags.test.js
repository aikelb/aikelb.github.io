import { describe, it, expect } from 'vitest';
import filterPrivateTags from './filterprivatetags.js';

describe('filterPrivateTags', () => {
    it('drops tags starting with underscore', () => {
        expect(filterPrivateTags(['_posts', 'coffee', '_draft', 'tool']))
            .toEqual(['coffee', 'tool']);
    });
    it('returns empty array for undefined input', () => {
        expect(filterPrivateTags(undefined)).toEqual([]);
    });
    it('keeps an all-public list unchanged', () => {
        expect(filterPrivateTags(['a', 'b'])).toEqual(['a', 'b']);
    });
});
