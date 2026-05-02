import Link from "next/link";
import { getObjects } from "@/lib/objects";
import { hasSupabaseEnv } from "@/lib/supabase/server";

export default async function AdminPage() {
  const objects = await getObjects({ limit: 12 });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">Admin</p>
      <h1 className="mt-3 text-4xl font-black text-ink">Review queue</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        This MVP expects Supabase Auth plus the `profiles.role = admin` RLS policy from the schema.
        {hasSupabaseEnv() ? " Supabase is configured for this runtime." : " Supabase is not configured, so this page is showing bundled demo data."}
      </p>

      <section className="mt-8 rounded-lg border border-line bg-white shadow-panel">
        <div className="border-b border-line px-5 py-4">
          <h2 className="text-lg font-black text-ink">Object records</h2>
        </div>
        <div className="divide-y divide-line">
          {objects.length ? objects.map((object) => (
            <div key={object.object_code} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div>
                <Link href={`/o/${object.object_code}`} className="font-black text-ink hover:text-ocean">{object.name}</Link>
                <p className="mt-1 text-sm font-semibold text-muted">{object.object_code} - {object.type}</p>
              </div>
              <Link href={`/api/objects/${object.object_code}`} className="rounded-md bg-paper px-3 py-2 text-sm font-black text-muted hover:text-ocean">JSON</Link>
            </div>
          )) : (
            <p className="px-5 py-6 text-muted">No objects found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
