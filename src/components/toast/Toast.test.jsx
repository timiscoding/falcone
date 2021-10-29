import React from 'react';
import { render, screen } from '@testing-library/react';
import Toast from './Toast';

describe('components/Toast', () => {
  test('renders nothing given no message', () => {
    render(<Toast />);
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
  });

  test('renders given message', () => {
    render(<Toast message="test message" />);
    expect(screen.getByText(/test message/i)).toBeInTheDocument();
  });
});
