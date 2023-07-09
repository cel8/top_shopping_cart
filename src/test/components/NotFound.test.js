import { render, screen } from '@testing-library/react';
import { HashRouter, Router as R } from 'react-router-dom';
import { NotFound } from '@components/NotFound';
import Router from 'react-router-dom';
import { createMemoryHistory } from "history";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
 }));

const MockNotFound = ({name}) => {
  return (
    <HashRouter>
      <NotFound name={name}/>
    </HashRouter>
  )
}
describe("render not found page", () => {
  it('should render ops page', () => {
    let divElem;
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: undefined });
    render(<MockNotFound />);
    divElem = screen.getByText(/oops/i);
    expect(divElem).toBeInTheDocument();
    divElem = screen.getByText(/sorry, cannot be found this/i);
    expect(divElem).toBeInTheDocument();
  });

  it('should go back to home page', () => {
    const history = createMemoryHistory();
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: undefined });
    render(
      <R location={history.location} navigator={history}>
        <NotFound />
      </R>
    );
    expect(history.location.pathname).toBe("/");
  });

  it('should render cannot be found this page', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: undefined });
    render(<MockNotFound />);
    const divCategoryElem = screen.getByText(/^Sorry, cannot be found/i);
    expect(divCategoryElem).toContainHTML('Sorry, cannot be found this <div>page</div>.');
  });

  it('should render cannot be found of a given name', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: undefined });
    render(<MockNotFound name="product"/>);
    const divCategoryElem = screen.getByText(/^Sorry, cannot be found/i);
    expect(divCategoryElem).toContainHTML('Sorry, cannot be found this <div>product</div>.');
  });

  it('should render cannot be found of a given name and ID', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: 'name' });
    render(<MockNotFound name="product"/>);
    const divCategoryElem = screen.getByText(/^Sorry, cannot be found/i);
    expect(divCategoryElem).toContainHTML('Sorry, cannot be found this <div>product name</div>.');
  });
});
