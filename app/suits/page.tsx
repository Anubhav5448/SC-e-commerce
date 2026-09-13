import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryGrid from "../components/CategoryGrid";
import { productsByCategory } from "../data";

export const metadata = {
  title: "Suit Sets — Rivaayat",
};

export default function SuitsPage() {
  return (
    <>
      <div className="relative h-24 bg-ink">
        <Header />
      </div>
      <main>
        <CategoryGrid
          title="Suit Sets"
          subtitle="Anarkalis, straight kurtas and festive sets — crafted for every occasion."
          items={productsByCategory.Suits}
        />
      </main>
      <Footer />
    </>
  );
}