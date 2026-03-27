import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RenderNavbar from '../../user/components/navbar/renderNavbar';

// Mock all navbar variants
vi.mock('../../user/components/navbar/navbar_not_logged_in/navbar', () => ({
  Navbar: () => <nav data-testid="navbar-guest">Guest Navbar</nav>,
}));
vi.mock('../../user/components/navbar/navbar_user_log_in/navbar', () => ({
  Navbar_User_Log_In: ({ userName }) => <nav data-testid="navbar-user">{userName}</nav>,
}));
vi.mock('../../user/components/navbar/navbar_librarian/navbar', () => ({
  Navbar_Librarian: ({ userName }) => <nav data-testid="navbar-librarian">{userName}</nav>,
}));
vi.mock('../../user/components/navbar/navbar_admin/navbar', () => ({
  Navbar_Admin: ({ userName }) => <nav data-testid="navbar-admin">{userName}</nav>,
}));

beforeEach(() => {
  window.localStorage.clear();
});

function renderNavbar() {
  return render(
    <MemoryRouter>
      <RenderNavbar />
    </MemoryRouter>
  );
}

describe('RenderNavbar role-based integration', () => {
  it('should render guest navbar when no token', () => {
    renderNavbar();
    expect(screen.getByTestId('navbar-guest')).toBeInTheDocument();
  });

  it('should render guest navbar for banned user (status 3)', () => {
    window.localStorage.setItem('authToken', 'token');
    window.localStorage.setItem('status', '3');
    window.localStorage.setItem('username', 'banned');
    renderNavbar();
    expect(screen.getByTestId('navbar-guest')).toBeInTheDocument();
  });

  it('should render user navbar for status 1', () => {
    window.localStorage.setItem('authToken', 'token');
    window.localStorage.setItem('status', '1');
    window.localStorage.setItem('username', 'TestUser');
    renderNavbar();
    expect(screen.getByTestId('navbar-user')).toBeInTheDocument();
    expect(screen.getByText('TestUser')).toBeInTheDocument();
  });

  it('should render user navbar for warned user (status 2)', () => {
    window.localStorage.setItem('authToken', 'token');
    window.localStorage.setItem('status', '2');
    window.localStorage.setItem('username', 'WarnedUser');
    renderNavbar();
    expect(screen.getByTestId('navbar-user')).toBeInTheDocument();
  });

  it('should render librarian navbar for status 4', () => {
    window.localStorage.setItem('authToken', 'token');
    window.localStorage.setItem('status', '4');
    window.localStorage.setItem('username', 'LibUser');
    renderNavbar();
    expect(screen.getByTestId('navbar-librarian')).toBeInTheDocument();
  });

  it('should render admin navbar for status 5', () => {
    window.localStorage.setItem('authToken', 'token');
    window.localStorage.setItem('status', '5');
    window.localStorage.setItem('username', 'AdminUser');
    renderNavbar();
    expect(screen.getByTestId('navbar-admin')).toBeInTheDocument();
  });
});
