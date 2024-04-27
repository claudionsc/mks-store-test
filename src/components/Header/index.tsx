'use client'
import React from "react"
import styles from './styles.module.scss'
import { Product, useCartContext } from "../../data/contexts/cartContext/index"
import { FaShoppingCart } from "react-icons/fa";


interface IHeaderProps {
    setIsVisible: () => void
}

export const Header = ({ setIsVisible }: IHeaderProps) => {

    const { cartItems } = useCartContext()

    const getTotalQuantity = (items: Product[]) => {
        return items.reduce((total, item) => total + item.quantity, 0);
      };

    return (
        <header className={styles.header}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h1>MKS</h1>
                <p>Sistemas</p>
            </div>


            <div className={styles.cartButton} onClick={setIsVisible}>
                <FaShoppingCart />
                <h4>{getTotalQuantity(cartItems)}</h4>
            </div>
        </header>
    )
}