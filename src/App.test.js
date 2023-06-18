import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/copyright © \d{4} - Alessandro Celotti/i);
  expect(linkElement).toBeInTheDocument();
});
