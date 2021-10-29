import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VehiclePicker from './VehiclePicker';

describe('components/planetSearch/VehiclePicker', () => {
  const f = jest.fn();

  test('renders invisible when disabled', () => {
    render(<VehiclePicker vehicles={[]} name="test" onChange={f} disabled />);
    expect(screen.getByTestId('vehicle-picker')).toHaveClass('invisible');
  });

  test('renders visible when not disabled', () => {
    render(<VehiclePicker vehicles={[]} name="test" onChange={f} />);
    expect(screen.getByTestId('vehicle-picker')).toHaveClass('visible');
  });

  test('renders no radio buttons', () => {
    render(<VehiclePicker vehicles={[]} name="test" onChange={f} />);
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });

  test('renders a radio button with label', () => {
    render(
      <VehiclePicker
        vehicles={[{ vehicle: 'a', qty: 1, disabled: false }]}
        name="test"
        onChange={f}
      />
    );
    expect(screen.getByRole('radio', { checked: false })).toBeInTheDocument();
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'test');
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'a');
    expect(screen.getByLabelText('a (1)')).toBeInTheDocument();
  });

  test('renders a disabled radio button', () => {
    render(
      <VehiclePicker
        vehicles={[{ vehicle: 'a', qty: 1, disabled: true }]}
        name="test"
        onChange={f}
      />
    );
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  test('renders a checked radio button', () => {
    render(
      <VehiclePicker
        vehicles={[{ vehicle: 'a', qty: 1, disabled: false }]}
        name="test"
        onChange={f}
        checked="a"
      />
    );
    expect(screen.getByRole('radio', { checked: true })).toBeInTheDocument();
  });

  test('fires callback when radio button clicked', () => {
    render(
      <VehiclePicker
        vehicles={[{ vehicle: 'a', qty: 1, disabled: false }]}
        name="test"
        onChange={f}
      />
    );
    userEvent.click(screen.getByRole('radio'));
    expect(f).toBeCalledWith('a');
  });

  test('renders radio buttons', () => {
    render(
      <VehiclePicker
        vehicles={[
          { vehicle: 'a', qty: 1, disabled: false },
          { vehicle: 'b', qty: 2, disabled: true },
        ]}
        name="test"
        onChange={f}
      />
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });
});
