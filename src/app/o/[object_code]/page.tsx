import { notFound } from "next/navigation";
import { BackButton } from "@/components/back-button";
import { ObjectPage as ObjectPageContent } from "@/components/ObjectPage";
import { getObjectByCode } from "@/lib/objects";

export default async function ObjectPage({ params }: { params: { object_code: string } }) {
  const object = await getObjectByCode(params.object_code);
  if (!object) notFound();

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <BackButton />
      </div>
      <ObjectPageContent object={object} />
    </>
  );
}
