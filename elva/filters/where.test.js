import { describe, it, expect } from 'vitest';
import where from './where.js';

const items = [
    { data: { title: 'a', draft: true } },
    { data: { title: 'b', draft: false } },
    { data: { title: 'c' } },
];

describe('where', () => {
    it('matches items by key === value', () => {
        expect(where(items, 'draft', true).map(i => i.data.title)).toEqual(['a']);
    });
    it('keeps items that merely have the key when value is undefined', () => {
        expect(where(items, 'draft').map(i => i.data.title)).toEqual(['a', 'b']);
    });
});
