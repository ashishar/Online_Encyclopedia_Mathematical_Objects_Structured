import { BlockMath } from "react-katex";
import type { OEMOObject, OEMOLink, OEMOVisual } from "@/lib/objects";

const basePath = "/Online_Encyclopedia_Mathematical_Objects_Structured";

export function ObjectPage({ object }: { object: OEMOObject }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <article className="overflow-hidden rounded-lg border border-line bg-white shadow-panel">
        <header className="border-b border-line bg-paper px-6 py-7">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">{object.object_code}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-ink">{object.name}</h1>
          <div className="mt-4 flex flex-wrap gap-2 text-sm font-bold">
            <span className="rounded-md border border-line bg-white px-3 py-1.5 text-ink">{object.type}</span>
            {object.notation.map((notation) => (
              <span key={notation} className="rounded-md border border-line bg-white px-3 py-1.5 text-ocean">
                {notation}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {object.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-white px-2.5 py-1 text-xs font-bold text-muted">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-8 px-6 py-7">
          <TextBlock body={object.definition} />

          <div className="grid gap-4">
            {object.defining_equations.map((equation) => (
              <div key={equation.latex}>
                <div className="overflow-x-auto">
                  <BlockMath math={equation.latex} />
                </div>
                <p className="leading-7 text-muted">{equation.explanation}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4">
            {object.visuals.map((visual) => (
              <VisualCard key={`${visual.type}-${visual.caption}`} visual={visual} />
            ))}
          </div>

          <TextBlock body={object.origin_history} />
          <TextBlock body={object.importance} />
          <TextBlock body={object.research_trends} />
          <TextBlock body={object.intuition} />
          <TextBlock body={object.minimal_example} />

          <div className="overflow-hidden rounded-lg border border-line">
            <div className="bg-paper px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-muted">
              {object.code_snippet.language}
            </div>
            <pre className="overflow-x-auto bg-ink p-5 text-sm leading-6 text-white">
              <code>{object.code_snippet.code}</code>
            </pre>
          </div>

          <section>
            <SectionTitle>Connections</SectionTitle>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 leading-8">
              {object.connections.map((connection, index) => (
                <div key={`${connection.to}-${connection.type}`} className="flex items-center gap-3">
                  {index > 0 ? <span className="font-black text-ocean" aria-hidden="true">-&gt;</span> : null}
                  <span className="font-black text-ink">{connection.to}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
                    {connection.type.replaceAll("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <PillList items={object.variants} />
          <PillList items={object.core_properties} />
          <LinkSection title="Citations" items={object.citations} />
          <LinkSection title="Resources" items={object.resources} />
        </div>
      </article>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink">{children}</h2>;
}

function TextBlock({ body }: { body: string }) {
  const paragraphs = body.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);

  return (
    <div className="grid gap-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="leading-8 text-muted">{paragraph}</p>
      ))}
    </div>
  );
}

function VisualCard({ visual }: { visual: OEMOVisual }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-paper">
      {visual.image_url ? (
        <img src={assetPath(visual.image_url)} alt={visual.caption} width={1200} height={720} className="h-auto w-full bg-white" />
      ) : (
        <div className="grid min-h-72 place-items-center bg-white p-6">
          <div className="w-full max-w-2xl rounded-lg border border-dashed border-ocean/50 bg-paper p-6 text-center">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">{visual.type.replaceAll("_", " ")}</p>
            <p className="mt-4 text-lg font-black leading-7 text-ink">{visual.caption}</p>
            <p className="mt-4 leading-7 text-muted">{visual.description}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {visual.query.map((term) => (
                <span key={term} className="rounded-md border border-line bg-white px-2.5 py-1 text-xs font-bold text-muted">
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <figcaption className="border-t border-line px-4 py-3 text-sm font-bold text-muted">{visual.description}</figcaption>
    </figure>
  );
}

function assetPath(src: string) {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith(basePath)) return src;
  return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
}

function PillList({ items }: { items: string[] }) {
  return (
    <div>
      <ul className="grid gap-2 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-line bg-paper px-3 py-2 text-sm font-semibold text-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LinkSection({ title, items }: { title: string; items: OEMOLink[] }) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => (
          <li key={`${title}-${item.title}`} className="flex flex-wrap items-center gap-2 text-sm leading-7">
            <span aria-hidden="true" className="inline-flex min-w-8 justify-center font-black text-ocean">
              {sourceIcon(item)}
            </span>
            {item.url ? (
              <a href={item.url} className="font-bold text-ink hover:text-ocean hover:underline">
                {item.title}
              </a>
            ) : (
              <span className="font-bold text-ink">{item.title}</span>
            )}
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{item.type}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function sourceIcon(item: OEMOLink) {
  const haystack = `${item.type} ${item.title} ${item.url ?? ""}`.toLowerCase();
  if (haystack.includes("youtube") || haystack.includes("video")) return "YT";
  if (haystack.includes("github") || haystack.includes("code")) return "GH";
  if (haystack.includes("arxiv")) return "arXiv";
  if (haystack.includes("book")) return "BK";
  if (haystack.includes("wikipedia") || haystack.includes("mathworld") || haystack.includes("web")) return "WEB";
  if (haystack.includes("paper")) return "PDF";
  return "REF";
}
