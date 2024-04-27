'use client'
import React from "react";
import styles from './styles.module.scss'
import { Product, useCartContext } from "../../data/contexts/cartContext/index";

interface IProductProps {
    product: Product
}

export const ProductItem = ({ product }: IProductProps) => {

    const { addCartItem } = useCartContext()

    const addToCartWithFormat = (product: Product) => {
        const data = {
            ...product,
            price: Math.round(Number(product.price))
        }

        addCartItem(data)
    }

    return (
        <span key={product.id} className={styles.product}>
            <img src={product.photo} className={styles.image} />
            <div className={styles.description}>
                <h4>{product.name}</h4>
                <div className={styles.price}>R${Math.round(Number(product.price))}</div>
            </div>
            <button className={styles.button} onClick={() => addToCartWithFormat(product)}>COMPRAR</button>
        </span>
    )
}
