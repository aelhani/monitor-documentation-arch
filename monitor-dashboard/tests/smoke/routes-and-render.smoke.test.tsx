import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../../src/App';

jest.mock('../../src/hooks/useDashboardState', () => ({
  useDashboardState: () => ({
    summary: { normal: 2, warning: 1, critical: 0 },
    isLoading: false,
    error: null
  })
}));

describe('dashboard smoke checks', () => {
  it('renders dashboard route without crash', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Monitor Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Normal')).toBeInTheDocument();
  });

  it('loads sensors route directly', () => {
    render(
      <MemoryRouter initialEntries={['/sensors']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Sensors')).toBeInTheDocument();
  });
});
