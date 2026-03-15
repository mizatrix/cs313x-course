# 8. Vector Space Retrieval Algorithm (CosineScore)

## Concept

The practical **algorithm** for ranking documents using the Vector Space Model. Uses accumulators and sorting to efficiently find the top-K results.

## Algorithm Steps

1. Initialize score accumulator for each document to 0
2. For each query term t:
   - Compute weight `w(t,q)` for query
   - For each document d containing t:
     - `scores[d] += w(t,d) × w(t,q)`
3. Normalize: `scores[d] /= ||d||`
4. Sort by score descending
5. Return top K results

## Key Ideas

- Accumulators avoid recomputing from scratch for each document
- Only documents containing at least one query term get scores > 0
- Efficient implementation leverages the inverted index
- Top-K selection avoids sorting all documents

## 🎨 Visualization Ideas

| Visual | Description |
|--------|-------------|
| **Step-by-step algorithm animation** | Walk through CosineScore on a small example with 3 docs and 2 query terms |
| **Accumulator table** | Live-updating score board as each query term is processed |
| **Flowchart** | Visual flowchart of the algorithm with highlighted current step |
