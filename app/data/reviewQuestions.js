// Midterm Review Zone — 100 Practice Questions
// All questions are original practice material, not from any exam.

export const reviewTopics = [
  { id: 'all', label: 'All Topics', icon: '📚' },
  { id: 'preprocessing', label: 'Text Processing & Tolerant Retrieval', icon: '🔤' },
  { id: 'indexing', label: 'Index Construction & Queries', icon: '🏗️' },
  { id: 'tfidf', label: 'TF-IDF & Vector Space Model', icon: '📐' },
  { id: 'evaluation', label: 'Evaluation in IR', icon: '📊' },
];

// Helper to build MCQ objects compactly
const mcq = (id, topic, diff, q, opts, ans, exp) => ({ id, topic, type:'mcq', difficulty:diff, question:q, options:opts, answer:ans, explanation:exp });
const sa = (id, topic, diff, q, ans, exp) => ({ id, topic, type:'short-answer', difficulty:diff, question:q, answer:ans, explanation:exp });

export const reviewQuestions = [
  // ══════════════════════════════════════════════════════
  //  PREPROCESSING & TOLERANT RETRIEVAL — MCQs (1-15)
  // ══════════════════════════════════════════════════════
  mcq('m01','preprocessing','easy',
    'During offline indexing, which of these activities is NOT part of the standard document preprocessing pipeline?',
    ['Tokenization','Case folding','Relevance feedback','Lemmatization'], 2,
    'Relevance feedback happens at query time to refine results. The preprocessing pipeline includes tokenization, normalization (case folding), and stemming/lemmatization.'),

  mcq('m02','preprocessing','easy',
    'What is the relationship between tokens and types in a text corpus?',
    ['Tokens are unique words; types are repeated words','Types are instances; tokens are unique vocabulary entries','Tokens are instances of words in text; types are unique vocabulary entries','They are synonyms'], 2,
    'Tokens are individual word occurrences (e.g., "the" appears 3 times = 3 tokens). Types are distinct vocabulary entries (e.g., {the, cat, sat} = 3 types).'),

  mcq('m03','preprocessing','medium',
    'Which technique groups names like "Smith" and "Smyth" into the same equivalence class?',
    ['Edit distance computation','Porter stemming algorithm','Soundex phonetic encoding','Bigram indexing'], 2,
    'Soundex maps names to a letter + 3-digit code based on pronunciation, grouping phonetically similar names regardless of spelling differences.'),

  mcq('m04','preprocessing','medium',
    'Why might aggressive case folding cause problems in an IR system?',
    ['It increases index size significantly','It can merge distinct concepts like "US" (country) and "us" (pronoun)','It removes all punctuation marks','It prevents stemming from working'], 1,
    'Case folding "US" → "us" loses the distinction between the country abbreviation and the pronoun. Named entities and acronyms are common exceptions.'),

  mcq('m05','preprocessing','medium',
    'What is the primary benefit of removing stop words from an index?',
    ['It improves query latency by 50x','It reduces index size by roughly 30-40%','It eliminates all ambiguous terms','It enables phrase queries'], 1,
    'Common words like "the", "is", "and" appear in nearly every document. Removing them shrinks the inverted index by ~30-40%.'),

  mcq('m06','preprocessing','easy',
    'The Porter Stemmer reduces words using:',
    ['A dictionary lookup of base forms','Sequential rule-based suffix stripping','Neural network predictions','Regular expression matching'], 1,
    'Porter Stemmer applies a series of conditional suffix-stripping rules (e.g., remove "ing", "tion") in multiple steps based on vowel-consonant patterns.'),

  mcq('m07','preprocessing','hard',
    'Which approach would best handle the wildcard query "pro*ing"?',
    ['Standard inverted index lookup','Permuterm index rotation','Positional index search','Champion list lookup'], 1,
    'The Permuterm index rotates "pro*ing$" to "ing$pro*", converting a mid-wildcard query into a trailing wildcard query that can be answered with a B-tree lookup.'),

  mcq('m08','preprocessing','medium',
    'In the Levenshtein distance algorithm, what are the three allowed operations?',
    ['Split, merge, transpose','Insert, delete, substitute','Compress, expand, swap','Prefix, suffix, infix'], 1,
    'Levenshtein edit distance counts the minimum number of single-character insertions, deletions, or substitutions needed to transform one string into another.'),

  mcq('m09','preprocessing','easy',
    'What is the purpose of a k-gram index in an IR system?',
    ['To store document summaries','To support approximate string matching and wildcard queries','To compute TF-IDF scores faster','To rank documents by relevance'], 1,
    'K-gram indexes decompose terms into overlapping character sequences (e.g., "hello" → $he, hel, ell, llo, lo$) to support fuzzy matching and wildcard queries.'),

  mcq('m10','preprocessing','medium',
    'Given Heap\'s law M = kT^b, what does it predict about vocabulary growth?',
    ['Vocabulary grows linearly with corpus size','Vocabulary grows sub-linearly — new terms appear less frequently as the corpus grows','Vocabulary size is constant regardless of corpus size','Vocabulary doubles every time the corpus doubles'], 1,
    'Heap\'s law shows vocabulary grows as a power of corpus size with b < 1 (typically 0.4-0.6), meaning growth slows as more text is processed.'),

  mcq('m11','preprocessing','easy',
    'Stemming differs from lemmatization in that:',
    ['Stemming always produces real dictionary words','Lemmatization uses rule-based suffix stripping','Stemming may produce non-word stems; lemmatization returns actual dictionary forms','They are identical processes'], 2,
    'Stemming (Porter) aggressively strips suffixes and may produce non-words (e.g., "studies" → "studi"). Lemmatization uses morphological analysis and a dictionary to return valid base forms (e.g., "studies" → "study").'),

  mcq('m12','preprocessing','hard',
    'When computing edit distance between two strings of length m and n, what is the space complexity of the standard DP approach?',
    ['O(m × n)','O(m + n)','O(max(m, n))','O(min(m, n))'], 0,
    'The standard DP approach builds an (m+1) × (n+1) matrix, requiring O(m × n) space. An optimized version can use O(min(m,n)) by keeping only two rows.'),

  mcq('m13','preprocessing','medium',
    'Zipf\'s law states that word frequency is:',
    ['Uniformly distributed across all terms','Inversely proportional to the word\'s rank','Proportional to document length','Random and unpredictable'], 1,
    'Zipf\'s law: frequency ∝ 1/rank. The most frequent word appears roughly twice as often as the second most frequent, three times the third, etc.'),

  mcq('m14','preprocessing','easy',
    'What does the Soundex code "R163" tell you about the encoded name?',
    ['The name has 4 syllables','The name starts with R and the remaining consonants map to 1, 6, 3','The name has a Levenshtein distance of 163 from "R"','The name appears in document 163'], 1,
    'Soundex keeps the first letter and replaces consonants with digits: B/F/P/V→1, C/G/J/K/Q/S/X/Z→2, D/T→3, L→4, M/N→5, R→6. Vowels and H/W/Y are dropped.'),

  mcq('m15','preprocessing','medium',
    'Which normalization technique would help match "colour" and "color"?',
    ['Stop word removal','Equivalence classing using manually maintained synonym lists','Case folding','Gamma encoding'], 1,
    'Spelling variants across dialects (colour/color, analyse/analyze) require equivalence classes — manually maintained mappings that treat variants as the same term.'),

  // ══════════════════════════════════════════════════════
  //  INDEX CONSTRUCTION & QUERIES — MCQs (16-30)
  // ══════════════════════════════════════════════════════
  mcq('m16','indexing','easy',
    'What is the core data structure that powers virtually every search engine?',
    ['B+ tree','Hash table','Inverted index','Red-black tree'], 2,
    'An inverted index maps each unique term to a sorted list of document IDs (postings list) containing that term, enabling fast term-based lookup.'),

  mcq('m17','indexing','medium',
    'When processing the Boolean query "A AND B", the algorithm:',
    ['Computes the union of both postings lists','Finds the intersection of both postings lists','Subtracts B\'s list from A\'s list','Concatenates both lists and sorts'], 1,
    'Boolean AND requires documents that contain BOTH terms — a set intersection of their sorted postings lists, walkable in O(len(A) + len(B)) time.'),

  mcq('m18','indexing','medium',
    'What technique allows postings list intersection to skip over large blocks of non-matching IDs?',
    ['Gap encoding','Variable-byte compression','Skip pointers','Gamma codes'], 2,
    'Skip pointers are additional forward links placed every √n entries in a postings list. During intersection, if the current element is too small, the algorithm can jump ahead.'),

  mcq('m19','indexing','medium',
    'For the query "New York", a standard inverted index cannot guarantee correct results because:',
    ['It doesn\'t store term positions within documents','It cannot handle capitalized terms','It doesn\'t support multi-word queries','It only stores binary term presence'], 0,
    'A basic inverted index stores (term → doc list) but not WHERE terms appear. "New" and "York" might appear in the same document but far apart. A positional index is needed for phrase queries.'),

  mcq('m20','indexing','hard',
    'In MapReduce-based distributed indexing, the Map phase outputs:',
    ['Compressed postings lists','(termID, docID) pairs','Final inverted index segments','TF-IDF scores'], 1,
    'Mappers parse documents and emit (term, docID) pairs. The shuffle phase groups by term, and Reducers build the final postings list for each term.'),

  mcq('m21','indexing','medium',
    'Variable-byte encoding represents the number 130 using:',
    ['1 byte','2 bytes','3 bytes','4 bytes'], 1,
    '130 = 1×128 + 2. VB encoding uses 7 data bits per byte + 1 continuation bit. 130 needs: byte1=[0|0000001] byte2=[1|0000010] = 2 bytes.'),

  mcq('m22','indexing','easy',
    'Gap encoding compresses postings lists by storing:',
    ['The absolute document IDs','The differences between consecutive document IDs','The term frequencies only','Hash codes of document IDs'], 1,
    'Sorted postings lists have IDs close together. Storing gaps (differences) produces smaller numbers: [5, 12, 19, 25] → [5, 7, 7, 6], which compress better.'),

  mcq('m23','indexing','hard',
    'The optimal skip pointer interval for a postings list of length n is approximately:',
    ['n','n/2','√n','log(n)'], 2,
    'Setting skip interval to √n balances the cost of using skips vs not using them. Too few skips = no benefit; too many = wasted comparisons checking skip targets.'),

  mcq('m24','indexing','medium',
    'To process the Boolean query "NOT A", the system needs:',
    ['Only A\'s postings list','The complete list of all document IDs minus A\'s postings','A\'s TF-IDF scores','The inverted index for every term'], 1,
    'NOT A returns all documents that do NOT contain term A. This requires knowing the universal set of all document IDs and subtracting A\'s postings.'),

  mcq('m25','indexing','medium',
    'Which index construction method uses a hash table to accumulate postings directly, avoiding the need for sorting?',
    ['BSBI (Block Sort-Based Indexing)','SPIMI (Single-Pass In-Memory Indexing)','MapReduce indexing','Suffix array construction'], 1,
    'SPIMI uses a hash map to directly append docIDs to the correct postings list as documents are processed, eliminating the sort step that BSBI requires.'),

  mcq('m26','indexing','easy',
    'A positional index stores, for each term:',
    ['Only the document IDs where the term appears','Document IDs and the exact positions within each document','The TF-IDF weight per document','A compressed binary encoding'], 1,
    'Positional indexes store (docID → [pos1, pos2, ...]) for each term, enabling phrase queries, proximity queries, and computing term frequency.'),

  mcq('m27','indexing','medium',
    'Processing the Boolean query "(X OR Y) AND Z" on postings lists of sizes p, q, r has time complexity:',
    ['O(p × q × r)','O(p + q + r)','O(max(p,q,r))','O(p × q + r)'], 1,
    'Step 1: OR(X,Y) merges two sorted lists in O(p+q). Step 2: AND with Z intersects the result (size ≤ p+q) with Z in O(p+q+r). Total: O(p+q+r).'),

  mcq('m28','indexing','hard',
    'What is the key difference between term-based and document-based partitioning in distributed indexing?',
    ['Term-based assigns terms to nodes; document-based assigns documents to nodes','They are the same approach with different names','Term-based uses more memory','Document-based cannot handle Boolean queries'], 0,
    'Term-based: each node holds the full postings list for a subset of terms. Document-based: each node indexes a subset of documents. Term-based has faster single-term queries; document-based has better load balancing.'),

  mcq('m29','indexing','easy',
    'When building an inverted index, tokenization is:',
    ['Optional and rarely used','The first step: splitting text into individual terms','Only needed for phrase queries','Performed after index compression'], 1,
    'Tokenization is the foundational first step — breaking raw text into individual tokens (words). Everything else (normalization, stemming, indexing) depends on it.'),

  mcq('m30','indexing','medium',
    'Gamma encoding is most effective when:',
    ['All gaps are approximately the same size','Gaps are small and vary in size','Gaps are very large numbers','The postings list is unsorted'], 1,
    'Gamma encoding uses a unary length prefix + binary offset. It\'s optimal for small, variable-sized integers — exactly what gap-encoded postings produce.'),

  // ══════════════════════════════════════════════════════
  //  TF-IDF & VECTOR SPACE MODEL — MCQs (31-45)
  // ══════════════════════════════════════════════════════
  mcq('m31','tfidf','easy',
    'In the Vector Space Model, documents and queries are both represented as:',
    ['Directed acyclic graphs','Numerical vectors in a high-dimensional term space','Linked lists of keywords','Binary bit strings'], 1,
    'VSM represents documents and queries as vectors where each dimension corresponds to a vocabulary term, enabling mathematical similarity computation.'),

  mcq('m32','tfidf','easy',
    'The TF component of TF-IDF measures:',
    ['How rare a term is across the entire collection','How frequently a term appears within a single document','The total number of documents in the collection','The length of the document in characters'], 1,
    'Term Frequency (TF) counts how many times a term appears in a specific document. Log-weighted TF = 1 + log₁₀(tf) provides diminishing returns.'),

  mcq('m33','tfidf','easy',
    'The IDF component of TF-IDF gives higher weight to terms that:',
    ['Appear in every document','Appear in very few documents (rare terms)','Have the highest raw frequency','Are the longest words'], 1,
    'IDF = log₁₀(N/df). Terms appearing in fewer documents get higher IDF scores because they have more discriminative power.'),

  mcq('m34','tfidf','medium',
    'If a term appears in all 8,000 documents of a collection, its IDF (using log₁₀) equals:',
    ['8000','1','0','-1'], 2,
    'IDF = log₁₀(N/df) = log₁₀(8000/8000) = log₁₀(1) = 0. A term in every document has zero discriminative value.'),

  mcq('m35','tfidf','medium',
    'Why does TF-IDF use logarithmic TF instead of raw counts?',
    ['To make computation faster','To normalize by document length','To ensure that 20 occurrences score less than 20× a single occurrence','To convert to binary relevance'], 2,
    'A document mentioning "database" 20 times is NOT 20× more relevant than one mentioning it once. Log scaling compresses: 1+log₁₀(20) ≈ 2.3, not 20.'),

  mcq('m36','tfidf','medium',
    'Cosine similarity between two document vectors measures:',
    ['The Euclidean distance between them','The angle between them, independent of vector magnitude','The sum of their term weights','The number of shared terms'], 1,
    'Cosine similarity = dot(A,B) / (|A| × |B|). It measures directional similarity regardless of vector length, making it ideal for comparing documents of different sizes.'),

  mcq('m37','tfidf','medium',
    'What problem does L2 normalization solve in ranked retrieval?',
    ['It removes stop words','It prevents longer documents from unfairly dominating similarity scores','It speeds up query processing','It handles spelling errors'], 1,
    'Longer documents naturally have higher TF values and larger vector magnitudes. L2 normalization projects vectors onto the unit hypersphere, making comparison length-independent.'),

  mcq('m38','tfidf','hard',
    'In the CosineScore algorithm, what data structure accumulates partial scores for each document?',
    ['A priority queue','An array of accumulators indexed by docID','A balanced BST','A hash set'], 1,
    'CosineScore maintains an accumulator array where scores[d] += wt(t,d) × wt(t,q) for each query term t. After processing all terms, the top-K accumulators give the result.'),

  mcq('m39','tfidf','medium',
    'A pre-computed list of the top-r highest-weighted documents for each term is called a:',
    ['Postings list','Stop list','Champion list (or top-docs list)','Skip list'], 2,
    'Champion lists store only the r documents with the highest TF-IDF for each term. At query time, only these are scored — dramatically faster than scoring all documents.'),

  mcq('m40','tfidf','easy',
    'The term "polysemy" in IR refers to:',
    ['A word having multiple meanings','Multiple words having the same meaning','A document containing too many terms','An error in stemming'], 0,
    'Polysemy: one word → many meanings (e.g., "bank" = financial institution OR river edge). This challenges keyword-based retrieval. The opposite is synonymy.'),

  mcq('m41','tfidf','easy',
    'The term "synonymy" in IR causes problems because:',
    ['Users search for one word but the relevant document uses a different word with the same meaning','It makes documents too long','It increases index size exponentially','It only affects non-English documents'], 0,
    'Synonymy: many words → one meaning (e.g., "car"/"automobile"/"vehicle"). A user querying "car" would miss documents using "automobile" unless the system handles synonyms.'),

  mcq('m42','tfidf','medium',
    'Index elimination speeds up query processing by:',
    ['Only considering documents containing at least a minimum number of query terms','Removing rare terms from the index','Doubling the number of skip pointers','Re-indexing the collection'], 0,
    'Index elimination prunes candidates early: for a query with many terms, only score documents that match at least half the query terms (or some threshold).'),

  mcq('m43','tfidf','hard',
    'The zone scoring variant of TF-IDF assigns different weights to:',
    ['Different query terms','Different sections of a document (title, abstract, body)','Different users','Different time periods'], 1,
    'Zone scoring partitions documents into zones (title, abstract, body, metadata) and assigns zone-specific weights. A match in the title might score 0.4 while body scores 0.2.'),

  mcq('m44','tfidf','medium',
    'If the dot product of two unit vectors is 0, their cosine similarity indicates:',
    ['Identical documents','Completely unrelated documents (orthogonal)','Opposite documents','Very similar documents'], 1,
    'Cosine of 90° = 0. Two orthogonal vectors share no common terms (or their term weights are orthogonal), indicating no topical overlap.'),

  mcq('m45','tfidf','medium',
    'In a collection of 50,000 documents, a term appearing in 500 documents has an IDF of:',
    ['log₁₀(100) = 2','log₁₀(500) = 2.7','log₁₀(50000) = 4.7','log₁₀(50) = 1.7'], 0,
    'IDF = log₁₀(N/df) = log₁₀(50000/500) = log₁₀(100) = 2. This means the term is moderately rare — appearing in only 1% of documents.'),

  // ══════════════════════════════════════════════════════
  //  EVALUATION — MCQs (46-60)
  // ══════════════════════════════════════════════════════
  mcq('m46','evaluation','easy',
    'Precision answers the question:',
    ['"Of all relevant documents, how many did we find?"','"Of all retrieved documents, how many were relevant?"','"How many documents are in the collection?"','"What is the rank of the first relevant document?"'], 1,
    'Precision = |relevant ∩ retrieved| / |retrieved|. It measures the quality/purity of the result set.'),

  mcq('m47','evaluation','easy',
    'Recall answers the question:',
    ['"Of all retrieved documents, how many were relevant?"','"Of all relevant documents, how many did we find?"','"How fast was the query?"','"How many terms are in the query?"'], 1,
    'Recall = |relevant ∩ retrieved| / |relevant|. It measures completeness — what fraction of the relevant material did we manage to retrieve?'),

  mcq('m48','evaluation','medium',
    'The F₁ score is the harmonic mean of Precision and Recall. Why harmonic mean instead of arithmetic?',
    ['It is easier to compute','It penalizes cases where one metric is very low, preventing gaming','It always gives a higher score','It ignores outliers'], 1,
    'Harmonic mean: F₁ = 2PR/(P+R). If either P or R is near 0, F₁ drops sharply. Arithmetic mean would be too generous: (0.99 + 0.01)/2 = 0.5, but F₁ = 0.02.'),

  mcq('m49','evaluation','medium',
    'The main flaw of using raw Accuracy (TP+TN)/(TP+TN+FP+FN) in Information Retrieval is:',
    ['It requires too much computation','The massive number of true negatives inflates the score artificially','It cannot be computed without relevance judgments','It only works for ranked retrieval'], 1,
    'In a collection of 1M docs, if 10 are relevant and none are retrieved: Accuracy = 999,990/1,000,000 = 99.999%. Completely misleading because TN dominates.'),

  mcq('m50','evaluation','medium',
    'Mean Average Precision (MAP) is computed by:',
    ['Averaging Precision@10 across queries','Averaging the Average Precision (AP) of each query across all queries','Finding the maximum F1 score','Averaging Recall at every rank position'], 1,
    'For each query, AP = (1/R)×Σ P@k×rel(k) at each relevant rank k. MAP = mean of AP over all queries. It is sensitive to ranking order.'),

  mcq('m51','evaluation','medium',
    'Precision@k evaluates:',
    ['The precision considering only the top-k returned documents','The precision at every rank position','The recall at rank k','The total number of relevant documents at position k'], 0,
    'P@k = (# relevant in top k) / k. It captures the user experience of looking at just the first k results (e.g., first page of search results).'),

  mcq('m52','evaluation','medium',
    'An ROC curve plots:',
    ['Precision vs Recall','True Positive Rate vs False Positive Rate','MAP vs NDCG','F1 vs threshold'], 1,
    'ROC: Y-axis = TPR (Recall), X-axis = FPR = FP/(FP+TN). A perfect system hugs the top-left corner. Random baseline is the diagonal.'),

  mcq('m53','evaluation','hard',
    'NDCG differs from MAP primarily because:',
    ['NDCG handles graded relevance while MAP uses binary relevance','NDCG is faster to compute','MAP handles graded relevance while NDCG uses binary','They are mathematically identical'], 0,
    'MAP treats relevance as binary (relevant or not). NDCG supports graded relevance (e.g., 0/1/2/3) with a logarithmic discount by rank position.'),

  mcq('m54','evaluation','easy',
    'Mean Reciprocal Rank (MRR) focuses on:',
    ['The total number of relevant documents retrieved','The rank position of the first relevant result for each query','The F1 score at every rank','The area under the ROC curve'], 1,
    'MRR = (1/|Q|) × Σ 1/rank_i, where rank_i is the position of the first relevant result for query i. It is ideal for navigational queries.'),

  mcq('m55','evaluation','medium',
    'The pooling method for building test collections works by:',
    ['Manually judging every document in the collection','Combining top results from multiple systems, then judging only those','Using random sampling of documents','Asking users to rate documents in real time'], 1,
    'Pooling (used by TREC): multiple IR systems each contribute their top-k results. The union is de-duplicated and manually judged. This creates a reusable test collection.'),

  mcq('m56','evaluation','easy',
    'A/B testing in IR evaluation involves:',
    ['Comparing two systems using offline test collections','Randomly showing different system variants to live users and measuring behavior','Running both systems sequentially','Testing on alphabetically sorted documents'], 1,
    'A/B testing splits live traffic: group A sees system variant A, group B sees variant B. Metrics like click-through rate determine which is better.'),

  mcq('m57','evaluation','hard',
    'Team-draft interleaving compares two systems by:',
    ['Merging their result lists into one using a coin-flip draft, then using clicks to pick a winner','Running them in parallel and comparing P/R/F1','Computing cosine similarity between their outputs','Measuring query latency'], 0,
    'Interleaving merges results from system A and B into one list via alternating selection (like picking sports teams). User clicks on results determine which system contributed more relevant items.'),

  mcq('m58','evaluation','medium',
    'R-Precision adapts its cutoff by:',
    ['Using a fixed threshold of 10','Setting the cutoff to the exact number of known relevant documents for each query','Doubling the cutoff for each new query','Using the collection size as cutoff'], 1,
    'R-Precision: if there are R relevant documents for a query, compute precision at rank R. This avoids the arbitrary choice of k in P@k.'),

  mcq('m59','evaluation','medium',
    'One key advantage of offline evaluation over online (A/B) testing:',
    ['It uses real user behavior','It is repeatable, cheap, and doesn\'t risk showing bad results to users','It captures user satisfaction better','It requires no relevance judgments'], 1,
    'Offline evaluation uses pre-built test collections. You can test thousands of system variants quickly without affecting real users. Downside: static judgments may not reflect real preferences.'),

  mcq('m60','evaluation','medium',
    'The Cascade click model assumes that a user:',
    ['Clicks on all visible results','Examines results from top to bottom and stops after the first click','Randomly selects results to examine','Only clicks on the last result'], 1,
    'The Cascade model: users scan linearly from rank 1 downward. At each rank, they examine the result and either click (then stop) or skip and continue. This models position bias.'),

  // ══════════════════════════════════════════════════════
  //  SHORT ANSWER / CALCULATIONS (61-100)
  // ══════════════════════════════════════════════════════

  // -- Preprocessing --
  sa('s01','preprocessing','medium',
    'Compute the Levenshtein distance between "park" and "spake". List the operations.',
    '3 edits: insert s, substitute r→a (or path via spake)',
    'Build a 5×6 DP matrix. One path: park → spark (ins s at start) → spak (del r or sub r→nothing)... The exact path depends on the operations chosen. The minimum cost is 3 edits.'),

  sa('s02','preprocessing','easy',
    'Generate all bigrams (2-grams) for the term "index" (with $ padding).',
    '$i, in, nd, de, ex, x$',
    'Pad with $ markers: "$index$". Extract substrings of length 2: $i, in, nd, de, ex, x$. These 6 bigrams would each list "index" in the k-gram index.'),

  sa('s03','preprocessing','medium',
    'Apply the Porter Stemmer to: "computing", "happiness", and "retrieved". What stem does each produce?',
    'computing → comput, happiness → happi, retrieved → retriev',
    'Porter rules: "computing" → remove "-ing" → "comput". "happiness" → "-ness" removal → "happi" (after also handling "-ness"→ step 3). "retrieved" → remove "-ed" → "retriev".'),

  sa('s04','preprocessing','medium',
    'What is the Soundex code for "Jackson" and "Jaxon"? Do they match?',
    'Both produce J250. Yes, they match.',
    'Jackson: J → keep. a → drop (vowel). c → 2. k → 2 (same as c, adjacent duplicate dropped). s → 2 (adjacent duplicate dropped). o → drop. n → 5. Result: J250. Jaxon: J → keep. a → drop. x → 2. o → drop. n → 5. Pad: J250. Same code!'),

  sa('s05','preprocessing','hard',
    'Compute the Levenshtein distance between "elephant" and "relevant". Show key steps of the DP matrix.',
    '3',
    'Build a 9×9 DP matrix (elephant=8, relevant=8). Key operations: e→r (sub), l=l (match), e=e (match), p→v (sub), h→a (sub), a=a (match or shift), n=n (match), t=t (match). The minimum edit distance through the full matrix is 3.'),

  sa('s06','preprocessing','easy',
    'For the sentence "Running foxes quickly jumped over fences", show the result after: (1) case folding, (2) stop word removal (stop words: over), (3) stemming.',
    '(1) "running foxes quickly jumped over fences" (2) "running foxes quickly jumped fences" (3) "run fox quick jump fenc"',
    'Step-by-step: (1) lowercase everything. (2) remove "over". (3) Porter stem each remaining word: running→run, foxes→fox, quickly→quick, jumped→jump, fences→fenc.'),

  sa('s07','preprocessing','medium',
    'Explain why Soundex is useful for Information Retrieval. Give a scenario where it would help a search engine.',
    'Soundex helps retrieve documents when users misspell names or names have variant spellings. Example: searching for "Muller" should also find "Mueller" since both encode to the same Soundex code.',
    'Names across cultures and time periods often have spelling variations. Soundex\'s phonetic encoding maps similar-sounding names to the same code, improving recall for personal name queries.'),

  sa('s08','preprocessing','medium',
    'Generate the 3-grams for the term "compute" and explain how they would be used to find candidates for the wildcard query "comp*".',
    '$co, com, omp, mpu, put, ute, te$ — for "comp*", split into 3-grams: $co, com, omp. The intersection of postings for these 3-grams gives candidate terms.',
    'The wildcard "comp*" generates 3-grams $co, com, omp. Looking up each in the 3-gram index and intersecting the results gives all terms that start with "comp" (e.g., compute, compare, compress).'),

  sa('s09','preprocessing','hard',
    'Given a vocabulary of 100,000 terms, estimate the number of distinct bigrams possible. Why does this matter for k-gram index design?',
    '27² = 729 possible bigrams (26 letters + $). The k-gram index has far fewer entries than the vocabulary, making it memory-efficient.',
    'With 26 letters + 1 boundary character, there are at most 27² = 729 distinct bigrams. Even with 100K vocabulary terms, the bigram index has only ~729 entries, each pointing to a list of terms containing that bigram. This is space-efficient.'),

  sa('s10','preprocessing','medium',
    'What happens when you stem "organization", "organize", and "organ" using Porter Stemmer? Is this conflation always desirable?',
    'All three may reduce to "organ". This is over-conflation — "organ" (body part) and "organization" (institution) have different meanings.',
    'Aggressive stemming groups unrelated concepts. "organ" (musical instrument/body part), "organize" (arrange), "organization" (institution) all stem to "organ". This increases recall but hurts precision by returning irrelevant documents.'),

  // -- Index Construction --
  sa('s11','indexing','hard',
    'Given postings with skip pointers (interval=3):\n• alpha: [1, 4, 9, 16, 25, 36, 49, 64]\n• beta: [2, 8, 16, 32, 36, 48, 64, 72]\nFind the intersection. Show the comparison steps.',
    'Intersection: {16, 36, 64}',
    'Walk both lists: 1<2 → advance alpha. 4<8 → advance alpha (skip to 16? skip target=16>8? no, skip target 16>2 yes, try skip: 16 vs 8, 16>8 so don\'t take skip yet). Continue comparisons: ... 16=16 ✓. 25<32 → advance alpha. 36<48 but check: 36=36 ✓. 49<48? no 49>48, advance beta. 64>64? no 64=64 ✓. Result: {16, 36, 64}.'),

  sa('s12','indexing','hard',
    'Given a positional index:\n• "data": [Doc1: ⟨5, 12, 30⟩, Doc2: ⟨3, 15⟩, Doc3: ⟨8⟩]\n• "mining": [Doc1: ⟨6, 18⟩, Doc2: ⟨4, 16⟩, Doc4: ⟨2⟩]\nProcess the phrase query "\\"data mining\\"". Which documents match?',
    'Doc1 (positions 5→6) and Doc2 (positions 3→4).',
    'Phrase "data mining" requires mining\'s position = data\'s position + 1 in the same doc. Doc1: data@5, mining@6 → 6=5+1 ✓. Doc2: data@3, mining@4 → 4=3+1 ✓. Doc1 also has data@12 but no mining@13. Doc3 has "data" but not "mining". Doc4 has "mining" but not "data".'),

  sa('s13','indexing','medium',
    'Describe the key steps of the BSBI algorithm for building an inverted index from a collection too large to fit in memory.',
    'BSBI: (1) Assign each term a termID. (2) Parse documents into (termID, docID) pairs. (3) Sort pairs in memory-sized blocks. (4) Write sorted blocks to disk. (5) Multi-way merge all blocks into the final index.',
    'BSBI requires a global term→termID mapping (built in first pass or from vocabulary). Each memory-sized block of pairs is sorted and written to disk as an intermediate "run". Finally, all runs are merged using an n-way merge (like merge sort on disk).'),

  sa('s14','indexing','medium',
    'How does SPIMI differ from BSBI? Why is SPIMI generally faster?',
    'SPIMI builds postings lists directly in memory using a hash map — no sorting step, no global termID mapping. It is faster because it avoids the sorting overhead.',
    'BSBI: sort (termID, docID) pairs → merge. SPIMI: hash table maps terms directly to postings lists; when memory fills, write the block and start fresh. SPIMI is faster because: (1) no termID assignment, (2) no sorting, (3) uses strings directly.'),

  sa('s15','indexing','medium',
    'Encode the postings list [5, 11, 23, 40, 41, 68] using gap encoding. Then show how Variable Byte would encode the first two gaps.',
    'Gaps: [5, 6, 12, 17, 1, 27]. VB for 5: [10000101] (1 byte). VB for 6: [10000110] (1 byte).',
    'Gap encoding: 5, 11-5=6, 23-11=12, 40-23=17, 41-40=1, 68-41=27. VB encoding: numbers ≤ 127 fit in 1 byte with high bit = 1 (last byte marker). 5 = 10000101. 6 = 10000110. For 12 = 10001100. All single-byte since < 128.'),

  sa('s16','indexing','hard',
    'Analyze: for a Boolean query of 4 AND terms with postings list lengths p₁ ≤ p₂ ≤ p₃ ≤ p₄, what is the optimal processing order and total time complexity?',
    'Process in order of increasing length: p₁ first. Time: O(p₁ + p₂ + p₃ + p₄), with result size bounded by p₁.',
    'Intersect p₁ ∩ p₂ first (result ≤ p₁), then intersect result ∩ p₃ (result still ≤ p₁), then ∩ p₄. Each step is linear. Starting with the shortest list minimizes intermediate result sizes. Total: O(p₁+p₂+p₃+p₄).'),

  // -- TF-IDF & VSM --
  {
    id: 's17', topic: 'tfidf', type: 'short-answer', difficulty: 'hard',
    question: 'Given a collection of 20,000 documents with the following term statistics, calculate the TF-IDF weight for "rank" in Doc3 using log₁₀.',
    tableData: {
      headers: ['Term', 'DF', 'Doc1 (TF)', 'Doc2 (TF)', 'Doc3 (TF)'],
      rows: [
        ['web', '200', '5', '0', '12'],
        ['page', '2000', '8', '15', '0'],
        ['rank', '40', '0', '3', '7'],
      ],
    },
    answer: 'TF-IDF = (1 + log₁₀(7)) × log₁₀(20000/40) = 1.845 × 2.699 ≈ 4.98',
    explanation: 'Log-weighted TF = 1 + log₁₀(7) = 1 + 0.845 = 1.845. IDF = log₁₀(20000/40) = log₁₀(500) = 2.699. TF-IDF = 1.845 × 2.699 ≈ 4.98.',
  },

  sa('s18','tfidf','medium',
    'Compute the cosine similarity of A = (1, 3, 0, 2) and B = (2, 1, 4, 0).',
    'Cosine ≈ 0.238',
    'Dot product: 1×2 + 3×1 + 0×4 + 2×0 = 2+3+0+0 = 5. |A| = √(1+9+0+4) = √14 ≈ 3.742. |B| = √(4+1+16+0) = √21 ≈ 4.583. Cosine = 5/(3.742×4.583) = 5/17.146 ≈ 0.292.'),

  sa('s19','tfidf','medium',
    'Explain why cosine similarity is preferred over Euclidean distance for document comparison in IR.',
    'Cosine measures angular similarity (topic overlap) regardless of document length. Euclidean distance is affected by magnitude — longer documents would always appear farther away even if they cover the same topics.',
    'Two documents about "machine learning" — one is 100 words, another is 10,000 — would have very different Euclidean distances from a query but similar cosine similarity because they point in the same direction in term space.'),

  sa('s20','tfidf','medium',
    'What is a champion list and how does it trade off speed for quality in retrieval?',
    'A champion list pre-computes the top-r documents with highest TF-IDF for each term. At query time, only these candidates are scored — much faster, but might miss some relevant documents not in the top-r.',
    'For each vocabulary term, we precompute the r documents where that term has the highest weight. At query time: union champion lists for query terms → score only those docs. This is O(r × |query|) instead of O(N). Risk: relevant docs outside the top-r are missed.'),

  sa('s21','tfidf','hard',
    'Normalize the vector D = (3, 4, 0) to unit length (L2 normalization). Then compute cosine similarity with Q = (1, 0, 0).',
    'D_norm = (0.6, 0.8, 0). Cosine(D_norm, Q) = 0.6.',
    '|D| = √(9+16+0) = √25 = 5. D_norm = (3/5, 4/5, 0/5) = (0.6, 0.8, 0). For unit vectors, cosine = dot product: 0.6×1 + 0.8×0 + 0×0 = 0.6.'),

  sa('s22','tfidf','medium',
    'A query contains 3 terms. The CosineScore algorithm processes each term\'s postings list. If the lists have lengths 50, 200, and 1000, approximately how many accumulator updates occur?',
    '~1250 accumulator updates (50 + 200 + 1000)',
    'CosineScore iterates through each query term\'s postings list. For each posting (docID, weight), it updates: scores[docID] += w_td × w_tq. Total updates = sum of postings list lengths = 50+200+1000 = 1250.'),

  sa('s23','tfidf','hard',
    'Given 3 documents where D1=(1,1,0), D2=(0,1,1), D3=(1,0,1) and query Q=(1,1,0), rank the documents by cosine similarity.',
    'D1: cos=1.0, D2: cos≈0.5, D3: cos≈0.5. Ranking: D1 > D2 = D3.',
    'cos(D1,Q) = (1+1+0)/(√2×√2) = 2/2 = 1.0 (identical!). cos(D2,Q) = (0+1+0)/(√2×√2) = 1/2 = 0.5. cos(D3,Q) = (1+0+0)/(√2×√2) = 1/2 = 0.5. D1 is the best match.'),

  sa('s24','tfidf','medium',
    'Why is the "bag of words" representation a limitation of the Vector Space Model?',
    'It ignores word order, so "dog bites man" and "man bites dog" produce identical vectors despite having opposite meanings.',
    'VSM treats documents as unordered collections of terms. Phrases, negation, word order, and context are all lost. "Not good" and "good" would have similar representations. This is a fundamental limitation.'),

  // -- Evaluation --
  sa('s25','evaluation','medium',
    'A system retrieves 12 documents for a query. 7 are relevant. The collection has 20 relevant documents total. Calculate P, R, and F₁.',
    'P = 7/12 ≈ 0.583, R = 7/20 = 0.35, F₁ = 2(0.583)(0.35)/(0.583+0.35) ≈ 0.437',
    'Precision = 7/12 = 0.583. Recall = 7/20 = 0.35. F₁ = 2PR/(P+R) = 2(0.583)(0.35)/(0.933) = 0.408/0.933 ≈ 0.437.'),

  sa('s26','evaluation','medium',
    'Define MAP and explain why it is considered a reliable single-number summary of ranked retrieval quality.',
    'MAP = mean of Average Precision across all queries. AP computes precision at each relevant rank position. MAP is reliable because: (1) it is rank-sensitive, (2) it considers all relevant docs, (3) it averages over multiple queries for stability.',
    'AP for one query: sum precision values at each relevant doc\'s rank, divide by total relevant. MAP averages AP over all queries. It rewards systems that push relevant docs to the top and penalizes those that scatter them.'),

  sa('s27','evaluation','medium',
    'Explain the axes of an ROC curve and what a system at the top-left corner represents.',
    'X-axis: False Positive Rate. Y-axis: True Positive Rate (Recall). Top-left corner = perfect system: 100% recall with 0% false positives.',
    'FPR = FP/(FP+TN) — fraction of non-relevant docs incorrectly retrieved. TPR = TP/(TP+FN) — fraction of relevant docs correctly retrieved. Top-left = all relevant docs found, zero false alarms.'),

  sa('s28','evaluation','medium',
    'Give two advantages and two disadvantages of offline evaluation (TREC-style) for IR systems.',
    'Advantages: (1) Repeatable and controlled experiments, (2) Cheap — no real users needed. Disadvantages: (1) Static relevance judgments may not match real user preferences, (2) Limited to judged documents — unjudged relevant docs are treated as non-relevant.',
    'Additional considerations: online evaluation (A/B testing) is expensive, slow, and risks user experience, but captures real behavior. Offline is complementary — both are typically used in practice.'),

  sa('s29','evaluation','hard',
    'A ranked list returns: R, N, R, N, N, R, N, R, N, N (R=relevant, N=non-relevant). Total relevant=6. Compute Average Precision.',
    'AP = (1/6) × (1/1 + 2/3 + 3/6 + 4/8) = (1/6) × (1 + 0.667 + 0.5 + 0.5) = (1/6) × 2.667 ≈ 0.444',
    'Precision at relevant positions: P@1=1/1=1.0, P@3=2/3=0.667, P@6=3/6=0.5, P@8=4/8=0.5. Only 4 of 6 relevant docs are in the top 10 — the 2 missing ones contribute P=0. AP = (1+0.667+0.5+0.5+0+0)/6 = 2.667/6 ≈ 0.444.'),

  sa('s30','evaluation','hard',
    'Compute DCG@4 for relevance grades [3, 0, 2, 1] using log₂. Then compute IDCG@4 and NDCG@4.',
    'DCG@4 ≈ 4.631. IDCG@4 (ideal: [3,2,1,0]) ≈ 5.262. NDCG@4 ≈ 0.880.',
    'DCG: 3/log₂(2) + 0/log₂(3) + 2/log₂(4) + 1/log₂(5) = 3/1 + 0 + 2/2 + 1/2.322 = 3 + 0 + 1 + 0.431 = 4.431. IDCG (rank [3,2,1,0]): 3/1 + 2/1.585 + 1/2 + 0 = 3 + 1.262 + 0.5 = 4.762. NDCG = 4.431/4.762 ≈ 0.931.'),

  sa('s31','evaluation','medium',
    'Why is Precision@k commonly used when evaluating web search engines?',
    'Users typically only look at the first page of results (top 10). P@k measures quality where it matters most — the first k results the user actually sees.',
    'Web users rarely go beyond page 1. P@10 captures whether the top results are relevant. It doesn\'t require knowing the total number of relevant documents in the collection.'),

  sa('s32','evaluation','medium',
    'Explain the concept of R-Precision and why it avoids the problem of choosing an arbitrary cutoff.',
    'R-Precision automatically sets the cutoff to the number of known relevant documents (R). If a query has 15 relevant docs, compute P@15. This adapts to each query rather than using a fixed k.',
    'Unlike P@10 (fixed cutoff for all queries), R-Precision adjusts: a query with 5 relevant docs is evaluated at P@5, one with 50 relevant docs at P@50. This is fairer across queries with different numbers of relevant documents.'),

  sa('s33','evaluation','medium',
    'A search engine runs an A/B test where system A gets 1000 users and system B gets 1000 users. System A has CTR=0.32, System B has CTR=0.35. Can we conclude B is better?',
    'Not necessarily. We need significance testing (e.g., paired t-test) to determine if the 3% difference is statistically significant or just random variation.',
    'A 3% difference might be within the margin of error. We need to compute p-values using a statistical test. If p < 0.05, the difference is significant. Other factors: were users randomly assigned? Is the sample size sufficient? Were there confounding variables?'),

  sa('s34','evaluation','easy',
    'What is the difference between binary relevance and graded relevance in IR evaluation?',
    'Binary: each document is either relevant (1) or not (0). Graded: documents have levels of relevance (e.g., 0=not relevant, 1=somewhat, 2=relevant, 3=highly relevant). Graded is more nuanced.',
    'Binary relevance is used by metrics like P, R, F1, MAP. Graded relevance is used by DCG/NDCG. Graded is more realistic since some documents are more useful than others.'),

  sa('s35','evaluation','hard',
    'Compute MRR for three queries where the first relevant document appears at ranks 3, 1, and 5 respectively.',
    'MRR = (1/3) × (1/3 + 1/1 + 1/5) = (1/3) × (0.333 + 1.0 + 0.2) = (1/3) × 1.533 ≈ 0.511',
    'Reciprocal ranks: 1/3, 1/1, 1/5. MRR = average = (0.333 + 1.0 + 0.2)/3 = 1.533/3 = 0.511. This tells us the "typical" rank of the first relevant result across queries.'),

  // -- Extra mixed --
  sa('s36','tfidf','medium',
    'In a collection of 10,000 documents, term "neural" appears in 25 documents with a raw TF of 8 in Doc5. Compute the TF-IDF for "neural" in Doc5.',
    'TF-IDF = (1 + log₁₀(8)) × log₁₀(10000/25) = 1.903 × 2.602 ≈ 4.95',
    'TF = 1 + log₁₀(8) = 1 + 0.903 = 1.903. IDF = log₁₀(10000/25) = log₁₀(400) = 2.602. TF-IDF = 1.903 × 2.602 ≈ 4.95.'),

  sa('s37','indexing','medium',
    'Why are positional indexes much larger than standard inverted indexes? Give a rough size estimate.',
    'Positional indexes store every occurrence position, not just document IDs. They are 2-4× larger because each posting entry includes a list of positions rather than just a docID.',
    'Standard inverted index: each posting = 1 docID. Positional index: each posting = 1 docID + list of positions (could be dozens per document). For a term appearing 50 times across 10 docs, standard = 10 entries, positional = 10 + 50 position values.'),

  sa('s38','preprocessing','medium',
    'What is the difference between lemmatization and stemming? Give an example where they produce different results.',
    'Stemming uses rules to chop suffixes (may produce non-words). Lemmatization uses a dictionary to find the proper base form. Example: "better" → stemmer might leave "better" unchanged, lemmatizer returns "good".',
    'Another example: "went" → Porter stemmer returns "went" (no suffix to strip). Lemmatizer returns "go" (the dictionary base form). Lemmatization is more accurate but slower and language-dependent.'),

  sa('s39','evaluation','hard',
    'Explain the eye-tracking "F-shaped pattern" in search results and how it affects IR evaluation.',
    'Users scan search results in an F-shape: reading the first few results thoroughly, then scanning only the left side of subsequent results. This creates position bias — higher-ranked results get more attention regardless of relevance.',
    'Implications for evaluation: (1) Click data is biased — users click top results more because they see them first. (2) Metrics like NDCG use logarithmic discounting to model this decay. (3) Interleaving designs try to control for position bias.'),

  sa('s40','tfidf','hard',
    'Explain how index elimination works and when it improves performance. What is its risk?',
    'Index elimination only scores documents that contain at least t query terms (e.g., at least half). It speeds up processing by reducing the candidate set. Risk: relevant documents containing few query terms are missed.',
    'For a 6-term query, you might require docs to contain ≥3 terms. This can eliminate 90% of candidates. But documents highly relevant to a subset of terms might be lost. It trades recall for speed.'),
];

