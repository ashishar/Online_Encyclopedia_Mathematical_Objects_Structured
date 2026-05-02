import { NextResponse } from "next/server";
import { getObjects } from "@/lib/objects";

export async function GET() {
  const objects = await getObjects();

  return NextResponse.json({
    query: "",
    count: objects.length,
    objects
  });
}
