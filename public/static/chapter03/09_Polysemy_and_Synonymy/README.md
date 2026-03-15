# 9. Semantic Issues: Polysemy & Synonymy

## Concept

The **limitations** of exact term matching in the Vector Space Model. Words are ambiguous!

## Key Ideas

### Polysemy (One word → Multiple meanings)

- "Jaguar" → the animal, the car brand, the macOS version
- "Python" → the snake, the programming language
- Leads to **false positives** (irrelevant results)

### Synonymy (Multiple words → Same meaning)

- "Movie" = "Film" = "Motion Picture"
- "Car" = "Automobile" = "Vehicle"
- Leads to **false negatives** (missed relevant results)

## 🎨 Visualization Ideas

| Visual | Description |
|--------|-------------|
| **Branching diagram** | Polysemy: one word node splitting into multiple meaning branches |
| **Merging diagram** | Synonymy: multiple word nodes converging into one concept |
| **Search failure examples** | Interactive search demo showing how polysemy/synonymy cause bad results |
| **Word-sense network** | Animated graph connecting words to their meanings |
