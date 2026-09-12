import { notFound } from "next/navigation";
import { products } from "../../data";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductDetail from "../../components/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  return (
    <>
      <div className="relative h-24 bg-ink">
        <Header />
      </div>
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}