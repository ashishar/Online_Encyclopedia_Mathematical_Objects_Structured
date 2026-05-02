import { MathText } from "@/components/math-text";

export function RichText({ value }: { value: string }) {
  const parts = value.includes("\\(") || value.includes("\\[")
    ? value.split(/(\\\(.+?\\\)|\\\[.+?\\\])/g)
    : splitImplicitMath(value);

  return (
    <>
      {parts.map((part, index) => {
        if (typeof part !== "string") {
          return <MathText key={`${part.math}-${index}`} value={part.math} />;
        }

        if (part.startsWith("\\(") && part.endsWith("\\)")) {
          return <MathText key={`${part}-${index}`} value={part.slice(2, -2)} />;
        }

        if (part.startsWith("\\[") && part.endsWith("\\]")) {
          return (
            <span key={`${part}-${index}`} className="my-3 block overflow-x-auto">
              <MathText value={part.slice(2, -2)} block />
            </span>
          );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

function splitImplicitMath(value: string): Array<string | { math: string }> {
  const formulaPattern = /(\\[A-Za-z]+(?:\{[^}]*\})?(?:\([^)]*\))?|[A-Za-z][A-Za-z0-9]*_\{?[A-Za-z0-9,+-]+\}?|[A-Za-z]\^\{?[A-Za-z0-9,+-]+\}?|[A-Za-z0-9]+(?:\^|_)[A-Za-z0-9{}+-]+|[A-Za-z]+\(.*?\)|\[[^\]]+\]\s*[=<>]\s*[^,.;]+|[A-Za-z0-9{}_^\\+\-*/=<>]+\s*=\s*[^,.;]+)/g;
  const output: Array<string | { math: string }> = [];
  let lastIndex = 0;

  for (const match of Array.from(value.matchAll(formulaPattern))) {
    const start = match.index ?? 0;
    const text = match[0].trim();
    if (!shouldRenderAsMath(text)) continue;
    if (start > lastIndex) output.push(value.slice(lastIndex, start));
    output.push({ math: text });
    lastIndex = start + match[0].length;
  }

  if (lastIndex < value.length) output.push(value.slice(lastIndex));
  return output.length ? output : [value];
}

function shouldRenderAsMath(value: string) {
  return /\\|[_^=]|[{}]/.test(value) && !/\s{2,}/.test(value);
}
