import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommentsSection } from '../../user/components/termek_details_page/commentsSection';

// Mock Comment component to isolate CommentsSection
vi.mock('../../user/components/termek_details_page/comment', () => ({
  Comment: ({ commentAuthor, commentText }) => (
    <div data-testid="comment">
      <span>{commentAuthor}</span>
      <span>{commentText}</span>
    </div>
  ),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = String(value); }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

const sampleComments = [
  { r_id: 1, u_id: 10, username: 'Alice', comment: 'Great!', stars: 5 },
  { r_id: 2, u_id: 20, username: 'Bob', comment: 'Good', stars: 4 },
];

describe('CommentsSection', () => {
  it('should render list of comments', () => {
    render(
      <CommentsSection
        comments={sampleComments}
        itemName="Test Item"
        userHasCommented={false}
        isLoggedIn={true}
        onOpenReviewModal={vi.fn()}
      />
    );
    const commentElements = screen.getAllByTestId('comment');
    expect(commentElements).toHaveLength(2);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('should show empty state when no comments', () => {
    render(
      <CommentsSection
        comments={[]}
        itemName="Test Item"
        userHasCommented={false}
        isLoggedIn={true}
        onOpenReviewModal={vi.fn()}
      />
    );
    expect(screen.getByText('Még nincsenek vélemények erre az elemre.')).toBeInTheDocument();
  });

  it('should enable new review button for logged-in user who has not commented', () => {
    render(
      <CommentsSection
        comments={[]}
        itemName="Test Item"
        userHasCommented={false}
        isLoggedIn={true}
        onOpenReviewModal={vi.fn()}
      />
    );
    const button = screen.getByText('+ Új vélemény');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('title', 'Írj véleményt');
  });

  it('should disable button and show tooltip when user is not logged in', () => {
    render(
      <CommentsSection
        comments={[]}
        itemName="Test Item"
        userHasCommented={false}
        isLoggedIn={false}
        onOpenReviewModal={vi.fn()}
      />
    );
    const button = screen.getByText('+ Új vélemény');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('title', 'Vélemény írásához jelentkezz be');
  });

  it('should disable button and show tooltip when user already commented', () => {
    render(
      <CommentsSection
        comments={sampleComments}
        itemName="Test Item"
        userHasCommented={true}
        isLoggedIn={true}
        onOpenReviewModal={vi.fn()}
      />
    );
    const button = screen.getByText('+ Új vélemény');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('title', 'Már írtál véleményt erre az elemre');
  });

  it('should call onOpenReviewModal when button is clicked', () => {
    const onOpenReviewModal = vi.fn();
    render(
      <CommentsSection
        comments={[]}
        itemName="Test Item"
        userHasCommented={false}
        isLoggedIn={true}
        onOpenReviewModal={onOpenReviewModal}
      />
    );
    fireEvent.click(screen.getByText('+ Új vélemény'));
    expect(onOpenReviewModal).toHaveBeenCalledOnce();
  });
});
