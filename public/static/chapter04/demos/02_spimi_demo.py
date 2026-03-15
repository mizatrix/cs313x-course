#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║  DEMO 02 — Single-Pass In-Memory Indexing (SPIMI)            ║
║  CS313x Chapter 4: Index Construction                        ║
╚══════════════════════════════════════════════════════════════╝

SPIMI builds postings lists directly in memory (no pairs!).
This saves memory and avoids the O(N log N) sort of BSBI.

Key differences from BSBI:
  - No (term, docID) pairs — appends docIDs directly to postings lists
  - Uses a hash map (dictionary) instead of sorted pairs
  - Only sorts terms when flushing to disk
  - More memory-efficient → can process larger blocks

Run: python 02_spimi_demo.py
"""

import json
import os
import re
import sys
import tempfile

C = "\033[96m"; G = "\033[92m"; Y = "\033[93m"; R = "\033[91m"
M = "\033[95m"; B = "\033[1m"; RST = "\033[0m"

# ── SAMPLE DOCUMENTS ───────────────────────────────
DOCUMENTS = {
    1: "the gladiator fought bravely in the arena",
    2: "the gladiator defeated his opponent in rome",
    3: "rome celebrated the victory of the brave gladiator",
    4: "the emperor watched the battle from his throne",
    5: "brave warriors fought in the colosseum arena",
}

MEMORY_LIMIT = 15  # Max dictionary entries before flush (small for demo)

def tokenize(text):
    return re.findall(r'[a-z]+', text.lower())

def print_header(msg):
    print(f"\n{B}{M}{'═'*60}{RST}")
    print(f"{B}{M}  {msg}{RST}")
    print(f"{B}{M}{'═'*60}{RST}")

def memory_usage(dictionary):
    """Estimate memory: count total entries in all postings lists."""
    return sum(len(v) for v in dictionary.values())

# ════════════════════════════════════════════════════
#  SPIMI ALGORITHM
# ════════════════════════════════════════════════════
print_header("SPIMI — Single-Pass In-Memory Indexing")

temp_dir = tempfile.mkdtemp(prefix="spimi_")
segment_files = []
dictionary = {}  # term → [docID, docID, ...]
block_num = 0

print(f"  Memory limit: {MEMORY_LIMIT} postings per block\n")

for doc_id, text in DOCUMENTS.items():
    tokens = tokenize(text)
    print(f"  {C}📄 Doc {doc_id}: \"{text}\"{RST}")
    
    for token in tokens:
        # ── STEP 1: Lookup / Add ──
        if token not in dictionary:
            dictionary[token] = []
            print(f"    {Y}+ New term: \"{token}\" → created empty list{RST}")
        
        # ── STEP 2: Append DocID directly (NO PAIRS!) ──
        if doc_id not in dictionary[token]:
            dictionary[token].append(doc_id)
            print(f"    {C}  append({doc_id}) to \"{token}\" → {dictionary[token]}{RST}")
        
        # ── STEP 3: Check memory ──
        if memory_usage(dictionary) >= MEMORY_LIMIT:
            block_num += 1
            print(f"\n  {R}⚡ RAM FULL! ({memory_usage(dictionary)} postings ≥ {MEMORY_LIMIT}){RST}")
            print(f"  {Y}→ Sorting terms alphabetically & flushing to disk...{RST}")
            
            # Sort the dictionary terms (not the pairs like BSBI!)
            sorted_dict = dict(sorted(dictionary.items()))
            
            seg_file = os.path.join(temp_dir, f"spimi_seg_{block_num}.json")
            with open(seg_file, 'w') as f:
                json.dump(sorted_dict, f, indent=2)
            segment_files.append(seg_file)
            
            print(f"  {G}✅ Segment {block_num} written ({len(sorted_dict)} terms){RST}")
            for t in sorted(sorted_dict.keys()):
                print(f"      {t:15s} → {sorted_dict[t]}")
            
            dictionary = {}  # Clear RAM
            print()

# Flush remaining data
if dictionary:
    block_num += 1
    sorted_dict = dict(sorted(dictionary.items()))
    seg_file = os.path.join(temp_dir, f"spimi_seg_{block_num}.json")
    with open(seg_file, 'w') as f:
        json.dump(sorted_dict, f, indent=2)
    segment_files.append(seg_file)
    print(f"\n  {Y}→ Flushing last block ({memory_usage(dictionary)} postings)...{RST}")
    print(f"  {G}✅ Segment {block_num} written ({len(sorted_dict)} terms){RST}")
    for t in sorted(sorted_dict.keys()):
        print(f"      {t:15s} → {sorted_dict[t]}")

# ════════════════════════════════════════════════════
#  MERGE SEGMENTS
# ════════════════════════════════════════════════════
print_header("MERGING SEGMENTS → Final Inverted Index")

final_index = {}
for sf in segment_files:
    with open(sf, 'r') as f:
        segment = json.load(f)
    for term, postings in segment.items():
        if term not in final_index:
            final_index[term] = []
        for doc_id in postings:
            if doc_id not in final_index[term]:
                final_index[term].append(doc_id)
        final_index[term].sort()

# ════════════════════════════════════════════════════
#  FINAL OUTPUT
# ════════════════════════════════════════════════════
print_header("FINAL INVERTED INDEX (SPIMI Result)")

for term in sorted(final_index.keys()):
    postings = final_index[term]
    bar = "█" * len(postings)
    print(f"  {C}{term:15s}{RST} → {postings}  {Y}{bar}{RST}")

# ════════════════════════════════════════════════════
#  COMPARISON: BSBI vs SPIMI
# ════════════════════════════════════════════════════
print_header("BSBI vs SPIMI — Key Differences")

print(f"""
  ┌──────────────────┬────────────────────────┬────────────────────────┐
  │ Feature          │ BSBI (Block Sort)      │ SPIMI (Single Pass)    │
  ├──────────────────┼────────────────────────┼────────────────────────┤
  │ Data Structure   │ (TermID, DocID) pairs  │ Postings lists directly│
  │ Sorting          │ O(N log N) sort pairs  │ {G}No sorting! O(N){RST}       │
  │ Dictionary       │ Needs global TermID    │ {G}Builds dynamically{RST}     │
  │ Memory Usage     │ High (duplicate terms) │ {G}Efficient (compact){RST}    │
  │ Compression      │ Hard to compress pairs │ {G}Can compress on fly{RST}    │
  └──────────────────┴────────────────────────┴────────────────────────┘

  {B}{G}Winner: SPIMI{RST} — Used in modern search engines (Lucene, etc.)
""")
