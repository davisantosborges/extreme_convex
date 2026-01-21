# Convex Storage Test Application - Implementation Plan

## Overview
Create a React application with Convex backend to test storing capabilities with 10,000 account records.

## Account Schema
The `accounts` table will have the following fields:
- **name** (string): Full name of the account holder
- **status** (string): Account status - one of: "active", "inactive", "pending", "suspended", "closed"
- **address** (object): USA address with fields:
  - `street` (string): Street address
  - `city` (string): City name
  - `state` (string): 2-letter state code
  - `zipCode` (string): 5-digit ZIP code

---

## Implementation Steps

### Phase 1: Project Setup
- [ ] Initialize a new React app with Vite
- [ ] Install Convex and configure the project
- [ ] Create a new Convex project via CLI (`npx convex init`)

### Phase 2: Schema Definition
- [ ] Create `convex/schema.ts` with the accounts table definition
- [ ] Define proper validators for all fields

### Phase 3: Seed Data Generation
- [ ] Create a Node.js script (`scripts/generate-seed-data.js`) to generate 10,000 varied records
- [ ] Use realistic name generation (varied first/last names)
- [ ] Use realistic US city/state combinations
- [ ] Randomize status distribution
- [ ] Generate varied street addresses
- [ ] Output as JSONL format (required for large datasets >8MB)

### Phase 4: Data Import
- [ ] Run the seed data generator
- [ ] Use `npx convex import --table accounts seed_data.jsonl` to import

### Phase 5: React Application
- [ ] Create Convex query functions to fetch accounts
- [ ] Build React components:
  - AccountList: Display paginated list of accounts
  - AccountCard: Individual account display
  - SearchFilter: Filter by status/search by name
- [ ] Implement pagination for 10k records
- [ ] Add basic styling

### Phase 6: Verification
- [ ] Verify all 10,000 records imported correctly
- [ ] Test query performance
- [ ] Update STATUS.md with completion status

---

## Technology Stack
- **Frontend**: React + Vite
- **Backend**: Convex
- **Styling**: Vanilla CSS (simple, clean design)

---

## File Structure
```
extreme_convex/
├── convex/
│   ├── _generated/
│   ├── schema.ts
│   └── accounts.ts
├── scripts/
│   └── generate-seed-data.js
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── components/
│       ├── AccountList.tsx
│       ├── AccountCard.tsx
│       └── SearchFilter.tsx
├── seed_data.jsonl
├── PLAN.md
├── STATUS.md
├── package.json
└── index.html
```
