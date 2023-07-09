import { fireEvent, render, screen } from '@testing-library/react';
import { HashRouter, Router } from 'react-router-dom';
import { productsList } from '@components/ProductsList';
import { Shop } from '@pages/Shop';
import { createMemoryHistory } from "history";

const mockAddFunction = jest.fn();

 jest.mock('@components/CartProvider', () => ({
  ...jest.requireActual("@components/CartProvider"),
  useCartContext: () => {
    return ({
      add: mockAddFunction
    });
  }
 }));

const MockShop = () => {
  return (
    <HashRouter>
      <Shop />
    </HashRouter>
  )
};

describe("render shop page", () => {
  describe("catalog container", () => {
    it("should render all products image", () => {
      render(<MockShop />);
      const images = screen.getAllByRole("img");
      expect(images.length).toBe(productsList.length);
    });

    it("should render all products link and buy now buttons", () => {
      render(<MockShop />);
      const links = screen.getAllByRole("link");
      const linksProduct = links.filter(link => link.href.includes('/product/'));
      const linksBuy = links.filter(link => link.href.includes('/cart'));
      expect(linksProduct.length).toBe(productsList.length);
      expect(linksBuy.length).toBe(productsList.length);
      linksProduct.forEach((link,i) => {
        expect(link.href).toContain(`/product/${i + 1}`);
      });
    });

    it("should render 'Calzone Classico' information", () => {
      render(<MockShop />);
      const divElemName = screen.getByText(/calzone classico/i);
      expect(divElemName).toBeInTheDocument();
      const divElemPrice = screen.getByText(/8 €/i);
      expect(divElemPrice).toBeInTheDocument();
      const imgElem = screen.getByAltText(productsList[0].id);
      expect(imgElem).toBeInTheDocument();
    });
  });

  describe("category bar", () => {
    const categoryButtonHelper = (regex, disabled = true) => {
      const btn = screen.getByText(regex);
      expect(btn).toBeInTheDocument();
      if (disabled) expect(btn).toBeDisabled();
      else expect(btn).not.toBeDisabled();
      return btn;
    };

    it("should render 'all' button disabled", () => {
      render(<MockShop />);
      categoryButtonHelper(/^all$/i);
    });

    it("should render other buttons enabled", () => {
      render(<MockShop />);
      categoryButtonHelper(/^classic$/i, false);
      categoryButtonHelper(/^special$/i, false);
    });

    it("should disable the new category choosen", () => {
      render(<MockShop />);
      const btnClassic = categoryButtonHelper(/^classic$/i, false);
      fireEvent.click(btnClassic);
      categoryButtonHelper(/^classic$/i);
      categoryButtonHelper(/^all$/i, false);
    });

    it("should render only special category and not render 'Calzone Classico'", () => {
      render(<MockShop />);
      const btnSpecial = categoryButtonHelper(/^special$/i, false);
      fireEvent.click(btnSpecial);
      const divElemName = screen.queryByText(/calzone classico/i);
      expect(divElemName).toBeNull();
      const divElemPrice = screen.queryByText(/8 €/i);
      expect(divElemPrice).toBeNull();
      const imgElem = screen.queryByAltText(productsList[0].id);
      expect(imgElem).toBeNull();
    });

    it("should render only special category and not render 'Margherita Sbagliata'", () => {
      render(<MockShop />);
      const btnSpecial = categoryButtonHelper(/^special$/i, false);
      fireEvent.click(btnSpecial);
      const divElemName = screen.queryByText(/margherita sbagliata/i);
      expect(divElemName).toBeInTheDocument();
      const divElemPrice = screen.queryByText(/10 €/i);
      expect(divElemPrice).toBeInTheDocument();
      const imgElem = screen.queryByAltText(productsList[6].id);
      expect(imgElem).toBeInTheDocument();
    });

    it("should count the number of products of the new category choosen", () => {
      render(<MockShop />);
      const btnClassic = categoryButtonHelper(/^classic$/i, false);
      fireEvent.click(btnClassic);
      const classicProductsList = productsList.filter(p => p.category.includes('classic'));
      const images = screen.getAllByRole("img");
      expect(images.length).toBe(classicProductsList.length);
    });
  });

  describe("query bar", () => {
    const getSvgElemHelper = (iconName, present = true) => {
      const buttons = screen.getAllByRole('button');
      const svgElem = buttons.find(btn => btn.innerHTML.includes(iconName));
      if (present)
        expect(svgElem).toBeInTheDocument();
      else 
        expect(svgElem).toBeUndefined();
      return svgElem;
    };

    const getBtnHelper = (iconName) => {
      const buttons = screen.getAllByRole('button');
      const idx = buttons.findIndex(btn => btn.innerHTML.includes(iconName));
      return idx > 0 ? buttons[idx] : undefined;
    };

    it("should render search bar", () => {
      render(<MockShop />);
      const textBox = screen.getByRole('textbox');
      expect(textBox).toBeInTheDocument();
      getSvgElemHelper('magnifying-glass');
    });

    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    it("should render product x not found", async () => {
      const history = createMemoryHistory();
      render(
        <Router location={history.location} navigator={history}>
          <Shop />
        </Router>
      );
      const textBox = screen.getByRole('textbox');
      const btn = getBtnHelper('magnifying-glass');
      fireEvent.change(textBox, { target: { value: "x" }});
      expect(textBox).toHaveValue('x');
      fireEvent.click(btn);
      await timeout(550);
      expect(history.location.pathname).toBe("/catalog/product/404");
    });
  });
});
