# Plan 3: 1 Million Accounts (accounts3)

## Overview

Scaling test with 1,000,000 account records to evaluate Convex performance at high volume.

## Status: 🔴 Not Started

---

## Implementation Checklist

### 1. Schema Setup

- [ ] Add `accounts3` table definition to `convex/schema.ts`
- [ ] Add indexes: `by_status`, `by_zip`
- [ ] Add search indexes: `search_name`, `search_city`, `search_state`, `search_street`

### 2. Backend Queries

- [ ] Create `convex/accounts3.ts` with:
  - [ ] `list` - paginated query with `paginationOptsValidator`
  - [ ] `search` - paginated name search
  - [ ] `searchByAddress` - multi-index address search

### 3. Data Seeding

- [ ] Create seed script for 1M records
- [ ] Consider batch imports (JSONL format)
- [ ] Estimated time: ~2-4 hours for full import

### 4. Frontend Integration

- [ ] Add `accounts3` option to table selector dropdown
- [ ] Test pagination with 1M records
- [ ] Measure query performance metrics

### 5. Performance Benchmarks

- [ ] Record initial page load time
- [ ] Record "Load More" response time
- [ ] Record name search response time
- [ ] Record address search response time
- [ ] Document any timeouts or limitations

---

## Expected Challenges

- Seed script execution time
- Convex query timeout limits (10s default)
- Search index building time
- Memory usage during large result sets

## Success Criteria

- All queries complete within acceptable time (<2s for pagination)
- Search returns relevant results within <1s
- UI remains responsive during data loading
