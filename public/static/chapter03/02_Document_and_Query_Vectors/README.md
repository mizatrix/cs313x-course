# 2. Document & Query Vectors

## Concept

Every document and query is converted into a **numerical vector** where each dimension corresponds to a term in the vocabulary. The coordinate value is the term's weight.

## Key Ideas

- Vocabulary = set of all unique terms → defines dimensions
- A document vector: `d = (w₁, w₂, ..., wₙ)` where `wᵢ` is the weight of term `i`
- Query is also a vector in the same space
- Sparse representation: most weights are 0

## 🎨 Visualization Ideas

| Visual | Description |
|--------|-------------|
| **Term-Document Matrix** | Interactive heatmap showing terms (rows) vs. documents (columns) with weighted cells |
| **Vector construction animation** | Step-by-step animation showing how a sentence becomes a vector |
| **Dimensionality demo** | Show how adding a new term adds a new axis to the space |
