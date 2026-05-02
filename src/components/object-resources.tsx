import type { MathObject } from "@/lib/types";
import { SourceIcon } from "@/components/source-icon";
import { getObjectResourceGroups } from "@/lib/resource-links";

export function ObjectResources({ object }: { object: MathObject }) {
  const groups = getObjectResourceGroups(object);

  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">Citations and resources</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <article key={group.title} className="rounded-lg border border-line bg-paper p-4">
            <h3 className="font-black text-ink">{group.title}</h3>
            <ul className="mt-3 grid gap-2">
              {group.items.map((item) => (
                <li key={`${group.title}-${item.label}`}>
                  {item.url ? (
                    <a href={item.url} className="text-sm font-bold leading-6 text-ocean hover:underline">
                      <SourceIcon url={item.url} />
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm font-bold leading-6 text-muted">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
