"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/search");
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="mb-4 inline-flex items-center gap-2 rounded-md border border-line bg-paper px-3 py-2 text-sm font-black text-muted transition hover:border-ocean hover:text-ocean"
      aria-label="Go back to the previous page"
    >
      <span aria-hidden="true">←</span>
      Back
    </button>
  );
}
