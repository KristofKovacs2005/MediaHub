import { describe, it, expect, vi } from 'vitest';
import { applyFilters, clearFilters } from '../../user/functions/useFilter';

describe('applyFilters', () => {
  it('should call fetchFn with trimmed filter values', () => {
    const fetchFn = vi.fn();
    applyFilters({
      nameFilter: '  Harry Potter  ',
      tagsFilter: ['fantasy', 'kaland'],
      authorFilter: ' Rowling ',
      setLoading: vi.fn(),
      setItems: vi.fn(),
      setError: vi.fn(),
      fetchFn,
    });

    expect(fetchFn).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Harry Potter',
        tags: 'fantasy,kaland',
        author: 'Rowling',
      })
    );
  });

  it('should handle empty filters', () => {
    const fetchFn = vi.fn();
    applyFilters({
      nameFilter: '',
      tagsFilter: [],
      authorFilter: '',
      setLoading: vi.fn(),
      setItems: vi.fn(),
      setError: vi.fn(),
      fetchFn,
    });

    expect(fetchFn).toHaveBeenCalledWith(
      expect.objectContaining({
        name: '',
        tags: '',
        author: '',
      })
    );
  });

  it('should handle string tagsFilter (non-array)', () => {
    const fetchFn = vi.fn();
    applyFilters({
      nameFilter: '',
      tagsFilter: 'sci-fi',
      authorFilter: '',
      setLoading: vi.fn(),
      setItems: vi.fn(),
      setError: vi.fn(),
      fetchFn,
    });

    expect(fetchFn).toHaveBeenCalledWith(
      expect.objectContaining({ tags: 'sci-fi' })
    );
  });
});

describe('clearFilters', () => {
  it('should reset all filter states and call fetchFn', () => {
    const setNameFilter = vi.fn();
    const setTagsFilter = vi.fn();
    const setAuthorFilter = vi.fn();
    const fetchFn = vi.fn();

    clearFilters({
      setNameFilter,
      setTagsFilter,
      setAuthorFilter,
      setLoading: vi.fn(),
      setItems: vi.fn(),
      setError: vi.fn(),
      fetchFn,
    });

    expect(setNameFilter).toHaveBeenCalledWith('');
    expect(setTagsFilter).toHaveBeenCalledWith([]);
    expect(setAuthorFilter).toHaveBeenCalledWith('');
    expect(fetchFn).toHaveBeenCalled();
  });
});
