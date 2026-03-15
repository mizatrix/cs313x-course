#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║  DEMO 03 — Variable Byte (VB) Encoding                      ║
║  CS313x Chapter 4: Index Compression                         ║
╚══════════════════════════════════════════════════════════════╝

Variable Byte is a byte-aligned compression scheme for integers.
Each byte uses 7 bits for data and 1 "continuation" bit:
  - C-bit = 1 → This is the LAST byte (stop reading)
  - C-bit = 0 → More bytes follow

Run: python 03_vb_encoding.py
"""

C = "\033[96m"; G = "\033[92m"; Y = "\033[93m"; R = "\033[91m"
M = "\033[95m"; B = "\033[1m"; RST = "\033[0m"

def print_header(msg):
    print(f"\n{B}{G}{'═'*60}{RST}")
    print(f"{B}{G}  {msg}{RST}")
    print(f"{B}{G}{'═'*60}{RST}")

# ════════════════════════════════════════════════════
#  VB ENCODE
# ════════════════════════════════════════════════════
def vb_encode(number):
    """Encode a single integer using Variable Byte encoding."""
    bytes_list = []
    
    # First byte: set continuation bit to 1 (last byte)
    bytes_list.append(number % 128 + 128)  # Add 128 = set MSB to 1
    number //= 128
    
    # Remaining bytes: continuation bit = 0 (more follow)
    while number > 0:
        bytes_list.insert(0, number % 128)  # MSB = 0 (more bytes coming)
        number //= 128
    
    return bytes_list

def vb_decode(byte_stream):
    """Decode a Variable Byte encoded byte stream back to integers."""
    numbers = []
    current = 0
    
    for byte in byte_stream:
        if byte < 128:
            # Continuation bit = 0 → more bytes follow
            current = current * 128 + byte
        else:
            # Continuation bit = 1 → last byte
            current = current * 128 + (byte - 128)
            numbers.append(current)
            current = 0
    
    return numbers

def vb_encode_verbose(number):
    """Encode with step-by-step explanation."""
    original = number
    print(f"\n  {B}Encoding: {number}{RST}")
    print(f"  Binary:  {bin(number)} ({number:b})")
    
    bytes_list = []
    step = 1
    
    # Process last byte first (with C-bit = 1)
    payload = number % 128
    byte_val = payload + 128
    print(f"  Step {step}: {number} % 128 = {payload} → payload: {payload:07b}")
    print(f"          Add C-bit=1 → {byte_val:08b} (0x{byte_val:02X}) ← {G}LAST byte{RST}")
    bytes_list.append(byte_val)
    number //= 128
    step += 1
    
    # Process remaining bytes (with C-bit = 0)
    while number > 0:
        payload = number % 128
        byte_val = payload  # C-bit = 0
        print(f"  Step {step}: {number} % 128 = {payload} → payload: {payload:07b}")
        print(f"          C-bit=0   → {byte_val:08b} (0x{byte_val:02X}) ← {Y}MORE bytes{RST}")
        bytes_list.insert(0, byte_val)
        number //= 128
        step += 1
    
    # Show final result
    hex_str = ", ".join(f"0x{b:02X}" for b in bytes_list)
    bin_str = " | ".join(f"{b:08b}" for b in bytes_list)
    
    print(f"\n  {G}Result: [{hex_str}]{RST}")
    print(f"  {G}Binary: {bin_str}{RST}")
    print(f"  {G}Bytes used: {len(bytes_list)} (vs 4 for raw int32){RST}")
    
    return bytes_list

# ════════════════════════════════════════════════════
#  DEMONSTRATIONS
# ════════════════════════════════════════════════════
print_header("Variable Byte (VB) Encoding — Step by Step")

# Example from the PDF: encode 824
print(f"\n{B}{Y}Example 1: The PDF example (824){RST}")
vb_encode_verbose(824)

# Small number (fits in 1 byte)
print(f"\n{B}{Y}Example 2: Small number (5){RST}")
vb_encode_verbose(5)

# Medium number
print(f"\n{B}{Y}Example 3: Medium number (214){RST}")
vb_encode_verbose(214)

# Large number
print(f"\n{B}{Y}Example 4: Large number (16384){RST}")
vb_encode_verbose(16384)

# ════════════════════════════════════════════════════
#  ENCODING A FULL POSTINGS LIST WITH GAP ENCODING
# ════════════════════════════════════════════════════
print_header("VB Encoding a Full Postings List")

raw_postings = [33, 45, 52, 90, 120]
print(f"  Raw postings:  {raw_postings}")

# Step 1: Gap encode
gaps = [raw_postings[0]] + [raw_postings[i] - raw_postings[i-1] for i in range(1, len(raw_postings))]
print(f"  Gap encoded:   {gaps}")

# Step 2: VB encode each gap
print(f"\n  VB encoding each gap:")
all_bytes = []
for gap in gaps:
    encoded = vb_encode(gap)
    all_bytes.extend(encoded)
    hex_str = ", ".join(f"0x{b:02X}" for b in encoded)
    print(f"    {gap:5d} → [{hex_str}] ({len(encoded)} byte{'s' if len(encoded)>1 else ''})")

# Step 3: Decode back
print(f"\n  {B}Decoding back:{RST}")
decoded_gaps = vb_decode(all_bytes)
print(f"  Decoded gaps: {decoded_gaps}")

# Reconstruct postings
reconstructed = [decoded_gaps[0]]
for i in range(1, len(decoded_gaps)):
    reconstructed.append(reconstructed[-1] + decoded_gaps[i])
print(f"  Reconstructed: {reconstructed}")
print(f"  {G}✅ Match: {reconstructed == raw_postings}{RST}")

# ════════════════════════════════════════════════════
#  SPACE SAVINGS SUMMARY
# ════════════════════════════════════════════════════
print_header("Space Savings")

raw_bytes = len(raw_postings) * 4  # 4 bytes per int32
vb_bytes = len(all_bytes)
savings = (1 - vb_bytes / raw_bytes) * 100

print(f"  Raw (int32):    {raw_bytes} bytes ({len(raw_postings)} × 4)")
print(f"  VB encoded:     {vb_bytes} bytes")
print(f"  {G}Savings:        {savings:.1f}%{RST}")
print(f"\n  {B}Key insight: Small gaps = fewer bytes!{RST}")
print(f"  For frequent terms, gaps are often < 128, needing only 1 byte each.")
