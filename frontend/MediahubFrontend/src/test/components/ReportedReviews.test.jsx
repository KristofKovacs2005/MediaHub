import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReportedReviews from '../../user/components/sections/reportedReviews';

// Mock image import
vi.mock('../../../assets/mail.jpg', () => ({ default: 'mail.jpg' }));

describe('ReportedReviews', () => {
  it('should show reported reviews count when value > 0', () => {
    render(<ReportedReviews value={5} />);
    expect(screen.getByText('Jelentett értékelések')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should show "no reports" message when value is 0', () => {
    render(<ReportedReviews value={0} />);
    expect(screen.getByText('Nincsenek jelentett értékelések')).toBeInTheDocument();
    expect(screen.queryByText('Jelentett értékelések')).not.toBeInTheDocument();
  });

  it('should show "no reports" message when value is negative', () => {
    render(<ReportedReviews value={-1} />);
    expect(screen.getByText('Nincsenek jelentett értékelések')).toBeInTheDocument();
  });

  it('should render mail image when value > 0', () => {
    render(<ReportedReviews value={3} />);
    expect(screen.getByAltText('Reported Reviews')).toBeInTheDocument();
  });
});
