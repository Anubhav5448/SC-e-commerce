

/** Two real categories. `image` is a representative product photo used
 *  as the tile background on the category rail. */
export type Category = {
  name: string;
  slug: "Sarees" | "Suits";
  count: string;
  swatch: [string, string];
  image: string;
};

export const categories: Category[] = [
  {
    name: "Sarees",
    slug: "Sarees",
    count: "10 pieces",
    swatch: ["#8a2246", "#c69340"],
    image: "/Sarees/Banarasi Silk Saree/1.webp",
  },
  {
    name: "Suit Sets",
    slug: "Suits",
    count: "10 pieces",
    swatch: ["#1f4a44", "#c69340"],
    image: "/Suits/Embroidered Anarkali Suit/1.jpg",
  },
];

export type Size = "S" | "M" | "L" | "XL" | "XXL" | "3XL";

export const sizes: { size: Size; swatch: string }[] = [
  { size: "S", swatch: "#3f6e73" },
  { size: "M", swatch: "#c69340" },
  { size: "L", swatch: "#8a2246" },
  { size: "XL", swatch: "#6e2140" },
  { size: "XXL", swatch: "#4a1329" },
  { size: "3XL", swatch: "#5a7a3e" },
];

export type Product = {
  id: string;
  name: string;
  type: string;
  category: "Sarees" | "Suits";
  image: string;
  price: number;
  mrp: number;
  rating: number;
  swatch: [string, string];
  tag?: string;
  /** true = show in homepage Bestsellers rail */
  featured?: boolean;
};

