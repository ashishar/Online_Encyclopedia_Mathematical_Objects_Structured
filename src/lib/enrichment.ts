import type { MathObject, ObjectType, Reference } from "@/lib/types";

type Enrichment = {
  origin_story: string;
  primary_uses: string[];
  historical_development: string;
  current_research_trends: string;
  trend_references: Reference[];
};

const typeEnrichment: Record<ObjectType, Omit<Enrichment, "origin_story">> = {
  Series: {
    primary_uses: ["analytic number theory", "asymptotic analysis", "generating functions", "numerical computation"],
    historical_development:
      "Series moved from concrete summation problems into a language for functions, convergence, analytic continuation, and computation. Modern treatments emphasize domains of convergence, regularization, symbolic manipulation, and verified numerical evaluation.",
    current_research_trends:
      "Current work connects classical series to automated proof, high-precision computation, analytic continuation, L-functions, and machine-assisted discovery of identities.",
    trend_references: [
      { label: "NIST Digital Library of Mathematical Functions", url: "https://dlmf.nist.gov/" },
      { label: "LMFDB", url: "https://www.lmfdb.org/" }
    ]
  },
  Groups: {
    primary_uses: ["symmetry classification", "Galois theory", "crystallography", "coding theory", "computational algebra"],
    historical_development:
      "Group theory grew from permutation groups and equation solving into an abstract theory of symmetry. Since the late twentieth century, computer algebra systems have made large finite-group classifications searchable and reproducible.",
    current_research_trends:
      "A major current direction is computational classification: extending catalogs, improving isomorphism tests, connecting groups to representations and graphs, and making classifications available through systems such as GAP.",
    trend_references: [
      { label: "Bettina Eick, Classification of Finite Groups: Recent Developements and Open Problems", url: "https://link.springer.com/article/10.1007/s10208-024-09688-1" },
      { label: "GAP Small Groups Library", url: "https://docs.gap-system.org/pkg/smallgrp/" }
    ]
  },
  Graphs: {
    primary_uses: ["network science", "combinatorics", "optimization", "chemistry", "graph neural networks"],
    historical_development:
      "Graph theory began with concrete connectivity problems and developed into structural, extremal, algebraic, topological, and algorithmic branches. Small named graphs now serve as counterexamples, test cases, and canonical benchmarks.",
    current_research_trends:
      "Current graph research is strongly shaped by spectral methods, graph limits, extremal constructions, network algorithms, and graph machine learning, especially the limits of message passing and learning on heterophilic graphs.",
    trend_references: [
      { label: "House of Graphs", url: "https://houseofgraphs.org/" },
      { label: "arXiv: A Comprehensive Survey on Graph Neural Networks", url: "https://arxiv.org/abs/1901.00596" }
    ]
  },
  Matrices: {
    primary_uses: ["linear algebra", "numerical analysis", "quantum mechanics", "optimization", "data science"],
    historical_development:
      "Matrices evolved from systems of linear equations and determinants into the central language for linear transformations, computation, numerical stability, and operator theory.",
    current_research_trends:
      "Current matrix research emphasizes randomized numerical linear algebra, tensor methods, spectral algorithms, structured matrices, differentiable linear algebra, and quantum information applications.",
    trend_references: [
      { label: "NIST Matrix Market", url: "https://math.nist.gov/MatrixMarket/" },
      { label: "SIAM Journal on Matrix Analysis and Applications", url: "https://www.siam.org/publications/siam-journals/siam-journal-on-matrix-analysis-and-applications-simax/" }
    ]
  },
  Polynomials: {
    primary_uses: ["algebra", "approximation", "coding theory", "symbolic computation", "number theory"],
    historical_development:
      "Polynomial objects moved from equation solving into algebraic structures, orthogonal systems, interpolation schemes, and computational bases.",
    current_research_trends:
      "Active areas include symbolic-numeric algorithms, sparse polynomial systems, certified roots, orthogonal-polynomial computation, and polynomial optimization.",
    trend_references: [
      { label: "NIST DLMF Orthogonal Polynomials", url: "https://dlmf.nist.gov/18" },
      { label: "SIAM Journal on Applied Algebra and Geometry", url: "https://www.siam.org/publications/siam-journals/siam-journal-on-applied-algebra-and-geometry-siaga/" }
    ]
  },
  Functions: {
    primary_uses: ["mathematical physics", "statistics", "PDEs", "numerical libraries", "engineering models"],
    historical_development:
      "Special functions were standardized through handbooks and tables, then migrated into digital libraries and scientific software with validated definitions, identities, and algorithms.",
    current_research_trends:
      "Current trends include validated digital references, high-precision algorithms, interval-certified evaluation, asymptotic methods, and integration with computer algebra systems.",
    trend_references: [
      { label: "NIST DLMF", url: "https://dlmf.nist.gov/" },
      { label: "NIST DLMF project background", url: "https://www.nist.gov/mathematics-statistics/digital-library-mathematical-functions" }
    ]
  },
  Transforms: {
    primary_uses: ["signal processing", "PDEs", "probability", "data compression", "spectral algorithms"],
    historical_development:
      "Integral and discrete transforms developed from harmonic analysis and differential equations into computational tools for signals, images, numerical solvers, and statistical models.",
    current_research_trends:
      "Research emphasizes fast algorithms, nonuniform and sparse transforms, wavelet/scattering methods, uncertainty principles, and transform layers inside machine-learning systems.",
    trend_references: [
      { label: "NIST DLMF Integral Transforms", url: "https://dlmf.nist.gov/1" },
      { label: "FFTW", url: "https://www.fftw.org/" }
    ]
  },
  Algorithms: {
    primary_uses: ["computer science", "optimization", "scientific computing", "cryptography", "data infrastructure"],
    historical_development:
      "Algorithms moved from hand procedures into formal objects with correctness proofs, complexity analysis, numerical stability, and implementation-level performance constraints.",
    current_research_trends:
      "Current algorithmic research combines worst-case analysis with randomized, streaming, parallel, quantum, and learned approaches, while emphasizing verified and reproducible implementations.",
    trend_references: [
      { label: "ACM Transactions on Algorithms", url: "https://dl.acm.org/journal/talg" },
      { label: "SIAM Journal on Computing", url: "https://www.siam.org/publications/siam-journals/siam-journal-on-computing-sicomp/" }
    ]
  },
  "Quantum Objects": {
    primary_uses: ["quantum computing", "quantum communication", "quantum error correction", "quantum simulation"],
    historical_development:
      "Quantum objects were formalized through Hilbert-space quantum mechanics and later recast as computational resources: states, gates, channels, measurements, and error-correcting codes.",
    current_research_trends:
      "The dominant current trend is fault-tolerant quantum computing: better codes, real-time decoders, lower overhead, neutral-atom and ion-trap demonstrations, and hardware-software co-design.",
    trend_references: [
      { label: "NIST, Observation of a fault tolerance threshold with concatenated codes", url: "https://www.nist.gov/publications/observation-fault-tolerance-threshold-concatenated-codes" },
      { label: "Quantum Information Processing review on geometric QEC frameworks", url: "https://link.springer.com/article/10.1007/s11128-025-04904-5" }
    ]
  },
  "ML Objects": {
    primary_uses: ["deep learning", "natural language processing", "computer vision", "scientific machine learning"],
    historical_development:
      "Machine-learning objects emerged from statistics, optimization, neural computation, and large-scale engineering. Many are now treated as reusable mathematical components with known invariances and failure modes.",
    current_research_trends:
      "Current trends focus on transformer variants, efficient attention, interpretability, mechanistic analysis, geometric deep learning, and mathematically grounded generalization.",
    trend_references: [
      { label: "Vaswani et al., Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762" },
      { label: "Distill, Attention and Augmented Recurrent Neural Networks", url: "https://distill.pub/2016/augmented-rnns/" }
    ]
  },
  Probability: {
    primary_uses: ["statistics", "stochastic processes", "machine learning", "risk modeling", "statistical physics"],
    historical_development:
      "Probability objects evolved from games of chance and actuarial questions into measure-theoretic distributions, stochastic processes, inference models, and simulation methods.",
    current_research_trends:
      "Current work emphasizes high-dimensional probability, concentration, stochastic processes for learning systems, causal inference, probabilistic programming, and uncertainty quantification.",
    trend_references: [
      { label: "Annals of Probability", url: "https://imstat.org/journals-and-publications/annals-of-probability/" },
      { label: "Stanford Encyclopedia of Philosophy, Probability Interpretations", url: "https://plato.stanford.edu/entries/probability-interpret/" }
    ]
  },
  Optimization: {
    primary_uses: ["operations research", "machine learning", "control", "economics", "engineering design"],
    historical_development:
      "Optimization developed from calculus and geometry into linear, nonlinear, convex, stochastic, and large-scale computational frameworks.",
    current_research_trends:
      "Current trends include first-order methods at scale, differentiable optimization, mixed-integer convex methods, distributionally robust optimization, and optimization for AI systems.",
    trend_references: [
      { label: "Boyd and Vandenberghe, Convex Optimization", url: "https://web.stanford.edu/~boyd/cvxbook/" },
      { label: "Mathematical Optimization Society", url: "https://www.mathopt.org/" }
    ]
  },
  "Geometry/Topology": {
    primary_uses: ["manifold theory", "physics", "topological data analysis", "robotics", "differential geometry"],
    historical_development:
      "Geometric and topological objects grew from Euclidean and projective geometry into manifold theory, algebraic topology, geometric analysis, and computational topology.",
    current_research_trends:
      "Current directions include topological data analysis, low-dimensional topology, derived and computational geometry, geometric deep learning, and topology-informed physics.",
    trend_references: [
      { label: "Hatcher, Algebraic Topology", url: "https://pi.math.cornell.edu/~hatcher/AT/ATpage.html" },
      { label: "Journal of Topology", url: "https://londmathsoc.onlinelibrary.wiley.com/journal/17538424" }
    ]
  }
};

export function enrichObject(object: MathObject): MathObject & Enrichment {
  const enrichment = typeEnrichment[object.type];
  return {
    ...object,
    origin_story:
      object.origin_story ??
      `${object.attribution_of_origin} This entry records the object's mathematical origin as a historical note; exact priority and naming history can vary by subfield and reference tradition.`,
    primary_uses: object.primary_uses ?? enrichment.primary_uses,
    historical_development: object.historical_development ?? enrichment.historical_development,
    current_research_trends: object.current_research_trends ?? enrichment.current_research_trends,
    trend_references: object.trend_references ?? enrichment.trend_references
  };
}
