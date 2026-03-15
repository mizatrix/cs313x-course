#!/usr/bin/env python3
"""
REDUCER — MapReduce Distributed Indexing Demo
==============================================
This reducer receives shuffled (term, [docIDs]) groups and builds
the final inverted index (postings lists).

In a real MapReduce system, each reducer handles a partition of the
key space (e.g., terms A-M or N-Z).

Usage: python reducer.py
Input:  /shuffled/reducer_X_input.json (from coordinator)
Output: /output/index_X.json (final inverted index partition)
"""

import json
import os
import time

# ANSI colors
RED = "\033[91m"
GREEN = "\033[92m"
CYAN = "\033[96m"
YELLOW = "\033[93m"
MAGENTA = "\033[95m"
RESET = "\033[0m"
BOLD = "\033[1m"

def reduce_function(term, doc_id_lists):
    """
    THE REDUCE FUNCTION
    ====================
    Input:  (term, [[docIDs from mapper1], [docIDs from mapper2], ...])
    Output: (term, sorted_unique_docID_list)
    
    This merges all docID lists for a given term into one sorted, unique list.
    This IS the final postings list for this term.
    """
    # Flatten and deduplicate
    all_doc_ids = set()
    for doc_list in doc_id_lists:
        if isinstance(doc_list, list):
            all_doc_ids.update(doc_list)
        else:
            all_doc_ids.add(doc_list)
    
    # Sort for efficient compression later (gap encoding needs sorted IDs)
    return sorted(all_doc_ids)

def main():
    reducer_id = os.environ.get("REDUCER_ID", "reducer_a")
    input_dir = os.environ.get("SHUFFLE_DIR", "/shuffled")
    output_dir = os.environ.get("OUTPUT_DIR", "/output")
    
    print(f"{BOLD}{MAGENTA}{'='*60}{RESET}")
    print(f"{BOLD}{MAGENTA}  REDUCER [{reducer_id}] STARTING{RESET}")
    print(f"{BOLD}{MAGENTA}{'='*60}{RESET}")
    
    # Wait for shuffled input from coordinator
    input_file = os.path.join(input_dir, f"{reducer_id}_input.json")
    
    print(f"{YELLOW}[{reducer_id}] ⏳ Waiting for shuffled data at {input_file}...{RESET}")
    
    max_wait = 60  # seconds
    elapsed = 0
    while not os.path.exists(input_file) and elapsed < max_wait:
        time.sleep(1)
        elapsed += 1
    
    if not os.path.exists(input_file):
        print(f"{RED}[{reducer_id}] ❌ Timeout waiting for input!{RESET}")
        return
    
    # Read shuffled data
    with open(input_file, 'r') as f:
        grouped_data = json.load(f)
    
    print(f"{CYAN}[{reducer_id}] 📥 Received {len(grouped_data)} terms to reduce{RESET}")
    
    # Build the inverted index for this partition
    inverted_index = {}
    
    print(f"\n{BOLD}{MAGENTA}[{reducer_id}] 🔧 REDUCE PHASE — Building Postings Lists{RESET}")
    print(f"{MAGENTA}{'─'*50}{RESET}")
    
    for term, doc_ids in sorted(grouped_data.items()):
        # Run the REDUCE function
        postings_list = reduce_function(term, doc_ids)
        inverted_index[term] = postings_list
        
        # Show the reduction for educational purposes
        print(f"{CYAN}[{reducer_id}]   \"{term}\" ← {doc_ids} → {BOLD}[{', '.join(postings_list)}]{RESET}")
    
    # Write final index partition
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, f"index_{reducer_id}.json")
    
    with open(output_file, 'w') as f:
        json.dump(inverted_index, f, indent=2, sort_keys=True)
    
    # Summary
    total_postings = sum(len(v) for v in inverted_index.values())
    
    print(f"\n{MAGENTA}{'─'*50}{RESET}")
    print(f"{GREEN}[{reducer_id}] ✅ DONE — Built index with:{RESET}")
    print(f"{GREEN}   📚 {len(inverted_index)} unique terms{RESET}")
    print(f"{GREEN}   📋 {total_postings} total postings{RESET}")
    print(f"{GREEN}   💾 Written to {output_file}{RESET}")
    
    # Signal completion
    done_file = os.path.join(output_dir, f"{reducer_id}.done")
    with open(done_file, 'w') as f:
        f.write("done")

if __name__ == "__main__":
    main()
