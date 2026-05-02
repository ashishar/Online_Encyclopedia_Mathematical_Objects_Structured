import { notFound } from "next/navigation";
import { BackButton } from "@/components/back-button";
import { ObjectCard } from "@/components/object-card";
import { TopicReferenceSection } from "@/components/topic-reference-section";
import { getObjects } from "@/lib/objects";
import { OBJECT_TYPES, slugToType, typeToSlug } from "@/lib/types";

export function generateStaticParams() {
  return OBJECT_TYPES.map((type) => ({ type: typeToSlug(type) }));
}

export default async function BrowseTypePage({ params }: { params: { type: string } }) {
  const type = slugToType(params.type);
  if (!type) notFound();

  const objects = await getObjects({ type });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <BackButton />
      <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">Browse</p>
      <h1 className="mt-3 text-4xl font-black text-ink">{type}</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        Canonical entries for {type.toLowerCase()}, including definitions, properties, relations,
        examples, code snippets, citations, and resources.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {objects.map((object) => <ObjectCard key={object.object_code} object={object} />)}
      </div>
      <TopicReferenceSection type={type} />
    </main>
  );
}
