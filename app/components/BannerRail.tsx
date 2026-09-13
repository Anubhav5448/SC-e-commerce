"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export type Banner = {
  id: string;
  /** Wide / landscape crop — shown on sm and up */
  image: string;
  /** Portrait crop — shown on mobile. Falls back to `image` if omitted. */
  mobileImage?: string;
  /** e.g. "/sarees", "/product/p1", "/#festive", or an external URL */
  href: string;
  alt: string;
  /** optional text overlay — leave undefined for pure image banners */
  title?: string;
  subtitle?: string;
  cta?: string;
};

const DEFAULT_AUTOPLAY_MS = 5000;

export default function BannerRail({
  banners,
  autoplayMs = DEFAULT_AUTOPLAY_MS,
}: {
  banners: Banner[];
  autoplayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const hasMultiple = banners.length > 1;

  // Autoplay
  useEffect(() => {
    if (!hasMultiple || paused) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, autoplayMs);
    return () => clearInterval(t);
  }, [hasMultiple, paused, autoplayMs, banners.length]);

  // Swipe on touch
  useEffect(() => {
    const node = trackRef.current;
    if (!node || !hasMultiple) return;

    let startX = 0;
    let currentX = 0;
    let dragging = false;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      currentX = startX;
      dragging = true;
      setPaused(true);
    };
    const onMove = (e: TouchEvent) => {
      if (!dragging) return;
      currentX = e.touches[0].clientX;
    };
    const onEnd = () => {
      if (!dragging) return;
      const dx = currentX - startX;
      dragging = false;
      setPaused(false);
      if (Math.abs(dx) > 50) {
        setIndex((i) =>
          dx < 0
            ? (i + 1) % banners.length
            : (i - 1 + banners.length) % banners.length,
        );
      }
    };

    node.addEventListener("touchstart", onStart, { passive: true });
    node.addEventListener("touchmove", onMove, { passive: true });
    node.addEventListener("touchend", onEnd);
    return () => {
      node.removeEventListener("touchstart", onStart);
      node.removeEventListener("touchmove", onMove);
      node.removeEventListener("touchend", onEnd);
    };
  }, [hasMultiple, banners.length]);

  if (!banners.length) return null;

  return (
    <section
      className="relative w-full"
      aria-roledescription="carousel"
      aria-label="Promotions"
    >
       <div
        ref={trackRef}
        className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5 sm:aspect-[1440/400]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {banners.map((b, i) => {
          const isActive = i === index;
          const isLink = !!b.href && b.href !== "#";

          const inner = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.image}
                alt={b.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {(b.title || b.subtitle || b.cta) && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
                  <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-8 pb-10 text-ivory sm:p-14 sm:pb-16">
                    {b.subtitle && (
                      <p className="text-[12.5px] uppercase tracking-[0.18em] text-gold-soft">
                        {b.subtitle}
                      </p>
                    )}
                    {b.title && (
                      <h2 className="max-w-lg font-display text-[28px] leading-tight sm:text-[40px]">
                        {b.title}
                      </h2>
                    )}
                    {b.cta && (
                      <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-ivory px-6 py-3 text-[13.5px] font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5">
                        {b.cta}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    )}
                  </div>
                </>
              )}
            </>
          );

          const layerClass =
            "absolute inset-0 transition-opacity duration-700 ease-out";
          const layerStyle = {
            opacity: isActive ? 1 : 0,
            pointerEvents: (isActive ? "auto" : "none") as "auto" | "none",
          };

          return isLink ? (
            <Link
              key={b.id}
              href={b.href}
              className={layerClass}
              style={layerStyle}
              aria-hidden={!isActive}
            >
              {inner}
            </Link>
          ) : (
            <div
              key={b.id}
              className={layerClass}
              style={layerStyle}
              aria-hidden={!isActive}
            >
              {inner}
            </div>
          );
        })}

        {/* Arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={() =>
                setIndex((i) => (i - 1 + banners.length) % banners.length)
              }
              aria-label="Previous banner"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-ivory/85 p-2.5 text-ink shadow-md transition hover:bg-ivory"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % banners.length)}
              aria-label="Next banner"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-ivory/85 p-2.5 text-ink shadow-md transition hover:bg-ivory"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {banners.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to banner ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-ivory"
                    : "w-2 bg-ivory/55 hover:bg-ivory/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
