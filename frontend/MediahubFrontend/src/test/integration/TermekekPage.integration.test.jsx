import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TermekekPage from '../../user/pages/termekekPage';

// Mock RenderNavbar and Footer to keep tests focused
vi.mock('../../user/components/navbar/renderNavbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));
vi.mock('../../user/components/footer/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

// Sample data
const mockItems = [
  { i_id: 1, i_name: 'Zabhegyező', author: 'Salinger', img_url: '/uploads/test.jpg', i_description: 'Leírás A' },
  { i_id: 2, i_name: 'A rózsa neve', author: 'Eco', img_url: '/uploads/test2.jpg', i_description: 'Leírás B' },
  { i_id: 3, i_name: 'Majomábécé', author: 'Merle', img_url: '/uploads/test3.jpg', i_description: 'Leírás C' },
];

const mockTags = [
  { t_id: 1, t_name: 'book' },
  { t_id: 2, t_name: 'movie' },
];

// Helper to create fetch mock responses
function mockFetch(url) {
  if (url.includes('/tags')) {
    return Promise.resolve({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve(mockTags),
    });
  }
  if (url.includes('/items')) {
    // Check for filter params
    const hasNameFilter = url.includes('name=');
    if (hasNameFilter && url.includes('r%C3%B3zsa')) {
      return Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve([mockItems[1]]),
      });
    }
    return Promise.resolve({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve(mockItems),
    });
  }
  return Promise.resolve({ ok: true, headers: { get: () => 'text/plain' } });
}

beforeEach(() => {
  vi.restoreAllMocks();
  globalThis.fetch = vi.fn((url) => mockFetch(url));
});

describe('TermekekPage integration', () => {
  it('should load and display items from API', async () => {
    render(
      <MemoryRouter>
        <TermekekPage />
      </MemoryRouter>
    );

    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // After fetch completes, items appear
    await waitFor(() => {
      expect(screen.getByText('Zabhegyező')).toBeInTheDocument();
    });
    expect(screen.getByText('A rózsa neve')).toBeInTheDocument();
    expect(screen.getByText('Majomábécé')).toBeInTheDocument();
  });

  it('should sort items A-Z by default', async () => {
    render(
      <MemoryRouter>
        <TermekekPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Zabhegyező')).toBeInTheDocument();
    });

    // A-Z: A rózsa neve < Majomábécé < Zabhegyező
    const itemNames = screen.getAllByText(/Zabhegyező|A rózsa neve|Majomábécé/).map(el => el.textContent);
    expect(itemNames[0]).toBe('A rózsa neve');
    expect(itemNames[1]).toBe('Majomábécé');
    expect(itemNames[2]).toBe('Zabhegyező');
  });

  it('should sort items Z-A when sort order is changed', async () => {
    render(
      <MemoryRouter>
        <TermekekPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Zabhegyező')).toBeInTheDocument();
    });

    // Change sort to Z→A (there are two sort selects, use the first one)
    const sortSelects = screen.getAllByLabelText('Rendezés:');
    fireEvent.change(sortSelects[0], { target: { value: 'ZA' } });

    const itemNames = screen.getAllByText(/Zabhegyező|A rózsa neve|Majomábécé/).map(el => el.textContent);
    expect(itemNames[0]).toBe('Zabhegyező');
    expect(itemNames[1]).toBe('Majomábécé');
    expect(itemNames[2]).toBe('A rózsa neve');
  });

  it('should load tags into the filter dropdown', async () => {
    render(
      <MemoryRouter>
        <TermekekPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Zabhegyező')).toBeInTheDocument();
    });

    // Open tag dropdown
    fireEvent.click(screen.getByText('Taggek ▼'));
    expect(screen.getByText('book')).toBeInTheDocument();
    expect(screen.getByText('movie')).toBeInTheDocument();
  });

  it('should call API with search params when user searches', async () => {
    render(
      <MemoryRouter>
        <TermekekPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Zabhegyező')).toBeInTheDocument();
    });

    // Type in search and submit
    const input = screen.getByPlaceholderText('Keresés: author:John ...');
    fireEvent.change(input, { target: { value: 'rózsa' } });
    fireEvent.click(screen.getByText('🔍'));

    // Verify fetch was called with search params
    await waitFor(() => {
      const calls = globalThis.fetch.mock.calls;
      const searchCall = calls.find(c => c[0].includes('name='));
      expect(searchCall).toBeDefined();
    });
  });
});
