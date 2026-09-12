"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "../data";
import { sizes, imgSrc } from "../data";
import { useCart } from "../context/CartContext";

export default function ProductDetail({ product }: { product: Product }) {
  const { isWishlisted, toggleWishlist, isInBag, addToBag } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const saved = isWishlisted(product.id);
  const inBag = isInBag(product.id);
  const discount = Math.round(100 - (product.price / product.mrp) * 100);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Link
        href="/#bestsellers"
        className="mb-6 inline-flex items-center gap-1.5 text-[13.5px] text-ink/60 hover:text-maroon"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        Back to bestsellers
      </Link>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-2xl"
          style={{
            background: `linear-gradient(160deg, ${product.swatch[0]}, ${product.swatch[1]})`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc(product.image)}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {product.tag && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-medium text-ivory">
              {product.tag}
            </span>
          )}
        </div>

        <div>
          <p className="text-[13px] uppercase tracking-wide text-maroon">{product.type}</p>
          <h1 className="mt-2 font-display text-[30px] leading-tight text-ink sm:text-[36px]">
            {product.name}
          </h1>
          <p className="mt-2 text-[13.5px] text-ink/60">★ {product.rating.toFixed(1)} rating</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-[24px] font-medium text-ink">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-[15px] text-ink/40 line-through">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
            <span className="text-[14px] text-rose">{discount}% off</span>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-[13.5px] font-medium text-ink">Select size</p>
            <div className="flex flex-wrap gap-2.5">
              {sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border text-[13px] transition-colors ${
                    selectedSize === s.size
                      ? "border-maroon bg-maroon text-ivory"
                      : "border-ink/20 text-ink/75 hover:border-maroon hover:text-maroon"
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => addToBag(product.id)}
              disabled={inBag}
              className="flex-1 rounded-full bg-maroon-deep py-3.5 text-[14px] font-medium text-ivory transition-all duration-300 hover:bg-maroon disabled:bg-teal"
            >
              {inBag ? "Added to bag" : "Add to bag"}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-ink/20 text-maroon-deep transition-transform hover:scale-105"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" className={saved ? "pop" : ""}>
                <path d="M12 20.2s-7.4-4.6-9.6-9.1C.9 7.7 2.4 4.3 5.6 3.4c2-.6 3.9.2 5 1.8l1.4 2 1.4-2c1.1-1.6 3-2.4 5-1.8 3.2.9 4.7 4.3 3.2 7.7-2.2 4.5-9.6 9.1-9.6 9.1Z" />
              </svg>
            </button>
          </div>

          <p className="mt-6 text-[13px] text-ink/50">
            Free shipping on orders above ₹1,999. Easy 7-day returns.
          </p>
        </div>
      </div>
    </section>
  );
}