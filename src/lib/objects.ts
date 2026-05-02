import { seedObjects } from "@/lib/seed-data";
import { hasSupabaseEnv, createSupabaseServerClient } from "@/lib/supabase/server";
import type { MathObject, ObjectType } from "@/lib/types";

export async function getObjects(params?: {
  type?: ObjectType;
  query?: string;
  status?: string;
  limit?: number;
}) {
  if (!hasSupabaseEnv()) {
    return searchLocal(params);
  }

  const supabase = createSupabaseServerClient();
  let query = supabase.from("objects").select("*").order("name", { ascending: true });

  if (params?.type) query = query.eq("type", params.type);
  if (params?.status) query = query.eq("verification_status", params.status);
  if (params?.query) {
    const term = params.query.replaceAll("%", "").replaceAll(",", " ");
    query = query.textSearch("search_vector", term, { type: "websearch" });
  }
  if (params?.limit) query = query.limit(params.limit);

  const { data, error } = await query;
  if (error) {
    console.error(error);
    return searchLocal(params);
  }

  return data as MathObject[];
}

export async function getObjectByCode(objectCode: string) {
  const normalized = objectCode.toUpperCase();

  if (!hasSupabaseEnv()) {
    return seedObjects.find((object) => object.object_code === normalized) ?? null;
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("objects")
    .select("*")
    .eq("object_code", normalized)
    .maybeSingle();

  if (error) {
    console.error(error);
    return seedObjects.find((object) => object.object_code === normalized) ?? null;
  }

  return data as MathObject | null;
}

function searchLocal(params?: { type?: ObjectType; query?: string; status?: string; limit?: number }) {
  const q = params?.query?.trim().toLowerCase();
  const results = seedObjects.filter((object) => {
    const typeMatch = !params?.type || object.type === params.type;
    const statusMatch = !params?.status || object.verification_status === params.status;
    const queryMatch =
      !q ||
      [
        object.object_code,
        object.name,
        object.notation,
        object.type,
        object.definition,
        object.importance_note,
        ...object.aliases,
        ...object.properties,
        ...object.relations,
        ...object.examples
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);

    return typeMatch && statusMatch && queryMatch;
  });

  return results.slice(0, params?.limit ?? results.length);
}
