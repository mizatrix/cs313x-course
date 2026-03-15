# 4. Term Frequency (TF) Weighting

## Concept

How important is a term **within a single document**? Raw count is misleading — logarithmic scaling provides a better signal.

## Formula

```
w(t,d) = 1 + log₁₀(tf(t,d))    if tf(t,d) > 0
w(t,d) = 0                       if tf(t,d) = 0
```

## Key Ideas

- A term appearing 10× is NOT 10× more important than appearing 1×
- **Log-frequency** dampens the effect of high raw counts
- tf=1 → weight=1, tf=10 → weight=2, tf=100 → weight=3
- Sublinear scaling captures diminishing returns

## 🎨 Visualization Ideas

| Visual | Description |
|--------|-------------|
| **Raw TF vs. Log TF chart** | Interactive graph: slide raw frequency, see both raw and log-weighted values |
| **Document comparison** | Two docs with different raw TFs showing how log scaling equalizes them |
| **Diminishing returns curve** | Animated plot showing how each additional occurrence matters less |
