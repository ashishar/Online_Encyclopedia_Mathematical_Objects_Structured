"use client";

import { PointerEvent, useRef, useState } from "react";

const links = [
  { label: "Share", short: "SH", href: "#share" },
  { label: "GitHub", short: "GH", href: "https://github.com/" },
  { label: "YouTube", short: "YT", href: "https://www.youtube.com/" },
  { label: "LinkedIn", short: "in", href: "https://www.linkedin.com/" },
  { label: "X", short: "X", href: "https://x.com/" }
];

export function FloatingSocialSliver() {
  const [top, setTop] = useState(220);
  const dragStart = useRef<{ y: number; top: number } | null>(null);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    dragStart.current = { y: event.clientY, top };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragStart.current) return;
    const next = dragStart.current.top + event.clientY - dragStart.current.y;
    setTop(Math.max(84, Math.min(window.innerHeight - 260, next)));
  }

  function onPointerUp() {
    dragStart.current = null;
  }

  async function sharePage() {
    const payload = {
      title: document.title,
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(payload).catch(() => undefined);
      return;
    }

    await navigator.clipboard?.writeText(payload.url).catch(() => undefined);
  }

  return (
    <div
      className="fixed right-3 z-50 hidden select-none rounded-lg border border-line bg-white/95 p-1 shadow-panel backdrop-blur md:block"
      style={{ top }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      aria-label="Movable social sharing bar"
    >
      <div className="mb-1 grid h-7 cursor-grab place-items-center rounded-md bg-paper text-xs font-black text-muted">::</div>
      <div className="grid gap-1">
        {links.map((link) =>
          link.href === "#share" ? (
            <button
              key={link.label}
              type="button"
              onClick={sharePage}
              className="grid size-10 place-items-center rounded-md border border-line bg-white text-xs font-black text-ink hover:border-ocean hover:text-ocean"
              title={link.label}
              aria-label={link.label}
            >
              {link.short}
            </button>
          ) : (
            <a
              key={link.label}
              href={link.href}
              className="grid size-10 place-items-center rounded-md border border-line bg-white text-xs font-black text-ink hover:border-ocean hover:text-ocean"
              title={link.label}
              aria-label={link.label}
            >
              {link.short}
            </a>
          )
        )}
      </div>
    </div>
  );
}
