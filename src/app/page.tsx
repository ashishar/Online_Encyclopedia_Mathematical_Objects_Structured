import Link from "next/link";
import Image from "next/image";
import { ObjectCard } from "@/components/object-card";
import { SearchBox } from "@/components/search-box";
import { getObjects } from "@/lib/objects";
import { OBJECT_TYPES, typeToSlug } from "@/lib/types";

export default async function HomePage() {
  const featured = await getObjects({ limit: 9 });

  return (
    <main>
      <section className="mx-auto grid max-w-[1660px] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_700px] lg:px-8 xl:grid-cols-[minmax(0,0.8fr)_780px]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">Online encyclopedia</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.96] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            Online Encyclopedia of Mathematical Objects
          </h1>
          <p className="mt-3 text-2xl font-black text-ocean">Indexed by structure.</p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
            OEMO is an object-first reference for finite groups, graphs, matrices, functions,
            transforms, algorithms, probability objects, optimization primitives, and geometric spaces.
          </p>
          <div className="mx-auto mt-8 max-w-3xl">
            <SearchBox />
          </div>
        </div>

        <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-panel">
          <Image
            src="/structure-map.svg"
            alt="Network diagram connecting major mathematical object families"
            width={1560}
            height={936}
            className="h-auto w-full"
            priority
          />
          <figcaption className="border-t border-line bg-paper px-6 py-5 text-lg font-bold leading-7 text-ink">
            OEMO structure map: objects are connected by invariants, relations, algorithms, and applications.
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-line bg-white p-6 shadow-panel">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">Browse the atlas</p>
              <h2 className="mt-1 text-3xl font-black text-ink">Object families</h2>
            </div>
            <Link href="/search" className="rounded-md bg-ink px-3 py-2 text-sm font-bold text-white">Open search</Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {OBJECT_TYPES.map((type) => (
              <Link
                key={type}
                href={`/browse/${typeToSlug(type)}`}
                className="rounded-md border border-line bg-paper px-3 py-2 text-sm font-bold text-muted hover:border-ocean hover:text-ocean"
              >
                {type}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white/70 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["Object-first", "Every entry has a canonical object code, notation, definition, properties, relations, examples, code, references, and verification status."],
            ["Computable", "Copyable snippets for SageMath, GAP, Python, and numerical libraries sit beside the mathematical definition."],
            ["Cross-linked", "Relations are first-class: objects can point to transforms, distributions, matrices, groups, graphs, and algorithms."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-line bg-white p-6">
              <h2 className="text-xl font-black text-ink">{title}</h2>
              <p className="mt-3 leading-7 text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">Recent corpus</p>
            <h2 className="mt-2 text-3xl font-black text-ink">Featured objects</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">
              Featured objects are selected to show breadth across algebra, graph theory, analysis, computation,
              probability, optimization, quantum information, machine learning, and topology.
            </p>
          </div>
          <Link href="/api/objects" className="hidden rounded-md border border-line bg-white px-4 py-2 text-sm font-bold text-muted hover:text-ink sm:block">
            JSON API
          </Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((object) => <ObjectCard key={object.object_code} object={object} />)}
        </div>
      </section>

    </main>
  );
}
