import type { BrandContent } from '../../../data/brands';

export default function FeaturedCollabCta({ brand }: { brand: BrandContent }) {
  const collab = brand.collab;
  if (!collab) return null;

  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      {/* Background image or gradient fallback */}
      {collab.imageUrl ? (
        <img
          src={collab.imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, rgba(236,15,140,0.45) 0%, rgba(11,11,12,0) 55%), radial-gradient(circle at 80% 70%, rgba(176,106,179,0.4) 0%, rgba(11,11,12,0) 55%)',
          }}
        />
      )}

      <div className="section-container relative flex flex-col items-center py-24 text-center sm:py-32">
        <h2 className="mx-auto max-w-2xl text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {collab.heading}
        </h2>
        <a
          href={collab.ctaHref ?? '#reserve'}
          className="btn-pill mt-10 bg-brand px-8 py-4 text-base text-white shadow-lg shadow-brand/30 hover:opacity-90"
        >
          {collab.ctaLabel}
        </a>
      </div>
    </section>
  );
}
