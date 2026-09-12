"use client";

import { createContext, useContext, useState, type PropsWithChildren } from "react";

type CartContextValue = {
  bag: Set<string>;
  wishlist: Set<string>;
  bagCount: number;
  wishlistCount: number;
  addToBag: (id: string) => void;
  removeFromBag: (id: string) => void;
  toggleWishlist: (id: string) => void;
  isInBag: (id: string) => boolean;
  isWishlisted: (id: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [bag, setBag] = useState<Set<string>>(new Set());
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  function addToBag(id: string) {
    setBag((prev) => new Set(prev).add(id));
  }

  function removeFromBag(id: string) {
    setBag((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function toggleWishlist(id: string) {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const value: CartContextValue = {
    bag,
    wishlist,
    bagCount: bag.size,
    wishlistCount: wishlist.size,
    addToBag,
    removeFromBag,
    toggleWishlist,
    isInBag: (id) => bag.has(id),
    isWishlisted: (id) => wishlist.has(id),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}