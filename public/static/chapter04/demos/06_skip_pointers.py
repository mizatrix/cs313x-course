#!/usr/bin/env python3
"""
DEMO 06 — Skip Pointers for Fast Intersection
CS313x Chapter 4: Query Processing
"""

import math, random

C = "\033[96m"; G = "\033[92m"; Y = "\033[93m"; R = "\033[91m"
B = "\033[1m"; RST = "\033[0m"

def ph(msg):
    print(f"\n{B}{C}{'═'*60}{RST}\n{B}{C}  {msg}{RST}\n{B}{C}{'═'*60}{RST}")

def intersect_standard(l1, l2):
    result, comps, i, j = [], 0, 0, 0
    while i < len(l1) and j < len(l2):
        comps += 1
        if l1[i] == l2[j]: result.append(l1[i]); i += 1; j += 1
        elif l1[i] < l2[j]: i += 1
        else: j += 1
    return result, comps

def build_skip_list(postings):
    L = len(postings)
    skip = max(1, int(math.sqrt(L)))
    sl = []
    for i, d in enumerate(postings):
        st = i + skip if (i % skip == 0 and i + skip < L) else None
        sl.append((d, st))
    return sl, skip

def intersect_with_skips(l1, l2):
    s1, _ = build_skip_list(l1)
    s2, _ = build_skip_list(l2)
    result, comps, skips, i, j = [], 0, 0, 0, 0
    while i < len(s1) and j < len(s2):
        comps += 1
        d1, d2 = s1[i][0], s2[j][0]
        if d1 == d2: result.append(d1); i += 1; j += 1
        elif d1 < d2:
            if s1[i][1] and s1[s1[i][1]][0] <= d2: i = s1[i][1]; skips += 1
            else: i += 1
        else:
            if s2[j][1] and s2[s2[j][1]][0] <= d1: j = s2[j][1]; skips += 1
            else: j += 1
    return result, comps, skips

# Small visual example
ph("Small Example: Visual Walkthrough")
p1 = [2, 4, 8, 16, 19, 23, 28, 43, 45]
p2 = [1, 2, 3, 5, 8, 13, 21, 28, 45]
print(f"  List 1 (\"brutus\"): {p1}\n  List 2 (\"caesar\"): {p2}")
s1, iv = build_skip_list(p1)
print(f"\n  Skip interval: sqrt({len(p1)}) = {iv}")
print(f"  List 1 with skip pointers:")
for i, (d, sk) in enumerate(s1):
    ss = f" --skip--> [{sk}]" if sk else ""
    m = f"{Y}*{RST}" if sk else " "
    print(f"    [{i}] {m} {d}{ss}")

r1, c1 = intersect_standard(p1, p2)
r2, c2, sk = intersect_with_skips(p1, p2)
print(f"\n  Standard: {r1}  ({c1} comparisons)")
print(f"  With skips: {r2}  ({c2} comparisons, {sk} skips)")

# Benchmark
ph("Large-Scale Benchmark")
random.seed(42)
sizes = [(1000, 1000), (10000, 10000), (10000, 100), (100000, 1000)]
print(f"  {'|L1|':>10} {'|L2|':>10} | {'Std':>10} {'Skip':>10} {'Skips':>7} | {'Speedup':>8}")
print(f"  {'-'*10} {'-'*10}-+-{'-'*10}-{'-'*10}-{'-'*7}-+-{'-'*8}")
for s1s, s2s in sizes:
    u = s1s * 10
    la = sorted(random.sample(range(1, u), min(s1s, u-1)))
    lb = sorted(random.sample(range(1, u), min(s2s, u-1)))
    _, cs = intersect_standard(la, lb)
    _, ck, sk = intersect_with_skips(la, lb)
    sp = cs / max(ck, 1)
    cl = G if sp > 1.5 else Y
    print(f"  {s1s:>10,} {s2s:>10,} | {cs:>10,} {ck:>10,} {sk:>7,} | {cl}{sp:>7.2f}x{RST}")

ph("When Are Skip Pointers Most Effective?")
print(f"""  {G}Best: Lists with very DIFFERENT lengths{RST}
  {Y}OK:   Lists with similar lengths{RST}
  {R}Poor: Very short lists{RST}
  Optimal placement: every sqrt(L) items""")
