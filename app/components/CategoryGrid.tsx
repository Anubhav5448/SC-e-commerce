"use client";

import Link from "next/link";
import type { Product } from "../data";
import { imgSrc } from "../data";
import { useCart } from "../context/CartContext";

export default function CategoryGrid({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: Product[];
}) {
  const { wishlist, bag, toggleWishlist, addToBag } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="mb-8">
        <h1 className="font-display text-[30px] text-ink sm:text-[36px]">{title}</h1>
        <p className="mt-1 text-[14.5px] text-ink/60">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((p) => {
          const saved = wishlist.has(p.id);
          const inBag = bag.has(p.id);
          const discount = Math.round(100 - (p.price / p.mrp) * 100);

          return (
            <div key={p.id} className="group">
              <Link href={`/product/${p.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      background: `linear-gradient(160deg, ${p.swatch[0]}, ${p.swatch[1]})`,
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc(p.image)}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {p.tag && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-ink/70 px-2.5 py-1 text-[10.5px] font-medium text-ivory">
                      {p.tag}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(p.id);
                    }}
                    aria-pressed={saved}
                    aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 text-maroon-deep transition-transform duration-300 hover:scale-110"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" className={saved ? "pop" : ""}>
                      <path d="M12 20.2s-7.4-4.6-9.6-9.1C.9 7.7 2.4 4.3 5.6 3.4c2-.6 3.9.2 5 1.8l1.4 2 1.4-2c1.1-1.6 3-2.4 5-1.8 3.2.9 4.7 4.3 3.2 7.7-2.2 4.5-9.6 9.1-9.6 9.1Z" />
                    </svg>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/35 to-transparent px-3 py-3">
                    <span className="text-[12px] text-ivory">★ {p.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-[14px] leading-snug text-ink">{p.name}</h3>
                  <p className="mt-0.5 text-[12px] text-ink/50">{p.type}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-[15px] font-medium text-ink">
                      ₹{p.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[12px] text-ink/40 line-through">
                      ₹{p.mrp.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[12px] text-rose">{discount}% off</span>
                  </div>
                </div>
              </Link>

              <button
                onClick={() => addToBag(p.id)}
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