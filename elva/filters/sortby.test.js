import { describe, it, expect } from 'vitest';
import sortBy from './sortby.js';

const make = () => ([
    { data: { title: 'Banana', date: new Date('2022-01-01') } },
    { data: { title: 'apple',  date: new Date('2023-01-01') } },
    { data: { title: 'Cherry', date: new Date('2021-01-01') } },
]);

describe('sortBy', () => {
    it('sorts ascending by a data key', () => {
        const out = sortBy(make(), 'date');
        expect(out.map(i => i.data.title)).toEqual(['Cherry', 'Banana', 'apple']);
    });
    it('sorts descending when reversed=true', () => {
        const out = sortBy(make(), 'date', true);
        expect(out.map(i => i.data.title)).toEqual(['apple', 'Banana', 'Cherry']);
    });

    // Regression target for plan 004: sortBy must NOT mutate its input.
    it('does not mutate the input array order', () => {
        const input = make();
        const before = input.map(i => i.data.title);
        sortBy(input, 'date');
        expect(input.map(i => i.data.title)).toEqual(before);
    });
});
