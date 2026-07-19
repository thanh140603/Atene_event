import type { Brand } from '../../types';

function BrandCard({ brand }: { brand: Brand }) {
  const count = brand.tokupacks?.length ?? 0;
  return (
    <div className="group flex flex-col">
      {/* Image / placeholder */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-300">
        {brand.imageUrl ? (
          <img
            src={brand.imageUrl}
            alt={brand.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-lg font-semibold tracking-wide text-neutral-500">
              {brand.name}
            </span>
          </div>
        )}
      </div>

      <h3 className="mt-3 text-sm font-bold text-neutral-900">{brand.name}</h3>
      <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">
        {brand.tagline}
      </p>

      <div className="mt-2 flex items-center justify-between">
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-medium text-neutral-600">
          {count} Tokupack Set{count === 1 ? '' : 's'} Available
        </span>
        <a
          href="#/tokupack"
          className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-3 py-1 text-[10px] font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
        >
          View →
        </a>
      </div>
    </div>
  );
}

export default function ParticipatingBrands({ brands }: { brands: Brand[] }) {
  return (
    <section id="brands" className="bg-white">
      <div className="section-container py-20 sm:py-24">
        <h2 className="section-heading">Participating Brands</h2>
        <div className="heading-rule" />

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-neutral-600">
          Discover detailed information and the unique selling points of each
          brand’s Tokupack below.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
