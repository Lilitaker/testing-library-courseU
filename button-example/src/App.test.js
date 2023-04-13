import { render, screen, fireEvent, logRoles } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct initial color and updates when clicked', () => {
  const { container } = render(<App />);
  logRoles(container);

  const colorBtn = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });

  //The following line has a bug, it will pass with the wrong color
  //expect(colorBtn).toHaveStyle({ backgroundColor: 'hola' });
  //To fix the bug do the following:
  expect(colorBtn).toHaveStyle({ 'background-color': 'MediumVioletRed' });

  fireEvent.click(colorBtn);

  expect(colorBtn).toHaveStyle({ 'background-color': 'MidnightBlue' });
  expect(colorBtn).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render(<App />);
  const colorBtn = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  expect(colorBtn).toBeEnabled();

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('checkbox disables button on first click and enables on second click', () => {
  render(<App />);
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  const checkbox = screen.getByRole('checkbox');
  expect(button).toBeEnabled();
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test('disabled button has gray background and reverts to Medium Violet Red', () => {
  render(<App />);
  const colorBtn = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  fireEvent.click(checkbox);
  expect(colorBtn).toHaveStyle({ 'background-color': 'gray' });

  fireEvent.click(checkbox);
  expect(colorBtn).toHaveStyle({ 'background-color': 'MediumVioletRed' });
});

test('disabled button has gray background and reverts to Midnight Blue', () => {
  render(<App />);
  const colorBtn = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  //change btn to Midnight Blue
  fireEvent.click(colorBtn);

  fireEvent.click(checkbox);
  expect(colorBtn).toHaveStyle({ 'background-color': 'gray' });

  fireEvent.click(checkbox);
  expect(colorBtn).toHaveStyle({ 'background-color': 'MidnightBlue' });
});

describe('spaces before camel-case capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
