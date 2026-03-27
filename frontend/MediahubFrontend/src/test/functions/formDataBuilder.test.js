import { describe, it, expect } from 'vitest';
import { buildItemFormData } from '../../user/functions/formDataBuilder';

describe('buildItemFormData', () => {
  it('should include all provided fields', () => {
    const fd = buildItemFormData({
      i_name: 'Test Item',
      author: 'Author',
      i_description: 'Description',
      amount: 5,
      tags: ['sci-fi', 'action'],
      imageFile: null,
    });
    expect(fd.get('i_name')).toBe('Test Item');
    expect(fd.get('author')).toBe('Author');
    expect(fd.get('i_description')).toBe('Description');
    expect(fd.get('amount')).toBe('5');
    expect(fd.get('tags')).toBe('sci-fi,action');
  });

  it('should omit fields that are not provided', () => {
    const fd = buildItemFormData({ i_name: 'Only Name' });
    expect(fd.get('i_name')).toBe('Only Name');
    expect(fd.get('author')).toBeNull();
    expect(fd.get('i_description')).toBeNull();
    expect(fd.get('tags')).toBeNull();
  });

  it('should handle empty tags array', () => {
    const fd = buildItemFormData({ i_name: 'Item', tags: [] });
    expect(fd.get('tags')).toBeNull();
  });

  it('should convert amount to string', () => {
    const fd = buildItemFormData({ amount: 0 });
    expect(fd.get('amount')).toBe('0');
  });

  it('should not include amount when null', () => {
    const fd = buildItemFormData({ i_name: 'X', amount: null });
    expect(fd.get('amount')).toBeNull();
  });
});
