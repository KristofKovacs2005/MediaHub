import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../../user/components/filter/filterBar';

const defaultProps = {
  searchInput: '',
  setSearchInput: vi.fn(),
  tags: [
    { t_name: 'fantasy' },
    { t_name: 'sci-fi' },
    { t_name: 'action' },
  ],
  handleSearch: vi.fn(),
  sortOrder: 'AZ',
  setSortOrder: vi.fn(),
};

describe('FilterBar', () => {
  it('should render search input and submit button', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByPlaceholderText('Keresés: author:John ...')).toBeInTheDocument();
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('should call setSearchInput on typing', () => {
    const setSearchInput = vi.fn();
    render(<FilterBar {...defaultProps} setSearchInput={setSearchInput} />);
    fireEvent.change(screen.getByPlaceholderText('Keresés: author:John ...'), {
      target: { value: 'Harry' },
    });
    expect(setSearchInput).toHaveBeenCalledWith('Harry');
  });

  it('should toggle tag dropdown on button click', () => {
    render(<FilterBar {...defaultProps} />);
    // Dropdown not visible initially
    expect(screen.queryByText('fantasy')).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(screen.getByText('Taggek ▼'));
    expect(screen.getByText('fantasy')).toBeInTheDocument();
    expect(screen.getByText('sci-fi')).toBeInTheDocument();
    expect(screen.getByText('action')).toBeInTheDocument();
  });

  it('should add tag as chip when selected from dropdown', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByText('Taggek ▼'));
    fireEvent.click(screen.getByText('fantasy'));

    // Tag chip should appear
    expect(screen.getByText('fantasy')).toBeInTheDocument();
    // Remove button should appear (×)
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('should remove tag chip when × is clicked', () => {
    render(<FilterBar {...defaultProps} />);
    // Add a tag
    fireEvent.click(screen.getByText('Taggek ▼'));
    fireEvent.click(screen.getByText('fantasy'));

    // Remove it
    fireEvent.click(screen.getByText('×'));

    // Only the dropdown button text should contain fantasy now (not a chip)
    // Open dropdown to verify it's selectable again
    fireEvent.click(screen.getByText('Taggek ▼'));
    const fantasyBtn = screen.getByText('fantasy');
    expect(fantasyBtn).not.toBeDisabled();
  });

  it('should disable already-selected tags in dropdown', () => {
    render(<FilterBar {...defaultProps} />);
    // Add a tag
    fireEvent.click(screen.getByText('Taggek ▼'));
    fireEvent.click(screen.getByText('fantasy'));

    // Reopen dropdown
    fireEvent.click(screen.getByText('Taggek ▼'));
    const buttons = screen.getAllByText('fantasy');
    // The one in the dropdown should be disabled
    const dropdownBtn = buttons.find(b => b.closest('.tags-dropdown'));
    expect(dropdownBtn).toBeDisabled();
  });

  it('should call handleSearch with combined text and tags on submit', () => {
    const handleSearch = vi.fn();
    render(<FilterBar {...defaultProps} searchInput="Harry" handleSearch={handleSearch} />);

    // Add a tag
    fireEvent.click(screen.getByText('Taggek ▼'));
    fireEvent.click(screen.getByText('fantasy'));

    // Submit form
    fireEvent.click(screen.getByText('🔍'));
    expect(handleSearch).toHaveBeenCalledWith('Harry tag:fantasy');
  });

  it('should call setSortOrder when sort dropdown changes', () => {
    const setSortOrder = vi.fn();
    render(<FilterBar {...defaultProps} setSortOrder={setSortOrder} />);
    fireEvent.change(screen.getByLabelText('Rendezés:'), { target: { value: 'ZA' } });
    expect(setSortOrder).toHaveBeenCalledWith('ZA');
  });
});
