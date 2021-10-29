import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultMessage from './ResultMessage';

describe('components/ResultMessage', () => {
  const f = jest.fn();

  test('renders success message', () => {
    render(
      <ResultMessage status="success" stats={{ planet: 'a', totalTime: 1 }} onClickReset={f} />
    );
    expect(screen.getByText(/success/i)).toBeInTheDocument();
    expect(screen.getByText(/time taken: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/planet found: a/i)).toBeInTheDocument();
  });

  test('renders fail message', () => {
    render(<ResultMessage status="false" onClickReset={f} />);
    expect(screen.getByText(/fail/i)).toBeInTheDocument();
    expect(screen.queryByText(/time taken: 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/planet found: a/i)).not.toBeInTheDocument();
  });

  test('fires callback when restart button clicked', () => {
    render(<ResultMessage status="false" onClickReset={f} />);
    userEvent.click(screen.queryByRole('button'));
    expect(f).toBeCalled();
  });
});
