'use client'
import React, {useEffect} from "react";
import styles from "./page.module.scss";
import { Product } from "@/src/data/contexts/cartContext";
import { useState } from "react";
import { Cart } from "@/src/components/Cart";
import { ProductItem } from "@/src/components/Product";
import { Header } from "@/src/components/Header";
import { useGetProducts } from "@/src/data/api";
import { Skeleton } from 'antd';

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
        {
          !getAllProducts.isSuccess && <Skeleton active />
        }
        
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
