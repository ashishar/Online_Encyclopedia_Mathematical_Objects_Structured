export const OBJECT_TYPES = [
  "Series",
  "Groups",
  "Graphs",
  "Matrices",
  "Polynomials",
  "Functions",
  "Transforms",
  "Algorithms",
  "Quantum Objects",
  "ML Objects",
  "Probability",
  "Optimization",
  "Geometry/Topology"
] as const;

export type ObjectType = (typeof OBJECT_TYPES)[number];

export type VerificationStatus = "draft" | "submitted" | "reviewed" | "verified" | "deprecated";

export type Reference = {
  label: string;
  url?: string;
  note?: string;
};

export type CodeExample = {
  language: string;
  code: string;
};

export type MathObject = {
  object_code: string;
  name: string;
  aliases: string[];
  notation: string;
  type: ObjectType;
  definition: string;
  importance_note: string;
  attribution_of_origin: string;
  properties: string[];
  relations: string[];
  examples: string[];
  code_examples: CodeExample[];
  references: Reference[];
  verification_status: VerificationStatus;
  origin_story?: string;
  primary_uses?: string[];
  historical_development?: string;
  current_research_trends?: string;
  trend_references?: Reference[];
  created_at?: string;
  updated_at?: string;
};

export function typeToSlug(type: string) {
  return type.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
}

export function slugToType(slug: string): ObjectType | undefined {
  return OBJECT_TYPES.find((type) => typeToSlug(type) === slug);
}
