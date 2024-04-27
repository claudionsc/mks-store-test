import React from "react";
import styles from '../Cart/page.module.scss'

interface CartCounterProps {
    children: React.ReactNode,
    onClickDecrement?: () => void
    onClickIncrement?: () => void
    props?: React.ReactNode
}

export const Counter = ({ children, onClickDecrement, onClickIncrement, ...props }: CartCounterProps) => {

    
  return (
    <span className={styles.counterCart}>
      <button {...props} onClick={() => onClickDecrement && onClickDecrement()}>-</button>
      <span>{children}</span>
      <button {...props} onClick={() => onClickIncrement && onClickIncrement()}>+</button>
    </span>
  );
};
