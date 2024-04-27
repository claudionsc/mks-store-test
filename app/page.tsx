'use client'
import React, {SetStateAction, useEffect} from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import { Product, useCartContext } from "@/src/data/contexts/cartContext";
import { useState } from "react";
import { Cart } from "@/src/components/Cart";
import { ProductItem } from "@/src/components/Product";
import { Header } from "@/src/components/Header";
import { useGetProducts } from "@/src/data/api";

export default function Home() {
  
const {getAllProducts} = useGetProducts()
const [productsList, setProductsList] = useState<Product[]>([]);


useEffect(() => {
  if (getAllProducts?.data) {
    setProductsList(getAllProducts?.data?.products)
  }

  }, [getAllProducts])


const [isCartVisible, setIsCartVisible] = useState(false)
  return (
    <main className={styles.main}>
      <Header setIsVisible={() => setIsCartVisible(true)} />
      <span className={styles.products}>
        {productsList.map((product) => {
          return (
            <ProductItem product={product} />
          )
        })}
      </span>
      {isCartVisible && <Cart onClose={() => setIsCartVisible(false)}/>}
    </main>
  );
}
