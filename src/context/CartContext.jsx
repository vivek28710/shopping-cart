import { ToastContainer, toast, Bounce } from "react-toastify";
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();
import { initialProducts } from "../data/Product";

export const CartProvider = (props) => {
  const [Cart, setCart] = useState([]);

  const products = initialProducts;

  //aad Item into the cart
  const addToCart = (product) => {
    toast.success("Item Added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  //Remove Item from Cart
  const removeFromCart = (productId, removeAll = false) => {
    toast.success("Item removed From cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);

      if (!existingItem) return prevCart;

      if (removeAll || existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      } else {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => Cart.reduce((total, item) => total + item.quantity, 0),
    [Cart]
  );

  const cartTotal = useMemo(
    () => Cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [Cart]
  );

  console.log("Mycart=", Cart);

  return (
    <CartContext.Provider
      value={{
        products,
        Cart,
        addToCart,
        clearCart,
        removeFromCart,
        cartTotal,
        cartCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
