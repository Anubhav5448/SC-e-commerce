// app/components/Cart.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { products, imgSrc, type Product } from "../data";
import { useCart } from "../context/CartContext";
import { buildWhatsAppOrderLink } from "../utils/whatsappOrder";

export default function Cart() {
  const { bag, removeFromBag, bagCount } = useCart();
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    email: "",
    notes: "",
  });

  const bagItems = products.filter((p) => bag.has(p.id));

  const subtotal = bagItems.reduce((sum, p) => {
    const qty = quantity[p.id] || 1;
    return sum + p.price * qty;
  }, 0);

  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    setQuantity((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  function validate() {
    const errs: string[] = [];
    if (!buyer.name.trim()) errs.push("Name is required");
    if (!/^\d{10}$/.test(buyer.phone.replace(/\D/g, "")))
      errs.push("Enter a valid 10-digit phone number");
    if (!buyer.address.trim()) errs.push("Address is required");
    if (buyer.pincode && !/^\d{6}$/.test(buyer.pincode))
      errs.push("Pincode must be 6 digits");
    setErrors(errs);
    return errs.length === 0;
  }

  function handleCheckout() {
    if (!showForm) {
      setShowForm(true);
      return;
    }
    if (!validate()) return;

    const url = buildWhatsAppOrderLink(bag, quantity, buyer);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (bagItems.length === 0) {
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
            <path d="M6 8V6.5a5 5 0 0 1 10 0V8" />
            <path d="M4.5 8h15l-1 12.5h-13Z" />
          </svg>
          <h2 className="mt-4 font-display text-2xl text-ink">Your bag is empty</h2>
          <p className="mt-2 text-ink/60">
            Start adding pieces you love to your bag.
          </p>
          <Link
            href="/#bestsellers"
            className="mt-6 inline-block rounded-full bg-maroon-deep px-8 py-3 text-ivory transition-colors hover:bg-maroon"
          >
            Shop bestsellers
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[28px] text-ink">Your bag</h1>
        <span className="text-[14px] text-ink/60">{bagCount} items</span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Cart Items */}
        <div className="space-y-4">
          {bagItems.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              quantity={quantity[product.id] || 1}
              onUpdateQuantity={(delta) => updateQuantity(product.id, delta)}
              onRemove={() => removeFromBag(product.id)}
            />
          ))}
        </div>

        {/* Order Summary + Checkout Form */}
        <div className="h-fit space-y-4">
          <div className="rounded-2xl bg-ivory-dim/50 p-6">
            <h2 className="text-[15px] font-medium text-ink">Order summary</h2>

            <div className="mt-4 space-y-3 border-b border-ink/10 pb-4 text-[14px]">
              <div className="flex justify-between">
                <span className="text-ink/60">Subtotal</span>
                <span className="text-ink">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Shipping</span>
                <span className="text-ink">
                  {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-between text-[17px] font-medium">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {showForm && (
            <div className="rounded-2xl bg-ivory-dim/50 p-6">
              <h2 className="text-[15px] font-medium text-ink">
                Delivery details
              </h2>
              <p className="mt-1 text-[12.5px] text-ink/55">
                We&apos;ll send these with your order on WhatsApp.
              </p>

              <div className="mt-4 space-y-3">
                <Field
                  label="Full name"
                  value={buyer.name}
                  onChange={(v) => setBuyer({ ...buyer, name: v })}
                  placeholder="Priya Sharma"
                  required
                />
                <Field
                  label="Phone"
                  value={buyer.phone}
                  onChange={(v) => setBuyer({ ...buyer, phone: v })}
                  placeholder="9876543210"
                  inputMode="numeric"
                  required
                />
                <Field
                  label="Address"
                  value={buyer.address}
                  onChange={(v) => setBuyer({ ...buyer, address: v })}
                  placeholder="Flat / House no, Street, City, State"
                  textarea
                  required
                />
                <Field
                  label="Pincode"
                  value={buyer.pincode}
                  onChange={(v) => setBuyer({ ...buyer, pincode: v })}
                  placeholder="400001"
                  inputMode="numeric"
                />
                <Field
                  label="Email (optional)"
                  value={buyer.email}
                  onChange={(v) => setBuyer({ ...buyer, email: v })}
                  placeholder="you@email.com"
                  type="email"
                />
                <Field
                  label="Order notes (optional)"
                  value={buyer.notes}
                  onChange={(v) => setBuyer({ ...buyer, notes: v })}
                  placeholder="Any special instructions"
                  textarea
                />
              </div>

              {errors.length > 0 && (
                <ul className="mt-3 space-y-1 text-[12.5px] text-rose">
                  {errors.map((e) => (
                    <li key={e}>• {e}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <button
            onClick={handleCheckout}
            className="w-full rounded-full bg-maroon-deep py-3.5 text-[14px] font-medium text-ivory transition-colors hover:bg-maroon"
          >
            {showForm ? "Place order on WhatsApp" : "Proceed to checkout"}
          </button>

          <Link
            href="/#bestsellers"
            className="inline-block w-full text-center text-[13px] text-ink/50 underline decoration-gold underline-offset-4 hover:text-ink"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  textarea,
  type = "text",
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
}) {
  const cls =
    "w-full rounded-xl border border-ink/15 bg-ivory px-4 py-2.5 text-[14px] text-ink placeholder:text-ink/35 focus:border-maroon focus:outline-none";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-ink/75">
        {label} {required && <span className="text-rose">*</span>}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}

function CartItem({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}: {
  product: Product;
  quantity: number;
  onUpdateQuantity: (delta: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-ivory-dim/30 p-4">
      <div
        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl"
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
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[14px] font-medium text-ink">{product.name}</h3>
            <p className="text-[12px] text-ink/50">{product.type}</p>
          </div>
          <button
            onClick={onRemove}
            className="text-ink/30 transition-colors hover:text-rose"
            aria-label="Remove from bag"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(-1)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-ink/60 transition-colors hover:border-maroon hover:text-maroon"
              aria-label="Decrease quantity"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14" />
              </svg>
            </button>
            <span className="w-6 text-center text-[14px] text-ink">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(1)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 text-ink/60 transition-colors hover:border-maroon hover:text-maroon"
              aria-label="Increase quantity"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5v14" />
              </svg>
            </button>
          </div>
          <span className="text-[15px] font-medium text-ink">
            ₹{(product.price * quantity).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}