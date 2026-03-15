// Central data file defining all chapters and their visualizations
export const chapters = {
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
        href: '/static/chapter02/skip-pointers/index.html',
        diff: 'beginner', cat: 'core', hasQuiz: true
      },
      {
        id: 2, title: 'Edit Distance',
        aim: 'Learn how the Levenshtein distance DP matrix measures the minimum number of single-character edits between two strings.',
        use: 'When implementing spell correction, fuzzy matching, or approximate string search.',
        desc: 'Visualize the Levenshtein distance DP matrix filling cell-by-cell with color-coded operations and backtracing.',
        href: '/static/chapter02/edit-distance/index.html',
        diff: 'intermediate', cat: 'core', hasQuiz: true
      },
      {
        id: 3, title: 'Soundex Algorithm',
        aim: 'Follow the 5-stage phonetic encoding pipeline and understand how Soundex groups similar-sounding names together.',
        use: 'When matching names that sound alike but are spelled differently (e.g., "Smith" and "Smyth").',
        desc: 'Follow the 5-stage phonetic encoding pipeline. Compare two names to see if they sound alike.',
        href: '/static/chapter02/soundex/index.html',
        diff: 'beginner', cat: 'core', hasQuiz: true
      },
      {
        id: 4, title: 'Stemming vs Lemmatization',
        aim: 'Compare rule-based stemming against dictionary-based lemmatization and understand their tradeoffs.',
        use: 'When deciding how to normalize words in your IR pipeline to improve recall.',
        desc: 'Compare Porter Stemmer rules against dictionary-based lemmatization side by side.',
        href: '/static/chapter02/stemming-vs-lemmatization/index.html',
        diff: 'intermediate', cat: 'core', hasQuiz: true
      },
      {
        id: 5, title: 'Tokenization Challenges',
        aim: 'Learn how to handle real-world tokenization edge cases: punctuation, hyphens, numbers, apostrophes, and clitics.',
        use: 'When building or evaluating a tokenizer that must handle messy, real-world text input.',
        desc: 'Tokenize real-world text interactively — handle punctuation, hyphens, numbers, and more.',
        href: '/static/chapter02/tokenization/index.html',
        diff: 'intermediate', cat: 'deep-dive', hasQuiz: true
      },
      {
        id: 6, title: 'Porter Stemmer Deep Dive',
        aim: 'Explore all 5 steps of the Porter algorithm with vowel/consonant pattern visualization (CVC) and measure m(word).',
        use: 'When you need a detailed understanding of the most widely-used stemming algorithm.',
        desc: 'Explore all 5 steps of the Porter algorithm with vowel/consonant pattern visualization.',
        href: '/static/chapter02/porter-stemmer/index.html',
        diff: 'advanced', cat: 'deep-dive', hasQuiz: true
      },
      {
        id: 7, title: 'Practice Quiz',
        aim: 'Test your understanding with auto-generated questions on edit distance, Soundex, stemming, and tokenization.',
        use: 'When you want to verify your mastery of Chapter 2 concepts with instant feedback.',
        desc: 'Auto-generated questions with instant feedback and scoring.',
        href: '/static/chapter02/practice-quiz/index.html',
        diff: 'beginner', cat: 'practice', hasQuiz: true
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
        href: '/static/chapter03/01_Vector_Space_Model_Introduction/index.html',
        diff: 'beginner', cat: 'fundamentals', hasQuiz: true
      },
      {
        id: 2, title: 'Document & Query Vectors',
        aim: 'Learn how text is transformed into numerical vectors by building term-document matrices interactively.',
        use: 'When you need to represent documents mathematically for similarity computation.',
        desc: 'See how text becomes numbers. Build term-document matrices interactively from your own input.',
        href: '/static/chapter03/02_Document_and_Query_Vectors/index.html',
        diff: 'beginner', cat: 'fundamentals', hasQuiz: true
      },
      {
        id: 3, title: 'Cosine Similarity',
        aim: 'Understand how cosine similarity measures the angle between vectors, independent of document length.',
        use: 'When you need a length-independent measure of document similarity.',
        desc: 'Drag vectors to see the angle and cosine score change in real-time.',
        href: '/static/chapter03/03_Cosine_Similarity/index.html',
        diff: 'beginner', cat: 'fundamentals', hasQuiz: true
      },
      {
        id: 4, title: 'Term Frequency (TF)',
        aim: 'Learn how TF weights are computed and why log-weighted TF provides diminishing returns for repeated terms.',
        use: 'When computing term importance within a single document.',
        desc: 'Slide raw frequency to see log-weighted TF and understand diminishing returns.',
        href: '/static/chapter03/04_Term_Frequency_TF_Weighting/index.html',
        diff: 'beginner', cat: 'weighting', hasQuiz: true
      },
      {
        id: 5, title: 'Inverse Document Frequency (IDF)',
        aim: 'Understand how IDF rewards rare, discriminating words and penalizes common ones across a collection.',
        use: 'When you need to measure how informative a term is across the entire document collection.',
        desc: 'Explore term rarity. Click terms to see how IDF rewards rare words.',
        href: '/static/chapter03/05_Inverse_Document_Frequency_IDF/index.html',
        diff: 'intermediate', cat: 'weighting', hasQuiz: true
      },
      {
        id: 6, title: 'TF-IDF Weighting',
        aim: 'Master the full TF-IDF scoring pipeline combining term frequency and inverse document frequency.',
        use: 'When implementing the gold-standard term weighting scheme used by virtually every search engine.',
        desc: 'The Gold Standard! Full scoring pipeline with heatmap, walkthrough, and final rankings.',
        href: '/static/chapter03/06_TF-IDF_Weighting_Scheme/index.html',
        diff: 'intermediate', cat: 'weighting', hasQuiz: true
      },
      {
        id: 7, title: 'Vector Normalization (L2)',
        aim: 'Understand why length bias is a problem and how L2 normalization projects vectors onto the unit circle.',
        use: 'When comparing documents of very different lengths so that longer documents are not unfairly favored.',
        desc: 'Watch vectors project onto the unit circle. Understand why length bias is a problem.',
        href: '/static/chapter03/07_Vector_Normalization_L2_Norm/index.html',
        diff: 'intermediate', cat: 'advanced', hasQuiz: true
      },
      {
        id: 8, title: 'CosineScore Algorithm',
        aim: 'Step through the vector space retrieval algorithm with code highlighting and live accumulator scoreboard.',
        use: 'When you need to understand how a search engine computes and ranks similarity scores.',
        desc: 'Step through the retrieval algorithm with code highlighting and live accumulator scoreboard.',
        href: '/static/chapter03/08_Vector_Space_Retrieval_Algorithm/index.html',
        diff: 'advanced', cat: 'advanced', hasQuiz: true
      },
      {
        id: 9, title: 'Polysemy & Synonymy',
        aim: 'Learn how one word with multiple meanings and many words with the same meaning break exact matching.',
        use: 'When understanding the fundamental limitations of keyword-based retrieval.',
        desc: 'See how one word → many meanings and many words → one meaning break exact matching.',
        href: '/static/chapter03/09_Polysemy_and_Synonymy/index.html',
        diff: 'beginner', cat: 'advanced', hasQuiz: true
      },
      {
        id: 10, title: 'Evaluation Metrics',
        aim: 'Understand Precision, Recall, F1, MAP, and NDCG through interactive confusion matrices and drag-and-drop.',
        use: 'When evaluating the quality of a retrieval system across multiple queries.',
        desc: 'Interactive confusion matrix, P-R curve, drag-and-drop MAP calculator, and NDCG visualizer.',
        href: '/static/chapter03/10_Evaluation_Metrics_Precision_Recall_MAP_NDCG/index.html',
        diff: 'intermediate', cat: 'advanced', hasQuiz: true
      },
      {
        id: 11, title: 'Practice Quiz',
        aim: 'Test your understanding with 45+ questions covering every concept with step-by-step explanations.',
        use: 'When you want to verify your mastery of Chapter 3 concepts with detailed algorithm traces.',
        desc: '45+ questions covering Cosine Similarity, TF-IDF, P/R/F1, MAP, NDCG.',
        href: '/static/chapter03/practice-quiz/index.html',
        diff: 'beginner', cat: 'practice', hasQuiz: true
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
        diff: 'beginner', cat: 'construction', hasQuiz: false
      },
      {
        id: 2, title: 'BSBI: Block Sort-Based Indexing',
        aim: 'Learn how external sorting processes data that doesn\'t fit in RAM by sorting blocks and merging them.',
        use: 'When building an inverted index from a collection larger than available memory.',
        desc: 'Step-by-step BSBI simulator with algorithm flow diagrams.',
        href: '/static/chapter04/index.html#bsbi',
        diff: 'intermediate', cat: 'construction', hasQuiz: false
      },
      {
        id: 3, title: 'SPIMI: Single-Pass In-Memory',
        aim: 'Understand how SPIMI builds postings lists directly using a hash map, eliminating the need for sorting.',
        use: 'The standard approach used by Lucene/Elasticsearch — understand the core of modern search engines.',
        desc: 'BSBI vs SPIMI comparison with interactive SPIMI simulator.',
        href: '/static/chapter04/index.html#spimi',
        diff: 'intermediate', cat: 'construction', hasQuiz: false
      },
      {
        id: 4, title: 'Distributed Indexing: MapReduce',
        aim: 'Learn how MapReduce scales indexing from one machine to thousands using Map, Shuffle, and Reduce phases.',
        use: 'When indexing web-scale data that requires distributed processing across many machines.',
        desc: 'MapReduce data flow, Docker demo, partitioning strategies, and dynamic indexing.',
        href: '/static/chapter04/index.html#mapreduce',
        diff: 'advanced', cat: 'distributed', hasQuiz: false
      },
      {
        id: 5, title: 'Index Compression',
        aim: 'Understand Gap Encoding, Variable Byte, and Gamma Encoding — the techniques that make indexes fit in RAM.',
        use: 'When optimizing index size for speed — compressed indexes fit in RAM and avoid slow disk seeks.',
        desc: 'Interactive demos for Gap Encoding, VB Encoding, and Gamma Encoding.',
        href: '/static/chapter04/index.html#compression',
        diff: 'intermediate', cat: 'compression', hasQuiz: false
      },
      {
        id: 6, title: 'Query Processing',
        aim: 'Learn skip pointers intersection, phrase queries with positional indexes, wildcard queries, and Permuterm.',
        use: 'When implementing efficient query answering on an inverted index.',
        desc: 'Skip pointers, phrase queries, wildcards, and Permuterm index.',
        href: '/static/chapter04/index.html#queries',
        diff: 'intermediate', cat: 'queries', hasQuiz: false
      },
      {
        id: 7, title: 'Chapter 4 Quiz',
        aim: 'Test your understanding with 15 questions covering BSBI, SPIMI, MapReduce, and compression.',
        use: 'When you want to verify your mastery of Chapter 4 concepts.',
        desc: '15 questions covering all index construction and compression topics.',
        href: '/static/chapter04/index.html#quiz',
        diff: 'beginner', cat: 'all', hasQuiz: true
      },
    ]
  },

  'chapter06': {
    title: 'Evaluation in Information Retrieval',
    week: 6,
    description: 'Master every evaluation metric through hands-on interactive visualizations, quizzes, and challenges.',
    pdf: '/chapters/chapter06/Week_6_Evaluation_in_Information_Retrieval.pdf',
    categories: [
      { id: 'all', label: 'All Topics' },
      { id: 'binary', label: 'Binary Metrics' },
      { id: 'ranked', label: 'Ranked Metrics' },
      { id: 'graded', label: 'Graded Metrics' },
      { id: 'online', label: 'Online Evaluation' },
    ],
    visualizations: [
      { id: 1, title: 'Confusion Matrix', aim: 'Understand the four outcomes of binary classification (TP, FP, FN, TN) and how they drive Precision, Recall, and Accuracy.', use: 'When you need to evaluate a binary classifier — any system that decides "relevant or not."', desc: 'Classify documents and watch evaluation metrics update in real time.', href: '/chapters/chapter06/visualizations/01-confusion-matrix.html', diff: 'beginner', cat: 'binary', hasQuiz: true },
      { id: 2, title: 'Precision, Recall & F₁', aim: 'Learn the tradeoff between Precision and Recall, and how the harmonic mean (F₁) balances them.', use: 'When you need a single score that balances finding all relevant docs vs. avoiding junk results.', desc: 'Adjust sliders, explore Venn diagrams, and visualize F₁ iso-curves.', href: '/chapters/chapter06/visualizations/02-precision-recall-f1.html', diff: 'beginner', cat: 'binary', hasQuiz: true },
      { id: 3, title: 'Precision@k', aim: 'Learn how Precision changes at different rank cutoffs and why the choice of k matters.', use: 'When users only look at the first page of results (e.g. top 10) and you want to measure quality there.', desc: 'Set cutoff k and toggle document relevance to see P@k change.', href: '/chapters/chapter06/visualizations/03-precision-at-k.html', diff: 'beginner', cat: 'ranked', hasQuiz: true },
      { id: 4, title: 'Average Precision & MAP', aim: 'Understand how AP summarizes precision at all relevant positions, and how MAP averages over queries.', use: 'When you want a single number summarizing ranked retrieval quality across an entire test collection.', desc: 'Step through AP rank-by-rank, then compute MAP across queries.', href: '/chapters/chapter06/visualizations/04-average-precision-map.html', diff: 'intermediate', cat: 'ranked', hasQuiz: true },
      { id: 5, title: 'Mean Reciprocal Rank', aim: 'Learn how MRR evaluates systems by focusing on the rank of the first relevant result.', use: 'When only the first correct answer matters — question answering, voice search, navigational queries.', desc: 'Toggle relevance chips and watch MRR update across 5 queries.', href: '/chapters/chapter06/visualizations/05-mrr.html', diff: 'beginner', cat: 'ranked', hasQuiz: true },
      { id: 6, title: 'DCG & NDCG', aim: 'Understand graded relevance, the logarithmic discount, and how NDCG normalizes ranking quality.', use: 'When relevance is not binary but graded (e.g. highly relevant, somewhat relevant, not relevant).', desc: 'Adjust relevance grades (0–3) and compare DCG vs IDCG bars.', href: '/chapters/chapter06/visualizations/06-dcg-ndcg.html', diff: 'intermediate', cat: 'graded', hasQuiz: true },
      { id: 7, title: 'R-Precision', aim: 'Learn how R-Precision automatically adjusts the cutoff to the number of known relevant documents.', use: 'When you want a cutoff-free metric that adapts to each query\'s number of relevant documents.', desc: 'Toggle relevance and watch the top-R window adapt automatically.', href: '/chapters/chapter06/visualizations/07-r-precision.html', diff: 'beginner', cat: 'ranked', hasQuiz: true },
      { id: 8, title: 'Pooling Method', aim: 'Understand how test collections are built by pooling top results from multiple retrieval systems.', use: 'When building a reusable test collection (like TREC) — you cannot judge every document manually.', desc: 'Merge, deduplicate, and act as the human relevance assessor.', href: '/chapters/chapter06/visualizations/08-pooling-method.html', diff: 'intermediate', cat: 'online', hasQuiz: true },
      { id: 9, title: 'Interleaving (Team Draft)', aim: 'Learn how interleaving compares two systems using a single merged list and real user clicks.', use: 'When A/B testing search systems online with real users — more sensitive than side-by-side comparison.', desc: 'Watch the coin-flip draft and simulate clicks to pick a winner.', href: '/chapters/chapter06/visualizations/09-interleaving.html', diff: 'intermediate', cat: 'online', hasQuiz: true },
      { id: 10, title: 'Click Models (Cascade)', aim: 'Understand how the Cascade Model predicts user clicks using examination and relevance probabilities.', use: 'When analyzing click logs to infer relevance — users don\'t click every result they see.', desc: 'Adjust per-rank probabilities and simulate user scanning.', href: '/chapters/chapter06/visualizations/10-click-models.html', diff: 'advanced', cat: 'online', hasQuiz: true },
      { id: 11, title: 'Eye-Tracking Patterns', aim: 'Learn how users visually scan search results and why position bias affects evaluation.', use: 'When designing SERPs or correcting for position bias — understanding where users actually look.', desc: 'Explore F-shaped reading, the Golden Triangle, and gaze paths.', href: '/chapters/chapter06/visualizations/11-eye-tracking.html', diff: 'beginner', cat: 'online', hasQuiz: true },
      { id: 12, title: 'Significance Testing', aim: 'Learn how to tell whether the difference between two systems is statistically significant.', use: 'When publishing results or making deployment decisions — ensuring improvements are not due to chance.', desc: 'Enter per-query scores and run a paired t-test with visual results.', href: '/chapters/chapter06/visualizations/12-significance-testing.html', diff: 'advanced', cat: 'online', hasQuiz: true },
    ]
  },
};

// Chapter order for homepage display
export const chapterOrder = ['chapter02', 'chapter03', 'chapter04', 'chapter06'];
