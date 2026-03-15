#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║  DEMO 04 — Gamma Encoding                                   ║
║  CS313x Chapter 4: Index Compression                         ║
╚══════════════════════════════════════════════════════════════╝

Gamma encoding is a BIT-LEVEL compression (unlike VB which is byte-aligned).
It uses exactly as many bits as needed:

  1. Write the number in binary
  2. Remove the leading '1' → this is the OFFSET
  3. Write the length of the offset in UNARY (1s followed by a 0) → this is the LENGTH
  4. Gamma code = LENGTH + OFFSET

Run: python 04_gamma_encoding.py
"""

C = "\033[96m"; G = "\033[92m"; Y = "\033[93m"; R = "\033[91m"
M = "\033[95m"; B = "\033[1m"; RST = "\033[0m"

def print_header(msg):
    print(f"\n{B}{M}{'═'*60}{RST}")
    print(f"{B}{M}  {msg}{RST}")
    print(f"{B}{M}{'═'*60}{RST}")

def gamma_encode(n):
    """Encode a positive integer using Gamma encoding."""
    if n == 0:
        raise ValueError("Gamma encoding only works for positive integers (n ≥ 1)")
    
    binary = bin(n)[2:]  # e.g., 13 → '1101'
    offset = binary[1:]  # Remove leading '1' → '101'
    length = len(offset)  # Length of offset → 3
    unary = '1' * length + '0'  # Unary encoding → '1110'
    
    gamma_code = unary + offset  # '1110' + '101' = '1110101'
    return gamma_code, binary, offset, length, unary

def gamma_encode_verbose(n):
    """Encode with step-by-step explanation."""
    gamma_code, binary, offset, length, unary = gamma_encode(n)
    
    print(f"\n  {B}{'─'*45}{RST}")
    print(f"  {B}Encoding: {n}{RST}")
    print(f"  Step 1: Binary of {n}     = {Y}{binary}{RST}")
    print(f"  Step 2: Remove leading 1 = {C}{offset if offset else '(empty)'}{RST}  (offset)")
    print(f"  Step 3: Offset length    = {length}")
    print(f"  Step 4: Unary({length})       = {M}{unary}{RST}")
    print(f"  Step 5: Gamma code       = {G}{B}{unary}{RST}{G}{offset}{RST}")
    print(f"  Total bits: {len(gamma_code)}")
    
    return gamma_code

def gamma_decode(bitstream):
    """Decode a gamma-encoded bitstream back to integers."""
    numbers = []
    i = 0
    
    while i < len(bitstream):
        # Count 1s to get the length (unary part)
        length = 0
        while i < len(bitstream) and bitstream[i] == '1':
            length += 1
            i += 1
        
        # Skip the terminating '0'
        i += 1
        
        # Read 'length' bits for the offset
        if length == 0:
            numbers.append(1)
        else:
            offset = bitstream[i:i + length]
            i += length
            # Reconstruct: prepend '1' to offset
            numbers.append(int('1' + offset, 2))
    
    return numbers

# ════════════════════════════════════════════════════
#  STEP-BY-STEP DEMONSTRATIONS
# ════════════════════════════════════════════════════
print_header("Gamma Encoding — Step by Step")

# The table from the PDF
test_numbers = [1, 3, 9, 13]
all_codes = []

for n in test_numbers:
    code = gamma_encode_verbose(n)
    all_codes.append((n, code))

# ════════════════════════════════════════════════════
#  SUMMARY TABLE (matching PDF)
# ════════════════════════════════════════════════════
print_header("Gamma Encoding Summary Table")

print(f"  {'Gap (G)':>8} │ {'Binary':>10} │ {'Offset':>10} │ {'Length':>6} │ {'Gamma Code':>15} │ {'Bits':>4}")
print(f"  {'─'*8}─┼─{'─'*10}─┼─{'─'*10}─┼─{'─'*6}─┼─{'─'*15}─┼─{'─'*4}")

for n in [1, 2, 3, 4, 5, 7, 9, 13, 24, 100]:
    gamma_code, binary, offset, length, unary = gamma_encode(n)
    print(f"  {n:>8} │ {binary:>10} │ {offset if offset else '—':>10} │ {length:>6} │ {gamma_code:>15} │ {len(gamma_code):>4}")

# ════════════════════════════════════════════════════
#  ENCODE A FULL GAP-ENCODED POSTINGS LIST
# ════════════════════════════════════════════════════
print_header("Encoding a Gap-Encoded Postings List")

gaps = [33, 12, 7, 38, 30]
print(f"  Gaps: {gaps}")
print(f"\n  Encoding each gap:")

total_bits = 0
full_bitstream = ""

for gap in gaps:
    code, binary, offset, length, unary = gamma_encode(gap)
    print(f"    {gap:5d} → {code:>15}  ({len(code)} bits)")
    total_bits += len(code)
    full_bitstream += code

# Decode back
print(f"\n  {B}Full bitstream:{RST} {full_bitstream}")
print(f"  Total bits: {total_bits}")

decoded = gamma_decode(full_bitstream)
print(f"  Decoded:    {decoded}")
print(f"  {G}✅ Match: {decoded == gaps}{RST}")

# ════════════════════════════════════════════════════
#  VB vs GAMMA COMPARISON
# ════════════════════════════════════════════════════
print_header("Variable Byte vs Gamma — Trade-offs")

raw_bits = len(gaps) * 32
gamma_bits = total_bits
vb_bits = sum(len(bin(g)[2:]) // 7 + 1 for g in gaps) * 8  # approximate

print(f"""
  ┌──────────────────┬──────────────────┬──────────────────┐
  │ Metric           │ Variable Byte    │ Gamma            │
  ├──────────────────┼──────────────────┼──────────────────┤
  │ Alignment        │ Byte-aligned     │ {M}Bit-aligned{RST}      │
  │ Compression      │ Good (~50%)      │ {G}Excellent (~30%){RST} │
  │ Decoding Speed   │ {G}Very Fast{RST}        │ {R}Slow (bit ops){RST}  │
  │ Implementation   │ {G}Simple{RST}           │ {R}Complex{RST}         │
  │ Raw int32        │ {raw_bits} bits       │ {raw_bits} bits       │
  │ Compressed       │ ~{vb_bits} bits        │ {gamma_bits} bits         │
  └──────────────────┴──────────────────┴──────────────────┘

  {B}Verdict:{RST} Modern engines (Lucene/ES) prefer {G}Variable Byte{RST}
  because decoding speed matters more than space savings.
""")
