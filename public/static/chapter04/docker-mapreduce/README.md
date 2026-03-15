# 🐳 Docker MapReduce — Distributed Indexing Demo

## Quick Start

```bash
# 1. Make sure Docker Desktop is running!

# 2. Build & Run
docker compose up --build

# 3. Watch the colored logs:
#    - Mappers tokenize documents
#    - Coordinator shuffles by hash(term) % 2
#    - Reducers build inverted index partitions
#    - Final merged index appears

# 4. Clean up
docker compose down -v
```

## Architecture

```
3 Mappers → 1 Coordinator → 2 Reducers → Final Index
```

| Container     | Role                                          |
|---------------|-----------------------------------------------|
| mapper_0/1/2  | Tokenize docs, emit (term, docID) pairs       |
| coordinator   | Wait for mappers, shuffle by hash, signal reducers |
| reducer_a/b   | Build postings lists, write index partitions   |

## What Students Will See

1. **Map Phase**: Each mapper reads its assigned document and produces `(term, docID)` JSON pairs
2. **Shuffle Phase**: The coordinator groups pairs by `hash(term) % 2` and routes to the correct reducer
3. **Reduce Phase**: Each reducer builds sorted postings lists for its assigned terms
4. **Merge**: Final `inverted_index.json` combines all partitions

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to Docker daemon" | Start Docker Desktop first! |
| Containers exit immediately | Check logs: `docker compose logs mapper_0` |
| Want to re-run | `docker compose down -v && docker compose up --build` |
