import { NextRequest, NextResponse } from "next/server";
import { getObjects } from "@/lib/objects";
import { enrichObject } from "@/lib/enrichment";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const limit = Number(searchParams.get("limit") ?? "50") || 50;
  const objects = (await getObjects({ query: q, limit })).map(enrichObject);

  return NextResponse.json({
    query: q ?? "",
    count: objects.length,
    objects
  });
}
