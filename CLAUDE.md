# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Convex storage performance testing application built with React + TypeScript. It tests Convex database capabilities at scale with 5 tables containing 10k to 100M records, implementing pagination, search, filtering, and real-time performance metrics.

## Development Commands

```bash
# Start Vite dev server (frontend)
npm run dev

# Start Convex dev server (backend) - run in separate terminal
npx convex dev

# Build for production
npm run build

# Lint codebase
npm run lint

# Preview production build
npm run preview

# Import seed data to a Convex table
npx convex import --table <table> <file.jsonl>
```

**Note**: Both `npm run dev` and `npx convex dev` must be running simultaneously for local development.

## Architecture

### Frontend (`src/`)
- **App.tsx**: Main component handling pagination, search (name/address), status filtering, and performance metrics display
- Uses `usePaginatedQuery()` for paginated data and `useQuery()` for address search
- TanStack React Table for sortable columns
- Three search modes: Browse (paginated), Name search (paginated), Address search (non-paginated, max 100)

### Backend (`convex/`)
- **schema.ts**: Defines 5 identical tables (`accounts`, `accounts2-5`) for scale testing
- **accounts[N].ts**: Query functions for each table with `list`, `search`, and `searchByAddress` queries
- **_generated/**: Auto-generated Convex API types (do not edit)

### Key Patterns

**Convex Indexing Strategy**:
- Regular indexes: `by_status`, `by_zip` for filtering
- Search indexes: `search_name`, `search_city`, `search_state`, `search_street` for text search

**Query Patterns**:
- `list`: Paginated with optional status filter using `by_status` index
- `search`: Paginated text search on name field
- `searchByAddress`: Parallel searches across multiple fields using `Promise.all()`, deduplicates by `_id`, returns max 100 results

### Data Generation (`scripts/`)
- `generate-seed-data.js`: Generates JSONL files with realistic account data
- `bulk-import-accounts5.js`: Helper for importing large datasets

## Environment

Convex deployment configured in `.env.local`:
- `CONVEX_DEPLOYMENT`: Development deployment name
- `VITE_CONVEX_URL`: Convex cloud URL for frontend
