import { NextRequest, NextResponse } from "next/server";
import { getObjectByCode, getObjectCodes } from "@/lib/objects";

export function generateStaticParams() {
  return getObjectCodes().map((object_code) => ({ object_code }));
}

export async function GET(_: NextRequest, { params }: { params: { object_code: string } }) {
  const object = await getObjectByCode(params.object_code);
  if (!object) return NextResponse.json({ error: "Object not found" }, { status: 404 });
  return NextResponse.json(object);
}
