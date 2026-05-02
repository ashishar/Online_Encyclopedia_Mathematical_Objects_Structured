import type { MathObject } from "@/lib/types";
import { MathText } from "@/components/math-text";

export function ObjectSchematic({ object }: { object: MathObject }) {
  const label = object.notation || object.name;

  if (object.type === "Graphs") return <GraphSchematic object={object} />;
  if (object.type === "Groups") return <GroupSchematic label={label} />;
  if (object.type === "Matrices" || object.type === "Quantum Objects") return <MatrixSchematic label={label} />;
  if (object.type === "Algorithms" || object.type === "Optimization") return <FlowSchematic label={label} />;
  if (object.type === "Probability" || object.type === "ML Objects") return <DistributionSchematic label={label} />;

  return <FunctionSchematic label={label} />;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-paper p-5">
      <h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function GroupSchematic({ label }: { label: string }) {
  return (
    <Panel title="Structure schematic">
      <div className="grid place-items-center">
        <svg viewBox="0 0 420 220" className="h-auto w-full max-w-md" aria-label="Group operation schematic">
          <rect width="420" height="220" rx="8" fill="#fff" />
          <circle cx="100" cy="80" r="38" fill="#146F6B" />
          <circle cx="210" cy="80" r="38" fill="#315FB8" />
          <circle cx="320" cy="80" r="38" fill="#A95F17" />
          <path d="M138 80H172M248 80H282M210 118V155" stroke="#17211F" strokeWidth="4" strokeLinecap="round" />
          <text x="100" y="87" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fff">a</text>
          <text x="210" y="87" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fff">b</text>
          <text x="320" y="87" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fff">ab</text>
          <text x="210" y="188" textAnchor="middle" fontSize="18" fontWeight="800" fill="#17211F">closure + symmetry law</text>
        </svg>
        <p className="mt-3 text-sm font-semibold text-muted">
          A group packages symmetries as elements with a composition rule. Entry notation: <MathText value={label} />.
        </p>
      </div>
    </Panel>
  );
}

function GraphSchematic({ object }: { object: MathObject }) {
  return (
    <Panel title="Structure schematic">
      <svg viewBox="0 0 420 220" className="h-auto w-full" aria-label="Graph vertices and edges schematic">
        <rect width="420" height="220" rx="8" fill="#fff" />
        {[[100,70],[210,40],[320,70],[285,160],[135,160]].map(([x, y], index) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="17" fill={index % 2 ? "#315FB8" : "#146F6B"} />
        ))}
        <path d="M100 70L210 40L320 70L285 160L135 160L100 70M210 40L285 160M320 70L135 160" stroke="#17211F" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <p className="mt-3 text-sm font-semibold text-muted">
        A graph is read through vertices, edges, paths, symmetry, and invariants. This sketch echoes {object.name}.
      </p>
    </Panel>
  );
}

function MatrixSchematic({ label }: { label: string }) {
  return (
    <Panel title="Structure schematic">
      <div className="grid place-items-center">
        <div className="grid grid-cols-3 gap-2 rounded-lg border border-line bg-white p-4">
          {[1, 0, 0, 0, 1, 0, 0, 0, 1].map((value, index) => (
            <span key={index} className="grid size-12 place-items-center rounded-md bg-paper font-black text-ink">{value}</span>
          ))}
        </div>
        <p className="mt-3 text-sm font-semibold text-muted">
          Matrix objects encode transformations, states, or linear relations. Entry notation: <MathText value={label} />.
        </p>
      </div>
    </Panel>
  );
}

function FlowSchematic({ label }: { label: string }) {
  return (
    <Panel title="Structure schematic">
      <svg viewBox="0 0 420 180" className="h-auto w-full" aria-label="Algorithm flow schematic">
        <rect width="420" height="180" rx="8" fill="#fff" />
        <rect x="30" y="62" width="95" height="56" rx="8" fill="#146F6B" />
        <rect x="162" y="62" width="95" height="56" rx="8" fill="#315FB8" />
        <rect x="295" y="62" width="95" height="56" rx="8" fill="#A95F17" />
        <path d="M125 90H162M257 90H295" stroke="#17211F" strokeWidth="4" strokeLinecap="round" />
        <text x="77" y="96" textAnchor="middle" fill="#fff" fontWeight="800">input</text>
        <text x="210" y="96" textAnchor="middle" fill="#fff" fontWeight="800">rule</text>
        <text x="343" y="96" textAnchor="middle" fill="#fff" fontWeight="800">output</text>
      </svg>
      <p className="mt-3 text-sm font-semibold text-muted">
        Algorithmic objects are best understood as transformations from input through rules to output. Entry notation: <MathText value={label} />.
      </p>
    </Panel>
  );
}

function DistributionSchematic({ label }: { label: string }) {
  return (
    <Panel title="Structure schematic">
      <svg viewBox="0 0 420 180" className="h-auto w-full" aria-label="Distribution curve schematic">
        <rect width="420" height="180" rx="8" fill="#fff" />
        <path d="M45 135C90 134 105 130 135 92C160 60 185 40 210 40C235 40 260 60 285 92C315 130 330 134 375 135" stroke="#146F6B" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M45 135H380" stroke="#17211F" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="mt-3 text-sm font-semibold text-muted">
        These objects often describe mass, uncertainty, scores, or learned weights over a space. Entry notation: <MathText value={label} />.
      </p>
    </Panel>
  );
}

function FunctionSchematic({ label }: { label: string }) {
  return (
    <Panel title="Structure schematic">
      <svg viewBox="0 0 420 180" className="h-auto w-full" aria-label="Function curve schematic">
        <rect width="420" height="180" rx="8" fill="#fff" />
        <path d="M45 130C110 35 160 35 210 90S315 145 375 50" stroke="#315FB8" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M45 140H380M70 25V155" stroke="#17211F" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="mt-3 text-sm font-semibold text-muted">
        Function-like objects are read through inputs, outputs, singularities, identities, and transformations. Entry notation: <MathText value={label} />.
      </p>
    </Panel>
  );
}
