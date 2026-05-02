# OEMO Agent Architecture

OEMO uses a structured agent pipeline for object-first mathematical publishing.

## Agents

- Content Agent: drafts structured object JSON from a mathematical object brief.
- Math Verification Agent: checks definitions, equations, properties, examples, and term explanations.
- Historical Context Agent: checks origin, attribution, and historical context.
- Citation Agent: adds at least three citations and at least three resources.
- Visual Agent: creates or selects a visual concept for each object.
- Visual Verification Agent: checks whether the visual is relevant to the defining equation and explanation.
- Code Verification Agent: runs snippets where safe and reports execution failures.
- Schema Validator: validates JSON shape against `schema/oemo-object.schema.json`.
- CI Orchestrator: runs the GitHub Actions validation and build pipeline.

## Verification Pipeline

Content JSON flows through the following gates:

1. Schema validation.
2. Content rule checks.
3. Code snippet checks.
4. Next.js production build.
5. Pull request review and approval.

The public UI renders from local JSON objects and does not display internal verification labels.
