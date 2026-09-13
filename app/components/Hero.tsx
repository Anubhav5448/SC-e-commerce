"use client";

type Panel = {
  cta: string;
  href: string;
  image: string;
  video: string;
};

const panels: Panel[] = [
  {
    cta: "Shop sarees",
    href: "/Sarees",
    image: "/images/saree.jpg",
    video: "/videos/saree-loop.mp4",
  },
  {
    cta: "Shop suits",
    href: "/suits",
    image: "/images/suit.jpg",
    video: "/videos/suit-loop.mp4",
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col md:flex-row">
      {panels.map((panel) => (
        <a
          key={panel.cta}
          href={panel.href}
          className="group relative flex min-h-[50vh] flex-1 items-end justify-center overflow-hidden pb-16 md:min-h-screen"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={panel.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* grayscale motion cover, fades in on hover */}
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-0 grayscale transition-opacity duration-700 ease-out group-hover:opacity-100"
            src={panel.video}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />

          <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-[14.5px] font-medium text-ink transition-transform duration-300 ease-out group-hover:-translate-y-1">
            {panel.cta}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>
      ))}
    </section>
  );
}