/** URL-encode each path segment so spaces become %20 */
export function imgSrc(path: string) {
  return path
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

export const products: Product[] = [
  /* ----------------------------- SAREES ----------------------------- */
  {
    id: "p1",
    name: "Banarasi Silk Saree",
    type: "Saree · Banarasi silk",
    category: "Sarees",
    image: "/Sarees/Banarasi Silk Saree/1.webp",
    price: 4792,
    mrp: 6490,
    rating: 4.8,
    swatch: ["#7a1f3d", "#c69340"],
    tag: "3 @ 30% off",
    featured: true,
  },
  {
    id: "p2",
    name: "Kanjivaram Silk Saree",
    type: "Saree · Kanjivaram silk",
    category: "Sarees",
    image: "/Sarees/Kanjivaram Silk Saree/1.webp",
    price: 5992,
    mrp: 7990,
    rating: 4.9,
    swatch: ["#4a1329", "#e7c988"],
    tag: "Heirloom weave",
    featured: true,
  },
  {
    id: "p3",
    name: "Chanderi Silk Saree",
    type: "Saree · Chanderi silk",
    category: "Sarees",
    image: "/Sarees/Chanderi Silk Saree/1.webp",
    price: 2392,
    mrp: 2990,
    rating: 4.7,
    swatch: ["#d8c49a", "#8a6a3f"],
    tag: "3 @ 30% off",
    featured: true,
  },
  {
    id: "p4",
    name: "Organza Embroidered Saree",
    type: "Saree · Organza · Hand embroidery",
    category: "Sarees",
    image: "/Sarees/Organza Embroidered Saree/1.jpg",
    price: 3592,
    mrp: 4490,
    rating: 4.6,
    swatch: ["#efe6f2", "#b79bc4"],
    tag: "New",
  },
  {
    id: "p5",
    name: "Georgette Sequin Saree",
    type: "Saree · Georgette · Sequinned",
    category: "Sarees",
    image: "/Sarees/Georgette Sequin Saree/1.jpg",
    price: 3192,
    mrp: 3990,
    rating: 4.5,
    swatch: ["#141110", "#c69340"],
    tag: "Party edit",
  },
  {
    id: "p6",
    name: "Linen Cotton Saree",
    type: "Saree · Linen cotton",
    category: "Sarees",
    image: "/Sarees/Linen Cotton Saree/1.webp",
    price: 1592,
    mrp: 1990,
    rating: 4.4,
    swatch: ["#3f6e73", "#9fb98c"],
    tag: "Everyday",
  },
  {
    id: "p7",
    name: "Bandhani Silk Saree",
    type: "Saree · Bandhani silk",
    category: "Sarees",
    image: "/Sarees/Bandhani Silk Saree/1.webp",
    price: 2792,
    mrp: 3490,
    rating: 4.7,
    swatch: ["#c14f5e", "#e7c988"],
    tag: "Festive",
  },
  {
    id: "p8",
    name: "Paithani Silk Saree",
    type: "Saree · Paithani silk",
    category: "Sarees",
    image: "/Sarees/Paithani Silk Saree/1.webp",
    price: 6392,
    mrp: 8490,
    rating: 5.0,
    swatch: ["#6e2140", "#e7c988"],
    tag: "Heirloom weave",
  },
  {
    id: "p9",
    name: "Floral Printed Chiffon Saree",
    type: "Saree · Chiffon · Floral print",
    category: "Sarees",
    image: "/Sarees/Floral Printed Chiffon Saree/1.webp",
    price: 1392,
    mrp: 1890,
    rating: 4.3,
    swatch: ["#f2b6c4", "#c14f5e"],
    tag: "New",
  },
  {
    id: "p10",
    name: "Tissue Silk Saree",
    type: "Saree · Tissue silk",
    category: "Sarees",
    image: "/Sarees/Tissue Silk Saree/1.jpg",
    price: 4192,
    mrp: 5290,
    rating: 4.8,
    swatch: ["#e7c988", "#c69340"],
    tag: "Occasion",
  },

  /* ------------------------------ SUITS ------------------------------ */
  {
    id: "p11",
    name: "Embroidered Anarkali Suit",
    type: "Suit set · Anarkali · Embroidered",
    category: "Suits",
    image: "/Suits/Embroidered Anarkali Suit/1.jpg",
    price: 3892,
    mrp: 4990,
    rating: 4.8,
    swatch: ["#8a2246", "#e7c988"],
    tag: "Festive",
    featured: true,
  },
  {
    id: "p12",
    name: "Chikankari Anarkali Suit",
    type: "Suit set · Chikankari",
    category: "Suits",
    image: "/Suits/Chikankari Anarkali Suit/1.webp",
    price: 3292,
    mrp: 4290,
    rating: 4.7,
    swatch: ["#f2e9d8", "#d8c49a"],
    tag: "Handworked",
    featured: true,
  },
  {
    id: "p13",
    name: "Punjabi Patiala Suit",
    type: "Suit set · Patiala",
    category: "Suits",
    image: "/Suits/Punjabi Patiala Suit/1.webp",
    price: 2292,
    mrp: 2990,
    rating: 4.5,
    swatch: ["#c69340", "#8a2246"],
    tag: "2 @ 50% off",
  },
  {
    id: "p14",
    name: "Palazzo Suit Set",
    type: "Suit set · Palazzo",
    category: "Suits",
    image: "/Suits/Palazzo Suit Set/1.jpg",
    price: 2092,
    mrp: 2790,
    rating: 4.4,
    swatch: ["#3f6e73", "#9fb98c"],
    tag: "Everyday",
  },
  {
    id: "p15",
    name: "Straight Kurta Suit",
    type: "Suit set · Straight kurta",
    category: "Suits",
    image: "/Suits/Straight Kurta Suit/1.webp",
    price: 1892,
    mrp: 2490,
    rating: 4.6,
    swatch: ["#4a1329", "#8a2246"],
    tag: "Restocked",
    featured: true,
  },
  {
    id: "p16",
    name: "Organza Dupatta Suit",
    type: "Suit set · Organza dupatta",
    category: "Suits",
    image: "/Suits/Organza Dupatta Suit/1.webp",
    price: 2992,
    mrp: 3790,
    rating: 4.7,
    swatch: ["#efe6f2", "#b79bc4"],
    tag: "New",
  },
  {
    id: "p17",
    name: "Mirror Work Suit Set",
    type: "Suit set · Mirror work",
    category: "Suits",
    image: "/Suits/Mirror Work Suit Set/1.webp",
    price: 3492,
    mrp: 4490,
    rating: 4.6,
    swatch: ["#6e2140", "#e7c988"],
    tag: "Festive",
  },
  {
    id: "p18",
    name: "Festive Sharara Suit",
    type: "Suit set · Sharara",
    category: "Suits",
    image: "/Suits/Festive Sharara Suit/1.jpg",
    price: 3692,
    mrp: 4790,
    rating: 4.8,
    swatch: ["#c14f5e", "#f2b6c4"],
    tag: "Occasion",
  },
  {
    id: "p19",
    name: "Cotton Printed Suit",
    type: "Suit set · Cotton · Printed",
    category: "Suits",
    image: "/Suits/Cotton Printed Suit/1.jpg",
    price: 1492,
    mrp: 1990,
    rating: 4.3,
    swatch: ["#5a7a3e", "#9fb98c"],
    tag: "Everyday",
  },
  {
    id: "p20",
    name: "Designer Georgette Suit",
    type: "Suit set · Georgette",
    category: "Suits",
    image: "/Suits/Designer Georgette Suit/1.jpg",
    price: 2692,
    mrp: 3490,
    rating: 4.5,
    swatch: ["#141110", "#6e2140"],
    tag: "Designer",
  },
];

/** Curated 8 for the homepage Bestsellers rail */
export const featuredProducts = products.filter((p) => p.featured);

/** Convenience lookups */
export const productsByCategory = {
  Sarees: products.filter((p) => p.category === "Sarees"),
  Suits: products.filter((p) => p.category === "Suits"),
};

export const getProduct = (id: string) => products.find((p) => p.id === id);