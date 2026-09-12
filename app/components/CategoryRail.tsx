import Link from "next/link";
import { categories, imgSrc } from "../data";
import Reveal from "./Reveal";

export default function CategoryRail() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <Reveal className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-[28px] text-ink">Shop by category</h2>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 90}>
            <Link href={`/${c.slug}`} className="group block">
              <div
                className="relative flex aspect-[16/10] items-end overflow-hidden rounded-[28px] shadow-[0_10px_24px_rgba(34,19,16,0.14)]"
                style={{
                  background: `linear-gradient(155deg, ${c.swatch[0]}, ${c.swatch[1]})`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc(c.image)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                <div className="relative z-10 flex w-full items-end justify-between p-6 text-ivory sm:p-8">
                  <div>
                    <h3 className="font-display text-[26px] leading-tight sm:text-[32px]">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-ivory/75">{c.count}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-2.5 text-[13px] font-medium text-ink transition-transform duration-300 group-hover:-translate-y-1">
                    Shop
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}