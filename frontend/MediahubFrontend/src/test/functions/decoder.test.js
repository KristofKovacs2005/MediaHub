import { describe, it, expect } from 'vitest';
import { decodeBuffer } from '../../user/util/decoder';

describe('decodeBuffer', () => {
  it('should decode a buffer object to UTF-8 string', () => {
    const buffer = { data: [72, 101, 108, 108, 111] };
    expect(decodeBuffer(buffer)).toBe('Hello');
  });

  it('should return the value as-is if it is already a string', () => {
    expect(decodeBuffer('already a string')).toBe('already a string');
  });

  it('should return empty string for null input', () => {
    expect(decodeBuffer(null)).toBe('');
  });

  it('should return empty string for undefined input', () => {
    expect(decodeBuffer(undefined)).toBe('');
  });

  it('should return empty string for object without data array', () => {
    expect(decodeBuffer({ notData: [1, 2, 3] })).toBe('');
  });

  it('should handle Hungarian characters in buffer', () => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode('Árvíztűrő');
    const buffer = { data: Array.from(bytes) };
    expect(decodeBuffer(buffer)).toBe('Árvíztűrő');
  });
});
