import { notFound } from "next/navigation";
import { MathText } from "@/components/math-text";
import { RichText } from "@/components/rich-text";
import { BackButton } from "@/components/back-button";
import { ObjectResources } from "@/components/object-resources";
import { ObjectSchematic } from "@/components/object-schematic";
import { ShareButton } from "@/components/share-button";
import { getObjectByCode } from "@/lib/objects";
import { enrichObject } from "@/lib/enrichment";

export default async function ObjectPage({ params }: { params: { object_code: string } }) {
  const baseObject = await getObjectByCode(params.object_code);
  if (!baseObject) notFound();
  const object = enrichObject(baseObject);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <BackButton />
      <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr]">
        <article className="rounded-lg border border-line bg-white p-6 shadow-panel">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">{object.object_code}</p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-ink">{object.name}</h1>
              <p className="mt-3 text-lg text-muted">
                <MathText value={object.notation} />
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ShareButton title={object.name} />
              <span className="rounded-md bg-paper px-3 py-2 text-sm font-black text-ocean">{object.verification_status}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-6">
            <Section title="Definition"><RichText value={object.definition} /></Section>
            <ObjectSchematic object={object} />
            <Section title="Why It Matters">{object.importance_note}</Section>
            <Section title="Origin, Inventor, And Context">{object.origin_story}</Section>
            <ListSection title="Used Mostly In" items={object.primary_uses} />
            <Section title="Development Since Origin">{object.historical_development}</Section>
            <Section title="Latest Research Trends">{object.current_research_trends}</Section>
            <ListSection title="Properties" items={object.properties} />
            <ListSection title="Relations" items={object.relations} />
            <ListSection title="Examples" items={object.examples} rich />
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink">Code Examples</h2>
              <div className="mt-3 grid gap-3">
                {object.code_examples.map((example) => (
                  <div key={`${example.language}-${example.code}`} className="overflow-hidden rounded-lg border border-line">
                    <div className="bg-paper px-3 py-2 text-xs font-black text-muted">{example.language}</div>
                    <pre className="overflow-x-auto bg-ink p-4 text-sm text-white"><code>{example.code}</code></pre>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink">References</h2>
              <ul className="mt-3 grid gap-2">
                {object.references.map((reference) => (
                  <li key={reference.label} className="text-muted">
                    {reference.url ? (
                      <a href={reference.url} className="font-bold text-ocean hover:underline">{reference.label}</a>
                    ) : (
                      <span className="font-bold text-ink">{reference.label}</span>
                    )}
                    {reference.note ? <span> - {reference.note}</span> : null}
                  </li>
                ))}
                {object.trend_references.map((reference) => (
                  <li key={reference.label} className="text-muted">
                    {reference.url ? (
                      <a href={reference.url} className="font-bold text-ocean hover:underline">{reference.label}</a>
                    ) : (
                      <span className="font-bold text-ink">{reference.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
            <ObjectResources object={object} />
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-lg border border-line bg-white p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink">Metadata</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="font-bold text-muted">Type</dt>
                <dd className="text-ink">{object.type}</dd>
              </div>
              <div>
                <dt className="font-bold text-muted">Aliases</dt>
                <dd className="text-ink">{object.aliases.join(", ") || "None recorded"}</dd>
              </div>
              <div>
                <dt className="font-bold text-muted">Verification</dt>
                <dd className="text-ink">{object.verification_status}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-lg border border-line bg-white p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink">API</h2>
            <a href={`/api/objects/${object.object_code}`} className="mt-3 block rounded-md bg-ink px-3 py-2 text-center text-sm font-bold text-white">
              Open JSON
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink">{title}</h2>
      <div className="mt-3 leading-8 text-muted">{children}</div>
    </section>
  );
}

function ListSection({ title, items, rich = false }: { title: string; items: string[]; rich?: boolean }) {
  return (
    <section>
      <h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink">{title}</h2>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-line bg-paper px-3 py-2 text-sm font-semibold text-muted">
            {rich ? <RichText value={item} /> : item}
          </li>
        ))}
      </ul>
    </section>
  );
}
