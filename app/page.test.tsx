import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { ProductItem } from "../src/components/Product";
import { CartContextProvider } from "../src/data/contexts/cartContext/index";
import { Header } from "../src/components/Header";
import { Cart } from "../src/components/Cart/index";

describe("Main", () => {

    test("Should render a header with total de produtos", () => {
        render(
            <CartContextProvider>
                <Header setIsVisible={() => true} />
            </CartContextProvider>
        )

        expect(screen.getByText("0"))

    })

    test("Should update the product quantity when button is clicked ", () => {
        const handleClick = vi.fn()
        render(
            <CartContextProvider>
                <Header setIsVisible={() => true} />
                <ProductItem product={{
                    id: 8,
                    name: "Headset Cloud Stinger",
                    price: 600,
                    photo: "",
                    quantity: 1,
                    amount: 600,
                    createdAT: "",
                    updatedAt: ""
                }} />
                <button onClick={handleClick}>COMPRAR</button>
            </CartContextProvider>
        )



        fireEvent.click(screen.getAllByText("COMPRAR")[0])
        expect(handleClick).toHaveBeenCalledTimes(0)

        expect(screen.getByText("1"))

    })

    test("Should update the product quantity when button is clicked once again", () => {
        const handleClick = vi.fn()
        render(
            <CartContextProvider>
                <Header setIsVisible={() => true} />
                <ProductItem product={{
                    id: 8,
                    name: "Headset Cloud Stinger",
                    price: 600,
                    photo: "",
                    quantity: 1,
                    amount: 600,
                    createdAT: "",
                    updatedAt: ""
                }} />
                <button onClick={handleClick}>COMPRAR</button>
            </CartContextProvider>
        )



        fireEvent.click(screen.getAllByText("COMPRAR")[0])
        fireEvent.click(screen.getAllByText("COMPRAR")[0])
        expect(handleClick).toHaveBeenCalledTimes(0)

        expect(screen.getByText("2"))

    })

    test("Should load the cart when header button is clicked", () => {
        render(
            <CartContextProvider>
                <Header setIsVisible={() => true} />
                <Cart onClose={() => false} />
            </CartContextProvider>
        );

        fireEvent.click(screen.getByText("0"));

        expect(screen.getByText("Carrinho de compras"));
    });

    test("Should add a product to the cart and verify if it is added", () => {
        const handleClick = vi.fn()
        render(
            <CartContextProvider>
                <Header setIsVisible={() => true} />
                <ProductItem product={{
                    id: 8,
                    name: "Headset Cloud Stinger",
                    price: 600,
                    photo: "",
                    quantity: 1,
                    amount: 600,
                    createdAT: "",
                    updatedAt: ""
                }} />
                <button onClick={handleClick}>COMPRAR</button>
                <Cart onClose={() => false} />
            </CartContextProvider>
        );

        fireEvent.click(screen.getByText("0"));

        expect(screen.getByText("Carrinho de compras"));
        expect(screen.getByText("Total: R$0")).toBeInTheDocument();

        fireEvent.click(screen.getAllByText("COMPRAR")[0])
        expect(handleClick).toHaveBeenCalledTimes(0)

        expect(screen.getByTestId("cart-product")).toBeInTheDocument();
        expect(screen.getByText("Total: R$600")).toBeInTheDocument();
    });
})