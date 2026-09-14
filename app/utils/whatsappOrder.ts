// app/utils/whatsappOrder.ts
import { products } from "../data";

type BuyerInfo = {
  name: string;
  phone: string;
  address: string;
  pincode?: string;
  email?: string;
  notes?: string;
};

export function buildWhatsAppOrderLink(
  bagIds: Set<string>,
  quantities: Record<string, number>,
  buyer: BuyerInfo
): string {
  const sellerNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  const bagItems = products.filter((p) => bagIds.has(p.id));

  let subtotal = 0;
  const itemLines = bagItems
    .map((p, i) => {
      const qty = quantities[p.id] || 1;
      const line = p.price * qty;
      subtotal += line;
      return `${i + 1}. ${p.name} (${p.type})\n   Qty: ${qty} × ₹${p.price.toLocaleString(
        "en-IN"
      )} = ₹${line.toLocaleString("en-IN")}`;
    })
    .join("\n\n");

  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal + shipping;

  const message = [
    `*New Order — Vipswapan*`,
    ``,
    `*Buyer Details*`,
    `Name: ${buyer.name}`,
    `Phone: ${buyer.phone}`,
    `Address: ${buyer.address}`,
    buyer.pincode ? `Pincode: ${buyer.pincode}` : "",
    buyer.email ? `Email: ${buyer.email}` : "",
    buyer.notes ? `Notes: ${buyer.notes}` : "",
    ``,
    `*Items (${bagItems.length})*`,
    itemLines,
    ``,
    `Subtotal: ₹${subtotal.toLocaleString("en-IN")}`,
    `Shipping: ${shipping === 0 ? "Free" : `₹${shipping}`}`,
    `*Total: ₹${total.toLocaleString("en-IN")}*`,
  ]
    .filter(Boolean)
    .join("\n");

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${sellerNumber}?text=${encoded}`;
}