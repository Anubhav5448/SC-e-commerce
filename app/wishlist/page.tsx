// app/wishlist/page.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import Wishlist from "../components/Wishlist";

export default function WishlistPage() {
  return (
    <>
      <div className="relative h-24 bg-ink">
        <Header />
      </div>
      <main>
        <Wishlist />
      </main>
      <Footer />
    </>
  );
}