// app/cart/page.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

export default function CartPage() {
  return (
    <>
      <div className="relative h-24 bg-ink">
        <Header />
      </div>
      <main>
        <Cart />
      </main>
      <Footer />
    </>
  );
}