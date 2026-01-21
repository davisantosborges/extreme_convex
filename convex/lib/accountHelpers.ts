import type { QueryCtx } from "../_generated/server";
import type { PaginationOptions, PaginationResult } from "convex/server";
import type { Doc, TableNames } from "../_generated/dataModel";
import type { AccountStatus, AccountTableName } from "./accountTypes";

type AccountDoc = Doc<"accounts">;

/**
 * Paginated list of accounts with optional status filter
 */
export async function listAccounts(
    ctx: QueryCtx,
    tableName: AccountTableName,
    statusFilter: AccountStatus | undefined,
    paginationOpts: PaginationOptions
): Promise<PaginationResult<AccountDoc>> {
    if (statusFilter) {
        return await ctx.db
            .query(tableName as TableNames)
            .withIndex("by_status", (q) => q.eq("status", statusFilter))
            .paginate(paginationOpts) as PaginationResult<AccountDoc>;
    }
    return await ctx.db
        .query(tableName as TableNames)
        .paginate(paginationOpts) as PaginationResult<AccountDoc>;
}

/**
 * Paginated search by name with optional status filter
 */
export async function searchAccountsByName(
    ctx: QueryCtx,
    tableName: AccountTableName,
    searchQuery: string,
    statusFilter: AccountStatus | undefined,
    paginationOpts: PaginationOptions
): Promise<PaginationResult<AccountDoc>> {
    if (!searchQuery || searchQuery.trim().length === 0) {
        return {
            page: [],
            isDone: true,
            continueCursor: "",
        };
    }

    return await ctx.db
        .query(tableName as TableNames)
        .withSearchIndex("search_name", (q) => {
            let search = q.search("name", searchQuery);
            if (statusFilter) {
                search = search.eq("status", statusFilter);
            }
            return search;
        })
        .paginate(paginationOpts) as PaginationResult<AccountDoc>;
}

/**
 * Search by address (street, city, state, or ZIP) - returns max 100 results
 */
export async function searchAccountsByAddress(
    ctx: QueryCtx,
    tableName: AccountTableName,
    searchQuery: string,
    statusFilter: AccountStatus | undefined
): Promise<AccountDoc[]> {
    if (!searchQuery || searchQuery.trim().length === 0) {
        return [];
    }

    const trimmedQuery = searchQuery.trim();

    // Search across city, state, and street indexes in parallel
    const [cityResults, stateResults, streetResults] = await Promise.all([
        ctx.db
            .query(tableName as TableNames)
            .withSearchIndex("search_city", (q) => {
                let search = q.search("address.city", trimmedQuery);
                if (statusFilter) {
                    search = search.eq("status", statusFilter);
                }
                return search;
            })
            .take(100),
        ctx.db
            .query(tableName as TableNames)
            .withSearchIndex("search_state", (q) => {
                let search = q.search("address.state", trimmedQuery);
                if (statusFilter) {
                    search = search.eq("status", statusFilter);
                }
                return search;
            })
            .take(100),
        ctx.db
            .query(tableName as TableNames)
            .withSearchIndex("search_street", (q) => {
                let search = q.search("address.street", trimmedQuery);
                if (statusFilter) {
                    search = search.eq("status", statusFilter);
                }
                return search;
            })
            .take(100),
    ]) as [AccountDoc[], AccountDoc[], AccountDoc[]];

    // Combine results and remove duplicates based on _id
    const allResults = [...cityResults, ...stateResults, ...streetResults];
    const uniqueResults = Array.from(
        new Map(allResults.map((account) => [account._id, account])).values()
    );

    // Check if the query looks like a ZIP code (5 digits)
    if (/^\d{5}$/.test(trimmedQuery)) {
        const zipQuery = ctx.db
            .query(tableName as TableNames)
            .withIndex("by_zip", (q) => q.eq("address.zipCode", trimmedQuery));

        const zipMatches = await zipQuery.take(100) as AccountDoc[];
        const filteredZip = statusFilter
            ? zipMatches.filter((account) => account.status === statusFilter)
            : zipMatches;

        // Add ZIP matches to unique results
        filteredZip.forEach((account) => {
            if (!uniqueResults.find((r) => r._id === account._id)) {
                uniqueResults.push(account);
            }
        });
    }

    // Limit to 100 results
    return uniqueResults.slice(0, 100);
}
