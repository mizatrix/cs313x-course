// Central data file defining all chapters and their visualizations
export const chapters = {
  'chapter01': {
    title: 'Introduction to Information Retrieval',
    week: 1,
    description: 'Explore the foundations of search engines — from Boolean logic and inverted indexes to Zipf\'s Law and the history of IR.',
    pdf: '/static/chapter01/Week1_Introduction_to_Information_Retrieval_V3.pdf',
    categories: [
      { id: 'all', label: 'All Topics' },
      { id: 'fundamentals', label: 'Fundamentals' },
      { id: 'indexing', label: 'Indexing' },
      { id: 'quiz', label: 'Quiz' },
    ],
    visualizations: [
      {
        id: 1, title: 'IR vs Database Systems',
        aim: 'Understand how IR systems differ from databases — unstructured vs structured data, ranked results vs exact matches.',
        use: 'When comparing search engines to SQL databases, or explaining why IR needs ranking.',
        desc: 'Compare how SQL databases and IR systems handle the same query — see structured vs unstructured search side by side.',
        href: '/static/chapter01/visualizations/01-ir-vs-databases.html',
        diff: 'beginner', cat: 'fundamentals', time: 5,
      },
      {
        id: 2, title: 'IR History Timeline',
        aim: 'Journey through 70+ years of IR history — from Luhn\'s auto-indexing (1958) to modern neural search and LLMs.',
        use: 'When studying the evolution of search technology and key milestones in the field.',
        desc: 'Interactive timeline of IR history from pre-1950s card catalogs to 2020s neural retrieval and RAG.',
        href: '/static/chapter01/visualizations/02-ir-history-timeline.html',
        diff: 'beginner', cat: 'fundamentals', time: 5,
      },
      {
        id: 3, title: 'Inverted Index Builder',
        aim: 'Learn how an inverted index is constructed step-by-step: tokenize → sort (term, docID) pairs → merge into dictionary + postings.',
        use: 'When learning the core data structure behind every search engine.',
        desc: 'Type documents and watch the system tokenize, sort, and construct an inverted index with postings lists.',
        href: '/static/chapter01/visualizations/03-inverted-index-builder.html',
        diff: 'intermediate', cat: 'indexing', time: 8,
      },
      {
        id: 4, title: 'Zipf\'s Law Explorer',
        aim: 'Discover Zipf\'s Law: word frequency is inversely proportional to rank, forming a power-law distribution.',
        use: 'When analyzing text collections or understanding why stopword removal and frequency-based weighting work.',
        desc: 'Paste any text and watch the word frequency distribution form the classic power-law curve in real time.',
        href: '/static/chapter01/visualizations/04-zipfs-law-explorer.html',
        diff: 'beginner', cat: 'fundamentals', time: 5,
      },
      {
        id: 5, title: 'Practice Quiz',
        aim: 'Test your understanding with 15 questions on IR fundamentals, Boolean retrieval, inverted indexes, and Zipf\'s Law.',
        use: 'When revising for exams or checking your comprehension of Chapter 1 concepts.',
        desc: 'Multiple-choice quiz covering all Chapter 1 topics with instant feedback and explanations.',
        href: '/static/chapter01/visualizations/05-practice-quiz.html',
        diff: 'beginner', cat: 'quiz', hasQuiz: true, time: 10,
      },
    ]
  },

  'chapter02': {
    title: 'Text Processing & Tokenization',
    week: 2,
    description: 'Interactive visualizations to master the core concepts of information retrieval text processing — from tokenization to edit distance.',
    pdf: '/static/chapter02/Week2_Text_Processing_and_Tokenization.pdf',
    categories: [
      { id: 'all', label: 'All Topics' },
      { id: 'core', label: 'Core Concepts' },
      { id: 'deep-dive', label: 'Deep Dives' },
      { id: 'practice', label: 'Practice' },
    ],
    visualizations: [
      {
        id: 1, title: 'Skip Pointers',
        aim: 'Understand how skip pointers speed up posting list intersection by allowing the algorithm to skip over non-matching blocks.',
        use: 'When you need to efficiently intersect two sorted posting lists in an inverted index.',
        desc: 'Watch how skip pointers speed up posting list intersection. Step through the algorithm and see when skips succeed vs fail.',
        href: '/static/chapter02/visualizations/01-skip-pointers.html',
        diff: 'beginner', cat: 'core', hasQuiz: true, time: 8
      },
      {
        id: 2, title: 'Edit Distance',
        aim: 'Learn how the Levenshtein distance DP matrix measures the minimum number of single-character edits between two strings.',
        use: 'When implementing spell correction, fuzzy matching, or approximate string search.',
        desc: 'Visualize the Levenshtein distance DP matrix filling cell-by-cell with color-coded operations and backtracing.',
        href: '/static/chapter02/visualizations/02-edit-distance.html',
        diff: 'intermediate', cat: 'core', hasQuiz: true, time: 12
      },
      {
        id: 3, title: 'Soundex Algorithm',
        aim: 'Follow the 5-stage phonetic encoding pipeline and understand how Soundex groups similar-sounding names together.',
        use: 'When matching names that sound alike but are spelled differently (e.g., "Smith" and "Smyth").',
        desc: 'Follow the 5-stage phonetic encoding pipeline. Compare two names to see if they sound alike.',
        href: '/static/chapter02/visualizations/03-soundex.html',
        diff: 'beginner', cat: 'core', hasQuiz: true, time: 7
      },
      {
        id: 4, title: 'Stemming vs Lemmatization',
        aim: 'Compare rule-based stemming against dictionary-based lemmatization and understand their tradeoffs.',
        use: 'When deciding how to normalize words in your IR pipeline to improve recall.',
        desc: 'Compare Porter Stemmer rules against dictionary-based lemmatization side by side.',
        href: '/static/chapter02/visualizations/04-stemming-vs-lemmatization.html',
        diff: 'intermediate', cat: 'core', hasQuiz: true, time: 10
      },
      {
        id: 5, title: 'Tokenization Challenges',
        aim: 'Learn how to handle real-world tokenization edge cases: punctuation, hyphens, numbers, apostrophes, and clitics.',
        use: 'When building or evaluating a tokenizer that must handle messy, real-world text input.',
        desc: 'Tokenize real-world text interactively — handle punctuation, hyphens, numbers, and more.',
        href: '/static/chapter02/visualizations/05-tokenization.html',
        diff: 'intermediate', cat: 'deep-dive', hasQuiz: true, time: 10
      },
      {
        id: 6, title: 'Porter Stemmer Deep Dive',
        aim: 'Explore all 5 steps of the Porter algorithm with vowel/consonant pattern visualization (CVC) and measure m(word).',
        use: 'When you need a detailed understanding of the most widely-used stemming algorithm.',
        desc: 'Explore all 5 steps of the Porter algorithm with vowel/consonant pattern visualization.',
        href: '/static/chapter02/visualizations/06-porter-stemmer.html',
        diff: 'advanced', cat: 'deep-dive', hasQuiz: true, time: 15
      },
      {
        id: 7, title: 'Practice Quiz',
        aim: 'Test your understanding with auto-generated questions on edit distance, Soundex, stemming, and tokenization.',
        use: 'When you want to verify your mastery of Chapter 2 concepts with instant feedback.',
        desc: 'Auto-generated questions with instant feedback and scoring.',
        href: '/static/chapter02/visualizations/07-practice-quiz.html',
        diff: 'beginner', cat: 'practice', hasQuiz: true, time: 10
      },
    ]
  },

  'chapter03': {
    title: 'Vector Space Model & TF-IDF Scoring',
    week: 3,
    description: 'Interactive visual explorations of every concept in the Vector Space Model — from basic vectors to full TF-IDF scoring pipelines.',
    pdf: '/static/chapter03/Week_3_Vector_Space_Model_&_TF-IDF_Scoring.pdf',
    categories: [
      { id: 'all', label: 'All Topics' },
      { id: 'fundamentals', label: 'Fundamentals' },
      { id: 'weighting', label: 'Weighting Schemes' },
      { id: 'advanced', label: 'Advanced' },
      { id: 'practice', label: 'Practice' },
    ],
    visualizations: [
      {
        id: 1, title: 'Vector Space Model — Intro',
        aim: 'Understand the transition from Boolean Retrieval to Ranked Retrieval and why ranking matters.',
        use: 'When you need to understand why modern search engines return ranked results instead of just matching documents.',
        desc: 'From Boolean Retrieval to Ranked Retrieval. See why ranking matters and how documents live in vector space.',
        href: '/static/chapter03/visualizations/01-vector-space-intro.html',
        diff: 'beginner', cat: 'fundamentals', hasQuiz: true, time: 8
      },
      {
        id: 2, title: 'Document & Query Vectors',
        aim: 'Learn how text is transformed into numerical vectors by building term-document matrices interactively.',
        use: 'When you need to represent documents mathematically for similarity computation.',
        desc: 'See how text becomes numbers. Build term-document matrices interactively from your own input.',
        href: '/static/chapter03/visualizations/02-document-query-vectors.html',
        diff: 'beginner', cat: 'fundamentals', hasQuiz: true, time: 10
      },
      {
        id: 3, title: 'Cosine Similarity',
        aim: 'Understand how cosine similarity measures the angle between vectors, independent of document length.',
        use: 'When you need a length-independent measure of document similarity.',
        desc: 'Drag vectors to see the angle and cosine score change in real-time.',
        href: '/static/chapter03/visualizations/03-cosine-similarity.html',
        diff: 'beginner', cat: 'fundamentals', hasQuiz: true, time: 8
      },
      {
        id: 4, title: 'Term Frequency (TF)',
        aim: 'Learn how TF weights are computed and why log-weighted TF provides diminishing returns for repeated terms.',
        use: 'When computing term importance within a single document.',
        desc: 'Slide raw frequency to see log-weighted TF and understand diminishing returns.',
        href: '/static/chapter03/visualizations/04-term-frequency.html',
        diff: 'beginner', cat: 'weighting', hasQuiz: true, time: 7
      },
      {
        id: 5, title: 'Inverse Document Frequency (IDF)',
        aim: 'Understand how IDF rewards rare, discriminating words and penalizes common ones across a collection.',
        use: 'When you need to measure how informative a term is across the entire document collection.',
        desc: 'Explore term rarity. Click terms to see how IDF rewards rare words.',
        href: '/static/chapter03/visualizations/05-inverse-document-frequency.html',
        diff: 'intermediate', cat: 'weighting', hasQuiz: true, time: 8
      },
      {
        id: 6, title: 'TF-IDF Weighting',
        aim: 'Master the full TF-IDF scoring pipeline combining term frequency and inverse document frequency.',
        use: 'When implementing the gold-standard term weighting scheme used by virtually every search engine.',
        desc: 'The Gold Standard! Full scoring pipeline with heatmap, walkthrough, and final rankings.',
        href: '/static/chapter03/visualizations/06-tfidf-weighting.html',
        diff: 'intermediate', cat: 'weighting', hasQuiz: true, time: 15
      },
      {
        id: 7, title: 'Vector Normalization (L2)',
        aim: 'Understand why length bias is a problem and how L2 normalization projects vectors onto the unit circle.',
        use: 'When comparing documents of very different lengths so that longer documents are not unfairly favored.',
        desc: 'Watch vectors project onto the unit circle. Understand why length bias is a problem.',
        href: '/static/chapter03/visualizations/07-vector-normalization.html',
        diff: 'intermediate', cat: 'advanced', hasQuiz: true, time: 10
      },
      {
        id: 8, title: 'CosineScore Algorithm',
        aim: 'Step through the vector space retrieval algorithm with code highlighting and live accumulator scoreboard.',
        use: 'When you need to understand how a search engine computes and ranks similarity scores.',
        desc: 'Step through the retrieval algorithm with code highlighting and live accumulator scoreboard.',
        href: '/static/chapter03/visualizations/08-cosinescore-algorithm.html',
        diff: 'advanced', cat: 'advanced', hasQuiz: true, time: 15
      },
      {
        id: 9, title: 'Polysemy & Synonymy',
        aim: 'Learn how one word with multiple meanings and many words with the same meaning break exact matching.',
        use: 'When understanding the fundamental limitations of keyword-based retrieval.',
        desc: 'See how one word → many meanings and many words → one meaning break exact matching.',
        href: '/static/chapter03/visualizations/09-polysemy-synonymy.html',
        diff: 'beginner', cat: 'advanced', hasQuiz: true, time: 5
      },
      {
        id: 10, title: 'Evaluation Metrics',
        aim: 'Understand Precision, Recall, F1, MAP, and NDCG through interactive confusion matrices and drag-and-drop.',
        use: 'When evaluating the quality of a retrieval system across multiple queries.',
        desc: 'Interactive confusion matrix, P-R curve, drag-and-drop MAP calculator, and NDCG visualizer.',
        href: '/static/chapter03/visualizations/10-evaluation-metrics.html',
        diff: 'intermediate', cat: 'advanced', hasQuiz: true, time: 20
      },
      {
        id: 11, title: 'Practice Quiz',
        aim: 'Test your understanding with 45+ questions covering every concept with step-by-step explanations.',
        use: 'When you want to verify your mastery of Chapter 3 concepts with detailed algorithm traces.',
        desc: '45+ questions covering Cosine Similarity, TF-IDF, P/R/F1, MAP, NDCG.',
        href: '/static/chapter03/visualizations/11-practice-quiz.html',
        diff: 'beginner', cat: 'practice', hasQuiz: true, time: 15
      },
    ]
  },

  'chapter04': {
    title: 'Index Construction & Compression',
    week: 4,
    description: 'Building Scalable Search Engines — From Hardware Basics to Distributed Indexing, Compression, and Query Processing.',
    pdf: '/static/chapter04/Week_4_Index_Construction_&_Compression.pdf',
    // Chapter 4 is a single long page, not separate visualizations
    isSinglePage: true,
    singlePageHref: '/static/chapter04/index.html',
    categories: [
      { id: 'all', label: 'All Topics' },
      { id: 'construction', label: 'Index Construction' },
      { id: 'compression', label: 'Compression' },
      { id: 'distributed', label: 'Distributed' },
      { id: 'queries', label: 'Query Processing' },
    ],
    visualizations: [
      {
        id: 1, title: 'Hardware Basics & I/O',
        aim: 'Understand why IR is I/O-bound and how disk latency drives all indexing algorithm design.',
        use: 'When you need to understand the fundamental bottleneck that motivates BSBI, SPIMI, and compression.',
        desc: 'Latency comparison, seek vs transfer, and the indexing pipeline overview.',
        href: '/static/chapter04/index.html#hardware',
        diff: 'beginner', cat: 'construction', hasQuiz: false, time: 5
      },
      {
        id: 2, title: 'BSBI: Block Sort-Based Indexing',
        aim: 'Learn how external sorting processes data that doesn\'t fit in RAM by sorting blocks and merging them.',
        use: 'When building an inverted index from a collection larger than available memory.',
        desc: 'Step-by-step BSBI simulator with algorithm flow diagrams.',
        href: '/static/chapter04/index.html#bsbi',
        diff: 'intermediate', cat: 'construction', hasQuiz: false, time: 10
      },
      {
        id: 3, title: 'SPIMI: Single-Pass In-Memory',
        aim: 'Understand how SPIMI builds postings lists directly using a hash map, eliminating the need for sorting.',
        use: 'The standard approach used by Lucene/Elasticsearch — understand the core of modern search engines.',
        desc: 'BSBI vs SPIMI comparison with interactive SPIMI simulator.',
        href: '/static/chapter04/index.html#spimi',
        diff: 'intermediate', cat: 'construction', hasQuiz: false, time: 10
      },
      {
        id: 4, title: 'Distributed Indexing: MapReduce',
        aim: 'Learn how MapReduce scales indexing from one machine to thousands using Map, Shuffle, and Reduce phases.',
        use: 'When indexing web-scale data that requires distributed processing across many machines.',
        desc: 'MapReduce data flow, Docker demo, partitioning strategies, and dynamic indexing.',
        href: '/static/chapter04/index.html#mapreduce',
        diff: 'advanced', cat: 'distributed', hasQuiz: false, time: 15
      },
      {
        id: 5, title: 'Index Compression',
        aim: 'Understand Gap Encoding, Variable Byte, and Gamma Encoding — the techniques that make indexes fit in RAM.',
        use: 'When optimizing index size for speed — compressed indexes fit in RAM and avoid slow disk seeks.',
        desc: 'Interactive demos for Gap Encoding, VB Encoding, and Gamma Encoding.',
        href: '/static/chapter04/index.html#compression',
        diff: 'intermediate', cat: 'compression', hasQuiz: false, time: 12
      },
      {
        id: 6, title: 'Query Processing',
        aim: 'Learn skip pointers intersection, phrase queries with positional indexes, wildcard queries, and Permuterm.',
        use: 'When implementing efficient query answering on an inverted index.',
        desc: 'Skip pointers, phrase queries, wildcards, and Permuterm index.',
        href: '/static/chapter04/index.html#queries',
        diff: 'intermediate', cat: 'queries', hasQuiz: false, time: 12
      },
      {
        id: 7, title: 'Chapter 4 Quiz',
        aim: 'Test your understanding with 15 questions covering BSBI, SPIMI, MapReduce, and compression.',
        use: 'When you want to verify your mastery of Chapter 4 concepts.',
        desc: '15 questions covering all index construction and compression topics.',
        href: '/static/chapter04/index.html#quiz',
        diff: 'beginner', cat: 'all', hasQuiz: true, time: 10
      },
    ]
  },

  'chapter06': {
    title: 'Evaluation in Information Retrieval',
    week: 6,
    description: 'Master every evaluation metric through hands-on interactive visualizations, quizzes, and challenges.',
    pdf: '/static/chapter06/Week_6_Evaluation_in_Information_Retrieval.pdf',
    categories: [
      { id: 'all', label: 'All Topics' },
      { id: 'binary', label: 'Binary Metrics' },
      { id: 'ranked', label: 'Ranked Metrics' },
      { id: 'graded', label: 'Graded Metrics' },
      { id: 'online', label: 'Online Evaluation' },
    ],
    visualizations: [
      { id: 1, title: 'Confusion Matrix', aim: 'Understand the four outcomes of binary classification (TP, FP, FN, TN) and how they drive Precision, Recall, and Accuracy.', use: 'When you need to evaluate a binary classifier — any system that decides "relevant or not."', desc: 'Classify documents and watch evaluation metrics update in real time.', href: '/static/chapter06/visualizations/01-confusion-matrix.html', diff: 'beginner', cat: 'binary', hasQuiz: true, time: 8 },
      { id: 2, title: 'Precision, Recall & F₁', aim: 'Learn the tradeoff between Precision and Recall, and how the harmonic mean (F₁) balances them.', use: 'When you need a single score that balances finding all relevant docs vs. avoiding junk results.', desc: 'Adjust sliders, explore Venn diagrams, and visualize F₁ iso-curves.', href: '/static/chapter06/visualizations/02-precision-recall-f1.html', diff: 'beginner', cat: 'binary', hasQuiz: true, time: 10 },
      { id: 3, title: 'Precision@k', aim: 'Learn how Precision changes at different rank cutoffs and why the choice of k matters.', use: 'When users only look at the first page of results (e.g. top 10) and you want to measure quality there.', desc: 'Set cutoff k and toggle document relevance to see P@k change.', href: '/static/chapter06/visualizations/03-precision-at-k.html', diff: 'beginner', cat: 'ranked', hasQuiz: true, time: 7 },
      { id: 4, title: 'Average Precision & MAP', aim: 'Understand how AP summarizes precision at all relevant positions, and how MAP averages over queries.', use: 'When you want a single number summarizing ranked retrieval quality across an entire test collection.', desc: 'Step through AP rank-by-rank, then compute MAP across queries.', href: '/static/chapter06/visualizations/04-average-precision-map.html', diff: 'intermediate', cat: 'ranked', hasQuiz: true, time: 12 },
      { id: 5, title: 'Mean Reciprocal Rank', aim: 'Learn how MRR evaluates systems by focusing on the rank of the first relevant result.', use: 'When only the first correct answer matters — question answering, voice search, navigational queries.', desc: 'Toggle relevance chips and watch MRR update across 5 queries.', href: '/static/chapter06/visualizations/05-mrr.html', diff: 'beginner', cat: 'ranked', hasQuiz: true, time: 7 },
      { id: 6, title: 'DCG & NDCG', aim: 'Understand graded relevance, the logarithmic discount, and how NDCG normalizes ranking quality.', use: 'When relevance is not binary but graded (e.g. highly relevant, somewhat relevant, not relevant).', desc: 'Adjust relevance grades (0–3) and compare DCG vs IDCG bars.', href: '/static/chapter06/visualizations/06-dcg-ndcg.html', diff: 'intermediate', cat: 'graded', hasQuiz: true, time: 12 },
      { id: 7, title: 'R-Precision', aim: 'Learn how R-Precision automatically adjusts the cutoff to the number of known relevant documents.', use: 'When you want a cutoff-free metric that adapts to each query\'s number of relevant documents.', desc: 'Toggle relevance and watch the top-R window adapt automatically.', href: '/static/chapter06/visualizations/07-r-precision.html', diff: 'beginner', cat: 'ranked', hasQuiz: true, time: 7 },
      { id: 8, title: 'Pooling Method', aim: 'Understand how test collections are built by pooling top results from multiple retrieval systems.', use: 'When building a reusable test collection (like TREC) — you cannot judge every document manually.', desc: 'Merge, deduplicate, and act as the human relevance assessor.', href: '/static/chapter06/visualizations/08-pooling-method.html', diff: 'intermediate', cat: 'online', hasQuiz: true, time: 10 },
      { id: 9, title: 'Interleaving (Team Draft)', aim: 'Learn how interleaving compares two systems using a single merged list and real user clicks.', use: 'When A/B testing search systems online with real users — more sensitive than side-by-side comparison.', desc: 'Watch the coin-flip draft and simulate clicks to pick a winner.', href: '/static/chapter06/visualizations/09-interleaving.html', diff: 'intermediate', cat: 'online', hasQuiz: true, time: 10 },
      { id: 10, title: 'Click Models (Cascade)', aim: 'Understand how the Cascade Model predicts user clicks using examination and relevance probabilities.', use: 'When analyzing click logs to infer relevance — users don\'t click every result they see.', desc: 'Adjust per-rank probabilities and simulate user scanning.', href: '/static/chapter06/visualizations/10-click-models.html', diff: 'advanced', cat: 'online', hasQuiz: true, time: 12 },
      { id: 11, title: 'Eye-Tracking Patterns', aim: 'Learn how users visually scan search results and why position bias affects evaluation.', use: 'When designing SERPs or correcting for position bias — understanding where users actually look.', desc: 'Explore F-shaped reading, the Golden Triangle, and gaze paths.', href: '/static/chapter06/visualizations/11-eye-tracking.html', diff: 'beginner', cat: 'online', hasQuiz: true, time: 8 },
      { id: 12, title: 'Significance Testing', aim: 'Learn how to tell whether the difference between two systems is statistically significant.', use: 'When publishing results or making deployment decisions — ensuring improvements are not due to chance.', desc: 'Enter per-query scores and run a paired t-test with visual results.', href: '/static/chapter06/visualizations/12-significance-testing.html', diff: 'advanced', cat: 'online', hasQuiz: true, time: 12 },
    ]
  },

  'chapter05': {
    title: 'Boolean & Vector Space Models',
    week: 5,
    description: 'From exact matching to ranked retrieval — master Boolean query processing, query optimization, and efficient scoring heuristics.',
    pdf: '/static/chapter05/Week_5_Boolean_&_Vector_Space_Models.pdf',
    categories: [
      { id: 'all', label: 'All Topics' },
      { id: 'boolean', label: 'Boolean Retrieval' },
      { id: 'efficiency', label: 'Efficiency' },
      { id: 'applications', label: 'Applications' },
      { id: 'practice', label: 'Practice' },
    ],
    visualizations: [
      {
        id: 1, title: 'Boolean Retrieval Simulator',
        aim: 'Build an inverted index from scratch and process Boolean queries (AND, OR, NOT) with the step-by-step merge algorithm.',
        use: 'When you need to understand how the fundamental search algorithm processes exact-match queries on posting lists.',
        desc: 'Edit documents, build the inverted index, enter Boolean queries, and watch the merge algorithm execute step by step.',
        href: '/static/chapter05/visualizations/01-boolean-retrieval.html',
        diff: 'beginner', cat: 'boolean', hasQuiz: true, time: 12
      },
      {
        id: 2, title: 'Query Optimization',
        aim: 'Learn why processing terms in order of increasing document frequency dramatically reduces computational cost.',
        use: 'When implementing multi-term AND queries — the golden rule of intersection that saves orders of magnitude of work.',
        desc: 'Adjust document frequencies with sliders and compare naive vs. optimized query order with live speedup calculation.',
        href: '/static/chapter05/visualizations/02-query-optimization.html',
        diff: 'intermediate', cat: 'boolean', hasQuiz: true, time: 8
      },
      {
        id: 3, title: 'Champion Lists & Index Elimination',
        aim: 'Understand how search engines avoid scoring every document using pre-computed champion lists and index elimination heuristics.',
        use: 'When building a web-scale search engine where full scoring is too slow — the speed vs. recall trade-off.',
        desc: 'Toggle between full scoring, champion lists, and index elimination. See the computational savings vs. recall impact.',
        href: '/static/chapter05/visualizations/03-champion-lists.html',
        diff: 'intermediate', cat: 'efficiency', hasQuiz: true, time: 10
      },
      {
        id: 4, title: 'E-Commerce Search',
        aim: 'See how real product search engines use multi-field weighted scoring across title, category, and description.',
        use: 'When designing search ranking for structured data — e-commerce, job boards, real estate, or any multi-field domain.',
        desc: 'Search a product catalog with adjustable field weights. See per-product score breakdowns and how weights affect ranking.',
        href: '/static/chapter05/visualizations/04-ecommerce-search.html',
        diff: 'intermediate', cat: 'applications', hasQuiz: true, time: 10
      },
      {
        id: 5, title: 'Practice Quiz',
        aim: 'Test your understanding with 15 questions covering Boolean retrieval, query optimization, champion lists, and multi-field scoring.',
        use: 'When you want to verify your mastery of Chapter 5 concepts with instant feedback and explanations.',
        desc: '15 questions with instant feedback covering all Chapter 5 topics.',
        href: '/static/chapter05/visualizations/05-practice-quiz.html',
        diff: 'beginner', cat: 'practice', hasQuiz: true, time: 10
      },
    ]
  },
};

// Chapter order for homepage display
export const chapterOrder = ['chapter01', 'chapter02', 'chapter03', 'chapter04', 'chapter05', 'chapter06'];
