// Final Exam Training Zone — cumulative practice questions (Weeks 1-12)
// Auto-assembled from per-topic generation; cumulative with emphasis on weeks 7-12.

export const finalReviewTopics = [
  { id: "all", label: "All Topics", icon: "📚" },
  { id: "foundations", label: "Foundations (Wks 1–6)", icon: "🧱" },
  { id: "link", label: "Link Analysis & PageRank", icon: "🔗" },
  { id: "crawling", label: "Web Crawling", icon: "🕷️" },
  { id: "neural", label: "Neural IR & RAG", icon: "🧠" },
  { id: "recommenders", label: "Recommender Systems", icon: "🎬" },
  { id: "conversational", label: "Conversational & Future", icon: "💬" },
];

export const finalReviewQuestions = [
  {
    "id": "f_foundations_1",
    "topic": "foundations",
    "type": "mcq",
    "difficulty": "easy",
    "question": "Which statement best contrasts classical Information Retrieval with a structured (SQL) database?",
    "options": [
      "Databases return a ranked list by relevance, while IR returns an unordered set of exact matches",
      "IR works over unstructured free text with vague queries and returns a relevance-ranked list, while databases store structured data and answer exact, deterministic queries",
      "Both IR and databases are deterministic and always return the exact correct row or document",
      "IR requires a fixed schema before any document can be indexed, just like a relational database"
    ],
    "answer": 1,
    "explanation": "Databases store structured (schema-bound) data and answer exact/formal queries (SELECT ... FROM) with deterministic right-or-wrong, unordered results. IR works over unstructured free text, accepts vague natural-language queries, and returns a ranked list ordered by a probabilistic notion of relevance. The other options swap these properties.",
    "hint": "Think structured/exact/deterministic vs. unstructured/vague/ranked."
  },
  {
    "id": "f_foundations_2",
    "topic": "foundations",
    "type": "mcq",
    "difficulty": "easy",
    "question": "An inverted index maps each term to a postings list of DocIDs. To enable an efficient linear-time intersection (AND) merge, how must each postings list be stored?",
    "options": [
      "Sorted by document length, longest first",
      "Sorted by term frequency within the document, highest first",
      "Sorted by DocID in ascending order",
      "In random order, since the merge re-sorts them anyway"
    ],
    "answer": 2,
    "explanation": "Postings lists are kept sorted by DocID. The AND merge walks both lists with two pointers in a single linear pass O(x+y): if the DocIDs match, emit it and advance both; otherwise advance the pointer at the smaller DocID. This only works because both lists are sorted by DocID.",
    "hint": "Two-pointer merge needs both lists in the same order."
  },
  {
    "id": "f_foundations_3",
    "topic": "foundations",
    "type": "mcq",
    "difficulty": "medium",
    "question": "Why is the IDF weight of a term that appears in EVERY document in the collection exactly 0?",
    "options": [
      "Because tf is 0 for such common terms, so tf-idf collapses to 0",
      "Because df = N makes N/df = 1 and log10(1) = 0, neutralising the term automatically",
      "Because the cosine normalisation step divides it out to 0",
      "Because stop-word lists always remove these terms before IDF is computed"
    ],
    "answer": 1,
    "explanation": "IDF = log10(N/df). If a term occurs in every document then df = N, so N/df = 1 and log10(1) = 0. This is how very common words (like 'the') are automatically down-weighted to zero contribution without needing a stop-word list.",
    "hint": "Plug df = N into log10(N/df)."
  },
  {
    "id": "f_foundations_4",
    "topic": "foundations",
    "type": "mcq",
    "difficulty": "medium",
    "question": "When optimising a multi-term Boolean AND query such as (Brutus AND Caesar AND Calpurnia), what is the 'golden rule' for ordering the intersections to minimise work?",
    "options": [
      "Start with the term that has the LARGEST postings list (highest document frequency)",
      "Start with the term that has the SMALLEST postings list (lowest document frequency)",
      "Process terms in the alphabetical order they appear in the query",
      "Always start with the term whose name is shortest in characters"
    ],
    "answer": 1,
    "explanation": "Intersect the rarest term first (smallest df / shortest postings list). The intermediate result can only shrink as you AND more terms, so starting small keeps every subsequent merge small. For lists of size 50k, 100k, 5, the naive order costs ~100,000 operations while reordering to start with the size-5 list costs ~10. The result is unchanged; only the work differs.",
    "hint": "The running result of an AND can only get smaller."
  },
  {
    "id": "f_foundations_5",
    "topic": "foundations",
    "type": "mcq",
    "difficulty": "medium",
    "question": "On an IR collection of 1,000,000 documents where only 10 are relevant to a query, a 'lazy' engine that returns NOTHING scores an accuracy of (0 + 999,990) / 1,000,000 = 0.99999. Why is accuracy a poor metric here, and what should be used instead?",
    "options": [
      "Accuracy is poor because it ignores ranking; use MRR instead",
      "Accuracy is poor because the huge true-negative count dominates the formula; use precision, recall, and F1 instead",
      "Accuracy is fine here; 99.999% correctly shows the system is excellent",
      "Accuracy is poor because it double-counts false positives; use DCG instead"
    ],
    "answer": 1,
    "explanation": "IR collections are extremely imbalanced (the relevant 'needle' is tiny). Accuracy = (TP+TN)/Total is swamped by the dominant true-negative term, so a useless system that returns nothing still scores ~99.999%. Precision (TP/(TP+FP)) and recall (TP/(TP+FN)) ignore TN and expose the failure; F1 combines them.",
    "hint": "What term swamps (TP+TN)/Total on imbalanced data?"
  },
  {
    "id": "f_foundations_6",
    "topic": "foundations",
    "type": "mcq",
    "difficulty": "medium",
    "question": "Which pairing of an IR phenomenon with the evaluation metric it primarily hurts is correct?",
    "options": [
      "Synonymy (query 'automobile' vs. doc 'car') primarily hurts precision",
      "Polysemy (the word 'jaguar' meaning both car and animal) primarily hurts recall",
      "Synonymy primarily hurts recall, and polysemy primarily hurts precision",
      "Both synonymy and polysemy primarily hurt only the F1 of stop-words"
    ],
    "answer": 2,
    "explanation": "Synonymy ('many words, one meaning') means a relevant document using a different word is missed, lowering recall. Polysemy ('one word, many meanings') means irrelevant-sense documents are retrieved as noise, lowering precision. This is the standard mnemonic from the Vector Space Model limitations.",
    "hint": "Missed documents = recall; noisy retrieved documents = precision."
  },
  {
    "id": "f_foundations_7",
    "topic": "foundations",
    "type": "mcq",
    "difficulty": "hard",
    "question": "Compared to BSBI, why is SPIMI (Single-Pass In-Memory Indexing) generally preferred for large-scale indexing?",
    "options": [
      "SPIMI requires a global TermID-to-term mapping built up front, which BSBI cannot do",
      "SPIMI stores (TermID, DocID) pairs and sorts them, giving O(N log N) like BSBI but with less RAM",
      "SPIMI appends DocIDs directly to postings lists in memory and builds the dictionary dynamically, so it needs no sorting of pairs — O(N) instead of O(N log N)",
      "SPIMI is preferred only because it keeps one file handle open per block during the merge"
    ],
    "answer": 2,
    "explanation": "BSBI accumulates (TermID, DocID) pairs and must sort them, O(N log N), wasting memory by repeating the TermID for every occurrence and needing a global TermID map up front. SPIMI appends DocIDs straight onto each term's postings list directly in memory and grows the dictionary dynamically, so no pair-sorting is needed — O(N), more memory-efficient, and it can compress postings immediately.",
    "hint": "Does SPIMI ever sort (TermID, DocID) pairs?"
  },
  {
    "id": "f_foundations_8",
    "topic": "foundations",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "A collection has N = 1000 documents. The term 'network' appears in df = 100 of them, and a particular document contains 'network' 3 times (raw tf = 3). Compute (a) the IDF using idf = log10(N/df), and (b) the tf-idf weight using the raw tf. Show the substitution.",
    "answer": "(a) idf = log10(N/df) = log10(1000/100) = log10(10) = 1.0. (b) tf-idf = tf × idf = 3 × 1.0 = 3.0. So IDF = 1.0 and the tf-idf weight = 3.0.",
    "explanation": "IDF = log10(N/df): N/df = 1000/100 = 10, and log10(10) = 1.0. With raw tf = 3, tf-idf = tf × idf = 3 × 1.0 = 3.0. (Had we used the log-frequency variant 1+log10(3) ≈ 1.477 the weight would be ≈1.477, but the question specifies raw tf.)",
    "hint": "First get N/df, take log10, then multiply by tf."
  },
  {
    "id": "f_foundations_9",
    "topic": "foundations",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "Compute the cosine similarity between the query vector q = [1, 0, 1] and the document vector d = [1, 1, 1] using cosine = (A·B)/(|A||B|). Show the dot product, both magnitudes, and the final value to 2 decimals.",
    "answer": "Dot product q·d = (1×1)+(0×1)+(1×1) = 2. |q| = √(1²+0²+1²) = √2 ≈ 1.414. |d| = √(1²+1²+1²) = √3 ≈ 1.732. cosine = 2 / (1.414 × 1.732) = 2 / 2.449 ≈ 0.82.",
    "explanation": "Numerator is the dot product = 2 (shared terms in positions 1 and 3). Denominator is the product of L2 magnitudes: √2 × √3 = √6 ≈ 2.449. cosine = 2/2.449 ≈ 0.82, indicating a strong but not perfect match (1.0 would be identical direction).",
    "hint": "Cosine = dot product divided by the product of vector lengths."
  },
  {
    "id": "f_foundations_10",
    "topic": "foundations",
    "type": "short-answer",
    "difficulty": "easy",
    "question": "A search returns 10 documents; 6 of them are relevant. The collection contains 20 relevant documents in total. Compute Precision, Recall, and F1 (F1 = 2PR/(P+R)). Show the substitution.",
    "answer": "Precision = rel_retrieved/retrieved = 6/10 = 0.6. Recall = rel_retrieved/total_relevant = 6/20 = 0.3. F1 = 2PR/(P+R) = (2 × 0.6 × 0.3)/(0.6 + 0.3) = 0.36/0.9 = 0.40.",
    "explanation": "Precision asks 'how useful is the result list' = relevant retrieved / retrieved = 6/10 = 0.6. Recall asks 'did we miss anything' = relevant retrieved / total relevant = 6/20 = 0.3. F1 is the harmonic mean: 2(0.6)(0.3)/(0.6+0.3) = 0.36/0.9 = 0.40, sitting closer to the smaller value (0.3) as expected.",
    "hint": "Recall's denominator is the total relevant (20), not what you retrieved."
  },
  {
    "id": "f_foundations_11",
    "topic": "foundations",
    "type": "short-answer",
    "difficulty": "hard",
    "question": "(a) State the minimum (Levenshtein) edit distance between 'kitten' and 'sitting', and name the three single-character edit operations it counts. (b) For the sorted postings DocIDs 33, 45, 52, 90, 120, write the gap-encoded (D-gap) list.",
    "answer": "(a) Edit distance = 3, using the three operations insertion, deletion, and substitution. (kitten→sitten substitute k→s, sitten→sittin substitute e→i, sittin→sitting insert g.) (b) Gaps: 33 (first kept as-is), 45−33=12, 52−45=7, 90−52=38, 120−90=30 → gap list = 33, 12, 7, 38, 30.",
    "explanation": "Levenshtein distance is the minimum number of insertions, deletions, and substitutions to transform one string into another, computed by dynamic programming; kitten→sitting requires 2 substitutions + 1 insertion = 3. Gap (delta) encoding stores the first DocID raw, then the differences between consecutive sorted DocIDs, because small gaps need fewer bits than large raw IDs.",
    "hint": "Edit distance counts insert/delete/substitute; gaps are successive differences with the first value kept."
  },
  {
    "id": "f_foundations_12",
    "topic": "foundations",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "Using the Soundex algorithm (retain first letter; map b,f,p,v→1; c,g,j,k,q,s,x,z→2; d,t→3; l→4; m,n→5; r→6; drop vowels and h,w,y; collapse adjacent duplicate digits; pad/truncate to a letter + 3 digits), encode the surname 'Smith' and briefly say why Soundex is useful.",
    "answer": "Smith: retain 'S'; map remaining consonants m→5, t→3, h→dropped; → S, 5, 3; pad with a zero to four characters → S530. Soundex is useful because it is a phonetic hash: names that sound alike (e.g. Smith and Smyth both encode to S530) collapse to the same code, so it matches spelling/surname variations.",
    "explanation": "Step 1 keep 'S'. Step 2 encode consonants: m=5, t=3; vowel 'i' and 'h' are dropped (they act as separators, not coded). That yields S53; pad with a trailing zero to reach the fixed letter+3-digit format → S530. Smyth produces the same S530, illustrating that homophones map to one code.",
    "hint": "Keep the first letter, code the consonants, drop vowels/h/w/y, then pad to 4 characters."
  },
  {
    "id": "f_link_1",
    "topic": "link",
    "type": "mcq",
    "difficulty": "easy",
    "question": "In the PageRank model, what does the damping factor d (typically about 0.85) represent?",
    "options": [
      "The probability that the random surfer follows one of the outgoing links on the current page",
      "The probability that the random surfer teleports to a random page",
      "The fraction of pages that are dangling nodes",
      "The number of iterations needed for convergence"
    ],
    "answer": 0,
    "explanation": "The damping factor d is the probability that the random surfer continues by clicking an outgoing link on the current page. The complementary probability (1-d), about 0.15, is the probability of 'teleporting' (jumping) to a uniformly random page. This appears in the formula PR(p) = (1-d)/N + d·Σ PR(q)/L(q).",
    "hint": "Think 'click a link' vs 'jump to a random page'."
  },
  {
    "id": "f_link_2",
    "topic": "link",
    "type": "mcq",
    "difficulty": "easy",
    "question": "In the random-surfer interpretation of PageRank, the (1-d) term in the formula models which behavior?",
    "options": [
      "Following a hyperlink to a connected page",
      "Teleporting (jumping) to a random page in the collection",
      "Stopping browsing entirely",
      "Re-ranking pages by query relevance"
    ],
    "answer": 1,
    "explanation": "With probability (1-d) the surfer abandons the current chain of links and teleports to a uniformly random page. This random jump guarantees the surfer can escape dead ends and rank sinks, ensuring the PageRank computation converges to a unique stationary distribution.",
    "hint": "(1-d)/N is spread equally over all N pages."
  },
  {
    "id": "f_link_3",
    "topic": "link",
    "type": "mcq",
    "difficulty": "medium",
    "question": "A web page has NO outgoing links. What is this type of page called in PageRank, and why is it a problem?",
    "options": [
      "A hub; it absorbs authority from neighbors",
      "A dangling node; it has no out-links so it 'leaks' rank and breaks the column-stochastic structure",
      "A rank source; it generates infinite rank",
      "A teleport node; it always redirects the surfer randomly"
    ],
    "answer": 1,
    "explanation": "A page with no outgoing links is a dangling node (e.g., a PDF or image page). Because it has nowhere to send its PageRank, it would 'leak' probability mass out of the system and the link matrix is no longer column-stochastic. The standard fix is to treat a dangling node as if it links to all pages (distributing its rank uniformly), so the surfer teleports out of it.",
    "hint": "No out-links means rank has nowhere to flow."
  },
  {
    "id": "f_link_4",
    "topic": "link",
    "type": "mcq",
    "difficulty": "medium",
    "question": "Which statement correctly contrasts PageRank and HITS?",
    "options": [
      "PageRank is query-dependent and computed at query time; HITS is query-independent and computed offline",
      "PageRank produces two scores per page (hub and authority); HITS produces one score",
      "PageRank is query-independent, global, and computed offline; HITS is query-dependent and computed on a query-specific subgraph at query time",
      "Both are query-dependent but PageRank uses a damping factor while HITS does not"
    ],
    "answer": 2,
    "explanation": "PageRank computes a single, global, query-independent importance score for every page offline (before any query). HITS is query-dependent: it builds a focused subgraph from the query results, then computes TWO scores per page, hubs and authorities, at query time. HITS does not use a damping factor.",
    "hint": "One global score offline vs two scores on a query subgraph."
  },
  {
    "id": "f_link_5",
    "topic": "link",
    "type": "mcq",
    "difficulty": "medium",
    "question": "In HITS, how are authority and hub scores defined (mutual reinforcement)?",
    "options": [
      "authority(p) = sum of hub scores of pages pointing TO p; hub(p) = sum of authority scores of pages p points TO",
      "authority(p) = sum of authority scores of pages p points to; hub(p) = sum of hub scores of pages pointing to p",
      "authority(p) = number of out-links of p; hub(p) = number of in-links of p",
      "authority and hub are both equal to PageRank(p)"
    ],
    "answer": 0,
    "explanation": "HITS uses mutual reinforcement: a good authority is pointed to by many good hubs, and a good hub points to many good authorities. So authority(p) = Σ hub(q) over all q linking INTO p, and hub(p) = Σ authority(q) over all q that p links OUT to. The two scores are iteratively updated and normalized until convergence.",
    "hint": "Authority gets credit from in-links' hub scores; hub from out-links' authority scores."
  },
  {
    "id": "f_link_6",
    "topic": "link",
    "type": "mcq",
    "difficulty": "hard",
    "question": "Consider a 4-page web. Page A links to B, C, and D. Pages B, C, D have other links but none point back to A. In a single PageRank power-iteration step with d=0.85 and N=4, how much rank does page A contribute to page B?",
    "options": [
      "0.85 × PR(A) / 3",
      "0.85 × PR(A) × 3",
      "(1-0.85)/4 + 0.85 × PR(A)",
      "PR(A) / 4"
    ],
    "answer": 0,
    "explanation": "Page A has L(A) = 3 outgoing links (to B, C, D), so it distributes its rank equally: each recipient gets PR(A)/L(A) = PR(A)/3. With damping, A's contribution to B's new rank is d × PR(A)/L(A) = 0.85 × PR(A)/3. (B's full new score also adds the teleport term (1-d)/N = 0.15/4 plus contributions from any other pages linking to B.)",
    "hint": "Divide a page's rank by its number of out-links, then multiply by d."
  },
  {
    "id": "f_link_7",
    "topic": "link",
    "type": "mcq",
    "difficulty": "hard",
    "question": "Why does adding the teleport term (random jump) guarantee that power iteration for PageRank converges to a unique solution?",
    "options": [
      "It makes the transition matrix sparse, which always converges",
      "It makes the Markov chain irreducible and aperiodic (every page reachable), so a unique stationary distribution exists",
      "It sets all PageRank values equal, removing the need to iterate",
      "It removes all dangling nodes from the graph permanently"
    ],
    "answer": 1,
    "explanation": "The teleport term connects every page to every other page with small probability, making the underlying Markov chain irreducible (every state reachable from every other) and aperiodic. By the Perron-Frobenius / fundamental theorem of Markov chains, such a chain has a unique stationary distribution, which is exactly the PageRank vector that power iteration converges to.",
    "hint": "Irreducible + aperiodic Markov chain = unique stationary distribution."
  },
  {
    "id": "f_link_8",
    "topic": "link",
    "type": "short-answer",
    "difficulty": "easy",
    "question": "Why is the web modeled as a directed graph for link analysis, and what do the nodes and edges represent?",
    "answer": "Nodes = web pages; directed edges = hyperlinks (an edge from page q to page p means q contains a link pointing to p). It must be DIRECTED because a link from q to p does not imply a link from p to q; link direction carries the information about which page is 'endorsing' which (in-links act like votes of importance).",
    "explanation": "Link analysis algorithms (PageRank, HITS) exploit the link structure: in-links to a page are treated as endorsements. Because endorsement is one-way, the graph must be directed, distinguishing in-links from out-links.",
    "hint": "Pages are nodes; hyperlinks are one-way arrows."
  },
  {
    "id": "f_link_9",
    "topic": "link",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "A 3-page web has these links: A→B, A→C, B→C, C→A. Using PR(p) = (1-d)/N + d·Σ PR(q)/L(q) with d=0.85 and N=3, compute the FIRST power-iteration update for PR(A), starting from the uniform initialization PR(A)=PR(B)=PR(C)=1/3.",
    "answer": "Out-degrees: L(A)=2, L(B)=1, L(C)=1. In-links to A: only C (since C→A). Base term = (1-d)/N = 0.15/3 = 0.05. PR(A) = 0.05 + 0.85 × [PR(C)/L(C)] = 0.05 + 0.85 × (0.3333/1) = 0.05 + 0.85 × 0.3333 = 0.05 + 0.2833 = 0.3333. So PR(A) ≈ 0.333 after the first step.",
    "explanation": "Only pages with an edge INTO A contribute. Here just C→A, and C sends its full rank (L(C)=1). The teleport base 0.05 plus 0.85×(1/3) gives ≈0.333. (Coincidentally close to the start value because C kept all its rank.)",
    "hint": "List in-links to A, divide each source's rank by its out-degree, scale by d, add (1-d)/N."
  },
  {
    "id": "f_link_10",
    "topic": "link",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "For the same 3-page web (A→B, A→C, B→C, C→A) with d=0.85, N=3, and uniform start PR=1/3 each, compute the first-iteration PR(C). Show the substitution.",
    "answer": "In-links to C: from A (A→C) and from B (B→C). Out-degrees: L(A)=2, L(B)=1. Base = (1-d)/N = 0.15/3 = 0.05. PR(C) = 0.05 + 0.85 × [PR(A)/L(A) + PR(B)/L(B)] = 0.05 + 0.85 × [(0.3333/2) + (0.3333/1)] = 0.05 + 0.85 × [0.1667 + 0.3333] = 0.05 + 0.85 × 0.5 = 0.05 + 0.425 = 0.475.",
    "explanation": "C receives from A (which splits its rank over 2 out-links, so 1/6 each) and from B (which sends its full 1/3). Sum of contributions = 0.5, times d=0.85 = 0.425, plus teleport 0.05 = 0.475. C ends up highest, matching intuition since both A and B point to it.",
    "hint": "Two pages link to C; remember A splits its rank between B and C."
  },
  {
    "id": "f_link_11",
    "topic": "link",
    "type": "short-answer",
    "difficulty": "hard",
    "question": "Apply ONE iteration of HITS to this 3-page subgraph: P1→P3, P2→P3, P3→P1. Start all authority and hub scores at 1. Compute the new (un-normalized) authority scores for P1, P2, P3, then state which page is the strongest authority.",
    "answer": "Authority(p) = sum of hub scores of pages pointing INTO p (using current hub=1 for all). In-links: P1 has in-link from P3; P2 has none; P3 has in-links from P1 and P2. So auth(P1)=hub(P3)=1; auth(P2)=0; auth(P3)=hub(P1)+hub(P2)=1+1=2. Strongest authority = P3 (auth=2), since two pages point to it.",
    "explanation": "HITS authority update sums the hub scores of in-linking pages. P3 receives links from both P1 and P2, giving it the highest authority. (A hub update would then set hub(p)=Σ auth of out-link targets, and scores are normalized each round.) This shows mutual reinforcement: P3 is a strong authority because it is pointed to by hubs.",
    "hint": "Count in-links and sum the source pages' hub scores."
  },
  {
    "id": "f_link_12",
    "topic": "link",
    "type": "short-answer",
    "difficulty": "hard",
    "question": "Explain what a 'rank sink' is in PageRank, give a simple example, and state how the algorithm prevents rank from being trapped.",
    "answer": "A rank sink is a set of pages that have links among themselves but no links pointing OUT of the set (it forms a trap). Example: pages X→Y and Y→X with no out-links to the rest of the web. Without correction, the random surfer entering {X,Y} would loop forever and accumulate (sink) all the PageRank, starving every other page. The teleport term (1-d) fixes this: with probability 1-d the surfer jumps to a random page, escaping the sink so rank can flow back out. (Dangling nodes are handled similarly by treating them as linking to all pages.)",
    "explanation": "Both dangling nodes and rank sinks would otherwise cause PageRank to leak or pool incorrectly. The random-jump (teleport) component makes the chain irreducible so no subset can permanently trap probability mass.",
    "hint": "A trap with in-links but no out-links; teleport is the escape hatch."
  },
  {
    "id": "f_crawling_1",
    "topic": "crawling",
    "type": "mcq",
    "difficulty": "easy",
    "question": "In the Mercator crawler model, the URL frontier is split into front queues and back queues. What is the primary purpose of the BACK queues?",
    "options": [
      "Enforcing per-host politeness (one queue per host, with a crawl-delay)",
      "Prioritizing high-PageRank URLs so they are fetched first",
      "Eliminating duplicate URLs before they enter the frontier",
      "Resolving hostnames into IP addresses via DNS"
    ],
    "answer": 0,
    "explanation": "In Mercator, prioritization and politeness are decoupled. Front queues handle PRIORITY (a biased selector picks high-priority queues more often). Back queues handle POLITENESS: each back queue holds URLs for a single host, and a min-heap of host ready-times ensures the crawler only pulls from a host's queue once its crawl-delay has elapsed. Prioritization is the front queues' job (so B is wrong); dedup happens earlier in the frontier logic; DNS is a separate resolver.",
    "hint": "Front = which page next (priority); Back = when to fetch from a host (politeness)."
  },
  {
    "id": "f_crawling_2",
    "topic": "crawling",
    "type": "mcq",
    "difficulty": "medium",
    "question": "A Mercator-style crawler keeps a min-heap whose entries are (host, next-fetch-time). What does pulling the MINIMUM element from this heap accomplish?",
    "options": [
      "It selects the highest-PageRank URL to crawl next",
      "It identifies the host that is soonest allowed to be crawled (politeness)",
      "It finds the host with the largest back queue to balance load",
      "It returns the URL that has been waiting in the frontier the longest"
    ],
    "answer": 1,
    "explanation": "The min-heap is keyed on each host's ready time (the earliest time it may be politely fetched again, given its crawl-delay). The minimum entry is the host whose wait expires soonest, so the crawler pulls work from that host's back queue. It is about WHEN (politeness/timing), not about PageRank priority (front queues), queue size, or FIFO insertion order.",
    "hint": "Min of 'next-fetch-time' = the host that becomes available earliest."
  },
  {
    "id": "f_crawling_3",
    "topic": "crawling",
    "type": "mcq",
    "difficulty": "easy",
    "question": "Which statement about the Robots Exclusion Protocol (robots.txt) is CORRECT?",
    "options": [
      "It cryptographically blocks crawlers from downloading disallowed paths",
      "It is advisory only — well-behaved bots obey it, but it is not enforced",
      "It must be placed in every directory of the site to take effect",
      "Disallow rules also hide the files from human users who type the URL"
    ],
    "answer": 1,
    "explanation": "robots.txt is ADVISORY, not enforceable: it relies on crawlers voluntarily honoring it, and malicious bots can ignore it. It also does NOT hide content — disallowed files are still publicly accessible to anyone who requests the URL directly. It must live at the ROOT of the domain (e.g., example.com/robots.txt), not in every directory.",
    "hint": "It's a request to bots, not a lock; files stay public."
  },
  {
    "id": "f_crawling_4",
    "topic": "crawling",
    "type": "mcq",
    "difficulty": "medium",
    "question": "A site's robots.txt contains:\nUser-agent: *\nDisallow: /private/\nUser-agent: Googlebot\nAllow: /private/public-page.html\nWhat may Googlebot do?",
    "options": [
      "Crawl all of /private/ because it has its own block",
      "Crawl /private/public-page.html but not the rest of /private/",
      "Crawl nothing under /private/ because the * rule applies to it too",
      "Ignore the file entirely since two User-agent blocks conflict"
    ],
    "answer": 1,
    "explanation": "Googlebot matches its own specific block, where the only directive is Allow: /private/public-page.html. The general 'User-agent: *' Disallow: /private/ still blocks the rest of /private/ for Googlebot (the Allow is an exception carving out just that one page). So Googlebot may fetch /private/public-page.html but is otherwise excluded from /private/.",
    "hint": "Allow is an exception to a broader Disallow — it carves out one path."
  },
  {
    "id": "f_crawling_5",
    "topic": "crawling",
    "type": "mcq",
    "difficulty": "medium",
    "question": "Why is DNS resolution often described as a bottleneck in large-scale web crawling, and what is the standard mitigation?",
    "options": [
      "DNS uses too much bandwidth; mitigate by compressing responses",
      "Each lookup is synchronous with multiple network round-trips; mitigate with an in-memory DNS cache and prefetching",
      "DNS servers ban crawler IPs; mitigate by rotating user-agents",
      "Hostnames change too often; mitigate by recrawling more frequently"
    ],
    "answer": 1,
    "explanation": "Before fetching a page the crawler must translate a hostname to an IP. Standard DNS lookups are synchronous and involve multiple round-trips (local resolver, root/TLD, authoritative), adding ~20-500ms per URL — enormous at billions of pages. Mitigations: a large in-memory (LRU) DNS cache, prefetching hostnames before the downloader needs them, and batching/parallel resolution. It is a latency problem, not a bandwidth or banning problem.",
    "hint": "Latency from round-trips, multiplied by billions of URLs."
  },
  {
    "id": "f_crawling_6",
    "topic": "crawling",
    "type": "mcq",
    "difficulty": "hard",
    "question": "A distributed crawler assigns URLs to N nodes with hash(host) % N. The cluster grows from 4 nodes to 5. Roughly what fraction of host-to-node assignments change, and how does consistent hashing improve this?",
    "options": [
      "~1/N change with mod N; consistent hashing makes it ~0",
      "~80% change with mod N; consistent hashing moves only ~K/N keys (~1/5)",
      "~K/N change with mod N already; consistent hashing offers no benefit",
      "Exactly 50% change with mod N; consistent hashing also moves 50%"
    ],
    "answer": 1,
    "explanation": "With hash mod N, changing N reshuffles the modulus for almost every key — nearly ALL assignments change (here roughly 80%+ as 4→5). Consistent hashing maps both nodes and keys onto a ring; adding a node only steals keys from its clockwise neighbor, so only about K/N keys move (~1/5 of 1,000,000 = ~200,000) instead of nearly all. Virtual nodes spread each physical node across many ring points for better balance.",
    "hint": "mod N = catastrophic remap; ring = only neighbor's keys move (~K/N)."
  },
  {
    "id": "f_crawling_7",
    "topic": "crawling",
    "type": "mcq",
    "difficulty": "medium",
    "question": "In the MapReduce construction of an inverted index, what is emitted by the Map phase and what does the Reduce phase produce?",
    "options": [
      "Map emits (docID, term); Reduce produces per-document term vectors",
      "Map emits (term, docID) pairs; after shuffle-by-term, Reduce produces the sorted postings list for each term",
      "Map emits full postings lists; Reduce merges duplicate URLs",
      "Map emits (term, tf-idf); Reduce computes cosine similarity"
    ],
    "answer": 1,
    "explanation": "The Map function tokenizes each document and emits a (term, docID) pair for every token. The shuffle phase groups all pairs by term (key). The Reduce function receives a term plus the list of docIDs, sorts/compresses them, and writes the postings list. This transforms a document-centric view into a term-centric inverted index efficiently at scale.",
    "hint": "map: (term, docID) -> shuffle groups by term -> reduce builds postings."
  },
  {
    "id": "f_crawling_8",
    "topic": "crawling",
    "type": "short-answer",
    "difficulty": "easy",
    "question": "List the main stages of the Mercator crawl loop in order, starting from the initial input and ending at storage/indexing.",
    "answer": "Seed URLs -> URL frontier (prioritize + politeness scheduling) -> fetch/download (after DNS resolution) -> parse (extract text and links) -> extract/normalize new URLs -> duplicate check (seen-URL? seen-content?) -> feed new URLs back into the frontier, and pass content to storage/index. The loop repeats continuously.",
    "explanation": "The crawl is a cycle: seeds prime the frontier; the frontier schedules which URL to fetch next (priority) and when (politeness); the downloader fetches HTML after resolving the host's IP via DNS; the parser extracts text and outgoing links; extracted links are deduplicated and the new ones are pushed back into the frontier; parsed content is sent to storage and the indexer. This continuous loop is what lets a crawler keep discovering and refreshing pages.",
    "hint": "It's a cycle that feeds extracted links back into the frontier."
  },
  {
    "id": "f_crawling_9",
    "topic": "crawling",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "Document A produces the shingle set {s1, s2, s3, s4, s5, s6} and document B produces {s4, s5, s6, s7, s8}. Compute the Jaccard similarity J(A,B). At a near-duplicate threshold of 0.9, are they near-duplicates?",
    "answer": "Intersection A∩B = {s4, s5, s6} -> |A∩B| = 3. Union A∪B = {s1..s8} -> |A∪B| = 8. J(A,B) = |A∩B| / |A∪B| = 3/8 = 0.375. Since 0.375 < 0.9, they are NOT near-duplicates.",
    "explanation": "Near-duplicate detection converts each document into a set of k-shingles, then measures overlap with Jaccard = |A∩B|/|A∪B|. Here the three shared shingles over eight distinct total shingles give 0.375, well below the typical 0.9 near-duplicate cutoff, so the documents are considered distinct.",
    "hint": "Jaccard = shared shingles / total distinct shingles."
  },
  {
    "id": "f_crawling_10",
    "topic": "crawling",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "State the key MinHash property and explain why it lets us estimate Jaccard similarity cheaply. If two documents have Jaccard similarity 0.7 and we compute 200 independent MinHash values for each, about how many of those 200 hash positions are expected to match?",
    "answer": "MinHash property: for a random hash/permutation h, P(minhash(A) = minhash(B)) = J(A,B), the Jaccard similarity. So each independent MinHash position agrees with probability equal to the Jaccard. With J = 0.7 over 200 independent hash functions, expected matches = 0.7 × 200 = 140. The fraction of matching signature entries is thus an unbiased estimator of J(A,B).",
    "explanation": "MinHash compresses a large set into a small fixed-length signature while preserving Jaccard. Because each minhash equals across two sets exactly with probability J(A,B), averaging agreement over k independent hashes estimates J without computing the full set intersection. 0.7 × 200 = 140 expected agreements.",
    "hint": "P(equal) = Jaccard, so expected matches = J × (number of hashes)."
  },
  {
    "id": "f_crawling_11",
    "topic": "crawling",
    "type": "short-answer",
    "difficulty": "hard",
    "question": "A distributed crawler/indexer stores K = 1,000,000 keys across a consistent-hashing ring with N = 10 nodes (uniform distribution). (a) About how many keys move when one new node is added? (b) Contrast this with naive hash(key) % N. (c) What are virtual nodes for?",
    "answer": "(a) Adding a node makes the ring have N+1 = 11 nodes; the new node takes over roughly K/(N+1) ≈ 1,000,000/11 ≈ 90,909 keys (often quoted as ~K/N ≈ 100,000) — only the keys falling on the arc before the new node, stolen from its clockwise neighbor. (b) With hash(key) % N, changing N from 10 to 11 changes the modulus for nearly every key, so on the order of ~90%+ of all 1,000,000 keys get remapped — catastrophic reshuffling. (c) Virtual nodes place each physical node at many points around the ring, smoothing load imbalance and making the ~K/N keys move come from many neighbors rather than one, improving balance when nodes join or leave.",
    "explanation": "Consistent hashing's core benefit is that membership changes move only about K/N keys (the new node's clockwise arc), versus mod N which remaps almost everything. Virtual nodes (replicas of each node on the ring) prevent a single physical node from owning one large contiguous arc, giving more even key distribution and smoother rebalancing.",
    "hint": "Ring moves ~K/N keys; mod N moves nearly all; vnodes even out the load."
  },
  {
    "id": "f_crawling_12",
    "topic": "crawling",
    "type": "short-answer",
    "difficulty": "hard",
    "question": "Explain the trade-off between document partitioning (local indexing) and term partitioning (global indexing) in a distributed search index. Which is preferred for large-scale web search and why?",
    "answer": "Document partitioning (local index): each node holds a subset of documents and builds a complete inverted index over just those docs. Queries are broadcast to ALL nodes (scatter-gather); each returns its local top-k and a broker merges them. Pros: easy to add documents/nodes, balanced load, fault-tolerant. Con: every query touches every node (O(N) work). Term partitioning (global index): each node owns a subset of TERMS and their full postings lists. Pro: a single-term query hits one node. Cons: multi-word queries must ship large postings lists across the network to intersect (network bottleneck), and common terms create hot-spot/load-imbalance nodes. Preferred for web search: DOCUMENT partitioning, because it scales updates, balances load, and avoids shipping huge postings lists for intersections; term partitioning is rarely used at web scale.",
    "explanation": "The two ways to split an inverted index across machines are by document or by term. Document partitioning keeps each query's intersection local to a node and only merges small top-k lists at the broker, so it scales and balances well. Term partitioning forces cross-node transfer of large postings for multi-term queries and overloads nodes holding frequent terms, which is why large-scale engines favor document partitioning.",
    "hint": "Doc partitioning = broadcast + merge top-k; term partitioning = ship postings to intersect."
  },
  {
    "id": "f_neural_1",
    "topic": "neural",
    "type": "mcq",
    "difficulty": "easy",
    "question": "In a bi-encoder (two-tower / Dense Passage Retrieval) architecture, why can the entire document collection be indexed before any query arrives?",
    "options": [
      "The query and each document are encoded by separate encoders, so document vectors do not depend on the query and can be precomputed and stored",
      "The bi-encoder concatenates the query and document into one BERT input before scoring",
      "The bi-encoder uses BM25 term statistics that are fixed for the corpus",
      "Document vectors are recomputed from scratch for every incoming query"
    ],
    "answer": 0,
    "explanation": "A bi-encoder uses two independent encoders: one for the query and one for documents. Because the document encoder never sees the query, every document vector can be computed offline once and stored in a vector database. At query time only the query is encoded, then retrieval is a fast nearest-neighbor search. This precomputation is exactly what makes bi-encoders fast enough to be the first stage. A cross-encoder, by contrast, jointly encodes [CLS] Query [SEP] Doc, so it cannot precompute anything.",
    "hint": "Separate encoders means the doc side never sees the query."
  },
  {
    "id": "f_neural_2",
    "topic": "neural",
    "type": "mcq",
    "difficulty": "medium",
    "question": "A production retrieval pipeline retrieves the Top-100 with a bi-encoder and then re-ranks the Top-10 with a cross-encoder. What is the main reason the cross-encoder is NOT used as the first-stage retriever over millions of documents?",
    "options": [
      "Cross-encoders cannot model semantic similarity, only exact keywords",
      "A cross-encoder must jointly encode the query with each document, so it cannot precompute document vectors and would need a full forward pass per document at query time (prohibitively slow at scale)",
      "Cross-encoders produce lower accuracy than bi-encoders",
      "Cross-encoders only work on images, not text"
    ],
    "answer": 1,
    "explanation": "A cross-encoder feeds the query and a document together through BERT (full self-attention between every query token and every document token), so its score for a (query, doc) pair cannot be decomposed or precomputed. Running it over millions of docs at query time would require millions of BERT forward passes, which is far too slow. It is the most accurate but slowest, so it is reserved for re-ranking a small candidate set (e.g. Top-100 to Top-10) produced by the fast bi-encoder. This retrieve-then-rerank split gives both speed and accuracy.",
    "hint": "Joint encoding = no precomputation = one forward pass per doc."
  },
  {
    "id": "f_neural_3",
    "topic": "neural",
    "type": "mcq",
    "difficulty": "easy",
    "question": "A user searches \"affordable Japanese food\" but the relevant restaurant page only contains the word \"cheap sushi.\" A classic BM25 (sparse/lexical) system scores this document near zero. What problem does this illustrate, and how does dense (embedding) retrieval fix it?",
    "options": [
      "Polysemy; dense retrieval fixes it by stemming both words to the same root",
      "Vocabulary mismatch (the semantic gap); dense retrieval maps both query and document into the same vector space where \"affordable\" lands close to \"cheap\"",
      "Spam; dense retrieval fixes it by link analysis",
      "Index compression; dense retrieval fixes it by storing fewer postings"
    ],
    "answer": 1,
    "explanation": "BM25 matches strings, not meanings, so it requires exact term overlap. \"affordable\" and \"cheap\" never overlap lexically, giving a near-zero score. This is the vocabulary-mismatch half of the semantic gap. Dense retrieval encodes the query intent and the document into the same high-dimensional embedding space, where synonyms cluster together, so \"affordable\" sits close to \"cheap\" and the document is retrieved by geometric proximity (cosine/dot product) despite zero shared words.",
    "hint": "Matching strings vs matching things."
  },
  {
    "id": "f_neural_4",
    "topic": "neural",
    "type": "mcq",
    "difficulty": "medium",
    "question": "Which statement best captures the trade-off made by Approximate Nearest Neighbor (ANN) search (e.g. HNSW, IVF/FAISS) compared with exact k-NN over a vector index?",
    "options": [
      "ANN guarantees finding the exact nearest neighbors but uses more memory",
      "ANN sacrifices a small amount of recall (it may miss a few true matches) in exchange for a large speedup, turning roughly O(N) brute-force search into about O(log N)",
      "ANN is always slower than exact search but more accurate",
      "ANN replaces vector similarity with exact keyword matching"
    ],
    "answer": 1,
    "explanation": "Exact k-NN compares the query against every document vector, which is O(N) and takes seconds at the 100M-vector scale. ANN methods partition the space (Voronoi cells / IVF) or build navigable graphs (HNSW) and only search the most promising regions, achieving roughly O(log N). The deliberate trade-off is accepting ~95-99% recall (occasionally missing a true nearest neighbor) to gain a roughly 100x speedup. It trades exactness for speed.",
    "hint": "Accept ~95-99% recall to gain a ~100x speedup."
  },
  {
    "id": "f_neural_5",
    "topic": "neural",
    "type": "mcq",
    "difficulty": "medium",
    "question": "Why are static word embeddings (Word2Vec, GloVe) considered weaker than contextual embeddings (BERT) for disambiguating a word like \"bank\"?",
    "options": [
      "Static embeddings are 768-dimensional while BERT is only one-hot",
      "Static embeddings assign one fixed vector per word, so \"bank\" (river) and \"bank\" (money) get the identical vector — a confusing average of all meanings — whereas BERT computes a vector that depends on the surrounding sentence",
      "Static embeddings cannot be stored in a vector database",
      "BERT ignores word order, but Word2Vec preserves it"
    ],
    "answer": 1,
    "explanation": "Word2Vec and GloVe are context-free: each word type maps to a single fixed vector regardless of sentence. So both senses of \"bank\" collapse to one averaged vector. BERT is contextual: E(word) = f(word, context). In \"I sat by the bank\" the vector leans toward water; in \"I went to the bank\" it leans toward finance. Self-attention lets every token attend to every other token, which is what enables this context disambiguation.",
    "hint": "One vector per word vs a vector that depends on the sentence."
  },
  {
    "id": "f_neural_6",
    "topic": "neural",
    "type": "mcq",
    "difficulty": "medium",
    "question": "In a Retrieval-Augmented Generation (RAG) system, what is the primary mechanism by which retrieving passages and conditioning the LLM on them reduces hallucination?",
    "options": [
      "It increases the model's parameter count so it memorizes more facts",
      "It grounds the answer in retrieved source text the model can cite (\"According to Document A...\"), and lets the model say \"I don't know\" when the information is not retrieved, instead of inventing plausible fictions from parametric memory",
      "It removes the LLM entirely and returns raw documents",
      "It compresses the prompt so the model processes fewer tokens"
    ],
    "answer": 1,
    "explanation": "A pure LLM answers from frozen parametric memory and, when it lacks a fact, fills the gap with confident but false text (it predicts the next plausible word, not the truth). RAG retrieves relevant passages and instructs the model to answer using only that context. The answer is grounded in and can cite specific sources, and if the needed information is absent the model can abstain. This grounding is the core anti-hallucination mechanism; it also enables fresh and private knowledge the model never saw in training.",
    "hint": "Open-book test vs answering from memory."
  },
  {
    "id": "f_neural_7",
    "topic": "neural",
    "type": "mcq",
    "difficulty": "hard",
    "question": "Given the context-window limits of LLMs, which combination of facts about the \"Lost in the Middle\" phenomenon is correct?",
    "options": [
      "LLMs use the middle of a long prompt best and ignore the start and end; the fix is to put key facts in the middle",
      "LLMs tend to use information at the start and end of a long prompt well but often ignore the middle; mitigations include re-ranking so the most relevant passages sit at the top/bottom and retrieving fewer, more precise chunks rather than dumping everything",
      "Lost in the Middle only affects sparse BM25 retrieval, not LLMs",
      "With a 1M-token window the problem disappears entirely, so RAG is no longer needed"
    ],
    "answer": 1,
    "explanation": "Research shows LLMs attend well to information at the beginning and end of a long context but degrade on content buried in the middle. Mitigations: re-rank retrieved passages so the most relevant ones are placed at the start/end (the high-attention zones) and keep the prompt short by retrieving fewer, precise chunks. Larger windows do not solve it; attention is quadratic O(N^2) so longer inputs cost more and still suffer the middle effect, which is exactly why RAG remains necessary for selection, speed, and cost even with huge windows.",
    "hint": "Edges are read; the middle gets ignored."
  },
  {
    "id": "f_neural_8",
    "topic": "neural",
    "type": "short-answer",
    "difficulty": "easy",
    "question": "Define the \"semantic gap\" in information retrieval and name the two classic failure modes of symbolic (lexical) retrieval that arise from it.",
    "answer": "The semantic gap is the mismatch between the user's intent (concepts, needs, meanings) and the system's index, which is built from raw keyword/term postings, so meaning is never captured. The two classic failure modes of symbolic retrieval are: (1) Vocabulary mismatch — query \"automobile repair\" vs document \"car mechanic shop\" scores ~0 because the model does not know car approx automobile; and (2) Polysemy/ambiguity — \"jaguar speed\" scores high for both a cat document and a car document because the keyword is identical but the meanings differ and context is ignored. Neural IR closes the gap by mapping both intent and document into the same vector space so related meanings sit close together.",
    "explanation": "This is the motivating problem for the whole week: symbolic models match strings, not things. Students should be able to name vocabulary mismatch and polysemy and give the canonical examples, then state the neural fix (shared embedding space).",
    "hint": "One failure is synonyms not matching; the other is identical words with different meanings."
  },
  {
    "id": "f_neural_9",
    "topic": "neural",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "Fill in the retrieve-then-rerank pipeline. A search system has 10 million documents. State, for each of the two stages, (a) which model type is used, (b) what it takes as input, (c) what it outputs, and (d) its relative speed and accuracy.",
    "answer": "Stage 1 — Retriever: (a) Bi-encoder (two-tower, with ANN/vector search). (b) Input: all ~10M documents (precomputed vectors) plus the encoded query. (c) Output: Top-100 candidates. (d) Very fast (milliseconds), lower accuracy. Stage 2 — Re-ranker: (a) Cross-encoder (BERT, jointly encoding [CLS] Query [SEP] Doc). (b) Input: the Top-100 candidates from stage 1. (c) Output: Top-10 (re-ordered by relevance). (d) Slow (seconds for the small set), state-of-the-art accuracy. The fast bi-encoder narrows millions to a handful so the expensive cross-encoder only scores ~100 pairs.",
    "explanation": "This is the standard two-stage architecture from the slides: a cheap recall-oriented first stage (bi-encoder + ANN) feeds an expensive precision-oriented second stage (cross-encoder). It is a direct exam target because it ties together speed/accuracy and precomputability.",
    "hint": "Fast and approximate first, slow and exact second."
  },
  {
    "id": "f_neural_10",
    "topic": "neural",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "A query embedding is q = (1, 2, 2). Two document embeddings are A = (2, 0, 1) and B = (0, 3, 4). Using cosine similarity, which document is more relevant to the query? Show the computation.",
    "answer": "Cosine = (q·D)/(|q||D|). |q| = sqrt(1+4+4) = sqrt(9) = 3.\nDoc A: q·A = 1*2 + 2*0 + 2*1 = 2 + 0 + 2 = 4. |A| = sqrt(4+0+1) = sqrt(5) ≈ 2.236. cos = 4/(3*2.236) = 4/6.708 ≈ 0.596.\nDoc B: q·B = 1*0 + 2*3 + 2*4 = 0 + 6 + 8 = 14. |B| = sqrt(0+9+16) = sqrt(25) = 5. cos = 14/(3*5) = 14/15 ≈ 0.933.\nSince 0.933 > 0.596, Document B is more relevant (more semantically similar to the query).",
    "explanation": "Dense retrieval scores relevance as geometric proximity in a shared vector space, typically cosine similarity. The worked steps (dot product over product of magnitudes) give B ≈ 0.933 vs A ≈ 0.596, so B wins. This mirrors how a bi-encoder ranks documents by similarity to the query vector.",
    "hint": "Compute the dot product, then divide by the product of the two vector lengths."
  },
  {
    "id": "f_neural_11",
    "topic": "neural",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "In one or two sentences each, contrast a bi-encoder and a cross-encoder on these four axes: interaction depth, precomputation, speed, and typical role in the pipeline.",
    "answer": "Bi-encoder: shallow interaction — query and document are encoded separately and compared with a single dot-product / cosine; document vectors can be precomputed offline; very fast (supports ANN indexing); role = first-stage retriever (Top-100). Cross-encoder: deep interaction — query and document are concatenated and passed through one BERT so every query token attends to every document token (full self-attention); nothing can be precomputed (one forward pass per pair); slow; role = second-stage re-ranker (Top-10), giving state-of-the-art accuracy.",
    "explanation": "This is the core comparison table of the week. The key causal chain: separate encoders -> precomputable vectors -> fast -> first stage; joint encoding -> full attention -> accurate but no precomputation -> slow -> re-ranking only.",
    "hint": "Separate-and-compare vs concatenate-and-attend."
  },
  {
    "id": "f_neural_12",
    "topic": "neural",
    "type": "short-answer",
    "difficulty": "hard",
    "question": "You are building a RAG system over a private 10 GB company wiki. A colleague says: \"New LLMs have 1-million-token context windows, so we can just paste the whole wiki into the prompt and skip retrieval.\" Give three concrete reasons RAG is still needed even with a huge context window.",
    "answer": "Three reasons: (1) Finite input / selection — 10 GB still vastly exceeds even a 1M-token window, so you must select the most relevant parts; retrieval does that selection. (2) Cost and latency — Transformer attention is quadratic, O(N^2), so doubling the input roughly quadruples compute time and cost; stuffing everything is expensive and slow, while retrieving a few precise chunks keeps the prompt small. (3) \"Lost in the Middle\" / quality — LLMs use information at the start and end of a long prompt well but tend to ignore the middle, so dumping everything buries key facts; RAG retrieves and (via re-ranking) positions only the relevant passages so the model actually attends to them. (Bonus: grounding/citations and fresh-or-private data are still handled by retrieval.)",
    "explanation": "The slide's punchline is \"even with 1M tokens, RAG is still needed for selection, speed, and cost reduction.\" The three pillars are the size/selection problem, the quadratic cost-and-latency problem, and the Lost-in-the-Middle quality problem. A strong answer ties each to its underlying mechanism.",
    "hint": "Think size/selection, quadratic cost, and where attention actually looks."
  },
  {
    "id": "f_recommenders_1",
    "topic": "recommenders",
    "type": "mcq",
    "difficulty": "easy",
    "question": "In a recommender system, the user-item rating matrix is typically described as 'sparse.' What does this mean?",
    "options": [
      "Most entries are filled because every user rates most items",
      "The vast majority of entries are empty because each user has rated only a small fraction of items",
      "The matrix has very few rows and columns",
      "All ratings are stored as floating-point numbers rather than integers"
    ],
    "answer": 1,
    "explanation": "Sparsity refers to the fact that any single user interacts with (rates, clicks, buys) only a tiny fraction of the available items, so the overwhelming majority of cells in the user-item matrix are unknown/empty. This missing-data problem is the central challenge that collaborative filtering and matrix factorization must overcome.",
    "hint": "Think about how many of Amazon's millions of products you personally have rated."
  },
  {
    "id": "f_recommenders_2",
    "topic": "recommenders",
    "type": "mcq",
    "difficulty": "easy",
    "question": "Content-based filtering recommends items to a user primarily based on:",
    "options": [
      "The ratings given by other users who are similar to this user",
      "The features/attributes of items the user has previously liked, matched against a user profile",
      "The overall popularity ranking of items across all users",
      "Latent factors discovered by factorizing the rating matrix"
    ],
    "answer": 1,
    "explanation": "Content-based filtering builds an item feature vector (e.g., genre, keywords, attributes) for each item and a user profile vector summarizing the features of items the user liked. New items are scored by similarity (often cosine) between their feature vector and the user profile. It does not require other users' data, unlike collaborative filtering.",
    "hint": "It works even if you are the only user in the system."
  },
  {
    "id": "f_recommenders_3",
    "topic": "recommenders",
    "type": "mcq",
    "difficulty": "medium",
    "question": "Which statement best distinguishes user-user collaborative filtering from item-item collaborative filtering?",
    "options": [
      "User-user CF computes similarity between item columns; item-item CF computes similarity between user rows",
      "User-user CF computes similarity between user rows (find similar users); item-item CF computes similarity between item columns (find similar items)",
      "Both compute similarity over user rows but differ only in the prediction formula",
      "Item-item CF requires item feature vectors, while user-user CF does not"
    ],
    "answer": 1,
    "explanation": "User-user CF measures similarity between users by comparing their rows in the rating matrix, finds the k most similar users, and predicts from their ratings. Item-item CF measures similarity between items by comparing their columns, then predicts a target rating from the user's OWN ratings on similar items. Neither requires content/feature vectors (that would be content-based).",
    "hint": "Rows = users, columns = items."
  },
  {
    "id": "f_recommenders_4",
    "topic": "recommenders",
    "type": "mcq",
    "difficulty": "medium",
    "question": "Companies like Amazon and Netflix have historically favored item-item collaborative filtering over user-user CF. What is the main reason?",
    "options": [
      "Item-item CF always produces more diverse recommendations",
      "Item-based similarities are more stable over time and the approach scales better since items change less frequently than users' tastes",
      "Item-item CF does not require any rating data",
      "User-user CF cannot use cosine similarity"
    ],
    "answer": 1,
    "explanation": "Item-item similarities (e.g., 'people who bought X also bought Y') change slowly and can be precomputed offline, whereas users' preferences shift constantly and the user base grows rapidly. With far more users than items in many catalogs, and more stable item relationships, item-item CF is more scalable and stable, which is why Amazon's classic recommender used it.",
    "hint": "Which changes more often: the relationship between two products, or a user's mood?"
  },
  {
    "id": "f_recommenders_5",
    "topic": "recommenders",
    "type": "mcq",
    "difficulty": "medium",
    "question": "In matrix factorization for recommendation, the rating matrix R (users x items) is approximated as R ≈ U·Vᵀ. What is the predicted rating for user u on item i?",
    "options": [
      "The cosine similarity between row u of U and column i of V",
      "The dot product of user u's latent-factor vector (a row of U) and item i's latent-factor vector (a row of V)",
      "The average of all known ratings in row u",
      "The number of latent factors k"
    ],
    "answer": 1,
    "explanation": "Matrix factorization learns a k-dimensional latent vector for each user (rows of U) and each item (rows of V). The predicted rating r̂(u,i) is the dot product of user u's latent vector and item i's latent vector. Choosing k << number of users/items compresses the data and lets the model generalize to unrated entries.",
    "hint": "R ≈ U·Vᵀ means each cell is a vector dot product."
  },
  {
    "id": "f_recommenders_6",
    "topic": "recommenders",
    "type": "mcq",
    "difficulty": "medium",
    "question": "Which of the following is a symptom of the 'cold-start' problem in recommender systems?",
    "options": [
      "The system runs out of memory when the rating matrix becomes too large",
      "A brand-new user or a brand-new item has no rating history, so collaborative filtering cannot generate or receive good recommendations",
      "Two users with identical tastes are recommended different items",
      "Cosine similarity returns a value greater than 1"
    ],
    "answer": 1,
    "explanation": "Cold-start occurs when there is insufficient interaction data: a new user has rated nothing (so we can't find similar users), or a new item has been rated by no one (so it never appears in CF recommendations). It is fundamentally a data-availability problem, not a memory or arithmetic issue.",
    "hint": "It's about having no history yet."
  },
  {
    "id": "f_recommenders_7",
    "topic": "recommenders",
    "type": "mcq",
    "difficulty": "easy",
    "question": "Which of the following is NOT a standard approach to mitigating the cold-start problem?",
    "options": [
      "Using content features (item attributes / user demographics) to recommend before ratings exist",
      "Recommending globally popular items to brand-new users",
      "An onboarding step that asks new users to rate a few items or pick interests",
      "Deleting all new users and items until the matrix becomes fully dense"
    ],
    "answer": 3,
    "explanation": "Common cold-start remedies include: content-based features (which don't need a user's rating history), popularity-based defaults for new users, onboarding questionnaires to seed a profile, and hybrid systems that blend content and collaborative signals. Deleting new users/items is not a real solution and defeats the purpose of the system.",
    "hint": "Three of these are real strategies; one is absurd."
  },
  {
    "id": "f_recommenders_8",
    "topic": "recommenders",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "Content-based filtering. An item is described by a 3-feature vector [action, comedy, romance]. Movie X = [1, 0, 1] and the user's profile vector = [3, 0, 1]. Compute the cosine similarity between Movie X and the user profile. Show your work.",
    "answer": "Cosine = (A·B)/(|A||B|). Dot product A·B = (1)(3) + (0)(0) + (1)(1) = 3 + 0 + 1 = 4. |A| = sqrt(1²+0²+1²) = sqrt(2) ≈ 1.414. |B| = sqrt(3²+0²+1²) = sqrt(10) ≈ 3.162. Cosine = 4 / (1.414 × 3.162) = 4 / 4.472 ≈ 0.894.",
    "explanation": "Content-based filtering scores a candidate item by the cosine between its feature vector and the user's profile vector. A high cosine (≈0.89 here) means the movie strongly matches the user's demonstrated tastes (heavy on action, some romance, no comedy), so it would be recommended.",
    "hint": "cosine = dot / (norm × norm)."
  },
  {
    "id": "f_recommenders_9",
    "topic": "recommenders",
    "type": "short-answer",
    "difficulty": "hard",
    "question": "User-user CF, similarity-weighted prediction. We want to predict user Alice's rating for a movie she hasn't seen. Two neighbors rated it: Bob (rating 4, similarity to Alice 0.8) and Carol (rating 2, similarity to Alice 0.6). Using the similarity-weighted average prediction r̂ = Σ(sim·rating) / Σ(sim), compute Alice's predicted rating. Show the substitution.",
    "answer": "r̂ = Σ(sim×rating) / Σ(sim) = (0.8×4 + 0.6×2) / (0.8 + 0.6) = (3.2 + 1.2) / 1.4 = 4.4 / 1.4 ≈ 3.14.",
    "explanation": "In user-user CF, the prediction is a weighted average of the neighbors' ratings, where each neighbor's weight is its similarity to the target user. Bob is more similar (0.8) and rated higher (4), pulling the estimate up; Carol is less similar (0.6) and rated lower (2). The result ≈3.14 lands between the two ratings but closer to Bob's because of his higher similarity weight.",
    "hint": "Weight each rating by similarity, then divide by the total similarity."
  },
  {
    "id": "f_recommenders_10",
    "topic": "recommenders",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "Item-item CF cosine similarity. Two items are represented by their rating columns over 3 users: Item A = [5, 3, 0] and Item B = [4, 0, 2] (a 0 means not rated, treated here as the value 0). Compute the cosine similarity between Item A and Item B.",
    "answer": "Cosine = (A·B)/(|A||B|). A·B = (5)(4) + (3)(0) + (0)(2) = 20 + 0 + 0 = 20. |A| = sqrt(25+9+0) = sqrt(34) ≈ 5.831. |B| = sqrt(16+0+4) = sqrt(20) ≈ 4.472. Cosine = 20 / (5.831 × 4.472) = 20 / 26.08 ≈ 0.767.",
    "explanation": "Item-item CF compares item COLUMNS of the rating matrix. The cosine ≈0.77 indicates the two items are fairly similar in how users rated them. Such a similarity would later be used as a weight to predict a user's rating on one item from their own rating on the other.",
    "hint": "Compare columns (items), not rows (users)."
  },
  {
    "id": "f_recommenders_11",
    "topic": "recommenders",
    "type": "short-answer",
    "difficulty": "easy",
    "question": "Matrix factorization prediction. After factorizing the rating matrix, user u has latent vector [1.0, 0.5] and item i has latent vector [2.0, 4.0]. Compute the predicted rating r̂(u,i) as the dot product of these two latent vectors.",
    "answer": "r̂(u,i) = u·i = (1.0)(2.0) + (0.5)(4.0) = 2.0 + 2.0 = 4.0.",
    "explanation": "In matrix factorization (R ≈ U·Vᵀ) the predicted rating is the dot product of the user's and item's k-dimensional latent factor vectors. Here k=2 and the dot product gives r̂ = 4.0, the model's estimate of how user u would rate item i even though that cell was originally empty.",
    "hint": "Just multiply componentwise and sum."
  },
  {
    "id": "f_recommenders_12",
    "topic": "recommenders",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "Briefly contrast content-based filtering and collaborative filtering in terms of (a) what data each one uses and (b) one limitation of each.",
    "answer": "(a) Content-based filtering uses item feature/attribute vectors plus a user's own past likes (a user profile); it ignores other users. Collaborative filtering uses the user-item rating matrix (other users'/items' ratings) and needs no item features. (b) Content-based limitation: it can over-specialize/limit serendipity (only recommends items similar to what you already liked) and needs good features. Collaborative limitation: it suffers from cold-start and sparsity (can't recommend to/for new users or items with no ratings).",
    "explanation": "The key conceptual split: content-based reasons about item attributes for a single user, while collaborative reasons about patterns across many users/items. Content-based avoids new-item cold-start (a new item still has features) but tends to narrow recommendations; collaborative captures taste patterns content can't describe but breaks down without enough ratings. Hybrid systems combine both to cover each other's weaknesses.",
    "hint": "One looks at item attributes; the other looks at the crowd's ratings."
  },
  {
    "id": "f_conversational_1",
    "topic": "conversational",
    "type": "mcq",
    "difficulty": "easy",
    "question": "In the classic modular dialogue pipeline, which component is responsible for tracking the belief state (the accumulated context of slot values) across multiple turns of a conversation?",
    "options": [
      "NLU (Natural Language Understanding)",
      "DST (Dialogue State Tracking)",
      "Dialogue Policy",
      "NLG (Natural Language Generation)"
    ],
    "answer": 1,
    "explanation": "The pipeline is NLU -> DST -> Policy -> NLG. NLU does intent classification and slot filling for the current utterance; DST maintains the belief state across turns (e.g., {dest:'London', date:null}); the Policy chooses the next action; NLG produces the surface response. Tracking context across turns is DST's job.",
    "hint": "Which stage 'remembers' what was said in earlier turns?"
  },
  {
    "id": "f_conversational_2",
    "topic": "conversational",
    "type": "mcq",
    "difficulty": "easy",
    "question": "A ReAct agent answers a question by repeatedly looping through three steps. What is the correct order of those steps?",
    "options": [
      "Action -> Thought -> Observation",
      "Observation -> Action -> Thought",
      "Thought -> Action -> Observation",
      "Thought -> Observation -> Action"
    ],
    "answer": 2,
    "explanation": "ReAct (Reason + Act) interleaves an internal Thought ('I need to search for X'), an external Action (call a tool/API), and an Observation (read the tool's result). The loop repeats until the agent has enough information to answer. The defining feature is reasoning and acting in alternation, starting from a Thought.",
    "hint": "It reasons first, then acts, then reads the result."
  },
  {
    "id": "f_conversational_3",
    "topic": "conversational",
    "type": "mcq",
    "difficulty": "medium",
    "question": "Which statement best distinguishes a task-oriented dialogue system from an open-domain (chit-chat) system?",
    "options": [
      "Task-oriented systems are evaluated by engagement time, while open-domain systems are evaluated by task success rate",
      "Task-oriented systems work in a restricted domain using slot filling and are evaluated by success rate / number of turns, while open-domain systems are unrestricted and evaluated by engagement and coherence",
      "Open-domain systems use slot filling, while task-oriented systems can talk about anything",
      "Both are evaluated identically using BLEU score against a single gold reference"
    ],
    "answer": 1,
    "explanation": "Task-oriented systems (Siri, Alexa, support bots) complete a specific task in a restricted domain via slot filling, and success metrics are task success rate and number of turns. Open-domain systems (Replika, Meena, BlenderBot, XiaoIce) aim at engagement in an unrestricted domain and are judged on engagement time and coherence.",
    "hint": "One books your flight; the other keeps you chatting."
  },
  {
    "id": "f_conversational_4",
    "topic": "conversational",
    "type": "mcq",
    "difficulty": "medium",
    "question": "A developer must choose a chatbot architecture. They need responses that are 100% safe and predictable for a regulated medical FAQ, with no risk of fabricated content. Which type is most appropriate?",
    "options": [
      "A generative LLM with no guardrails",
      "A rule-based / retrieval system using template or canned responses",
      "An open-domain chit-chat model optimized for engagement",
      "A federated-learning model trained on user devices"
    ],
    "answer": 1,
    "explanation": "Rule-based and retrieval chatbots return predefined (template/canned) responses, so they cannot hallucinate new content and are predictable — ideal for safety-critical, regulated answers. Generative LLMs produce natural, varied text but can hallucinate. The trade-off is naturalness vs. safety: rule/retrieval = safe but rigid, generative = natural but risky.",
    "hint": "Safety and predictability over creativity."
  },
  {
    "id": "f_conversational_5",
    "topic": "conversational",
    "type": "mcq",
    "difficulty": "medium",
    "question": "In multimodal search systems such as CLIP, how is a text query able to retrieve relevant images directly (without relying on metadata tags)?",
    "options": [
      "The text is first converted into a tag list that is matched against image filenames",
      "Images and text are mapped into a shared embedding space, so a text query and an image can be compared by cosine similarity",
      "Each image is captioned by a human and the caption is keyword-matched",
      "The system runs OCR on every image to extract searchable words"
    ],
    "answer": 1,
    "explanation": "CLIP uses a separate image encoder and text encoder but trains them to place matching (image, text) pairs close together in one shared (unified) embedding space. Retrieval is then just cosine similarity between the query embedding and image embeddings — no metadata or captions required. Training maximizes cosine similarity on the diagonal of the (image, text) matrix and minimizes off-diagonal pairs.",
    "hint": "Both modalities live in the same vector space."
  },
  {
    "id": "f_conversational_6",
    "topic": "conversational",
    "type": "mcq",
    "difficulty": "medium",
    "question": "In a knowledge graph, the fundamental unit of data is a 'triple.' Which option is a correctly formed triple in (Subject, Predicate, Object) form?",
    "options": [
      "(France, Paris, isCapitalOf)",
      "(Paris, isCapitalOf, France)",
      "(isCapitalOf, Paris, France)",
      "(Paris, France, capital)"
    ],
    "answer": 1,
    "explanation": "A knowledge-graph triple is (Subject, Predicate, Object): the subject and object are entities (nodes) and the predicate is the relation (edge). The canonical example is (Paris, isCapitalOf, France) — subject Paris, relation isCapitalOf, object France. Entity search treats these as real-world objects, not just strings.",
    "hint": "Subject first, the relation in the middle, object last."
  },
  {
    "id": "f_conversational_7",
    "topic": "conversational",
    "type": "mcq",
    "difficulty": "hard",
    "question": "In federated learning for privacy-preserving search, what specifically leaves the user's device and is sent to the central server?",
    "options": [
      "The user's raw search history and queries",
      "The learned model updates (gradients), not the raw data",
      "A fully decrypted copy of the global model after each query",
      "Nothing — the global model is never updated"
    ],
    "answer": 1,
    "explanation": "Federated learning trains the model locally on-device; only the learned patterns / model updates (gradients) are sent to the server, which aggregates them into a smarter global model. The privacy guarantee is that raw data never leaves the device. Two key trade-offs are communication cost (sending updates each round) and non-IID data (each device's data is unrepresentative of the whole).",
    "hint": "Share what was learned, not the data itself."
  },
  {
    "id": "f_conversational_8",
    "topic": "conversational",
    "type": "short-answer",
    "difficulty": "easy",
    "question": "List the four stages of the classic modular dialogue pipeline in order, and state in one phrase what each stage produces or does.",
    "answer": "1) NLU (Natural Language Understanding) — classifies the intent and fills slots from the user's utterance (e.g., intent=BookFlight, slot Dest=London). 2) DST (Dialogue State Tracking) — updates and maintains the belief state across turns (e.g., {dest:'London', date:null}). 3) Dialogue Policy — selects the next system action (e.g., AskDate). 4) NLG (Natural Language Generation) — turns the chosen action into a surface response (e.g., 'When do you want to leave?').",
    "explanation": "The mnemonic backbone of conversational AI is NLU -> DST -> Policy -> NLG: understand the turn, track context, decide the next action, then generate the reply. Knowing both the order and the input/output of each stage is a common exam requirement.",
    "hint": "Understand, track, decide, speak."
  },
  {
    "id": "f_conversational_9",
    "topic": "conversational",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "A user says 'Book a flight to Boston,' then immediately corrects: 'No, Austin.' Explain what the Dialogue State Tracking (DST) component must do here, and why this is harder than simply appending new information.",
    "answer": "DST must OVERWRITE the destination slot, not append a second value. After turn 1 the belief state is {dest:'Boston'}; after the correction it must become {dest:'Austin'} (Boston removed). The difficulty is that the system has to recognize the second utterance as a correction of an existing slot rather than as new, additional information — if it merely appends, the state would hold two conflicting destinations. Related DST challenges include coreference ('book that one') and ASR noise, often handled by keeping a probability distribution (soft state) over slot values.",
    "explanation": "Corrections are a core DST challenge: the new value replaces the old one for the same slot. This tests understanding that DST is stateful belief tracking, not just accumulation, and that the system must reconcile conflicting evidence across turns.",
    "hint": "Same slot, new value — replace, don't add."
  },
  {
    "id": "f_conversational_10",
    "topic": "conversational",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "Contrast a one-shot LLM answer with a ReAct agent for the question 'Who is older, Obama or Trump?' Describe how the ReAct trace would proceed and why it is more reliable for factual questions.",
    "answer": "A one-shot LLM answers in a single forward pass from its parametric (frozen) memory, so it may hallucinate or use stale facts. A ReAct agent interleaves Thought -> Action -> Observation: [Thought] 'I need both birth dates.' [Action] Search('Barack Obama birth date'). [Observation] August 4, 1961. [Action] Search('Donald Trump birth date'). [Observation] June 14, 1946. [Thought] 1946 is earlier than 1961. [Answer] Trump is older (born 1946). It is more reliable because it gathers up-to-date, verifiable facts via tool use before reasoning, instead of guessing from memory.",
    "explanation": "ReAct combines reasoning (Chain-of-Thought) with acting (tool calls). One-shot answers risk hallucination on facts the model wasn't trained on or that changed; ReAct grounds the answer in retrieved observations, reducing hallucination and enabling multi-step lookups.",
    "hint": "One pass vs. interleaving thoughts and tool calls."
  },
  {
    "id": "f_conversational_11",
    "topic": "conversational",
    "type": "short-answer",
    "difficulty": "medium",
    "question": "Compare a traditional information-retrieval search engine with an agentic search system across goal, interaction mode, and output. Give one example query/task for each.",
    "answer": "Goal: IR finds documents; agentic search completes tasks. Interaction: IR is read-only; an agent is read-and-write (it acts on the world via tools/APIs). Output: IR returns ranked links ('10 blue links'); an agent returns a final completed result. Example — IR: 'Flight prices to NY' (returns a list of options). Agentic: 'Book the 5pm flight to NY' (plans, calls the booking tool/API, and completes the booking). The key enabler is LLMs (reasoning) plus tools (APIs).",
    "explanation": "The defining shift in Week 12 is from retrieving information to taking action. IR ends at a list of links for the user to act on; an agentic system plans and executes the task itself, so its output is an accomplished goal rather than documents.",
    "hint": "Find documents vs. complete tasks; links vs. a done result."
  },
  {
    "id": "f_conversational_12",
    "topic": "conversational",
    "type": "short-answer",
    "difficulty": "hard",
    "question": "A standard RAG system retrieves isolated text chunks and answers 'How are X and Y related?' poorly. Explain why GraphRAG handles such multi-hop questions better, and state the one-line slogan that captures why combining LLMs with knowledge graphs reduces hallucination.",
    "answer": "Standard RAG fetches independent text passages by similarity; for a multi-hop relational question it often retrieves chunks about X and chunks about Y separately, with no explicit link between them, so the LLM cannot reliably 'connect the dots.' GraphRAG instead retrieves a SUBGRAPH — the relevant entities plus the relationships (triples) connecting them — giving the LLM structured, explicit context for the path from X to Y. This grounds the answer in verified facts and can fix hallucinations by checking generated claims against the knowledge graph's triples. Slogan: 'LLMs provide the fluency, Knowledge Graphs provide the facts.'",
    "explanation": "Multi-hop questions need the relationships between entities, which flat text chunks don't preserve. GraphRAG retrieves entities and their relations as a subgraph, so the reasoning path is explicit. The neuro-symbolic combination uses neural fluency plus symbolic, factual structure to reduce hallucination.",
    "hint": "Retrieve subgraphs (entities + relations), not isolated chunks."
  }
];
