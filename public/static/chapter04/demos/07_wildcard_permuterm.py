#!/usr/bin/env python3
"""
DEMO 07 — Permuterm Index for Wildcard Queries
CS313x Chapter 4: Query Processing
"""
C="\033[96m"; G="\033[92m"; Y="\033[93m"; M="\033[95m"; B="\033[1m"; RST="\033[0m"

def ph(m):
    print(f"\n{B}{M}{'═'*60}{RST}\n{B}{M}  {m}{RST}\n{B}{M}{'═'*60}{RST}")

def build_permuterm(term):
    """Build all rotations of term$ for the permuterm index."""
    t = term + "$"
    rotations = []
    for i in range(len(t)):
        rotations.append(t[i:] + t[:i])
    return rotations

ph("Building a Permuterm Index")
terms = ["hello", "help", "hero", "shell"]
permuterm_index = {}

for term in terms:
    rotations = build_permuterm(term)
    print(f"\n  {B}Term: \"{term}\"{RST}")
    print(f"  Append $: \"{term}$\"")
    print(f"  Rotations:")
    for rot in rotations:
        print(f"    {C}{rot:12s}{RST} → {Y}{term}{RST}")
        permuterm_index[rot] = term

ph("Permuterm Index (All Entries)")
for rot in sorted(permuterm_index.keys()):
    print(f"  {C}{rot:12s}{RST} → {permuterm_index[rot]}")

ph("Wildcard Query Examples")
queries = [("h*o", "Starts with h, ends with o"),
           ("he*", "Starts with he"),
           ("*llo", "Ends with llo"),
           ("*el*", "Contains el")]

for pattern, desc in queries:
    print(f"\n  {B}Query: \"{pattern}\"{RST}  ({desc})")
    
    # Convert wildcard to permuterm lookup
    p = pattern + "$"
    # Rotate so * is at the end
    star_pos = p.index("*")
    rotated = p[star_pos+1:] + p[:star_pos]
    print(f"  Step 1: Add $     → \"{p}\"")
    print(f"  Step 2: Rotate    → \"{rotated}*\"")
    print(f"  Step 3: B-tree prefix lookup for \"{rotated}\"")
    
    # Find matches
    matches = set()
    for rot, term in permuterm_index.items():
        if rot.startswith(rotated):
            matches.add(term)
    
    if matches:
        print(f"  {G}Results: {sorted(matches)}{RST}")
    else:
        print(f"  {Y}No matches found{RST}")

ph("Trade-off")
print(f"  Dictionary grows ~{len(permuterm_index)}/{len(terms)} = {len(permuterm_index)/len(terms):.0f}x")
print(f"  But enables O(log N) wildcard lookups via B-tree!")
