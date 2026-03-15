# 5. Inverse Document Frequency (IDF)

## Concept

How **rare** or informative is a term across the **entire** document collection? Common terms (e.g., "the") get low weight; rare terms (e.g., "algorithm") get high weight.

## Formula

```
idf(t) = log₁₀(N / df(t))
```

Where:

- **N** = total number of documents
- **df(t)** = number of documents containing term t

## Key Ideas

- A term appearing in every document has idf = 0 (useless for discrimination)
- A term appearing in only 1 document has maximum idf
- IDF is a **collection-level** statistic (unlike TF which is per-document)
- Acts as a "rarity bonus" for discriminating terms

## 🎨 Visualization Ideas

| Visual | Description |
|--------|-------------|
| **IDF distribution graph** | Interactive: adjust df slider, see idf value change on a log curve |
| **Common vs. rare terms** | Side-by-side showing "the" (df=N, idf≈0) vs. "quantum" (df=3, idf=high) |
| **Collection-wide heatmap** | Grid of documents highlighting which ones contain a given term |
