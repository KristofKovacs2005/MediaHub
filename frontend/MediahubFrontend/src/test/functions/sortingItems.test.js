import { describe, it, expect } from 'vitest';
import { sortItemsAZ, sortItemsZA } from '../../user/functions/sortingItems';

describe('sortItemsAZ', () => {
  it('should sort items alphabetically by i_name', () => {
    const items = [
      { i_name: 'Csillagok háborúja' },
      { i_name: 'Avatar' },
      { i_name: 'Batman' },
    ];
    const result = sortItemsAZ(items);
    expect(result.map(i => i.i_name)).toEqual(['Avatar', 'Batman', 'Csillagok háborúja']);
  });

  it('should return empty array when input is empty', () => {
    expect(sortItemsAZ([])).toEqual([]);
  });

  it('should not mutate the original array', () => {
    const items = [{ i_name: 'B' }, { i_name: 'A' }];
    const result = sortItemsAZ(items);
    expect(items[0].i_name).toBe('B');
    expect(result[0].i_name).toBe('A');
  });
});

describe('sortItemsZA', () => {
  it('should sort items in reverse alphabetical order by i_name', () => {
    const items = [
      { i_name: 'Avatar' },
      { i_name: 'Csillagok háborúja' },
      { i_name: 'Batman' },
    ];
    const result = sortItemsZA(items);
    expect(result.map(i => i.i_name)).toEqual(['Csillagok háborúja', 'Batman', 'Avatar']);
  });

  it('should handle single element array', () => {
    const items = [{ i_name: 'Egyetlen' }];
    expect(sortItemsZA(items)).toEqual([{ i_name: 'Egyetlen' }]);
  });
});
