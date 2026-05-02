"use client";

import katex from "katex";

export function MathText({ value, block = false }: { value: string; block?: boolean }) {
  const html = katex.renderToString(value, {
    throwOnError: false,
    displayMode: block,
    strict: false
  });

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
