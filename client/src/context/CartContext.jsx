import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  //  Load cart from localStorage (SAFE)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [restaurantId, setRestaurantId] = useState(() => {
    return localStorage.getItem("restaurantId");
  });

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  
  useEffect(() => {
    if (restaurantId) {
      localStorage.setItem("restaurantId", restaurantId);
    }
  }, [restaurantId]);

  
  const setCurrentRestaurant = (id) => {
    setRestaurantId(id);
  };

  //  ADD TO CART
  const addToCart = (item, restId) => {
    setRestaurantId(restId);

    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);

      if (exists) {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  //  increase quantity
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        i._id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  //  decrease quantity
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i._id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  //  remove item completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  //  clear cart
  const clearCart = () => {
    setCart([]);
    setRestaurantId(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("restaurantId");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        restaurantId,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        setCurrentRestaurant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
