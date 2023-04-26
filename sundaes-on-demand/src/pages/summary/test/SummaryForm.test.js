import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('checkbox is unchecked by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: 'Terms and Conditions',
  });

  expect(checkbox).not.toBeChecked();
});

test('cheched checkbox enables button', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: 'Terms and Conditions',
  });
  const button = screen.getByRole('button', {
    name: 'Confirm order',
  });

  expect(button).toBeDisabled();
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});
