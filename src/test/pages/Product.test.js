import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter, Router as R } from 'react-router-dom';
import { productsList } from '@components/ProductsList';
import Router from 'react-router-dom';
import { Product } from '@pages/Product';
import { createMemoryHistory } from "history";

const mockAddFunction = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
 }));

 jest.mock('@components/CartProvider', () => ({
  ...jest.requireActual("@components/CartProvider"),
  useCartContext: () => {
    return ({
      add: mockAddFunction
    });
  }
 }));

const MockProduct = () => {
  return (
    <HashRouter>
      <Product />
    </HashRouter>
  )
};

describe("render product page", () => {
  it('should render not found product', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: undefined });
    render(<MockProduct />);
    const divElem = screen.getByText(/sorry, cannot be found this/i);
    expect(divElem).toBeInTheDocument();
    const divProductElem = screen.getByText(/^product$/i);
    expect(divProductElem).toBeInTheDocument();
  });

  it('should render first product', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    render(<MockProduct />);
    const headingElem = screen.getByRole("heading");
    expect(headingElem).toHaveTextContent("Calzone Classico");
    const imgElem = screen.getByRole("img");
    expect(imgElem).toHaveAttribute('alt', productsList[0].id);
    const divPriceElem = screen.getByText(/^price/i);
    expect(divPriceElem).toContainHTML('Price: <p>8 €</p>');
    const divCategoryElem = screen.getByText(/^category/i);
    expect(divCategoryElem).toContainHTML('Category: <p>classic</p>');
    const divDescriptionElem = screen.getByText(/^description/i);
    expect(divDescriptionElem).toContainHTML('Description: <p>Folded pizza with fiordilatte cheese, San Marzano tomato, prosciutto cotto (cooked ham), basil and Evo oil.</p>');
  });

  it('should render last product', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '8' });
    render(<MockProduct />);
    const headingElem = screen.getByRole("heading");
    expect(headingElem).toHaveTextContent("Scarpetta");
    const imgElem = screen.getByRole("img");
    expect(imgElem).toHaveAttribute('alt', productsList[7].id);
    const divPriceElem = screen.getByText(/^price/i);
    expect(divPriceElem).toContainHTML('Price: <p>12 €</p>');
    const divCategoryElem = screen.getByText(/^category/i);
    expect(divCategoryElem).toContainHTML('Category: <p>special</p>');
    const divDescriptionElem = screen.getByText(/^description/i);
    expect(divDescriptionElem).toContainHTML('Description: <p>Campana DOP Buffalo mozzarella, 12-month Grana Padano fondue, uncooked tomato compote, freeze-dried pesto basil, flakes of 24-month Grana Padano DOP cheese.</p>');
  });

  it("should going back to the previous page", () => {
    const history = createMemoryHistory();
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    render(
      <R location={history.location} navigator={history}>
        <Product />
      </R>
    );
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(history.location.pathname).toBe("/");
  });

  it("should going to the cart", async () => {
    const history = createMemoryHistory();
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    render(
      <R location={history.location} navigator={history}>
        <Product />
      </R>
    );
    const linkElem = screen.getByText(/^buy now$/i);
    fireEvent.click(linkElem);
    expect(history.location.pathname).toBe("/cart");
    expect(mockAddFunction).toHaveBeenCalled();
  });

  it("should just add the element in the cart", () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
    render(<MockProduct />);
    const buttons = screen.getAllByRole('button');
    const linkAddToCart = buttons.find(link => link.innerHTML.includes('cart-plus'));
    expect(linkAddToCart).toBeInTheDocument();
    fireEvent.click(linkAddToCart);
    expect(mockAddFunction).toHaveBeenCalled();
  });
});
