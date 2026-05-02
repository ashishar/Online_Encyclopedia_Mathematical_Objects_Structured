import type { MathObject, ObjectType, Reference } from "@/lib/types";

type ResourceGroup = {
  title: string;
  items: Reference[];
};

const typeResources: Record<ObjectType, ResourceGroup[]> = {
  Series: [
    { title: "Papers and arXiv", items: [{ label: "Riemann, On the Number of Primes Less Than a Given Magnitude", url: "https://www.claymath.org/wp-content/uploads/2022/06/ezeta.pdf" }, { label: "arXiv: On the Riemann zeta-function", url: "https://arxiv.org/abs/1208.4266" }] },
    { title: "Code and GitHub", items: [{ label: "SageMath source", url: "https://github.com/sagemath/sage" }] },
    { title: "Books and university links", items: [{ label: "NIST DLMF", url: "https://dlmf.nist.gov/" }, { label: "MIT OCW Single Variable Calculus", url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/" }] },
    { title: "Video", items: [{ label: "MIT OCW, Infinite Series lecture", url: "https://www.youtube.com/watch?v=9w3z2L9Nn2s" }] },
    { title: "Medium article", items: [{ label: "The Intuition Behind The Fourier Series and The Fourier Transform", url: "https://medium.com/math-simplified/the-intuition-behind-the-fourier-series-and-the-fourier-transform-75e7a78d96ef" }] }
  ],
  Groups: [
    { title: "Papers and arXiv", items: [{ label: "Classification of Finite Groups: Recent Developments and Open Problems", url: "https://link.springer.com/article/10.1007/s10208-024-09688-1" }, { label: "arXiv: The Classification of Finite Simple Groups", url: "https://arxiv.org/abs/math/0403010" }] },
    { title: "Code and GitHub", items: [{ label: "GAP system source", url: "https://github.com/gap-system/gap" }, { label: "SageMath source", url: "https://github.com/sagemath/sage" }] },
    { title: "Books and university links", items: [{ label: "Atlas of Finite Groups", url: "https://brauer.maths.qmul.ac.uk/Atlas/v3/" }, { label: "GAP Small Groups Library", url: "https://docs.gap-system.org/pkg/smallgrp/" }] },
    { title: "Video", items: [{ label: "Socratica Abstract Algebra playlist", url: "https://www.youtube.com/playlist?list=PLi01XoE8jYoi3SgnnGorR_XOW3IcK-TP6" }] },
    { title: "Medium article", items: [{ label: "Intro to Group Theory", url: "https://medium.com/@patrickbfuller/intro-to-group-theory-59b9f3f5efb9" }] }
  ],
  Graphs: [
    { title: "Papers and arXiv", items: [{ label: "arXiv: A Comprehensive Survey on Graph Neural Networks", url: "https://arxiv.org/abs/1901.00596" }] },
    { title: "Code and GitHub", items: [{ label: "NetworkX source", url: "https://github.com/networkx/networkx" }, { label: "SageMath graph library", url: "https://github.com/sagemath/sage" }] },
    { title: "Books and university links", items: [{ label: "Diestel, Graph Theory", url: "https://diestel-graph-theory.com/" }, { label: "House of Graphs", url: "https://houseofgraphs.org/" }] },
    { title: "Video", items: [{ label: "MIT Mathematics for Computer Science", url: "https://www.youtube.com/playlist?list=PLB7540DEDD482705B" }] },
    { title: "Medium article", items: [{ label: "Intro to Graph Theory", url: "https://medium.com/geekculture/intro-to-graph-theory-e20ec47546bf" }] }
  ],
  Matrices: [
    { title: "Papers and arXiv", items: [{ label: "arXiv: Randomized Algorithms for Matrices and Data", url: "https://arxiv.org/abs/1104.5557" }] },
    { title: "Code and GitHub", items: [{ label: "NumPy source", url: "https://github.com/numpy/numpy" }, { label: "SciPy source", url: "https://github.com/scipy/scipy" }] },
    { title: "Books and university links", items: [{ label: "Gilbert Strang linear algebra page", url: "https://math.mit.edu/~gs/linearalgebra/" }, { label: "NIST Matrix Market", url: "https://math.nist.gov/MatrixMarket/" }] },
    { title: "Video", items: [{ label: "MIT 18.06 Linear Algebra", url: "https://www.youtube.com/watch?v=hNDFwVVKVk0" }] },
    { title: "Medium article", items: [{ label: "A Gentle Introduction to Linear Algebra", url: "https://medium.com/@jonathan_hui/machine-learning-linear-algebra-a5b1658f0151" }] }
  ],
  Polynomials: [
    { title: "Papers and arXiv", items: [{ label: "arXiv: Solving Polynomial Systems", url: "https://arxiv.org/abs/2002.05888" }] },
    { title: "Code and GitHub", items: [{ label: "SymPy source", url: "https://github.com/sympy/sympy" }] },
    { title: "Books and university links", items: [{ label: "NIST DLMF Orthogonal Polynomials", url: "https://dlmf.nist.gov/18" }] },
    { title: "Video", items: [{ label: "3Blue1Brown, Solving the cubic equation", url: "https://www.youtube.com/watch?v=N-KXStupwsc" }] },
    { title: "Medium article", items: [{ label: "Polynomial Regression explained", url: "https://towardsdatascience.com/polynomial-regression-bbe8b9d97491" }] }
  ],
  Functions: [
    { title: "Papers and arXiv", items: [{ label: "arXiv: Hypergeometric Functions and Their Applications", url: "https://arxiv.org/abs/1601.02448" }] },
    { title: "Code and GitHub", items: [{ label: "mpmath source", url: "https://github.com/mpmath/mpmath" }, { label: "SciPy special functions", url: "https://github.com/scipy/scipy" }] },
    { title: "Books and university links", items: [{ label: "NIST DLMF", url: "https://dlmf.nist.gov/" }] },
    { title: "Video", items: [{ label: "MIT OCW Differential Equations", url: "https://www.youtube.com/playlist?list=PLEC88901EBADDD980" }] },
    { title: "Medium article", items: [{ label: "The Gamma Function explained", url: "https://medium.com/@andrew.chamberlain/the-gamma-function-8f59c0f84885" }] }
  ],
  Transforms: [
    { title: "Papers and arXiv", items: [{ label: "arXiv: The Fast Fourier Transform", url: "https://arxiv.org/abs/1805.05533" }] },
    { title: "Code and GitHub", items: [{ label: "FFTW source", url: "https://github.com/FFTW/fftw3" }, { label: "PyWavelets source", url: "https://github.com/PyWavelets/pywt" }] },
    { title: "Books and university links", items: [{ label: "NIST DLMF Integral Transforms", url: "https://dlmf.nist.gov/1" }] },
    { title: "Video", items: [{ label: "3Blue1Brown Fourier series", url: "https://www.youtube.com/watch?v=r6sGWTCMz2k" }] },
    { title: "Medium article", items: [{ label: "The Intuition Behind The Fourier Series and The Fourier Transform", url: "https://medium.com/math-simplified/the-intuition-behind-the-fourier-series-and-the-fourier-transform-75e7a78d96ef" }] }
  ],
  Algorithms: [
    { title: "Papers and arXiv", items: [{ label: "ACM Transactions on Algorithms", url: "https://dl.acm.org/journal/talg" }, { label: "arXiv: A* Search Algorithm", url: "https://arxiv.org/abs/1809.04540" }] },
    { title: "Code and GitHub", items: [{ label: "TheAlgorithms Python", url: "https://github.com/TheAlgorithms/Python" }] },
    { title: "Books and university links", items: [{ label: "Knuth, The Art of Computer Programming", url: "https://www-cs-faculty.stanford.edu/~knuth/taocp.html" }] },
    { title: "Video", items: [{ label: "MIT Introduction to Algorithms", url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP61hsJNdULdudlRL493b-XZf" }] },
    { title: "Medium article", items: [{ label: "Graph Theory Algorithms: From Mathematical Concepts to Python Code", url: "https://medium.com/pythoneers/graph-theory-algorithms-from-mathematical-concepts-to-python-code-93427e86f78c" }] }
  ],
  "Quantum Objects": [
    { title: "Papers and arXiv", items: [{ label: "NIST fault tolerance threshold publication", url: "https://www.nist.gov/publications/observation-fault-tolerance-threshold-concatenated-codes" }, { label: "arXiv: Quantum computation and quantum information", url: "https://arxiv.org/abs/quant-ph/0011118" }] },
    { title: "Code and GitHub", items: [{ label: "Qiskit source", url: "https://github.com/Qiskit/qiskit" }, { label: "Cirq source", url: "https://github.com/quantumlib/Cirq" }] },
    { title: "Books and university links", items: [{ label: "Nielsen and Chuang, Quantum Computation and Quantum Information", url: "https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE" }] },
    { title: "Video", items: [{ label: "Qiskit YouTube", url: "https://www.youtube.com/@qiskit" }] },
    { title: "Medium article", items: [{ label: "A beginner's guide to quantum computing", url: "https://medium.com/@quantum_wa/a-beginners-guide-to-quantum-computing-9e756d708ea5" }] }
  ],
  "ML Objects": [
    { title: "Papers and arXiv", items: [{ label: "Vaswani et al., Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762" }] },
    { title: "Code and GitHub", items: [{ label: "PyTorch source", url: "https://github.com/pytorch/pytorch" }, { label: "scikit-learn source", url: "https://github.com/scikit-learn/scikit-learn" }] },
    { title: "Books and university links", items: [{ label: "Deep Learning book", url: "https://www.deeplearningbook.org/" }] },
    { title: "Video", items: [{ label: "Stanford CS229", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rOzrYsAxzQyHb8n_RWNuS1e" }] },
    { title: "Medium article", items: [{ label: "Softmax function explained clearly and in depth", url: "https://medium.com/mlearning-ai/what-is-the-softmax-function-used-in-deep-learning-illustrated-in-an-easy-to-understand-way-8b937fe13d49" }] }
  ],
  Probability: [
    { title: "Papers and arXiv", items: [{ label: "Annals of Probability", url: "https://imstat.org/journals-and-publications/annals-of-probability/" }, { label: "arXiv: Probability Theory", url: "https://arxiv.org/abs/1808.09787" }] },
    { title: "Code and GitHub", items: [{ label: "Stan probabilistic programming", url: "https://github.com/stan-dev/stan" }, { label: "PyMC source", url: "https://github.com/pymc-devs/pymc" }] },
    { title: "Books and university links", items: [{ label: "Stanford Encyclopedia of Philosophy, Probability", url: "https://plato.stanford.edu/entries/probability-interpret/" }] },
    { title: "Video", items: [{ label: "MIT 18.05 Probability and Statistics", url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP63M-4hUykJYkWnSmywlyyq7" }] },
    { title: "Medium article", items: [{ label: "Understanding the Normal Distribution", url: "https://medium.com/@365datascience/understanding-the-normal-distribution-statistics-tutorial-704174bbfbee" }] }
  ],
  Optimization: [
    { title: "Papers and arXiv", items: [{ label: "Mathematical Optimization Society", url: "https://www.mathopt.org/" }, { label: "arXiv: An overview of gradient descent optimization algorithms", url: "https://arxiv.org/abs/1609.04747" }] },
    { title: "Code and GitHub", items: [{ label: "CVXPY source", url: "https://github.com/cvxpy/cvxpy" }, { label: "SciPy optimize", url: "https://github.com/scipy/scipy" }] },
    { title: "Books and university links", items: [{ label: "Boyd and Vandenberghe, Convex Optimization", url: "https://web.stanford.edu/~boyd/cvxbook/" }] },
    { title: "Video", items: [{ label: "Stanford Convex Optimization", url: "https://www.youtube.com/playlist?list=PL3940DD956CDF0622" }] },
    { title: "Medium article", items: [{ label: "How To Solve Optimization Problems Using Linear Programming", url: "https://medium.com/data-science/how-to-solve-optimisation-problems-using-linear-programming-912cc951afbb" }] }
  ],
  "Geometry/Topology": [
    { title: "Papers and arXiv", items: [{ label: "Journal of Topology", url: "https://londmathsoc.onlinelibrary.wiley.com/journal/17538424" }, { label: "arXiv: Persistent Homology", url: "https://arxiv.org/abs/math/0012216" }] },
    { title: "Code and GitHub", items: [{ label: "GUDHI computational topology", url: "https://github.com/GUDHI/gudhi-devel" }] },
    { title: "Books and university links", items: [{ label: "Hatcher, Algebraic Topology", url: "https://pi.math.cornell.edu/~hatcher/AT/ATpage.html" }] },
    { title: "Video", items: [{ label: "Wildberger, Algebraic Topology", url: "https://www.youtube.com/playlist?list=PLIljB45xT85DHOvDE7JGM3hkAkHhyAph8" }] },
    { title: "Medium article", items: [{ label: "A gentle introduction to topology", url: "https://medium.com/@mathcube7/topology-for-beginners-8d2450f2efab" }] }
  ]
};

const objectResources: Record<string, Reference[]> = {
  "SER-ZETA-RIEMANN": [
    { label: "Riemann 1859 translated memoir", url: "https://www.claymath.org/wp-content/uploads/2022/06/ezeta.pdf" },
    { label: "3Blue1Brown, visualizing analytic continuation", url: "https://www.youtube.com/watch?v=sD0NjbwqlYw" },
    { label: "LMFDB, Riemann zeta function", url: "https://www.lmfdb.org/L/degree1/Riemann/" }
  ],
  "SER-FIBONACCI": [
    { label: "OEIS A000045 Fibonacci numbers", url: "https://oeis.org/A000045" },
    { label: "Project Nayuki Fibonacci algorithms", url: "https://www.nayuki.io/page/fast-fibonacci-algorithms" },
    { label: "3Blue1Brown, Fibonacci numbers and the golden ratio", url: "https://www.youtube.com/watch?v=SjSHVDfXHQ4" }
  ],
  "GRP-A5": [
    { label: "Groupprops, alternating group A5", url: "https://groupprops.subwiki.org/wiki/Alternating_group:A5" },
    { label: "Wikimedia Cayley graph of A5", url: "https://commons.wikimedia.org/wiki/File:Cayley_graph_of_Alternating_Group_A5.png" },
    { label: "GAP alternating groups reference", url: "https://docs.gap-system.org/doc/ref/chap50.html" }
  ],
  "GRF-PETERSEN": [
    { label: "MathWorld, Petersen graph", url: "https://mathworld.wolfram.com/PetersenGraph.html" },
    { label: "Cambridge University Press, The Petersen Graph", url: "https://www.cambridge.org/core/books/petersen-graph/8B54461D056FEAD6CF1F62E8C191C9B1" },
    { label: "SageMath Petersen graph generator", url: "https://doc.sagemath.org/html/en/reference/graphs/sage/graphs/graph_generators.html" }
  ],
  "ALG-DIJKSTRA": [
    { label: "E. W. Dijkstra, A note on two problems in connexion with graphs", url: "https://doi.org/10.1007/BF01386390" },
    { label: "MIT OpenCourseWare, Dijkstra lecture", url: "https://www.youtube.com/watch?v=2E7MmKv0Y24" },
    { label: "NetworkX shortest path algorithms", url: "https://github.com/networkx/networkx/tree/main/networkx/algorithms/shortest_paths" }
  ],
  "ML-TRANSFORMER-ATTENTION": [
    { label: "Vaswani et al., Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762" },
    { label: "PyTorch scaled dot product attention", url: "https://github.com/pytorch/pytorch/blob/main/torch/nn/functional.py" },
    { label: "The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/" }
  ],
  "QNT-QUBIT": [
    { label: "Qiskit textbook, single qubits", url: "https://qiskit.qotlabs.org/learning/courses/basics-of-quantum-information/single-systems" },
    { label: "Microsoft Quantum, qubits", url: "https://learn.microsoft.com/en-us/azure/quantum/concepts-the-qubit" },
    { label: "Qiskit source", url: "https://github.com/Qiskit/qiskit" }
  ],
  "FUN-GAMMA": [
    { label: "NIST DLMF, Gamma function", url: "https://dlmf.nist.gov/5" },
    { label: "SciPy special functions source", url: "https://github.com/scipy/scipy/tree/main/scipy/special" },
    { label: "3Blue1Brown, why pi is in the normal distribution", url: "https://www.youtube.com/watch?v=cy8r7WSuT1I" }
  ],
  "TRN-FOURIER": [
    { label: "Stanford, Fourier transform notes", url: "https://see.stanford.edu/materials/lsoftaee261/book-fall-07.pdf" },
    { label: "3Blue1Brown, Fourier series", url: "https://www.youtube.com/watch?v=r6sGWTCMz2k" },
    { label: "FFTW source", url: "https://github.com/FFTW/fftw3" }
  ],
  "OPT-KKT": [
    { label: "Boyd and Vandenberghe, Convex Optimization", url: "https://web.stanford.edu/~boyd/cvxbook/" },
    { label: "CVXPY source", url: "https://github.com/cvxpy/cvxpy" },
    { label: "Stephen Boyd convex optimization lectures", url: "https://www.youtube.com/playlist?list=PL3940DD956CDF0622" }
  ],
  "GEO-MOBIUS-STRIP": [
    { label: "Hatcher, Algebraic Topology", url: "https://pi.math.cornell.edu/~hatcher/AT/ATpage.html" },
    { label: "Numberphile, Mobius strips", url: "https://www.youtube.com/watch?v=wKV0GYvR2X8" },
    { label: "GUDHI computational topology source", url: "https://github.com/GUDHI/gudhi-devel" }
  ]
};

export function getTypeResourceGroups(type: ObjectType) {
  return typeResources[type];
}

export function getObjectResourceGroups(object: MathObject): ResourceGroup[] {
  const sourceItems = [...object.references, ...(object.trend_references ?? []), ...(objectResources[object.object_code] ?? [])];
  const byTitle = (title: string) => typeResources[object.type].find((group) => group.title === title)?.items ?? [];

  return [
    {
      title: "Entry citations",
      items: sourceItems.length ? sourceItems : [{ label: "No entry-specific citation recorded yet" }]
    },
    {
      title: "Research papers and arXiv",
      items: byTitle("Papers and arXiv")
    },
    {
      title: "Code and GitHub",
      items: [...byTitle("Code and GitHub"), ...object.code_examples.map((example) => ({ label: `${example.language} example included above` }))]
    },
    {
      title: "Books and university links",
      items: byTitle("Books and university links")
    },
    {
      title: "Video",
      items: byTitle("Video")
    },
    {
      title: "Medium article",
      items: byTitle("Medium article")
    }
  ];
}
