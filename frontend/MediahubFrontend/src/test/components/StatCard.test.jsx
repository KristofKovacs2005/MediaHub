import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from '../../user/components/charts/statistics/statCard';

describe('StatCard', () => {
  it('should render value and title', () => {
    render(<StatCard value={42} title="Termékek" />);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Termékek')).toBeInTheDocument();
  });

  it('should render image when provided', () => {
    render(<StatCard value={10} title="Felhasználók" image="icon.png" />);
    const img = screen.getByAltText('Felhasználók');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'icon.png');
  });

  it('should not render image when not provided', () => {
    render(<StatCard value={10} title="Felhasználók" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should apply custom border color', () => {
    const { container } = render(<StatCard value={5} title="Test" color="#ff0000" />);
    const card = container.querySelector('.stat-card');
    expect(card.style.borderLeft).toContain('5px solid');
    expect(card.style.borderLeft).toContain('rgb(255, 0, 0)');
  });

  it('should apply default border color when none provided', () => {
    const { container } = render(<StatCard value={5} title="Test" />);
    const card = container.querySelector('.stat-card');
    expect(card.style.borderLeft).toContain('5px solid');
    expect(card.style.borderLeft).toContain('rgb(52, 152, 219)');
  });
});
