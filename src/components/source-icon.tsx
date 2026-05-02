export function SourceIcon({ url }: { url: string }) {
  const label = sourceLabel(url);

  return (
    <span
      aria-hidden="true"
      className="mr-1.5 inline-flex min-w-8 items-center justify-center rounded border border-current px-1.5 py-0.5 text-[10px] font-black uppercase leading-none"
    >
      {label}
    </span>
  );
}

function sourceLabel(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "YT";
  if (url.includes("github.com")) return "GH";
  if (url.includes("arxiv.org")) return "arXiv";
  if (url.includes("medium.com") || url.includes("towardsdatascience.com")) return "M";
  if (
    url.includes("mit.edu") ||
    url.includes("stanford.edu") ||
    url.includes("cornell.edu") ||
    url.includes("cambridge.org") ||
    url.includes("princeton.edu") ||
    url.includes("nist.gov")
  ) {
    return "EDU";
  }
  if (url.includes("springer.com") || url.includes("wiley.com") || url.includes("acm.org") || url.includes("siam.org")) {
    return "PAPER";
  }
  return "REF";
}
