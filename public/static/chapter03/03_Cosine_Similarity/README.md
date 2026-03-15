# 3. Cosine Similarity

## Concept

Measuring the **angle** between two vectors as a proxy for relevance. Smaller angle = more similar.

## Formula

```
sim(d, q) = (d · q) / (||d|| × ||q||)
```

- **Range:** 0 (orthogonal / unrelated) to 1 (identical direction)
- Uses **dot product** and **magnitude** (L2 norm)

## Key Ideas

- Euclidean distance is bad for documents (penalizes long documents)
- Cosine similarity is **length-independent**
- Only cares about the **direction**, not the magnitude
- Score of 1 = perfect match, 0 = no overlap

## 🎨 Visualization Ideas

| Visual | Description |
|--------|-------------|
| **Interactive angle calculator** | Drag two vectors, see the angle and cosine score update in real-time |
| **Why not Euclidean?** | Animated comparison: same text at different lengths showing Euclidean fails, cosine stays consistent |
| **Dot product breakdown** | Step-by-step visual of multiplying corresponding components and summing |
