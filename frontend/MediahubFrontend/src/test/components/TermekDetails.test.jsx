import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TermekDetails } from '../../user/components/termek_details_page/termek_details';

// Mock dependencies
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
}));

vi.mock('../../user/components/modal/modal', () => ({
  default: ({ children, isOpen }) => isOpen ? <div data-testid="modal">{children}</div> : null,
}));

vi.mock('../../user/components/modal/newOrders/newOrderModal', () => ({
  default: ({ termek }) => <div data-testid="order-modal">Order for {termek.i_name}</div>,
}));

const inStockItem = {
  i_id: 1,
  i_name: 'Test Book',
  author: 'Test Author',
  i_description: 'A great book about testing',
  amount: 5,
  img_url: '/uploads/test.jpg',
};

const outOfStockItem = {
  ...inStockItem,
  amount: 0,
};

describe('TermekDetails', () => {
  it('should render item name, author, and description', () => {
    render(<TermekDetails item={inStockItem} tags={[]} />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('A great book about testing')).toBeInTheDocument();
  });

  it('should show in-stock status when amount > 0', () => {
    render(<TermekDetails item={inStockItem} tags={[]} />);
    expect(screen.getByText(/Raktáron: 5 db/)).toBeInTheDocument();
  });

  it('should show out-of-stock status when amount is 0', () => {
    render(<TermekDetails item={outOfStockItem} tags={[]} />);
    expect(screen.getByText('Nincs raktáron')).toBeInTheDocument();
  });

  it('should enable borrow button when item is in stock', () => {
    render(<TermekDetails item={inStockItem} tags={[]} />);
    const button = screen.getByText('Kölcsönzés');
    expect(button).not.toBeDisabled();
  });

  it('should disable borrow button when item is out of stock', () => {
    render(<TermekDetails item={outOfStockItem} tags={[]} />);
    const button = screen.getByText('Kölcsönzés');
    expect(button).toBeDisabled();
  });

  it('should render tags as badges', () => {
    render(<TermekDetails item={inStockItem} tags={['fantasy', 'kaland']} />);
    expect(screen.getByText('fantasy')).toBeInTheDocument();
    expect(screen.getByText('kaland')).toBeInTheDocument();
  });

  it('should not render tags section when tags array is empty', () => {
    const { container } = render(<TermekDetails item={inStockItem} tags={[]} />);
    expect(container.querySelector('.detailsTags')).not.toBeInTheDocument();
  });

  it('should open order modal when borrow button is clicked', () => {
    render(<TermekDetails item={inStockItem} tags={[]} />);
    fireEvent.click(screen.getByText('Kölcsönzés'));
    expect(screen.getByTestId('order-modal')).toBeInTheDocument();
    expect(screen.getByText('Order for Test Book')).toBeInTheDocument();
  });

  it('should show fallback text for missing fields', () => {
    const emptyItem = { i_id: 1, amount: 0 };
    render(<TermekDetails item={emptyItem} tags={[]} />);
    expect(screen.getByText('Nincs cím')).toBeInTheDocument();
    expect(screen.getByText('Ismeretlen')).toBeInTheDocument();
    expect(screen.getByText('Nincs leírás')).toBeInTheDocument();
  });
});
