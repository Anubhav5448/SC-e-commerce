import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryRail from "./components/CategoryRail";
import FestiveBanner from "./components/FestiveBanner";
import SizeShop from "./components/SizeShop";
import Bestsellers from "./components/Bestsellers";
import Footer from "./components/Footer";
import BannerRail from "./components/BannerRail";
import { banners } from "./data";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <BannerRail banners={banners} />
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
