#!/usr/bin/env python3
"""
MAPPER — MapReduce Distributed Indexing Demo
=============================================
This mapper reads a document split and emits (term, docID) pairs as JSON.

In a real MapReduce system (Hadoop/Spark), each mapper runs on a separate
machine and processes its own split of the data independently.

Usage: python mapper.py <doc_file>
Output: JSON lines to /output/map_output.json
"""

import json
import os
import re
import sys
import time

# ANSI colors for pretty terminal output
GREEN = "\033[92m"
CYAN = "\033[96m"
YELLOW = "\033[93m"
RESET = "\033[0m"
BOLD = "\033[1m"

def tokenize(text):
    """Simple tokenizer: lowercase + split on non-alphanumeric."""
    return re.findall(r'[a-z]+', text.lower())

def map_function(doc_id, text):
    """
    THE MAP FUNCTION
    ================
    Input:  (docID, document_text)
    Output: list of (term, docID) pairs
    
    This is the function that runs on EACH mapper node.
    Each mapper only sees its own document — no communication with other mappers.
    """
    pairs = []
    tokens = tokenize(text)
    for token in tokens:
        pair = {"term": token, "doc_id": doc_id}
        pairs.append(pair)
    return pairs

def main():
    mapper_id = os.environ.get("MAPPER_ID", "mapper_0")
    input_dir = os.environ.get("INPUT_DIR", "/data")
    output_dir = os.environ.get("OUTPUT_DIR", "/output")
    
    print(f"{BOLD}{GREEN}{'='*60}{RESET}")
    print(f"{BOLD}{GREEN}  MAPPER [{mapper_id}] STARTING{RESET}")
    print(f"{BOLD}{GREEN}{'='*60}{RESET}")
    
    # Find documents assigned to this mapper
    all_docs = sorted([f for f in os.listdir(input_dir) if f.endswith('.txt')])
    
    if not all_docs:
        print(f"{YELLOW}[{mapper_id}] No documents found in {input_dir}{RESET}")
        return
    
    # Simple partitioning: assign docs round-robin by mapper index
    mapper_index = int(mapper_id.split("_")[-1])
    total_mappers = int(os.environ.get("TOTAL_MAPPERS", "3"))
    my_docs = [d for i, d in enumerate(all_docs) if i % total_mappers == mapper_index]
    
    print(f"{CYAN}[{mapper_id}] Assigned documents: {my_docs}{RESET}")
    
    all_pairs = []
    
    for doc_file in my_docs:
        doc_path = os.path.join(input_dir, doc_file)
        # Use filename (without .txt) as docID
        doc_id = doc_file.replace('.txt', '')
        
        print(f"\n{CYAN}[{mapper_id}] 📄 Processing: {doc_file}{RESET}")
        
        with open(doc_path, 'r') as f:
            text = f.read()
        
        # Run the MAP function
        pairs = map_function(doc_id, text)
        all_pairs.extend(pairs)
        
        # Show first few pairs for educational purposes
        print(f"{CYAN}[{mapper_id}]   → Generated {len(pairs)} (term, docID) pairs{RESET}")
        for p in pairs[:5]:
            print(f"{CYAN}[{mapper_id}]     emit(\"{p['term']}\", \"{p['doc_id']}\"){RESET}")
        if len(pairs) > 5:
            print(f"{CYAN}[{mapper_id}]     ... and {len(pairs)-5} more pairs{RESET}")
    
    # Write all pairs to output file
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, f"{mapper_id}_output.json")
    
    with open(output_file, 'w') as f:
        json.dump(all_pairs, f, indent=2)
    
    print(f"\n{GREEN}[{mapper_id}] ✅ DONE — Wrote {len(all_pairs)} pairs to {output_file}{RESET}")
    
    # Signal completion  
    done_file = os.path.join(output_dir, f"{mapper_id}.done")
    with open(done_file, 'w') as f:
        f.write("done")

if __name__ == "__main__":
    main()
