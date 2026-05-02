import Link from "next/link";
import type { OEMOObject } from "@/lib/objects";
import { MathText } from "@/components/math-text";

export function ObjectCard({ object }: { object: OEMOObject }) {
  return (
    <article className="group rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-panel">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ocean">{object.type}</p>
        <h3 className="mt-2 text-lg font-bold text-ink">
          <Link href={`/o/${object.object_code}`} className="group-hover:text-ocean">
            {object.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs font-bold text-muted">{object.object_code}</p>
      </div>
      <div className="mt-3 text-sm text-muted">
        <MathText value={object.notation[0]} />
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{object.importance}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {object.core_properties.slice(0, 3).map((property) => (
          <span key={property} className="rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-muted">
            {property}
          </span>
        ))}
      </div>
    </article>
  );
}
