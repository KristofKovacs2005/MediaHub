import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemsGrid from '../../user/components/sections/item-grid';

// Mock TermekCard to isolate ItemsGrid logic
vi.mock('../../user/components/carouselCards/termekCard', () => ({
  default: ({ item }) => <div data-testid="termek-card">{item.i_name}</div>,
}));

describe('ItemsGrid', () => {
  it('should show loading state', () => {
    render(<ItemsGrid items={[]} loading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    render(<ItemsGrid items={[]} loading={false} error="Something went wrong" />);
    expect(screen.getByText('Nem sikerült betölteni a termékeket.')).toBeInTheDocument();
  });

  it('should show empty state when no items', () => {
    render(<ItemsGrid items={[]} loading={false} error={null} />);
    expect(screen.getByText('Nincs találat.')).toBeInTheDocument();
  });

  it('should render TermekCard for each item', () => {
    const items = [
      { i_id: 1, i_name: 'Book A' },
      { i_id: 2, i_name: 'Book B' },
      { i_id: 3, i_name: 'Book C' },
    ];
    render(<ItemsGrid items={items} loading={false} error={null} />);
    const cards = screen.getAllByTestId('termek-card');
    expect(cards).toHaveLength(3);
    expect(screen.getByText('Book A')).toBeInTheDocument();
    expect(screen.getByText('Book B')).toBeInTheDocument();
    expect(screen.getByText('Book C')).toBeInTheDocument();
  });

  it('should prioritize loading over error', () => {
    render(<ItemsGrid items={[]} loading={true} error="error" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Nem sikerült betölteni a termékeket.')).not.toBeInTheDocument();
  });
});
