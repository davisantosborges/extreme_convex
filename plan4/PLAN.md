# Plan 4: 10 Million Accounts (accounts4)

## Overview

Extreme scaling test with 10,000,000 account records to stress-test Convex at very high volume.

## Status: 🔴 Not Started

---

## Implementation Checklist

### 1. Schema Setup

- [ ] Add `accounts4` table definition to `convex/schema.ts`
- [ ] Add indexes: `by_status`, `by_zip`
- [ ] Add search indexes: `search_name`, `search_city`, `search_state`, `search_street`

### 2. Backend Queries

- [ ] Create `convex/accounts4.ts` with:
  - [ ] `list` - paginated query with `paginationOptsValidator`
  - [ ] `search` - paginated name search
  - [ ] `searchByAddress` - multi-index address search

### 3. Data Seeding

- [ ] Create optimized seed script for 10M records
- [ ] Use JSONL batch import (mandatory at this scale)
- [ ] Split into multiple import batches if needed
- [ ] Estimated time: ~20-40 hours for full import

### 4. Frontend Integration

- [ ] Add `accounts4` option to table selector dropdown
- [ ] Test pagination with 10M records
- [ ] Measure query performance metrics

### 5. Performance Benchmarks

- [ ] Record initial page load time
- [ ] Record "Load More" response time
- [ ] Record name search response time
- [ ] Record address search response time
- [ ] Document any timeouts or limitations
- [ ] Test concurrent user load

---

## Expected Challenges

- Very long seed time (may need to run overnight/over days)
- Convex storage limits
- Query timeout limits - may need optimization
- Search index building could take significant time
- Potential need for query optimization strategies
- May need to increase pagination page size for efficiency

## Optimization Strategies to Consider

- Larger page sizes (100-200 instead of 50)
- Index-only queries where possible
- Result caching considerations
- Query parallelization

## Success Criteria

- All queries complete within acceptable time (<3s for pagination)
- Search returns relevant results within <2s
- UI remains responsive
- No query timeouts during normal operation
