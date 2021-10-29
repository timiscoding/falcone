import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlanetPicker from './PlanetPicker';

describe('components/planetSearch/PlanetPicker', () => {
  const f = jest.fn();

  test('renders dropdown without planets', () => {
    render(<PlanetPicker planets={[]} onChange={f} />);
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option')).toHaveTextContent(/select planet/i);
  });

  test('renders dropdown with planets', () => {
    render(<PlanetPicker planets={[{ name: 'a' }, { name: 'b' }]} onChange={f} />);
    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getByText('a')).toHaveValue('a');
    expect(screen.getByText('b')).toHaveValue('b');
  });

  test('renders dropdown with selected planet', () => {
    render(<PlanetPicker planets={[{ name: 'a' }, { name: 'b' }]} onChange={f} value="a" />);
    expect(screen.getByRole('option', { selected: true })).toHaveValue('a');
  });

  test('fires callback when planet selected', () => {
    render(<PlanetPicker planets={[{ name: 'a' }, { name: 'b' }]} onChange={f} />);
    userEvent.selectOptions(screen.getByRole('combobox'), ['b']);
    expect(screen.getByRole('option', { name: 'b' }).selected).toBe(true);
    expect(f).toHaveBeenCalledWith('b');
  });
});
