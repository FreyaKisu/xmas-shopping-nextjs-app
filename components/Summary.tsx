import styles from "../styles/Home.module.scss";
import React, { useState, useEffect, useRef, useDebugValue } from "react";
import { updateCart } from "../lib/apiCalls";
import children from "../constants/children";
import { useAppContext } from "../context/state";
import { getProductById } from "../lib/utils";

const getDiscount = (product, allProductsCount) => {
  const { id } = product;

  const productCount = allProductsCount[id];

  let price = product.price;

  if (productCount === 2) {
    price = product.price * 0.8; // 20 % discount
  }
  if (productCount >= 3) {
    price = product.price * 0.7; // 30 % discount
  }

  return { ...product, price };
};

export default function Summary() {
  const { state, setState }: any = useAppContext();
  const { carts, products } = state;

  const allProductsCount = {};

  carts.forEach((cart) => {
    cart.products.forEach((product) => {
      const { productId, quantity } = product;
      if (allProductsCount[productId]) {
        allProductsCount[productId] += quantity;
      } else {
        allProductsCount[productId] = quantity;
      }
    });
  });

  let totalPrice = 0;
  carts.forEach((cart) => {
    let cartTotalPrice = 0;
    cart.products.forEach((cartProduct) => {
      const { productId, quantity } = cartProduct;

      const product: any = getProductById(productId, products);

      const { price } = getDiscount(product, allProductsCount);

      cartTotalPrice += quantity * price;
    });
    totalPrice += cartTotalPrice;
  });

  return (
    <div>
      <div className={styles.finalCartSumsWrapper}>
        <h3 className={styles.sumTitle}>Summary:</h3>
        <ul>
          {carts.map((cart) => {
            return (
              <li key={cart.id}>
                <b>
                  {children[cart.id]}
                  's cart price:{" "}
                </b>
                {cart.products.map((cartProduct) => {
                  const { productId, quantity } = cartProduct;
                  const product: any = getProductById(productId, products);
                  const { price, title } = getDiscount(product, allProductsCount);
                  return (
                    <div key={productId}>
                      <div className={styles.cartListTitles}>Item name: </div>
                      {title}
                      <div className={styles.cartListTitles}>Total Price: </div>
                      €{(price * quantity).toFixed(2)}
                    </div>
                  );
                })}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.sumWrapper}>
        <h3 className={styles.priceTitle}>Final Price:</h3>
        <div className={styles.sumAmount}>€ {totalPrice.toFixed(2)}</div>
      </div>
    </div>
  );
}
