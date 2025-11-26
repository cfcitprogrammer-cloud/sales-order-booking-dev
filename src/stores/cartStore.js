import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],

  // Add item to the cart
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),

  // Remove item from the cart
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),

  // Update the quantity of a cart item
  updateQuantity: (productId, qty) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.id === productId ? { ...product, qty } : product
      ),
    })),

  // Update the price of a specific cart item
  updateCartItemPrice: (index, updatedItem) =>
    set((state) => {
      const newCart = [...state.cart];
      newCart[index] = updatedItem; // Update the item at the specific index
      return { cart: newCart };
    }),

  // Update the entire cart with a new array of items
  updateCart: (newCart) =>
    set(() => ({
      cart: newCart, // Replace the current cart with the new one
    })),

  // Clear all items from the cart
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
