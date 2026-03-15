#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║  DEMO 01 — Block Sort-Based Indexing (BSBI)                 ║
║  CS313x Chapter 4: Index Construction                        ║
╚══════════════════════════════════════════════════════════════╝

This script demonstrates the BSBI algorithm:
  1. Parse documents → generate (term, docID) pairs
  2. When a "block" fills up → sort by term → write to disk
  3. After all blocks → merge them into the final index

Run: python 01_bsbi_demo.py
"""

import heapq
import json
import os
import re
import tempfile

# ── CONFIG ──────────────────────────────────────────
BLOCK_SIZE = 10  # Max pairs before flushing to disk (small for demo)
C = "\033[96m"; G = "\033[92m"; Y = "\033[93m"; R = "\033[91m"
B = "\033[1m"; RST = "\033[0m"

# ── SAMPLE DOCUMENTS ───────────────────────────────
DOCUMENTS = {
    1: "the gladiator fought bravely in the arena",
    2: "the gladiator defeated his opponent in rome",
    3: "rome celebrated the victory of the brave gladiator",
    4: "the emperor watched the battle from his throne",
    5: "brave warriors fought in the colosseum arena",
}

def tokenize(text):
    return re.findall(r'[a-z]+', text.lower())

def print_header(msg):
    print(f"\n{B}{G}{'═'*60}{RST}")
    print(f"{B}{G}  {msg}{RST}")
    print(f"{B}{G}{'═'*60}{RST}")

# ════════════════════════════════════════════════════
#  STEP 1: Parse & Pair  →  Generate (TermID, DocID)
# ════════════════════════════════════════════════════
print_header("STEP 1: Parse & Pair — Generating (term, docID) pairs")

all_pairs = []
for doc_id, text in DOCUMENTS.items():
    tokens = tokenize(text)
    for t in tokens:
        all_pairs.append((t, doc_id))
        
print(f"  Total pairs generated: {B}{len(all_pairs)}{RST}")
print(f"  First 10 pairs:")
for p in all_pairs[:10]:
    print(f"    (\"{p[0]}\", {p[1]})")

# ════════════════════════════════════════════════════
#  STEP 2: Sort Blocks & Write Segments to Disk
# ════════════════════════════════════════════════════
print_header("STEP 2: Sort Blocks & Write Segments to Disk")
print(f"  Block size: {BLOCK_SIZE} pairs (in real systems: millions)")

temp_dir = tempfile.mkdtemp(prefix="bsbi_")
segment_files = []
block = []

for i, pair in enumerate(all_pairs):
    block.append(pair)
    
    if len(block) >= BLOCK_SIZE:
        # Sort the block by term (alphabetical)
        block.sort(key=lambda x: (x[0], x[1]))
        
        seg_file = os.path.join(temp_dir, f"segment_{len(segment_files)}.json")
        with open(seg_file, 'w') as f:
            json.dump(block, f)
        segment_files.append(seg_file)
        
        print(f"\n  {Y}Block {len(segment_files)} (full → sorting → writing){RST}")
        for p in block:
            print(f"    (\"{p[0]}\", {p[1]})")
        
        block = []

# Don't forget the last partial block
if block:
    block.sort(key=lambda x: (x[0], x[1]))
    seg_file = os.path.join(temp_dir, f"segment_{len(segment_files)}.json")
    with open(seg_file, 'w') as f:
        json.dump(block, f)
    segment_files.append(seg_file)
    print(f"\n  {Y}Block {len(segment_files)} (last partial block → sorting → writing){RST}")
    for p in block:
        print(f"    (\"{p[0]}\", {p[1]})")

print(f"\n  {G}✅ Wrote {len(segment_files)} segments to disk{RST}")

# ════════════════════════════════════════════════════
#  STEP 3: Multi-way Merge  →  Final Inverted Index
# ════════════════════════════════════════════════════
print_header("STEP 3: Multi-way Merge — Building Final Index")
print(f"  Merging {len(segment_files)} segments using heapq.merge()")

# Read all segments
segments = []
for sf in segment_files:
    with open(sf, 'r') as f:
        seg = [tuple(p) for p in json.load(f)]
    segments.append(seg)

# Merge all sorted segments
merged = list(heapq.merge(*segments, key=lambda x: (x[0], x[1])))

# Build the final inverted index from merged pairs
inverted_index = {}
for term, doc_id in merged:
    if term not in inverted_index:
        inverted_index[term] = []
    if doc_id not in inverted_index[term]:
        inverted_index[term].append(doc_id)

# ════════════════════════════════════════════════════
#  FINAL OUTPUT
# ════════════════════════════════════════════════════
print_header("FINAL INVERTED INDEX (BSBI Result)")
print(f"  {B}Terms: {len(inverted_index)}  |  Total postings: {sum(len(v) for v in inverted_index.values())}{RST}\n")

for term in sorted(inverted_index.keys()):
    postings = inverted_index[term]
    bar = "█" * len(postings)
    print(f"  {C}{term:15s}{RST} → {postings}  {Y}{bar}{RST}")

# ════════════════════════════════════════════════════
#  COMPLEXITY ANALYSIS
# ════════════════════════════════════════════════════
T = len(all_pairs)
print(f"\n{B}{Y}COMPLEXITY ANALYSIS:{RST}")
print(f"  T (total pairs)  = {T}")
print(f"  Time complexity   = O(T log T) = O({T} × {T.bit_length()}) ≈ {T * T.bit_length()}")
print(f"  I/O passes        = ~4 (read docs, write segs, read segs, write final)")
print(f"  File handles open = {len(segment_files)} (one per segment during merge)")
print(f"  {R}⚠ Limitation: Too many segments = too many file handles!{RST}")
