#!/usr/bin/env python3
"""
COORDINATOR — MapReduce Distributed Indexing Demo
===================================================
The coordinator orchestrates the entire MapReduce pipeline:
1. Waits for all mappers to finish
2. Reads mapper outputs
3. SHUFFLES: groups pairs by term and routes to reducers using hash(term) % R
4. Writes shuffled data for each reducer
5. Waits for reducers to finish
6. Merges all reducer outputs into the final combined index

This is analogous to the "Master Node" in Google's MapReduce paper.

Usage: python coordinator.py
"""

import json
import os
import time
from collections import defaultdict

# ANSI colors
RED = "\033[91m"
GREEN = "\033[92m"
CYAN = "\033[96m"
YELLOW = "\033[93m"
MAGENTA = "\033[95m"
BLUE = "\033[94m"
RESET = "\033[0m"
BOLD = "\033[1m"

def main():
    map_output_dir = os.environ.get("MAP_OUTPUT_DIR", "/map_output")
    shuffle_dir = os.environ.get("SHUFFLE_DIR", "/shuffled")
    final_output_dir = os.environ.get("FINAL_OUTPUT_DIR", "/final_output")
    total_mappers = int(os.environ.get("TOTAL_MAPPERS", "3"))
    reducer_ids = os.environ.get("REDUCER_IDS", "reducer_a,reducer_b").split(",")
    num_reducers = len(reducer_ids)
    
    print(f"{BOLD}{BLUE}{'='*60}{RESET}")
    print(f"{BOLD}{BLUE}  🎯 COORDINATOR (MASTER NODE) STARTING{RESET}")
    print(f"{BOLD}{BLUE}{'='*60}{RESET}")
    print(f"{BLUE}  Mappers: {total_mappers}  |  Reducers: {num_reducers}{RESET}")
    print(f"{BLUE}  Reducer partitions: {reducer_ids}{RESET}")
    print()
    
    # ─────────────────────────────────────────────────
    # STEP 1: Wait for all mappers to complete
    # ─────────────────────────────────────────────────
    print(f"{BOLD}{YELLOW}STEP 1: Waiting for Mappers to complete...{RESET}")
    
    expected_done_files = [f"mapper_{i}.done" for i in range(total_mappers)]
    max_wait = 120
    elapsed = 0
    
    while elapsed < max_wait:
        done_files = [f for f in os.listdir(map_output_dir) if f.endswith('.done')] if os.path.exists(map_output_dir) else []
        completed = len(done_files)
        print(f"  ⏳ Mappers completed: {completed}/{total_mappers}", end='\r')
        
        if completed >= total_mappers:
            break
        
        time.sleep(2)
        elapsed += 2
    
    print(f"\n{GREEN}  ✅ All {total_mappers} mappers completed!{RESET}\n")
    
    # ─────────────────────────────────────────────────
    # STEP 2: Read all mapper outputs
    # ─────────────────────────────────────────────────
    print(f"{BOLD}{YELLOW}STEP 2: Reading Mapper Outputs...{RESET}")
    
    all_pairs = []
    for i in range(total_mappers):
        output_file = os.path.join(map_output_dir, f"mapper_{i}_output.json")
        if os.path.exists(output_file):
            with open(output_file, 'r') as f:
                pairs = json.load(f)
            all_pairs.extend(pairs)
            print(f"  📄 mapper_{i}: {len(pairs)} pairs")
    
    print(f"{GREEN}  ✅ Total pairs collected: {len(all_pairs)}{RESET}\n")
    
    # ─────────────────────────────────────────────────
    # STEP 3: SHUFFLE — The most expensive phase!
    # ─────────────────────────────────────────────────
    print(f"{BOLD}{YELLOW}STEP 3: SHUFFLE PHASE — Grouping by term & routing to reducers{RESET}")
    print(f"{YELLOW}  ⚡ Using hash(term) % {num_reducers} to determine destination reducer{RESET}")
    print()
    
    # Group pairs by term first
    term_groups = defaultdict(list)
    for pair in all_pairs:
        term = pair["term"]
        doc_id = pair["doc_id"]
        term_groups[term].append(doc_id)
    
    print(f"  📊 Unique terms found: {len(term_groups)}")
    
    # Route each term to a reducer using hash partitioning
    reducer_data = {rid: {} for rid in reducer_ids}
    routing_counts = {rid: 0 for rid in reducer_ids}
    
    print(f"\n  {BOLD}Routing decisions:{RESET}")
    shown = 0
    for term in sorted(term_groups.keys()):
        # THE KEY OPERATION: hash(term) % R determines which reducer handles this term
        reducer_index = hash(term) % num_reducers
        target_reducer = reducer_ids[reducer_index]
        
        reducer_data[target_reducer][term] = term_groups[term]
        routing_counts[target_reducer] += 1
        
        # Show first 10 routing decisions for educational purposes
        if shown < 10:
            print(f"    hash(\"{term}\") % {num_reducers} = {reducer_index} → {BOLD}{target_reducer}{RESET}")
            shown += 1
    
    if len(term_groups) > 10:
        print(f"    ... and {len(term_groups) - 10} more terms")
    
    print(f"\n  📦 Routing summary:")
    for rid in reducer_ids:
        print(f"    {rid}: {routing_counts[rid]} terms")
    
    # Write shuffled data for each reducer
    os.makedirs(shuffle_dir, exist_ok=True)
    for rid in reducer_ids:
        shuffle_file = os.path.join(shuffle_dir, f"{rid}_input.json")
        with open(shuffle_file, 'w') as f:
            json.dump(reducer_data[rid], f, indent=2, sort_keys=True)
        print(f"  💾 Wrote {shuffle_file}")
    
    print(f"\n{GREEN}  ✅ Shuffle complete!{RESET}\n")
    
    # ─────────────────────────────────────────────────
    # STEP 4: Wait for reducers to complete
    # ─────────────────────────────────────────────────
    print(f"{BOLD}{YELLOW}STEP 4: Waiting for Reducers to complete...{RESET}")
    
    reducer_output_dir = os.environ.get("REDUCER_OUTPUT_DIR", "/reducer_output")
    elapsed = 0
    
    while elapsed < max_wait:
        done_files = [f for f in os.listdir(reducer_output_dir) if f.endswith('.done')] if os.path.exists(reducer_output_dir) else []
        completed = len(done_files)
        print(f"  ⏳ Reducers completed: {completed}/{num_reducers}", end='\r')
        
        if completed >= num_reducers:
            break
        
        time.sleep(2)
        elapsed += 2
    
    print(f"\n{GREEN}  ✅ All {num_reducers} reducers completed!{RESET}\n")
    
    # ─────────────────────────────────────────────────
    # STEP 5: Merge final index
    # ─────────────────────────────────────────────────
    print(f"{BOLD}{YELLOW}STEP 5: Merging Final Inverted Index...{RESET}")
    
    final_index = {}
    for rid in reducer_ids:
        index_file = os.path.join(reducer_output_dir, f"index_{rid}.json")
        if os.path.exists(index_file):
            with open(index_file, 'r') as f:
                partition = json.load(f)
            final_index.update(partition)
            print(f"  📄 {rid}: {len(partition)} terms")
    
    # Write combined final index
    os.makedirs(final_output_dir, exist_ok=True)
    final_file = os.path.join(final_output_dir, "inverted_index.json")
    with open(final_file, 'w') as f:
        json.dump(final_index, f, indent=2, sort_keys=True)
    
    # ─────────────────────────────────────────────────
    # FINAL SUMMARY
    # ─────────────────────────────────────────────────
    total_terms = len(final_index)
    total_postings = sum(len(v) for v in final_index.values())
    
    print(f"\n{BOLD}{GREEN}{'='*60}{RESET}")
    print(f"{BOLD}{GREEN}  🎉 MAPREDUCE PIPELINE COMPLETE!{RESET}")
    print(f"{BOLD}{GREEN}{'='*60}{RESET}")
    print(f"{GREEN}  📚 Total unique terms: {total_terms}{RESET}")
    print(f"{GREEN}  📋 Total postings:     {total_postings}{RESET}")
    print(f"{GREEN}  💾 Final index:        {final_file}{RESET}")
    print()
    
    # Print the final index for the class to see
    print(f"{BOLD}{CYAN}  FINAL INVERTED INDEX:{RESET}")
    print(f"{CYAN}  {'─'*40}{RESET}")
    for term in sorted(final_index.keys()):
        postings = final_index[term]
        print(f"{CYAN}  {term:20s} → {postings}{RESET}")

if __name__ == "__main__":
    main()
