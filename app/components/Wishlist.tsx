// app/components/Wishlist.tsx
"use client";

import Link from "next/link";
import { products, imgSrc } from "../data";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToBag, bag } = useCart();
  const wishlistItems = products.filter((p) => wishlist.has(p.id));

  if (wishlistItems.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <div className="rounded-2xl bg-ivory-dim/50 px-8 py-16">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mx-auto text-ink/30"
          >
            <path d="M12 20.2s-7.4-4.6-9.6-9.1C.9 7.7 2.4 4.3 5.6 3.4c2-.6 3.9.2 5 1.8l1.4 2 1.4-2c1.1-1.6 3-2.4 5-1.8 3.2.9 4.7 4.3 3.2 7.7-2.2 4.5-9.6 9.1-9.6 9.1Z" />
          </svg>
          <h2 className="mt-4 font-display text-2xl text-ink">Your wishlist is empty</h2>
          <p className="mt-2 text-ink/60">
            Save your favorite pieces and come back to them later.
          </p>
          <Link
            href="/#bestsellers"
            className="mt-6 inline-block rounded-full bg-maroon-deep px-8 py-3 text-ivory transition-colors hover:bg-maroon"
          >
            Explore collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[28px] text-ink">Your wishlist</h1>
        <span className="text-[14px] text-ink/60">{wishlistItems.length} items</span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {wishlistItems.map((product) => {
          const inBag = bag.has(product.id);
          const discount = Math.round(100 - (product.price / product.mrp) * 100);

          return (
            <div key={product.id} className="group">
              <Link href={`/product/${product.id}`} className="block">
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl"
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      background: `linear-gradient(160deg, ${product.swatch[0]}, ${product.swatch[1]})`,
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc(product.image)}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {product.tag && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-ink/70 px-2.5 py-1 text-[10.5px] font-medium text-ivory">
                      {product.tag}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    aria-label="Remove from wishlist"
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 text-maroon-deep transition-transform hover:scale-110"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 20.2s-7.4-4.6-9.6-9.1C.9 7.7 2.4 4.3 5.6 3.4c2-.6 3.9.2 5 1.8l1.4 2 1.4-2c1.1-1.6 3-2.4 5-1.8 3.2.9 4.7 4.3 3.2 7.7-2.2 4.5-9.6 9.1-9.6 9.1Z" />
                    </svg>
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/35 to-transparent px-3 py-3">
                    <span className="text-[12px] text-ivory">★ {product.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-[14px] leading-snug text-ink">{product.name}</h3>
                  <p className="mt-0.5 text-[12px] text-ink/50">{product.type}</p>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-[15px] font-medium text-ink">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[12px] text-ink/40 line-through">
                      ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[12px] text-rose">{discount}% off</span>
                  </div>
                </div>
              </Link>

              <button
                onClick={() => addToBag(product.id)}
                disabled={inBag}
                className="mt-2 w-full rounded-full border border-ink/20 py-2 text-[13px] font-medium text-ink/85 transition-all duration-300 hover:border-maroon hover:text-maroon disabled:border-teal/40 disabled:text-teal"
              >
                {inBag ? "Added to bag" : "Add to bag"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}