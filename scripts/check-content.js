const fs = require("fs");
const path = require("path");

const objectDir = path.join(process.cwd(), "data", "objects");
const errors = [];

function readObjects() {
  return fs
    .readdirSync(objectDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const fullPath = path.join(objectDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      return { file, raw, object: JSON.parse(raw) };
    });
}

function isMalformedUrl(value) {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return !["http:", "https:"].includes(parsed.protocol);
  } catch {
    return true;
  }
}

function checkLinkList(file, listName, items) {
  if (!Array.isArray(items)) {
    errors.push(`${file}: ${listName} must be an array.`);
    return;
  }

  if (items.length < 3) {
    errors.push(`${file}: ${listName} must contain at least 3 entries.`);
  }

  items.forEach((item, index) => {
    if (!item.title || typeof item.title !== "string") {
      errors.push(`${file}: ${listName}[${index}] is missing a title.`);
    }
    if (isMalformedUrl(item.url)) {
      errors.push(`${file}: ${listName}[${index}] has a malformed URL: ${item.url}`);
    }
  });
}

for (const entry of readObjects()) {
  if (entry.raw.includes("--")) {
    errors.push(`${entry.file}: raw content contains a double hyphen.`);
  }
  if (entry.raw.includes("\u2014\u2014")) {
    errors.push(`${entry.file}: raw content contains a double em dash.`);
  }

  const object = entry.object;

  if (!Array.isArray(object.defining_equations) || object.defining_equations.length < 1) {
    errors.push(`${entry.file}: at least 1 defining equation is required.`);
  }

  object.defining_equations?.forEach((equation, index) => {
    if (!equation.latex) {
      errors.push(`${entry.file}: defining_equations[${index}] is missing latex.`);
    }
    if (!equation.explanation) {
      errors.push(`${entry.file}: defining_equations[${index}] is missing term explanation.`);
    }
  });

  if (!Array.isArray(object.visuals) || object.visuals.length < 1) {
    errors.push(`${entry.file}: at least 1 visual is required.`);
  }

  checkLinkList(entry.file, "citations", object.citations);
  checkLinkList(entry.file, "resources", object.resources);
}

if (errors.length) {
  console.error("OEMO content checks failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("OEMO content checks passed.");
