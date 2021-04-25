import { createContext, useContext, useState, useEffect } from 'react';
import {getCarts, getProducts} from '../lib/apiCalls'

const AppContext:any = createContext(null);

const handleGets = async () => {
 const carts = await getCarts();
 const products = await getProducts()

 return {
  carts, products
 }
}

export function AppWrapper({ children }) {
  const [state, setState] = useState({
    products: [],
    carts: []
  })

  useEffect(() => {
    handleGets().then((r:any) => {
      setState(r)
    })
  }, []);

  return (
    <AppContext.Provider value={{state, setState}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}