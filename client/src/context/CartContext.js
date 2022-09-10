import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  const addToCart = (product) => {
    setCart([...cart, {...product, quantity: 1}])
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => +item.id !== id))
  }

  const changeQuantity = (quantity, id) => {
    setCart(cart.map(item => {
      if(+item.id == +id) {
        return {...item, quantity: +quantity}
      } else {
        return item
      }
    }))
  }

  const numberOfItems = () => {
    let number = 0;
    cart.forEach(item => {
      number += item.quantity
    })
    return number;
  }

  useEffect(() => {
    if(location.pathname.includes('success')) {
      setCart([])
      return;
    }
    if(localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")))
    } else {
      setCart([])
    }
  }, [])

  useEffect(() => {
    if(cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart))
    } else {
      localStorage.setItem("cart", JSON.stringify([]))
    }
  }, [cart])

  return <CartContext.Provider value={{
    cart,
    setCart,
    addToCart,
    removeFromCart,
    changeQuantity,
    numberOfItems
  }}>
    { children }
  </CartContext.Provider>
}

export default CartContext