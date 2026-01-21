# Plan 5: Scaling to 100,000,000 Records

This plan outlines the strategy for scaling the Convex backend and React frontend to handle 100 Million records in the `accounts5` table.

## Strategic Approach: Multi-Batch Append

Due to the massive size of a 100M record dataset (estimated ~13GB), we cannot generate or import this as a single file. We will use a batching strategy:

1. **Batch Generation**: Generate 100 separate JSONL files, each containing 1,000,000 records.
2. **Iterative Import**: Use the Convex CLI's `--append` flag to import these files one by one into the `accounts5` table.
3. **Indexing Monitoring**: Monitor Convex search index build times, which will be significant at this scale.

## Proposed Changes

### Database Schema

- [ ] Add `accounts5` table to `convex/schema.ts` with:
  - `by_status` (index)
  - `by_zip` (index)
  - `search_name` (search index)
  - `search_city` (search index)
  - `search_state` (search index)
  - `search_street` (search index)

### Backend Queries

- [ ] Create `convex/accounts5.ts` with optimized pagination and search functions.

### Data Seeding

- [ ] Modify `scripts/generate-seed-data.js` (or create a wrapper) to generate multiple 1M record batches.
- [ ] Script the sequential import of 100 batches using `npx convex import --append`.

### Frontend Integration

- [ ] Add `accounts5` to the `selectedTable` dropdown in `src/App.tsx`.
- [ ] Ensure UI remains responsive when `accounts5` is selected (handle long initial load if necessary).

## Verification Plan

1. Verify initial load time for `accounts5`.
2. Benchmark "Load More" pagination speed.
3. Benchmark name search (Paginated) across 100M records.
4. Benchmark address search (Max 100) across 100M records.
