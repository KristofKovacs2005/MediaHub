import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Comment } from '../../user/components/termek_details_page/comment';

vi.mock('../../user/components/modal/modal', () => ({
  default: ({ children, isOpen }) => isOpen ? <div data-testid="modal">{children}</div> : null,
}));
vi.mock('../../user/components/modal/reportReviewConfirmModal/reportReviewConfirmModal', () => ({
  default: () => <div data-testid="report-modal" />,
}));
vi.mock('../../user/components/modal/admin_action_on_review/admin_action_modal', () => ({
  default: () => <div data-testid="admin-modal" />,
}));
vi.mock('../../../assets/dots.png', () => ({ default: 'dots.png' }));

const authMock = vi.hoisted(() => ({ getAuthStatus: vi.fn() }));
vi.mock('../../user/util/auth', () => authMock);

const baseProps = {
  commentAuthor: 'TestUser',
  commentText: 'Great book!',
  commentRating: 4,
  r_id: 1,
  u_id: 10,
  itemName: 'Test Item',
  isOwnComment: false,
};

describe('Comment component', () => {
  it('should render author name and comment text', () => {
    authMock.getAuthStatus.mockReturnValue(1);
    render(<Comment {...baseProps} />);
    expect(screen.getByText('TestUser')).toBeInTheDocument();
    expect(screen.getByText('Great book!')).toBeInTheDocument();
  });

  it('should render correct number of active stars for rating 4', () => {
    authMock.getAuthStatus.mockReturnValue(1);
    render(<Comment {...baseProps} />);
    const stars = document.querySelectorAll('.star');
    expect(stars).toHaveLength(5);
    const activeStars = document.querySelectorAll('.star.active');
    expect(activeStars).toHaveLength(4);
  });

  it('should show report button for logged-in user on other users comment', () => {
    authMock.getAuthStatus.mockReturnValue(1);
    render(<Comment {...baseProps} isOwnComment={false} />);
    expect(screen.getByTitle('Vélemény jelentése')).toBeInTheDocument();
  });

  it('should hide report button for own comment', () => {
    authMock.getAuthStatus.mockReturnValue(1);
    render(<Comment {...baseProps} isOwnComment={true} />);
    expect(screen.queryByTitle('Vélemény jelentése')).not.toBeInTheDocument();
  });

  it('should hide all buttons for guest (not logged in)', () => {
    authMock.getAuthStatus.mockReturnValue(null);
    render(<Comment {...baseProps} />);
    expect(screen.queryByTitle('Vélemény jelentése')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Műveletek')).not.toBeInTheDocument();
  });

  it('should show admin action button instead of report for admin', () => {
    authMock.getAuthStatus.mockReturnValue(5);
    render(<Comment {...baseProps} />);
    expect(screen.getByAltText('Műveletek')).toBeInTheDocument();
    expect(screen.queryByTitle('Vélemény jelentése')).not.toBeInTheDocument();
  });
});
