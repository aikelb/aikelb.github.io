import { describe, it, expect } from 'vitest';
import tagged from './tagged.js';

const items = [
    { data: { title: 'a', tags: ['coffee', 'tool'] } },
    { data: { title: 'b', tags: ['coffee'] } },
    { data: { title: 'c', tags: ['vr', 'tool'] } },
];

describe('tagged', () => {
    it('keeps items containing ALL requested tags', () => {
        expect(tagged(items, ['coffee', 'tool']).map(i => i.data.title)).toEqual(['a']);
    });
    it('keeps items containing a single requested tag', () => {
        expect(tagged(items, ['tool']).map(i => i.data.title)).toEqual(['a', 'c']);
    });
    it('returns all items when no tags requested', () => {
        expect(tagged(items, []).length).toBe(3);
    });
});
