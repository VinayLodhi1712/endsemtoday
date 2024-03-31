import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]); //array to save products 
  useEffect(() => {
    let existingcart = localStorage.getItem("Cart");// to presist products on refresh
    if (existingcart) {
      setCart(JSON.parse(existingcart));
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
