// app/components/MiniCart.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { products, imgSrc } from "../data";
import { useCart } from "../context/CartContext";

export default function MiniCart() {
  const { bag, removeFromBag, bagCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const bagItems = products.filter((p) => bag.has(p.id));
  const subtotal = bagItems.reduce((sum, p) => sum + p.price, 0);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-1 text-ivory/90 transition-colors hover:text-gold-soft"
        aria-label="Open bag"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 8V6.5a5 5 0 0 1 10 0V8" />
          <path d="M4.5 8h15l-1 12.5h-13Z" />
        </svg>
        {bagCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-ink">
            {bagCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-ivory shadow-xl">
          <div className="max-h-80 overflow-y-auto p-4">
            {bagItems.length === 0 ? (
              <p className="py-4 text-center text-sm text-ink/60">Your bag is empty</p>
            ) : (
              <>
                {bagItems.map((product) => (
                  <div key={product.id} className="flex gap-3 py-2">
                    <div
                      className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg"
                      style={{
                        background: `linear-gradient(145deg, ${product.swatch[0]}, ${product.swatch[1]})`,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgSrc(product.image)}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-medium text-ink">{product.name}</p>
                      <p className="text-[12px] text-ink/60">₹{product.price.toLocaleString("en-IN")}</p>
                    </div>
                    <button
                      onClick={() => removeFromBag(product.id)}
                      className="text-ink/30 hover:text-rose"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="border-t border-ink/10 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/60">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="mt-3 block w-full rounded-full bg-maroon-deep py-2.5 text-center text-[13px] font-medium text-ivory transition-colors hover:bg-maroon"
                  >
                    View bag
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}