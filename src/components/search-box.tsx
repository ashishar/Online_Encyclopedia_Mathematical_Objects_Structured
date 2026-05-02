"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBox({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={submit} className="flex min-h-14 items-center gap-3 rounded-lg border-2 border-ocean bg-white px-4 shadow-sm">
      <span className="text-lg text-ocean">⌕</span>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search zeta, D8, Petersen, Laplace, ReLU..."
        className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
      />
      <button className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white" type="submit">
        Search
      </button>
    </form>
  );
}
