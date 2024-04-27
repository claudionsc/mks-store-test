import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { ProductItem } from "./index";
import { CartContextProvider } from "../../data/contexts/cartContext/index";

describe("Products", () => {
    
  test("Should render a list of products", () => {
    render(
      <CartContextProvider>
        <ProductItem product={{
                id: 0,
                name: "",
                price: 0,
                photo: "",
                quantity: 0,
                amount: 0,
                createdAT: "",
                updatedAt: ""
            }} />
      </CartContextProvider>
    )
  });
    
    expect(screen.queryAllByTestId("product")).toBeInTheDocument;

    test("Should render a button for each list item", () => {
      render(
        <CartContextProvider>
          <ProductItem product={{
                  id: 0,
                  name: "",
                  price: 0,
                  photo: "",
                  quantity: 0,
                  amount: 0,
                  createdAT: "",
                  updatedAt: ""
              }} />
        </CartContextProvider>
      );
      
      expect(screen.getAllByRole("button")).toBeInTheDocument
    })

    test("Should able to fire event for each button", () => {

      const handleClick = vi.fn()

      render(<button onClick={handleClick}>Comprar</button>)

      fireEvent.click(screen.getByRole("button"))
      expect(handleClick).toBeCalled()
    })

  });