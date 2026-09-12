"use client";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory/85">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 border-b border-ivory/12 pb-12 sm:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-[24px] italic text-ivory">Rivaayat</p>
            <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-ivory/55">
              Get first access to new drops and restocks. One email a week,
              nothing more.
            </p>
            <form
              className="mt-4 flex max-w-xs overflow-hidden rounded-full border border-ivory/25"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="w-full bg-transparent px-4 py-2.5 text-[13.5px] text-ivory placeholder:text-ivory/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-gold px-4 text-[13px] font-medium text-ink"
              >
                Join
              </button>
            </form>
          </div>
          <FooterCol
            title="Shop"
            items={["Sarees", "Suit Sets", "Sale"]}
          />
          <FooterCol
            title="Help"
            items={["Track order", "Returns & exchange", "Size guide", "Care guide", "Contact us"]}
          />
          <FooterCol
            title="Rivaayat"
            items={["Our story", "Weaving partners", "Store locator", "Careers"]}
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-[12.5px] text-ivory/45 sm:flex-row">
          <span>© 2026 Rivaayat Clothing Co.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-ivory">Privacy</a>
            <a href="#" className="hover:text-ivory">Terms</a>
            <a href="#" className="hover:text-ivory">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[13px] font-medium text-ivory">{title}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-[13.5px] text-ivory/55 transition-colors hover:text-ivory">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
