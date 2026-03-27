import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiCall } from '../../user/functions/apiCall';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('apiCall', () => {
  it('should return JSON data on successful GET', async () => {
    const mockData = { id: 1, name: 'Test' };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve(mockData),
    });

    const result = await apiCall('http://localhost:3000/items');
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/items', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: null,
    });
  });

  it('should include token in headers when provided', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({}),
    });

    await apiCall('http://localhost:3000/orders', 'GET', null, 'myToken123');
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/orders',
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': 'myToken123',
        },
      })
    );
  });

  it('should send JSON body on POST', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ success: true }),
    });

    await apiCall('http://localhost:3000/orders', 'POST', { p_id: 1 }, 'token');
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/orders',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ p_id: 1 }),
      })
    );
  });

  it('should throw error with message from JSON error response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ message: 'Nincs jogosultság' }),
    });

    await expect(apiCall('http://localhost:3000/users')).rejects.toThrow('Nincs jogosultság');
  });

  it('should throw with text body when error response is not JSON', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      headers: { get: () => 'text/plain' },
      text: () => Promise.resolve('Server error'),
    });

    await expect(apiCall('http://localhost:3000/items')).rejects.toThrow('Server error');
  });

  it('should return null for successful non-JSON response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'text/plain' },
    });

    const result = await apiCall('http://localhost:3000/items/1', 'DELETE');
    expect(result).toBeNull();
  });
});