// ── Study Hints: descriptive guidance for further reading ──
const topicHints = {
  preprocessing: 'Review IIR Ch.2 "The Term Vocabulary & Postings Lists" — covers tokenization, normalization, stemming vs lemmatization, stop words, and Soundex phonetic encoding.',
  indexing: 'Review IIR Ch.4 "Index Construction" & Ch.5 "Index Compression" — covers BSBI, SPIMI, skip pointers, variable-byte/gamma encoding, and distributed indexing.',
  tfidf: 'Review IIR Ch.6 "Scoring, Term Weighting & the Vector Space Model" — covers TF-IDF formula, cosine similarity, L2 normalization, and champion lists.',
  evaluation: 'Review IIR Ch.8 "Evaluation in IR" — covers Precision, Recall, F₁, MAP, NDCG, ROC curves, A/B testing, and interleaving methods.',
};

const specificHints = {
  m03: 'Soundex maps names to a 4-character code (letter + 3 digits) based on pronunciation. It groups variants like Smith/Smyth. See IIR §3.4.',
  m07: 'The Permuterm index rotates a term with a $ marker to convert mid-wildcard to trailing-wildcard queries. See IIR §3.2.2.',
  m08: 'Levenshtein distance uses DP to fill an (m+1)×(n+1) matrix. Each cell = min(insert, delete, substitute). Practice the full matrix by hand. See IIR §3.3.3.',
  m09: 'K-gram indexes split terms into overlapping character sequences. For wildcard queries, decompose into k-grams and intersect their postings. See IIR §3.2.2.',
  m10: 'Heap\'s law M = kT^b (b ≈ 0.5): vocabulary grows sub-linearly. Doubling the corpus does NOT double the vocabulary. See IIR §5.1.',
  m12: 'Standard DP table = O(m×n) space. Optimization: keep only 2 rows → O(min(m,n)) space. Practice filling small matrices by hand.',
  m13: 'Zipf\'s law: frequency × rank ≈ constant. A few words are very common, most are rare. This shapes compression and stop word strategies. See IIR §5.1.',
  m18: 'Skip pointers add forward links every √n entries. During intersection, if one value is too small, check the skip target before advancing normally. See IIR §2.3.',
  m20: 'MapReduce indexing: Mappers emit (term, docID) pairs → shuffle groups by term → Reducers build postings lists. See IIR §4.4.',
  m25: 'SPIMI uses a hash map (no sorting!), while BSBI sorts (termID, docID) pairs. SPIMI appends directly to postings in memory → faster. See IIR §4.3.',
  m34: 'When df = N, IDF = log(N/N) = 0. Stop words appear everywhere and have zero discriminative power.',
  m36: 'Cosine similarity = dot(A,B)/(|A|×|B|). Measures angular similarity, not magnitude. Longer docs don\'t automatically score higher. See IIR §6.3.',
  m38: 'CosineScore uses accumulator array: for each query term, walk postings and add partial scores. Top-K accumulators = final ranked results. See IIR §6.3.3.',
  m39: 'Champion lists pre-compute the top-r highest-weighted docs per term. Fast retrieval but might miss relevant docs outside the top-r. See IIR §7.1.',
  m48: 'F₁ = 2PR/(P+R). The harmonic mean penalizes imbalance: P=0.99, R=0.01 → F₁ ≈ 0.02 (not 0.5!). Practice computing F₁ for edge cases. See IIR §8.3.',
  m50: 'MAP = average of AP over queries. AP = (1/R)×Σ P@k at each relevant rank. Higher MAP = relevant docs ranked earlier. See IIR §8.4.',
  m53: 'NDCG supports graded relevance with log discount. DCG = Σ rel_i / log₂(i+1). NDCG = DCG/IDCG. Practice with sample rank lists. See IIR §8.4.',
  m57: 'Interleaving merges results from two systems into one list via alternating picks. Click data determines which system contributed more relevant results.',
  s05: 'Build a (m+1)×(n+1) DP matrix. Fill row by row: match → diagonal value; else min(left+1, above+1, diagonal+1). Bottom-right cell = answer.',
  s11: 'With skip pointers: compare current values. If one is smaller, check its skip target. If skip ≤ the other\'s current value, take the skip. Walk step by step.',
  s12: 'For phrase queries: term₂ position must = term₁ position + 1 in the same document. Check all position pairs document by document.',
  s17: 'TF-IDF = (1 + log₁₀(tf)) × log₁₀(N/df). Steps: (1) compute log TF, (2) compute IDF, (3) multiply. Always specify log base.',
  s30: 'DCG@k = Σ rel_i/log₂(i+1). IDCG = DCG with relevance sorted decreasingly. NDCG = DCG/IDCG. Show work for each rank position.',
};

// Inject study hints into every question
reviewQuestions.forEach(q => {
  q.hint = specificHints[q.id] || topicHints[q.topic] || null;
});
