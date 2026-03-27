import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TermekDetailsPage from '../../user/components/termek_details_page/termek_details_page';

// Mock navbar/footer
vi.mock('../../user/components/navbar/renderNavbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));
vi.mock('../../user/components/footer/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

// Portal target for modals
beforeEach(() => {
  const portalRoot = document.getElementById('portal') || document.createElement('div');
  portalRoot.id = 'portal';
  document.body.appendChild(portalRoot);
});

const mockItem = {
  i_id: 1,
  i_name: 'Rozsban a fogó',
  author: 'J. D. Salinger',
  i_description: 'Egy remek regény',
  amount: 3,
  img_url: '/uploads/raf.jpg',
};

const mockComments = [
  { r_id: 1, u_id: 10, username: 'Alice', comment: 'Nagyon jó könyv!', stars: 5 },
  { r_id: 2, u_id: 20, username: 'Bob', comment: 'Közepes volt.', stars: 3 },
];

const mockTags = ['book', 'comedy'];

function createFetchMock() {
  return vi.fn((url, options) => {
    if (url.includes('/item/1/reviews')) {
      return Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve(mockComments),
      });
    }
    if (url.includes('/item/1/tags')) {
      return Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve(mockTags.map(t => ({ t_name: t }))),
      });
    }
    if (url.includes('/item/1')) {
      return Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve([mockItem]),
      });
    }
    return Promise.resolve({ ok: true, headers: { get: () => 'text/plain' } });
  });
}

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/termekek/1']}>
      <Routes>
        <Route path="/termekek/:id" element={<TermekDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('TermekDetailsPage integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    globalThis.fetch = createFetchMock();
  });

  it('should show loading then render item details and comments', async () => {
    renderPage();

    // Loading state
    expect(screen.getByText('Betöltés...')).toBeInTheDocument();

    // Item details after load
    await waitFor(() => {
      expect(screen.getByText('Rozsban a fogó')).toBeInTheDocument();
    });
    expect(screen.getByText('J. D. Salinger')).toBeInTheDocument();
    expect(screen.getByText('Egy remek regény')).toBeInTheDocument();
    expect(screen.getByText(/Raktáron: 3 db/)).toBeInTheDocument();
  });

  it('should render tags as badges', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('book')).toBeInTheDocument();
    });
    expect(screen.getByText('comedy')).toBeInTheDocument();
  });

  it('should render comments from API', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
    expect(screen.getByText('Nagyon jó könyv!')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Közepes volt.')).toBeInTheDocument();
  });

  it('should disable new review button when not logged in', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('+ Új vélemény')).toBeInTheDocument();
    });

    const btn = screen.getByText('+ Új vélemény');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('title', 'Vélemény írásához jelentkezz be');
  });

  it('should enable new review button when logged in and not yet commented', async () => {
    window.localStorage.setItem('authToken', 'test-token');
    window.localStorage.setItem('username', 'NewUser');
    window.localStorage.setItem('status', '1');
    const expiration = new Date(Date.now() + 60000).toISOString();
    window.localStorage.setItem('expiration', expiration);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('+ Új vélemény')).toBeInTheDocument();
    });

    const btn = screen.getByText('+ Új vélemény');
    expect(btn).not.toBeDisabled();
  });

  it('should disable new review button when user already commented', async () => {
    window.localStorage.setItem('authToken', 'test-token');
    window.localStorage.setItem('username', 'Alice'); // Alice has a comment
    window.localStorage.setItem('status', '1');
    const expiration = new Date(Date.now() + 60000).toISOString();
    window.localStorage.setItem('expiration', expiration);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    const btn = screen.getByText('+ Új vélemény');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('title', 'Már írtál véleményt erre az elemre');
  });

  it('should open review modal when button is clicked', async () => {
    window.localStorage.setItem('authToken', 'test-token');
    window.localStorage.setItem('username', 'NewUser');
    window.localStorage.setItem('status', '1');
    const expiration = new Date(Date.now() + 60000).toISOString();
    window.localStorage.setItem('expiration', expiration);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('+ Új vélemény')).not.toBeDisabled();
    });

    fireEvent.click(screen.getByText('+ Új vélemény'));

    await waitFor(() => {
      expect(screen.getByText('Új vélemény')).toBeInTheDocument();
    });
    // Modal should have star rating and textarea
    expect(screen.getByText('Értékelés (csillagok)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Írd meg véleményed...')).toBeInTheDocument();
  });

  it('should enable borrow button for in-stock item', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Kölcsönzés')).toBeInTheDocument();
    });

    expect(screen.getByText('Kölcsönzés')).not.toBeDisabled();
  });
});
