"use client";

export function ShareButton({ title }: { title: string }) {
  async function share() {
    const payload = {
      title,
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(payload).catch(() => undefined);
      return;
    }

    await navigator.clipboard?.writeText(payload.url).catch(() => undefined);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="rounded-md border border-line bg-white px-3 py-2 text-sm font-black text-muted transition hover:border-ocean hover:text-ocean"
    >
      ↗ Share
    </button>
  );
}
