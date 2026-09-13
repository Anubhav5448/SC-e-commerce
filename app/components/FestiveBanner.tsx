import Reveal from "./Reveal";

const BG_IMAGE = "/images/festive-bg.jpg";

export default function FestiveBanner() {
  return (
    <section id="festive" className="px-5 py-6 sm:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-maroon-deep px-8 py-16 text-center sm:py-20">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_IMAGE}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* Darkening overlay so text stays readable */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-maroon-deep/80 via-maroon-deep/60 to-maroon-deep/85"
        />

        <PaisleyField />

        <p className="relative text-[13.5px] text-gold-soft">Puja season, 2026</p>
        <h2 className="relative mx-auto mt-4 max-w-xl font-display text-[34px] italic leading-tight text-ivory sm:text-[42px]">
          Dress for the mornings you&apos;ll photograph for years
        </h2>
        <a
          href="/Sarees"
          className="relative mt-8 inline-block rounded-full bg-ivory px-8 py-3.5 text-[14.5px] font-medium text-maroon-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft"
        >
          Shop the festive edit
        </a>
      </Reveal>
    </section>
  );
}

function PaisleyField() {
  const paisleys = Array.from({ length: 10 });
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 300"
      aria-hidden
    >
      {paisleys.map((_, i) => (
        <path
          key={i}
          transform={`translate(${(i % 5) * 170 + 20} ${Math.floor(i / 5) * 170 + 10}) rotate(${(i * 37) % 360} 30 30)`}
          d="M30 0 C50 0 60 18 50 34 C42 46 44 58 58 58 C44 70 22 66 14 52 C4 36 10 12 30 0 Z"
          fill="#e7c988"
        />
      ))}
    </svg>
  );
}