import type { ObjectType, Reference } from "@/lib/types";
import { SourceIcon } from "@/components/source-icon";
import { getTypeResourceGroups } from "@/lib/resource-links";

export function TopicReferenceSection({ type }: { type: ObjectType }) {
  const groups = getTypeResourceGroups(type);

  return (
    <section className="mt-10 rounded-lg border border-line bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">Topic references</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {groups.map((group) => (
          <ReferenceList key={group.title} title={group.title} items={group.items} />
        ))}
      </div>
    </section>
  );
}

function ReferenceList({ title, items }: { title: string; items: Reference[] }) {
  return (
    <article className="rounded-lg border border-line bg-paper p-4">
      <h3 className="font-black text-ink">{title}</h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.url} className="text-sm font-bold leading-6 text-ocean hover:underline">
              <SourceIcon url={item.url ?? ""} />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
