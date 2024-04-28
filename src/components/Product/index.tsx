'use client'
import React from "react";
import styles from './styles.module.scss'
import { Product, useCartContext } from "../../data/contexts/cartContext/index";
import { AnimatePresence, motion } from "framer-motion";

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
        <AnimatePresence>
            <motion.span
                initial={{ opacity: 0, }}
                animate={{ opacity: 100, }}
                exit={{ opacity: 0, }}
                key={product.id} className={styles.product}>
                <img src={product.photo} className={styles.image} />
                <div className={styles.description}>
                    <h4>{product.name}</h4>
                    <div className={styles.price}>R${Math.round(Number(product.price))}</div>
                </div>
                <button className={styles.button} onClick={() => addToCartWithFormat(product)}>COMPRAR</button>
            </motion.span>
        </AnimatePresence>
    )
}
