'use client'
import React, { useState } from "react";
import styles from './page.module.scss'
import { IoIosCloseCircle } from "react-icons/io";
import { Product, useCartContext } from "../../data/contexts/cartContext/index";
import { Counter } from "../Counter";


interface ICartProps {
    onClose: () => void
}

export const Cart = ({ onClose }: ICartProps) => {

    const { cartItems, incrementQtd, decrementQtd, removeCartItem } = useCartContext()

    console.log('cart', cartItems)
    const getAmount = (items: Product[]) => {
        return items.reduce((total, item) => total + item.amount, 0);
    };

    return (
        <aside className={styles.aside}>
            <div className={styles.top}>
                <h1>Carrinho de compras</h1>
                <div onClick={onClose}>
                    <IoIosCloseCircle />
                </div>
            </div>
            <section>
                {cartItems.map((item) => {
                    return (
                        <span data-testid="cart-product" key={item.id} className={styles.product}>
                            <IoIosCloseCircle onClick={() => removeCartItem(item)} />
                            <img src={item.photo} className={styles.image} />
                            <li>{item.name}</li>
                            <Counter
                                onClickDecrement={() => decrementQtd(item)}
                                onClickIncrement={() => incrementQtd(item)}
                            >
                                {item.quantity}
                            </Counter>

                            <h5>R${item.amount}</h5>
                        </span>
                    )
                })}
            </section>
            <section className={styles.footerCart}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1>Total: </h1>
                    <h1>R${getAmount(cartItems)}</h1>
                </div>
                <button>Finalizar compra</button>
            </section>
        </aside>
    )
}