import { NextRequest, NextResponse } from "next/server";
import { getObjectByCode } from "@/lib/objects";

export async function GET(_: NextRequest, { params }: { params: { object_code: string } }) {
  const object = await getObjectByCode(params.object_code);
  if (!object) return NextResponse.json({ error: "Object not found" }, { status: 404 });
  return NextResponse.json(object);
}
