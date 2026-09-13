import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryGrid from "../components/CategoryGrid";
import { productsByCategory } from "../data";

export const metadata = {
  title: "Sarees — Rivaayat",
};

export default function SareesPage() {
  return (
    <>
      <div className="relative h-24 bg-ink">
        <Header />
      </div>
      <main>
        <CategoryGrid
          title="Sarees"
          subtitle="Handworked silks, chiffons and organzas — woven across India."
          items={productsByCategory.Sarees}
        />
      </main>
      <Footer />
    </>
  );
}