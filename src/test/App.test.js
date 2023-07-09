import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import App from '@src-path/App';

const MockApp = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

describe("application structure", () => {
  describe("application footer bar", () => {
    it('should render copyright link', () => {
      render(<MockApp />);
      const divElem = screen.getByText(/copyright © \d{4} - Alessandro Celotti/i);
      expect(divElem).toBeInTheDocument();
    });
  });

  describe("application navigation bar", () => {
    it("should render four button", () => {
      render(<MockApp />);
      const navListItems = screen.getAllByRole("list");
      expect(navListItems.length).toBe(4);
    });

    describe("navigation", () => {
      it("should render default pathname", () => {
        const history = createMemoryHistory();
        render(
          <HashRouter history={history}>
            <App />
          </HashRouter>
        );
        
        expect(history.location.pathname).toBe("/");
      });

      it("should visit the shop", () => {
        const history = createMemoryHistory();
        render(
          <Router location={history.location} navigator={history}>
            <App />
          </Router>
        );
        const linkShop = screen.getByText(/^shop$/i);
        fireEvent.click(linkShop);
        expect(history.location.pathname).toBe("/catalog");
      });

      it("should visit the cart", () => {
        const history = createMemoryHistory();
        render(
          <Router location={history.location} navigator={history}>
            <App />
          </Router>
        );
        
        const links = screen.getAllByRole('link');
        const linkElem = links.find(link => link.href.includes('/cart'));
        fireEvent.click(linkElem);
        expect(history.location.pathname).toBe("/cart");
      });
    });
    
    describe("theme style", () => {
      const getSvgElemHelper = (iconName, present = true) => {
        const lists = screen.getAllByRole('list');
        const svgElem = lists.find(link => link.innerHTML.includes(iconName));
        if (present)
          expect(svgElem).toBeInTheDocument();
        else 
          expect(svgElem).toBeUndefined();
        return svgElem;
      };

      it('should render default dark theme', () => {
        render(<MockApp />);
        getSvgElemHelper('moon');
      });

      it('change to light theme', () => {
        render(<MockApp />);
        const lists = screen.getAllByRole('list');
        fireEvent.click(lists.at(-1));
        getSvgElemHelper('moon', false);
        getSvgElemHelper('sun');
      });

      it('restore to dark theme', () => {
        render(<MockApp />);
        let lists = screen.getAllByRole('list');
        fireEvent.click(lists.at(-1));
        lists = screen.getAllByRole('list');
        fireEvent.click(lists.at(-1));
        getSvgElemHelper('moon');
        getSvgElemHelper('sun', false);
      });
    });
  });

  it("should render title and default home page", () => {
    render(<MockApp />);
    const divTitle = screen.getAllByText(/ShopizzaFy/i);
    expect(divTitle.length).toBe(2);
  });
});
