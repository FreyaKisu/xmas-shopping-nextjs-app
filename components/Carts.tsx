import Head from "next/head";
import styles from "../styles/Home.module.scss";
import React, { useState, useEffect, useRef, useDebugValue } from "react";
import { updateCart } from "../lib/apiCalls";
import children from "../constants/children";
import { useAppContext } from "../context/state";
import Summary from "./Summary";
import { getProductById } from "../lib/utils";

export default function Carts() {
  const { state, setState }: any = useAppContext();
  const [loading] = useState(false);
  const { carts, products } = state;

  return (
    <div>
      {loading ? (
        <p className={styles.loader}> </p>
      ) : (
        <div className={styles.container}>
          <Head>
            <title>Droppe Xmas</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <div className={styles.wrapper}>
            <div className={[styles.box, styles.header].join(" ")}>
              Droppe Xmas Shop
            </div>
            <div className={styles.sidebar}>
              <Summary></Summary>
            </div>
            <div className={styles.content}>
              <ul className={styles.cartsGrid}>
                {carts.map((cart, cartIndex) => {
                  return (
                    <li key={cart.id} className={styles.cart}>
                      <b>
                        {children[cart.id]}
                        's wishlist
                      </b>

                      <ul>
                        {cart.products.map((cartProduct, cartProductIndex) => {
                          const { productId, quantity } = cartProduct;
                          const product: any = getProductById(
                            productId,
                            products
                          );
                          return (
                            <li
                              key={"product" + cartProductIndex}
                            
                            >
                              <div><div className={styles.cartListTitles}>Item name: </div> {product.title}</div>
                              <div><div className={styles.cartListTitles}>Amount: </div> 
                              <input
                                className={styles.input}
                                type="number"
                                id="quantity"
                                min="0"
                                max="50"
                                pattern="[0-9]"
                                value={quantity}
                                onChange={async (e) => {
                                  const newQuantity = parseInt(e.target.value);
                                  const updatedProducts = [...cart.products];
                                  const updatedCarts = [...carts];

                                  updatedProducts[cartProductIndex] = {
                                    ...cartProduct,
                                    quantity: newQuantity,
                                  };

                                  updatedCarts[cartIndex] = {
                                    ...cart,
                                    products: updatedProducts,
                                  };

                                  setState({
                                    ...state,
                                    carts: updatedCarts,
                                  });

                                  const productId = product.id;
                                  const cartId = cart.id;
                                  const userId = cart.userId;

                                  await updateCart(
                                    cartId,
                                    productId,
                                    quantity,
                                    userId
                                  );
                                }}
                              /> </div>
                              <img src={product.image} className={styles.image}/>
                              <div><div className={styles.cartListTitles}>Price: </div>€ {product.price}</div>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={[styles.box, styles.footer].join(" ")}>
              &#169;Droppe Xmas by FreyaKisuli 2021
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
