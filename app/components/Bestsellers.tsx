"use client";

import Link from "next/link";
import { featuredProducts as products, imgSrc } from "../data";
import Reveal from "./Reveal";
import { useCart } from "../context/CartContext";

export default function Bestsellers() {
  const { wishlist, bag, toggleWishlist, addToBag } = useCart();

  return (
    <section id="bestsellers" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-[28px] text-ink">Bestsellers</h2>
          <p className="mt-1 text-[14.5px] text-ink/60">
            Reordered every week — the pieces people keep coming back for.
          </p>
        </div>
      </Reveal>

      <div className="rail -mx-5 flex gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-5">
        {products.map((p) => {
          const saved = wishlist.has(p.id);
          const inBag = bag.has(p.id);
          const discount = Math.round(100 - (p.price / p.mrp) * 100);

          return (
            <Reveal key={p.id} delay={(Number(p.id.replace("p", "")) - 1) * 70} className="w-[220px] shrink-0 sm:w-auto">
            <Link href={`/product/${p.id}`} className="group block">
              <div
                className="relative flex aspect-[3/4] items-end overflow-hidden rounded-2xl"
              >
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

                <div className="relative z-10 flex w-full items-center justify-between bg-gradient-to-t from-black/35 to-transparent px-3 py-3 text-ivory">
                  <span className="text-[12px]">★ {p.rating.toFixed(1)}</span>
                  <span className="text-[11px] uppercase tracking-wide">Bestseller</span>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-[14.5px] leading-snug text-ink">{p.name}</h3>
                <p className="mt-0.5 text-[12.5px] text-ink/50">{p.type}</p>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[15px] font-medium text-ink">
                      ₹{p.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[12.5px] text-ink/40 line-through">
                      ₹{p.mrp.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[12.5px] text-rose">{discount}% off</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToBag(p.id);
                  }}
                  disabled={inBag}
                  className="mt-3 w-full rounded-full border border-ink/20 py-2.5 text-[13px] font-medium text-ink/85 transition-all duration-300 hover:border-maroon hover:text-maroon disabled:border-teal/40 disabled:text-teal"
                >
                  {inBag ? "Added to bag" : "Add to bag"}
                </button>
              </div>
            </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}