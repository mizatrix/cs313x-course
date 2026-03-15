# 7. Vector Normalization (L2 Norm)

## Concept

Adjusting document vectors to **unit length** so that long documents don't get an unfair advantage in similarity scoring.

## Formula

```
Unit vector: v̂ = v / ||v||

Where ||v|| = √(v₁² + v₂² + ... + vₙ²)
```

## Key Ideas

- Without normalization, longer documents have higher magnitude → artificially higher similarity scores
- L2 normalization projects all vectors onto the **unit sphere**
- After normalization: cosine similarity = simple dot product
- Essential preprocessing step before computing similarities

## 🎨 Visualization Ideas

| Visual | Description |
|--------|-------------|
| **Unit circle projection** | Animated vectors of different lengths being "shrunk/stretched" onto the unit circle |
| **Before vs. After** | Side-by-side: raw vectors (different lengths) → normalized vectors (all on unit circle) |
| **Length bias demo** | Show how an unnormalized long doc unfairly beats a short but relevant doc |
