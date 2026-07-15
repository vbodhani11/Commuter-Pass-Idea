import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Commuter pass concept flow', () => {
  it('shows the home experience and allows opening the pass view', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/make the daily commute feel like a subscription/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /my pass/i }));

    expect(screen.getByText(/my mobility pass/i)).toBeInTheDocument();
    expect(screen.getByText(/everyday/i)).toBeInTheDocument();
  });

  it('lets the user change plans and confirm a booking', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /my pass/i }));
    await user.click(screen.getByRole('button', { name: /change plan/i }));

    await user.click(screen.getByRole('button', { name: /essential/i }));

    expect(screen.getByText(/essential/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /book with pass/i }));
    await user.click(screen.getByRole('button', { name: /confirm pickup/i }));

    expect(screen.getByText(/ride confirmed/i)).toBeInTheDocument();
  });
});
