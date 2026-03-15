#!/usr/bin/env python3
"""
DEMO 08 — Edit Distance (Levenshtein Distance)
CS313x Chapter 4: Spelling Correction
"""
C="\033[96m"; G="\033[92m"; Y="\033[93m"; R="\033[91m"; M="\033[95m"; B="\033[1m"; RST="\033[0m"

def ph(m):
    print(f"\n{B}{C}{'═'*60}{RST}\n{B}{C}  {m}{RST}\n{B}{C}{'═'*60}{RST}")

def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0] = i
    for j in range(n+1): dp[0][j] = j
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp

def print_matrix(s1, s2, dp):
    m, n = len(s1), len(s2)
    header = "     ε   " + "  ".join(f" {c} " for c in s2)
    print(header)
    for i in range(m+1):
        label = "ε" if i == 0 else s1[i-1]
        row = f" {label}  "
        for j in range(n+1):
            val = dp[i][j]
            if i == m and j == n:
                row += f" {G}{B}[{val}]{RST} "
            else:
                row += f"  {val}  "
        print(row)

# Example from PDF
ph("Example: \"fast\" → \"cats\" (from PDF)")
s1, s2 = "fast", "cats"
dp = edit_distance(s1, s2)
print(f"\n  {B}DP Matrix:{RST}\n")
print_matrix(s1, s2, dp)
print(f"\n  {G}Edit Distance = {dp[len(s1)][len(s2)]}{RST}")
print(f"\n  Operations:")
print(f"    f → c  {R}REPLACE{RST}")
print(f"    a → a  {G}MATCH{RST}")
print(f"    s → t  {R}REPLACE{RST}")
print(f"    t → s  {R}REPLACE{RST}")

# More examples
examples = [("kitten", "sitting"), ("sunday", "saturday"), ("bord", "board")]
for a, b in examples:
    ph(f'"{a}" → "{b}"')
    dp = edit_distance(a, b)
    print_matrix(a, b, dp)
    print(f"\n  {G}Edit Distance = {dp[len(a)][len(b)]}{RST}")

# k-gram overlap (Jaccard)
ph("k-gram Overlap (Jaccard Similarity)")
w1, w2 = "bord", "board"
k = 2
grams1 = set(w1[i:i+k] for i in range(len(w1)-k+1))
grams2 = set(w2[i:i+k] for i in range(len(w2)-k+1))
inter = grams1 & grams2
union = grams1 | grams2
jaccard = len(inter) / len(union)
print(f'  "{w1}" {k}-grams: {grams1}')
print(f'  "{w2}" {k}-grams: {grams2}')
print(f'  Intersection: {inter}')
print(f'  Jaccard = {len(inter)}/{len(union)} = {Y}{jaccard:.2f}{RST}')
