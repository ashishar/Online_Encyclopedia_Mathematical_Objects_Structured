import { NextRequest, NextResponse } from "next/server";
import { getObjectByCode } from "@/lib/objects";
import { enrichObject } from "@/lib/enrichment";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET(_: NextRequest, { params }: { params: { object_code: string } }) {
  const object = await getObjectByCode(params.object_code);
  if (!object) return NextResponse.json({ error: "Object not found" }, { status: 404 });
  return NextResponse.json({ object: enrichObject(object) });
}

export async function PATCH(request: NextRequest, { params }: { params: { object_code: string } }) {
  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Service role key is not configured." }, { status: 503 });
  }

  const payload = await request.json();
  const { data, error } = await admin
    .from("objects")
    .update(payload)
    .eq("object_code", params.object_code.toUpperCase())
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ object: data });
}
