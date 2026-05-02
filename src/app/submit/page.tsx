import { SubmitForm } from "@/app/submit/submit-form";
import { OBJECT_TYPES } from "@/lib/types";

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-ocean">Submit</p>
      <h1 className="mt-3 text-4xl font-black text-ink">Contribute a mathematical object.</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        Submissions enter the review queue with verification status <strong>submitted</strong>.
        Supabase Auth is supported through row-level security for production deployments.
      </p>
      <SubmitForm objectTypes={[...OBJECT_TYPES]} />
    </main>
  );
}
