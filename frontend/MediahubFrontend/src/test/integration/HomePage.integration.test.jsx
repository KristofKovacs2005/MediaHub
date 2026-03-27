import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../user/pages/homepage';

// Mock all body components to verify the correct one renders
vi.mock('../../user/components/homePageBody/GuestBody', () => ({
  default: () => <div data-testid="guest-body">Guest Body</div>,
}));
vi.mock('../../user/components/homePageBody/UserBody', () => ({
  default: () => <div data-testid="user-body">User Body</div>,
}));
vi.mock('../../user/components/homePageBody/LibrarianBody', () => ({
  default: () => <div data-testid="librarian-body">Librarian Body</div>,
}));
vi.mock('../../user/components/homePageBody/AdminBody', () => ({
  default: () => <div data-testid="admin-body">Admin Body</div>,
}));
vi.mock('../../user/components/footer/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));
vi.mock('../../user/components/navbar/renderNavbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

beforeEach(() => {
  window.localStorage.clear();
});

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe('HomePage role-based routing integration', () => {
  it('should render GuestBody when no user is logged in', () => {
    renderHomePage();
    expect(screen.getByTestId('guest-body')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render UserBody for regular user (status 1)', () => {
    window.localStorage.setItem('status', '1');
    renderHomePage();
    expect(screen.getByTestId('user-body')).toBeInTheDocument();
  });

  it('should render UserBody for warned user (status 2)', () => {
    window.localStorage.setItem('status', '2');
    renderHomePage();
    expect(screen.getByTestId('user-body')).toBeInTheDocument();
  });

  it('should render LibrarianBody for librarian (status 4)', () => {
    window.localStorage.setItem('status', '4');
    renderHomePage();
    expect(screen.getByTestId('librarian-body')).toBeInTheDocument();
  });

  it('should render AdminBody for admin (status 5)', () => {
    window.localStorage.setItem('status', '5');
    renderHomePage();
    expect(screen.getByTestId('admin-body')).toBeInTheDocument();
  });

  it('should fall back to GuestBody for unknown status', () => {
    window.localStorage.setItem('status', '99');
    renderHomePage();
    expect(screen.getByTestId('guest-body')).toBeInTheDocument();
  });
});
