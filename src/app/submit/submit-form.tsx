"use client";

import { FormEvent, useState } from "react";
import type { ObjectType } from "@/lib/types";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function SubmitForm({ objectTypes }: { objectTypes: ObjectType[] }) {
  const [status, setStatus] = useState<string>("");
  const [emailStatus, setEmailStatus] = useState<string>("");

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setEmailStatus("Supabase is not configured in this environment.");
      return;
    }

    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/submit`
      }
    });

    setEmailStatus(error ? error.message : "Check your email for a magic link.");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting...");
    const form = new FormData(event.currentTarget);
    const payload = {
      object_code: String(form.get("object_code") ?? "").toUpperCase().trim(),
      name: String(form.get("name") ?? "").trim(),
      aliases: splitLines(String(form.get("aliases") ?? "")),
      notation: String(form.get("notation") ?? "").trim(),
      type: String(form.get("type") ?? ""),
      definition: String(form.get("definition") ?? "").trim(),
      importance_note: String(form.get("importance_note") ?? "").trim(),
      attribution_of_origin: String(form.get("attribution_of_origin") ?? "").trim(),
      properties: splitLines(String(form.get("properties") ?? "")),
      relations: splitLines(String(form.get("relations") ?? "")),
      examples: splitLines(String(form.get("examples") ?? "")),
      code_examples: [{ language: "Text", code: String(form.get("code_examples") ?? "").trim() }].filter((x) => x.code),
      references: splitLines(String(form.get("references") ?? "")).map((label) => ({ label })),
      verification_status: "submitted"
    };

    const response = await fetch("/api/objects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setStatus(body.error ?? "Submission failed. Check Supabase configuration and authentication.");
      return;
    }

    setStatus("Submitted for review.");
    event.currentTarget.reset();
  }

  return (
    <div className="mt-8 grid gap-5">
      <form onSubmit={signIn} className="grid gap-3 rounded-lg border border-line bg-white p-5 shadow-sm md:grid-cols-[1fr_auto]">
        <label className="grid gap-2 text-sm font-bold text-ink">
          Sign in with Supabase Auth
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="rounded-md border border-line bg-white px-3 py-2 text-muted outline-ocean"
          />
        </label>
        <button type="submit" className="self-end rounded-md border border-line bg-paper px-4 py-2 text-sm font-black text-ink">
          Send magic link
        </button>
        {emailStatus ? <p className="text-sm font-semibold text-muted md:col-span-2">{emailStatus}</p> : null}
      </form>

      <form onSubmit={submit} className="grid gap-5 rounded-lg border border-line bg-white p-6 shadow-panel">
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="object_code" label="Object code" placeholder="GRP-D8" required />
        <Field name="name" label="Name" placeholder="Dihedral group of order 8" required />
        <Field name="notation" label="Notation" placeholder="D_8" required />
        <label className="grid gap-2 text-sm font-bold text-ink">
          Type
          <select name="type" className="rounded-md border border-line bg-white px-3 py-2 text-muted" required>
            {objectTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
      </div>
      <TextArea name="aliases" label="Aliases" placeholder="One per line" />
      <TextArea name="definition" label="Definition" required />
      <TextArea name="importance_note" label="Importance note" required />
      <TextArea name="attribution_of_origin" label="Attribution of origin" required />
      <div className="grid gap-5 md:grid-cols-2">
        <TextArea name="properties" label="Properties" placeholder="One per line" required />
        <TextArea name="relations" label="Relations" placeholder="One per line" required />
        <TextArea name="examples" label="Examples" placeholder="One per line" />
        <TextArea name="references" label="References" placeholder="One per line" />
      </div>
      <TextArea name="code_examples" label="Code example" placeholder="Paste one short snippet" />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-muted">{status}</p>
        <button type="submit" className="rounded-md bg-ink px-5 py-3 text-sm font-black text-white">
          Submit object
        </button>
      </div>
      </form>
    </div>
  );
}

function splitLines(value: string) {
  return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
}

function Field(props: { name: string; label: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {props.label}
      <input
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        className="rounded-md border border-line bg-white px-3 py-2 text-muted outline-ocean"
      />
    </label>
  );
}

function TextArea(props: { name: string; label: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {props.label}
      <textarea
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        rows={4}
        className="rounded-md border border-line bg-white px-3 py-2 text-muted outline-ocean"
      />
    </label>
  );
}
