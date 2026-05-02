import { ObjectCard } from "@/components/object-card";
import { SearchBox } from "@/components/search-box";
import { BackButton } from "@/components/back-button";
import { getObjects } from "@/lib/objects";

export default async function SearchPage() {
  const objects = await getObjects();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <BackButton />
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">Search</p>
        <h1 className="mt-3 text-4xl font-black text-ink">Find objects by name, code, property, relation, or notation.</h1>
      </div>
      <div className="mt-7 max-w-4xl">
        <SearchBox />
      </div>
      <div className="mt-8 flex items-center justify-between border-b border-line pb-4">
        <p className="text-sm font-bold text-muted">{objects.length} result{objects.length === 1 ? "" : "s"}</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {objects.map((object) => <ObjectCard key={object.object_code} object={object} />)}
      </div>
    </main>
  );
}
