"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const links: { label: string; href: string }[] = [
  { label: "Sarees", href: "/Sarees" },
  { label: "Suit Sets", href: "/Suits" },
  { label: "Sale", href: "/#bestsellers" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { bagCount, wishlistCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-[1.5px] w-5 bg-ivory transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-5 bg-ivory transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[1.5px] w-5 bg-ivory transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/sarees" className="text-[13.5px] tracking-wide text-ivory/85 transition-colors hover:text-gold-soft">
            Sarees
          </Link>
          <Link href="/suits" className="text-[13.5px] tracking-wide text-ivory/85 transition-colors hover:text-gold-soft">
            Suit Sets
          </Link>
        </nav>

        <Link href="/" className="font-display text-[26px] italic tracking-tight text-ivory">
          Rivaayat
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/#bestsellers" className="text-[13.5px] tracking-wide text-ivory/85 transition-colors hover:text-gold-soft">
            Sale
          </Link>
          <IconRow bagCount={bagCount} wishlistCount={wishlistCount} />
        </nav>

        <div className="md:hidden">
          <IconRow compact bagCount={bagCount} wishlistCount={wishlistCount} />
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 bg-ink/95 px-5 pb-4 pt-2 backdrop-blur md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-[15px] text-ivory/85"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
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
      {/* <IconButton label="Account">
        <circle cx="12" cy="8" r="3.4" />
        <path d="M4.8 20c1.3-3.6 4-5.4 7.2-5.4s5.9 1.8 7.2 5.4" />
      </IconButton> */}
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
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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