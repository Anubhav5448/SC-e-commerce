"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const links: { label: string; href: string }[] = [
  { label: "Sarees", href: "/sarees" },
  { label: "Suit Sets", href: "/suits" },
  { label: "Sale", href: "/#bestsellers" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { bagCount, wishlistCount } = useCart();

  // Scroll listener — solid header after 20px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + Esc to close while drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ink/95 backdrop-blur-md shadow-[0_2px_16px_rgba(34,19,16,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-6">
          <button
            className="flex flex-col gap-[5px] p-1 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-[1.5px] w-5 bg-ivory transition-transform ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-ivory transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-ivory transition-transform ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/sarees"
              className="text-[13.5px] tracking-wide text-ivory/85 transition-colors hover:text-gold-soft"
            >
              Sarees
            </Link>
            <Link
              href="/suits"
              className="text-[13.5px] tracking-wide text-ivory/85 transition-colors hover:text-gold-soft"
            >
              Suit Sets
            </Link>
          </nav>

          <Link
            href="/"
            className="font-display text-[26px] italic tracking-tight text-ivory"
          >
            Vipswapan
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/#bestsellers"
              className="text-[13.5px] tracking-wide text-ivory/85 transition-colors hover:text-gold-soft"
            >
              Sale
            </Link>
            <IconRow bagCount={bagCount} wishlistCount={wishlistCount} />
          </nav>

          <div className="md:hidden">
            <IconRow compact bagCount={bagCount} wishlistCount={wishlistCount} />
          </div>
        </div>
      </header>

      {/* ---- Mobile drawer ---- */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-[70] flex w-[280px] max-w-[85vw] flex-col bg-ink text-ivory shadow-[4px_0_24px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ivory/12 px-5 py-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-[24px] italic tracking-tight text-ivory"
          >
            Vipswapan
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-full p-2 text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-ivory"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-5 py-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ivory/8 py-4 text-[16px] text-ivory/90 transition-colors hover:text-gold-soft"
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-6 flex items-center gap-5 text-ivory/80">
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-[14px]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20.2s-7.4-4.6-9.6-9.1C.9 7.7 2.4 4.3 5.6 3.4c2-.6 3.9.2 5 1.8l1.4 2 1.4-2c1.1-1.6 3-2.4 5-1.8 3.2.9 4.7 4.3 3.2 7.7-2.2 4.5-9.6 9.1-9.6 9.1Z" />
              </svg>
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-[14px]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8V6.5a5 5 0 0 1 10 0V8" />
                <path d="M4.5 8h15l-1 12.5h-13Z" />
              </svg>
              Bag {bagCount > 0 && `(${bagCount})`}
            </Link>
          </div>
        </nav>

        <p className="border-t border-ivory/12 px-5 py-4 text-[12px] text-ivory/40">
          © 2026 Vipswapan Clothing Co.
        </p>
      </aside>
    </>
  );
}

function IconRow({
  compact = false,
  bagCount = 0,
  wishlistCount = 0,
}: {
  compact?: boolean;
  bagCount?: number;
  wishlistCount?: number;
}) {
  return (
    <div className={`flex items-center ${compact ? "gap-3" : "gap-4"}`}>
      <Link href="/wishlist" className="relative">
        <IconButton label="Wishlist" count={wishlistCount}>
          <path d="M12 20.2s-7.4-4.6-9.6-9.1C.9 7.7 2.4 4.3 5.6 3.4c2-.6 3.9.2 5 1.8l1.4 2 1.4-2c1.1-1.6 3-2.4 5-1.8 3.2.9 4.7 4.3 3.2 7.7-2.2 4.5-9.6 9.1-9.6 9.1Z" />
        </IconButton>
      </Link>
      <Link href="/cart" className="relative">
        <IconButton label="Bag" count={bagCount}>
          <path d="M6 8V6.5a5 5 0 0 1 10 0V8" />
          <path d="M4.5 8h15l-1 12.5h-13Z" />
        </IconButton>
      </Link>
    </div>
  );
}

function IconButton({
  label,
  children,
  count,
}: {
  label: string;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      aria-label={label}
      className="relative rounded-full p-1 text-ivory/90 transition-colors hover:text-gold-soft"
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
      {!!count && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-ink">
          {count}
        </span>
      )}
    </button>
  );
}