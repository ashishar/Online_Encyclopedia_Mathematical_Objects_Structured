import { createClient } from "@supabase/supabase-js";
import { seedObjects } from "../src/lib/seed-data";
import { enrichObject } from "../src/lib/enrichment";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRole) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running npm run db:seed.");
  process.exit(1);
}

const supabase = createClient(url, serviceRole, {
  auth: { persistSession: false }
});

async function main() {
  const payload = seedObjects.map((object) => ({
    ...enrichObject(object),
    object_code: object.object_code.toUpperCase()
  }));

  const { error } = await supabase.from("objects").upsert(payload, {
    onConflict: "object_code"
  });

  if (error) throw error;
  console.log(`Seeded ${payload.length} OEMO objects.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
