import { NextRequest, NextResponse } from "next/server";
import { getObjects } from "@/lib/objects";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const limit = Number(searchParams.get("limit") ?? "0") || undefined;

  const objects = await getObjects({ type, query: q, limit });
  return NextResponse.json({ objects });
}

export async function POST(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({ error: "Supabase is not configured. Submissions are disabled in demo mode." }, { status: 503 });
  }

  const payload = await request.json();
  const supabase = createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("objects")
    .insert({ ...payload, submitted_by: userData.user.id, verification_status: "submitted" })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ object: data }, { status: 201 });
}
