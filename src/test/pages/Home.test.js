import { render, screen } from '@testing-library/react';
import { Home } from '@pages/Home';

describe("render home page landing", () => {
  it('should render home page title', () => {
    render(<Home />);
    const headingElem = screen.getByRole("heading");
    expect(headingElem).toHaveTextContent(/shopizzafy/i);
  });

  it('should render images copyright', () => {
    render(<Home />);
    const linkElem = screen.getByRole("link");
    expect(linkElem).toHaveTextContent(/pepe in grani/i);
    expect(linkElem).toHaveAttribute('href', 'https://www.pepeingrani.it/');
  });
});
