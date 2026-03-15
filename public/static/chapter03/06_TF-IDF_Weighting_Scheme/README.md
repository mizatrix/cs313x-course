# 6. TF-IDF Weighting Scheme

## Concept

The **"Gold Standard"** of traditional IR scoring. Combines local importance (TF) with global rarity (IDF) to produce the final term weight.

## Formula

```
w(t,d) = tf(t,d) × idf(t)

Full form:
w(t,d) = (1 + log₁₀(tf(t,d))) × log₁₀(N / df(t))
```

## Key Ideas

- High TF-IDF when: term is frequent in this doc BUT rare across the collection
- Low TF-IDF when: term is common everywhere (low IDF) or barely appears (low TF)
- Produces the **term weights** that populate document vectors
- Foundation for modern search engines

## 🎨 Visualization Ideas

| Visual | Description |
|--------|-------------|
| **TF-IDF Calculator** | Input a term, see TF, IDF, and TF-IDF computed step-by-step with a sample collection |
| **Term-Document Matrix heatmap** | Color-coded matrix where intensity = TF-IDF weight |
| **Scoring walkthrough** | Animated example: score a query against 3 documents end-to-end |
