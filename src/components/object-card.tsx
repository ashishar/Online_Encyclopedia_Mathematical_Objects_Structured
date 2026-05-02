import Link from "next/link";
import type { MathObject } from "@/lib/types";
import { MathText } from "@/components/math-text";

export function ObjectCard({ object }: { object: MathObject }) {
  return (
    <article className="group rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ocean">{object.type}</p>
          <h3 className="mt-2 text-lg font-bold text-ink">
            <Link href={`/o/${object.object_code}`} className="group-hover:text-ocean">
              {object.name}
            </Link>
          </h3>
        </div>
        <span className="rounded-md border border-line bg-paper px-2 py-1 text-xs font-bold text-muted">
          {object.verification_status}
        </span>
      </div>
      <div className="mt-3 text-sm text-muted">
        <MathText value={object.notation} />
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{object.importance_note}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {object.properties.slice(0, 3).map((property) => (
          <span key={property} className="rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-muted">
            {property}
          </span>
        ))}
      </div>
    </article>
  );
}
