import FAKE_STORE_API_ROUTES from "../constants/fakeStoreApiRoutes";

//GET all carts
export const getCarts = async (): Promise<any> => {
  const carts = await fetch(FAKE_STORE_API_ROUTES.CARTS).then((res) =>
    res.json()
  );

  return carts;
};

//GET all products
export const getProducts = async (): Promise<any> => {
  const products = await fetch(FAKE_STORE_API_ROUTES.PRODUCTS).then((res) =>
    res.json()
  );
  return products;
};

//PUT update cart
// API documentation says "It will return you an object with sent id. remember that nothing in real will update in the database."
export const updateCart = async (
  cartId: number,
  productId: number,
  quantity: number,
  userId: number
): Promise<any> => {
  const carts = await fetch(FAKE_STORE_API_ROUTES.CART + cartId, {
    method:"PATCH",
    body: JSON.stringify({
      userId: userId,
      products: [{ productId: productId, quantity: quantity }],
    }),
  }).then((res) => res.json());
  return carts;
};
