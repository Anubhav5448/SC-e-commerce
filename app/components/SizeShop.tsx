import Link from "next/link";
import { sizes } from "../data";
import Reveal from "./Reveal";

export default function SizeShop() {
  return (
    <section id="sizes" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal>
        <h2 className="mb-2 font-display text-[28px] text-ink">Shop suit sets by size</h2>
        <p className="mb-8 max-w-md text-[14.5px] text-ink/60">
          Every style from S to 3XL, cut from the same block — no shrinking the
          print to fit the size.
        </p>
      </Reveal>

      <div className="rail -mx-5 flex gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-6 sm:gap-5 sm:overflow-visible sm:px-0">
        {sizes.map((s, i) => (
          <Reveal key={s.size} delay={i * 60} className="w-[120px] shrink-0 sm:w-auto">
            <Link href="/suits" className="group block">
              <div
                className="flex h-[130px] w-[120px] items-center justify-center rounded-2xl border border-ink/10 text-[26px] font-display text-ivory shadow-sm transition-transform duration-500 ease-out group-hover:-translate-y-1.5 sm:w-full"
                style={{ background: s.swatch }}
              >
                {s.size}
              </div>
              <div className="mt-2.5 text-center text-[13px] text-ink/70">
                Shop {s.size}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
