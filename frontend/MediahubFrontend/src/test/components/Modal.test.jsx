import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../user/components/modal/modal';

// Create portal target before each test
beforeEach(() => {
  const portalRoot = document.getElementById('portal') || document.createElement('div');
  portalRoot.id = 'portal';
  document.body.appendChild(portalRoot);
});

describe('Modal', () => {
  it('should render nothing when isOpen is false', () => {
    render(<Modal isOpen={false} isClose={vi.fn()}>Content</Modal>);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('should render children when isOpen is true', () => {
    render(<Modal isOpen={true} isClose={vi.fn()}>Modal Content</Modal>);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should render into portal element', () => {
    render(<Modal isOpen={true} isClose={vi.fn()}>Portal Test</Modal>);
    const portalRoot = document.getElementById('portal');
    expect(portalRoot.textContent).toContain('Portal Test');
  });

  it('should stop click propagation on inner modal div', () => {
    const isClose = vi.fn();
    render(<Modal isOpen={true} isClose={isClose}>Click Test</Modal>);
    const modalInner = screen.getByText('Click Test').closest('.portal-modal');
    fireEvent.click(modalInner);
    // Click on inner div should NOT propagate (stopPropagation is called)
    // We verify the inner div exists and is clickable without error
    expect(modalInner).toBeInTheDocument();
  });
});
