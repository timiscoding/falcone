import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

const formFactory = (props) => {
  const onSubmit = jest.fn();
  const planetChoices = jest.fn(() => []);
  const vehicleChoices = jest.fn(() => []);
  const onSearchChange = jest.fn();

  const comp = (
    <SearchForm
      onSubmit={onSubmit}
      planetChoices={planetChoices}
      vehicleChoices={vehicleChoices}
      onSearchChange={onSearchChange}
      search={{ vehicles: [], planets: [] }}
      totalTime={0}
      destinationCount={4}
      {...props}
    />
  );
  return { onSubmit, planetChoices, vehicleChoices, onSearchChange, comp };
};

describe('components/SearchForm', () => {
  test('renders total time', () => {
    const { comp } = formFactory();
    render(comp);
    expect(screen.getByText(/total time: 0/i)).toBeInTheDocument();
  });

  test('fires planetChoices callback on render', () => {
    const { comp, planetChoices } = formFactory();
    render(comp);
    expect(planetChoices).toBeCalledTimes(4);
    expect(planetChoices.mock.calls).toEqual([[0], [1], [2], [3]]);
  });

  test('fires vehicleChoices callback on render', () => {
    const { comp, vehicleChoices } = formFactory();
    render(comp);
    expect(vehicleChoices).toBeCalledTimes(4);
    expect(vehicleChoices.mock.calls).toEqual([[0], [1], [2], [3]]);
  });

  test('submit button enabled when all inputs filled', () => {
    const { comp } = formFactory({
      search: { vehicles: ['a', 'b', 'c', 'd'], planets: ['a', 'b', 'c', 'd'] },
    });
    render(comp);
    expect(screen.getByRole('button')).toBeEnabled();
  });

  test('submit button disabled when loading', () => {
    const { comp } = formFactory({
      search: { vehicles: ['a', 'b', 'c', 'd'], planets: ['a', 'b', 'c', 'd'] },
      loading: true,
    });
    render(comp);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('fires callback when submit button clicked', () => {
    const { comp, onSubmit } = formFactory({
      search: { vehicles: ['a', 'b', 'c', 'd'], planets: ['a', 'b', 'c', 'd'] },
    });
    render(comp);
    userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toBeCalled();
  });

  test('submit button disabled by default', () => {
    const { comp } = formFactory();
    render(comp);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
