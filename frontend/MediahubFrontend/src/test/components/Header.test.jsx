import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../../user/components/header/header';

// Mock image import
vi.mock('../../../assets/ELTE-konyvtar.png', () => ({ default: 'header-bg.png' }));

describe('Header', () => {
  it('should render the title', () => {
    render(<Header title="MediaHub" />);
    expect(screen.getByText('MediaHub')).toBeInTheDocument();
  });

  it('should render subtitle when provided', () => {
    render(<Header title="MediaHub" subtitle="Könyvtári rendszer" />);
    expect(screen.getByText('Könyvtári rendszer')).toBeInTheDocument();
  });

  it('should not render subtitle element when not provided', () => {
    const { container } = render(<Header title="MediaHub" />);
    expect(container.querySelector('.header-subtitle')).not.toBeInTheDocument();
  });

  it('should not render subtitle element when subtitle is empty string', () => {
    const { container } = render(<Header title="MediaHub" subtitle="" />);
    expect(container.querySelector('.header-subtitle')).not.toBeInTheDocument();
  });
});
