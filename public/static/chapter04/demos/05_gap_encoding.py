#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║  DEMO 05 — Gap Encoding + Dictionary Compression             ║
║  CS313x Chapter 4: Index Compression                         ║
╚══════════════════════════════════════════════════════════════╝

Demonstrates:
  1. Gap encoding for postings lists
  2. Dictionary compression (Fixed Width vs String Array vs Front Coding)

Run: python 05_gap_encoding.py
"""

C = "\033[96m"; G = "\033[92m"; Y = "\033[93m"; R = "\033[91m"
M = "\033[95m"; B = "\033[1m"; RST = "\033[0m"

def print_header(msg):
    print(f"\n{B}{G}{'═'*60}{RST}")
    print(f"{B}{G}  {msg}{RST}")
    print(f"{B}{G}{'═'*60}{RST}")

# ════════════════════════════════════════════════════
#  GAP ENCODING
# ════════════════════════════════════════════════════
print_header("Gap Encoding (D-Gaps)")

raw_postings = [33, 45, 52, 90, 120, 155, 200, 210, 212, 250]
print(f"  Raw DocIDs (sorted): {raw_postings}")
print(f"  Each DocID needs ~log2(max) = ~{len(bin(max(raw_postings)))-2} bits\n")

# Compute gaps
gaps = [raw_postings[0]]
print(f"  Computing gaps:")
print(f"    First: {raw_postings[0]} (stored as-is)")
for i in range(1, len(raw_postings)):
    gap = raw_postings[i] - raw_postings[i-1]
    gaps.append(gap)
    print(f"    {raw_postings[i]} - {raw_postings[i-1]} = {Y}{gap}{RST}")

print(f"\n  {B}Gap-encoded list: {gaps}{RST}")

# Show why gaps are better
avg_raw = sum(raw_postings) / len(raw_postings)
avg_gap = sum(gaps) / len(gaps)
print(f"\n  Average raw DocID:  {avg_raw:.1f} (needs ~{int(avg_raw).bit_length()} bits)")
print(f"  Average gap:        {avg_gap:.1f} (needs ~{int(avg_gap).bit_length()} bits)")
print(f"  {G}Gap encoding reduces the average value, making compression more effective!{RST}")

# ════════════════════════════════════════════════════
#  FREQUENT vs INFREQUENT TERMS
# ════════════════════════════════════════════════════
print_header("Why Gaps Are Small for Frequent Terms")

# Frequent term (appears in many docs)
frequent = list(range(1, 200, 3))  # every 3rd doc
freq_gaps = [frequent[0]] + [frequent[i] - frequent[i-1] for i in range(1, len(frequent))]
print(f"  Frequent term: appears in {len(frequent)} of 200 docs")
print(f"  Postings: [{frequent[0]}, {frequent[1]}, {frequent[2]}, ..., {frequent[-1]}]")
print(f"  Gaps:     [{freq_gaps[0]}, {freq_gaps[1]}, {freq_gaps[2]}, ...] ← {G}mostly 3!{RST}")
print(f"  Avg gap:  {sum(freq_gaps)/len(freq_gaps):.1f} → needs only ~{int(sum(freq_gaps)/len(freq_gaps)).bit_length()} bits per entry")

# Infrequent term
infrequent = [15, 120, 800, 5000, 50000]
infreq_gaps = [infrequent[0]] + [infrequent[i] - infrequent[i-1] for i in range(1, len(infrequent))]
print(f"\n  Infrequent term: appears in {len(infrequent)} of 50000 docs")
print(f"  Postings: {infrequent}")
print(f"  Gaps:     {infreq_gaps} ← {R}large gaps{RST}")
print(f"  Avg gap:  {sum(infreq_gaps)/len(infreq_gaps):.1f} → needs ~{int(sum(infreq_gaps)/len(infreq_gaps)).bit_length()} bits per entry")

# ════════════════════════════════════════════════════
#  DICTIONARY COMPRESSION
# ════════════════════════════════════════════════════
print_header("Dictionary Compression Methods")

terms = ["automata", "automate", "automatic", "automation", "cat", "dog", "zebra"]

# Method 1: Fixed Width
print(f"\n  {B}Method 1: Fixed Width (20 bytes per term){RST}")
fixed_bytes = len(terms) * 20
print(f"  Wastes space on short terms, can't store terms > 20 chars")
for t in terms:
    padded = t.ljust(20, '·')
    wasted = 20 - len(t)
    print(f"    [{padded}] ← {R}{wasted} bytes wasted{RST}" if wasted > 0 else f"    [{padded}]")
print(f"  Total: {fixed_bytes} bytes")

# Method 2: String Array + Pointers
print(f"\n  {B}Method 2: String Array + Pointers{RST}")
concat = "".join(terms)
pointer_bytes = len(terms) * 4  # 4 bytes per pointer
string_bytes = len(concat)
total_m2 = pointer_bytes + string_bytes
print(f"  Concatenated: \"{C}{concat}{RST}\"")
ptr = 0
for t in terms:
    print(f"    ptr:{ptr:3d} → \"{C}{t}{RST}\"")
    ptr += len(t)
print(f"  Total: {string_bytes} (string) + {pointer_bytes} (pointers) = {total_m2} bytes")

# Method 3: Front Coding
print(f"\n  {B}Method 3: Front Coding (Prefix Compression){RST}")
print(f"  Works best on sorted terms with shared prefixes:")

auto_terms = [t for t in terms if t.startswith("automat")]
if auto_terms:
    prefix = "automat"
    print(f"  Prefix: \"{Y}{prefix}{RST}\" (shared by {len(auto_terms)} terms)")
    
    # First term stored fully
    front_coded = f"{len(auto_terms[0])}{auto_terms[0]}"
    print(f"    {G}{len(auto_terms[0])}{auto_terms[0]}{RST}")
    
    for t in auto_terms[1:]:
        suffix = t[len(prefix):]
        code = f"  {len(prefix)}{suffix}"
        front_coded += code
        print(f"    {Y}↳ {len(prefix)}{suffix}{RST}  (\"automat\" + \"{suffix}\")")
    
    raw_auto = sum(len(t) for t in auto_terms)
    compressed_auto = len(auto_terms[0]) + sum(len(t) - len(prefix) for t in auto_terms[1:])
    saved = raw_auto - compressed_auto
    print(f"\n  Raw bytes:   {raw_auto}")
    print(f"  Compressed:  ~{compressed_auto} + overhead")
    print(f"  {G}Saved: ~{saved} bytes from this group alone{RST}")

# ════════════════════════════════════════════════════
#  SUMMARY
# ════════════════════════════════════════════════════
savings = (1 - total_m2 / fixed_bytes) * 100
print_header("Summary: Why Compression Matters")
print(f"""
  {B}Dictionary:{RST}
    Fixed Width:   {fixed_bytes} bytes
    String Array:  {total_m2} bytes ({savings:.0f}% smaller)
    Front Coding:  Even smaller with sorted terms!

  {B}Postings:{RST}
    Gap encoding reduces average value → fewer bits needed
    Frequent terms have tiny gaps (2-3 bits each!)

  {B}The Big Win:{RST}
    {G}A compressed index that fits in RAM beats an
    uncompressed index on disk — even with decompression overhead!{RST}
""")
