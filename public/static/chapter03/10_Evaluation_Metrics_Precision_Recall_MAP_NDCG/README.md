# 10. Evaluation Metrics — Precision, Recall, F-Measure, MAP & NDCG

## Concept

How do we measure if our search system is actually **good**? Multiple metrics capture different aspects of retrieval quality.

## Formulas

### Precision & Recall

```
Precision = |Relevant ∩ Retrieved| / |Retrieved|    → "Of what I got, how much is useful?"
Recall    = |Relevant ∩ Retrieved| / |Relevant|     → "Of what's useful, how much did I get?"
```

### F-Measure (Harmonic Mean)

```
F₁ = 2 × (P × R) / (P + R)
```

### MAP (Mean Average Precision)

- Average precision at each rank where a relevant document appears
- Then mean across all queries

### NDCG (Normalized Discounted Cumulative Gain)

```
DCG  = Σ (relevanceᵢ / log₂(i + 1))
NDCG = DCG / IDCG
```

- Gives more credit for relevant docs ranked **higher**

## Key Ideas

- **Precision-Recall tradeoff**: Improving one usually hurts the other
- F-Measure balances both into a single number
- MAP & NDCG evaluate **ranked** result lists (position matters!)
- NDCG handles multi-level relevance (not just relevant/not)

## 🎨 Visualization Ideas

| Visual | Description |
|--------|-------------|
| **Precision-Recall curve** | Interactive plot: drag a threshold slider to see P and R change |
| **Confusion matrix** | Color-coded 2×2 grid with TP, FP, FN, TN updating dynamically |
| **Ranking evaluator** | Drag-and-drop search results to see MAP and NDCG scores change in real-time |
| **Discounted gain visualization** | Bar chart showing how each rank position "discounts" the relevance contribution |
