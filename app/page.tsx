import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryRail from "./components/CategoryRail";
import FestiveBanner from "./components/FestiveBanner";
import SizeShop from "./components/SizeShop";
import Bestsellers from "./components/Bestsellers";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <CategoryRail /> */}
        <FestiveBanner />
        {/* <SizeShop /> */}
        <Bestsellers />
      </main>
      <Footer />
    </>
  );
}
