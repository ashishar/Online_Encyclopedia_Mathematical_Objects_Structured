import fs from "fs";
import path from "path";

export type OEMOLink = {
  type: string;
  icon: string;
  title: string;
  url?: string;
};

export type OEMOEquation = {
  latex: string;
  explanation: string;
};

export type OEMOVisual = {
  type: string;
  description: string;
  image_url: string;
  caption: string;
  query: string[];
};

export type OEMOConnection = {
  to: string;
  type: string;
};

export type OEMOObject = {
  object_code: string;
  name: string;
  notation: string[];
  type: string;
  definition: string;
  defining_equations: OEMOEquation[];
  visuals: OEMOVisual[];
  origin_history: string;
  importance: string;
  research_trends: string;
  intuition: string;
  minimal_example: string;
  code_snippet: {
    language: string;
    code: string;
  };
  connections: OEMOConnection[];
  variants: string[];
  core_properties: string[];
  level: string;
  tags: string[];
  citations: OEMOLink[];
  resources: OEMOLink[];
};

const objectDirectory = path.join(process.cwd(), "data", "objects");

export async function getObjects(params?: { type?: string; query?: string; status?: string; limit?: number }) {
  const objects = readObjects();
  const q = params?.query?.trim().toLowerCase();

  const filtered = objects.filter((object) => {
    const typeMatch = !params?.type || normalizeType(object.type) === normalizeType(params.type);
    const queryMatch =
      !q ||
      [
        object.object_code,
        object.name,
        object.type,
        object.definition,
        object.importance,
        object.notation.join(" "),
        object.tags.join(" "),
        object.core_properties.join(" "),
        object.connections.map((connection) => `${connection.to} ${connection.type}`).join(" ")
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);

    return typeMatch && queryMatch;
  });

  return filtered.slice(0, params?.limit ?? filtered.length);
}

function normalizeType(type: string) {
  const value = type.toLowerCase();
  if (value === "groups") return "group";
  if (value === "graphs") return "graph";
  if (value === "matrices") return "matrix";
  return value;
}

export async function getObjectByCode(objectCode: string) {
  const normalized = objectCode.toUpperCase();
  return readObjects().find((object) => object.object_code === normalized) ?? null;
}

export function getObjectTypes() {
  return Array.from(new Set(readObjects().map((object) => object.type))).sort();
}

function readObjects(): OEMOObject[] {
  if (!fs.existsSync(objectDirectory)) return [];

  return fs
    .readdirSync(objectDirectory)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => {
      const fullPath = path.join(objectDirectory, file);
      return JSON.parse(fs.readFileSync(fullPath, "utf8")) as OEMOObject;
    });
}
