export const getProductById = (productId: number, products: Array<object>): object => {
    return products.find((p: any) => p.id === productId);
  };
  