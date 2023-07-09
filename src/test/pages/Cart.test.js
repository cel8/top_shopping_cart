import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { productsList } from '@components/ProductsList';
import { Cart } from '@pages/Cart';

let mockCartArray = [];
const mockAddFunction = jest.fn();
const mockRemoveFunction = jest.fn();
const mockOrderTotalFunction = jest.fn();
const mockOrderItemsFunction = jest.fn();

jest.mock('@components/CartProvider', () => ({
  ...jest.requireActual("@components/CartProvider"),
  useCartContext: () => {
    return ({
      cart: mockCartArray,
      add: mockAddFunction,
      remove: mockRemoveFunction,
      orderTotal: mockOrderTotalFunction,
      orderItems: mockOrderItemsFunction
    });
  }
 }));

const MockCart = () => {
  return (
    <HashRouter>
      <Cart />
    </HashRouter>
  )
};

describe("render cart page", () => {
  beforeEach(() => {
    mockCartArray = [];
  });

  it("should render empty cart", () => {
    render(<MockCart />);
    const headingElem = screen.getByRole("heading");
    expect(headingElem).toHaveTextContent('Cart is empty');
  });

  it("should render an item", () => {
    mockCartArray = [
      {
        product: productsList[0],
        amount: 1
      }
    ];
    render(<MockCart />);
    const headingElem = screen.getByText(/Cart items/i);
    expect(headingElem).toBeInTheDocument();
    const imgElem = screen.getByRole('img');
    expect(imgElem).toBeInTheDocument();
    expect(imgElem).toHaveAttribute('alt', productsList[0].id);
  });

  it("should render one item and it's price", () => {
    mockCartArray = [
      {
        product: productsList[0],
        amount: 1
      }
    ];
    mockOrderItemsFunction.mockReturnValue(1);
    mockOrderTotalFunction.mockReturnValue(8);
    render(<MockCart />);
    const divItemElem = screen.getByText(/^Items:/i);
    expect(divItemElem).toContainHTML('Items: <div>1</div>');
    const divOrderElem = screen.getByText(/^Order total:/i);
    expect(divOrderElem).toContainHTML('Order total: <div>8 €</div>');
  });

  it("should render one item (x3) and it's price", () => {
    mockCartArray = [
      {
        product: productsList[0],
        amount: 3
      }
    ];
    mockOrderItemsFunction.mockReturnValue(3);
    mockOrderTotalFunction.mockReturnValue(24);
    render(<MockCart />);
    const divItemElem = screen.getByText(/^Items:/i);
    expect(divItemElem).toContainHTML('Items: <div>3</div>');
    const divOrderElem = screen.getByText(/^Order total:/i);
    expect(divOrderElem).toContainHTML('Order total: <div>24 €</div>');
  });

  it("should render four item and them prices", () => {
    mockCartArray = [
      {
        product: productsList[0],
        amount: 3
      },
      {
        product: productsList[5],
        amount: 2
      },
      {
        product: productsList[2],
        amount: 1
      },
      {
        product: productsList[7],
        amount: 1
      }
    ];
    mockOrderItemsFunction.mockReturnValue(7);
    mockOrderTotalFunction.mockReturnValue(68.5);
    render(<MockCart />);
    const divItemElem = screen.getByText(/^Items:/i);
    expect(divItemElem).toContainHTML('Items: <div>7</div>');
    const divOrderElem = screen.getByText(/^Order total:/i);
    expect(divOrderElem).toContainHTML('Order total: <div>68.5 €</div>');
  });
});
