import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getTokenDuration, getAuthToken, getAuthStatus } from '../../user/util/auth';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = String(value); }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

// Prevent actual navigation on expired token
Object.defineProperty(window, 'location', {
  value: { href: '' },
  writable: true,
});

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

describe('getTokenDuration', () => {
  it('should return positive duration for future expiration', () => {
    const future = new Date(Date.now() + 60000).toISOString();
    localStorageMock.setItem('expiration', future);
    expect(getTokenDuration()).toBeGreaterThan(0);
  });

  it('should return negative duration for past expiration', () => {
    const past = new Date(Date.now() - 60000).toISOString();
    localStorageMock.setItem('expiration', past);
    expect(getTokenDuration()).toBeLessThan(0);
  });
});

describe('getAuthStatus', () => {
  it('should return numeric status from localStorage', () => {
    localStorageMock.setItem('status', '5');
    expect(getAuthStatus()).toBe(5);
  });

  it('should return null when no status is stored', () => {
    expect(getAuthStatus()).toBeNull();
  });

  it('should return 1 for regular user', () => {
    localStorageMock.setItem('status', '1');
    expect(getAuthStatus()).toBe(1);
  });
});

describe('getAuthToken', () => {
  it('should return token when valid and not expired', () => {
    const future = new Date(Date.now() + 60000).toISOString();
    localStorageMock.setItem('authToken', 'abc123');
    localStorageMock.setItem('expiration', future);
    expect(getAuthToken()).toBe('abc123');
  });

  it('should return null when no token exists', () => {
    expect(getAuthToken()).toBeNull();
  });

  it('should return null and clear storage when token is expired', () => {
    const past = new Date(Date.now() - 60000).toISOString();
    localStorageMock.setItem('authToken', 'expired-token');
    localStorageMock.setItem('expiration', past);
    expect(getAuthToken()).toBeNull();
    expect(localStorageMock.clear).toHaveBeenCalled();
  });
});
