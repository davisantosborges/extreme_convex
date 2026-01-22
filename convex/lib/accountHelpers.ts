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
 * Search by address fields (street, city, state, ZIP) with AND logic
 * Each non-empty field narrows down results
 */
export async function searchAccountsByAddress(
    ctx: QueryCtx,
    tableName: AccountTableName,
    addressFields: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    },
    statusFilter: AccountStatus | undefined
): Promise<AccountDoc[]> {
    const { street, city, state, zipCode } = addressFields;

    // Check if any field has a value
    const hasStreet = street && street.trim().length > 0;
    const hasCity = city && city.trim().length > 0;
    const hasState = state && state.trim().length > 0;
    const hasZip = zipCode && zipCode.trim().length > 0;

    if (!hasStreet && !hasCity && !hasState && !hasZip) {
        return [];
    }

    // Start with the most specific non-empty field to get initial results
    let results: AccountDoc[] = [];

    // Priority: ZIP (exact match) > Street > City > State
    if (hasZip) {
        const zipQuery = ctx.db
            .query(tableName as TableNames)
            .withIndex("by_zip", (q) => q.eq("address.zipCode", zipCode!.trim()));
        results = await zipQuery.take(500) as AccountDoc[];

        // Apply status filter
        if (statusFilter) {
            results = results.filter((account) => account.status === statusFilter);
        }
    } else if (hasStreet) {
        results = await ctx.db
            .query(tableName as TableNames)
            .withSearchIndex("search_street", (q) => {
                let search = q.search("address.street", street!.trim());
                if (statusFilter) {
                    search = search.eq("status", statusFilter);
                }
                return search;
            })
            .take(500) as AccountDoc[];
    } else if (hasCity) {
        results = await ctx.db
            .query(tableName as TableNames)
            .withSearchIndex("search_city", (q) => {
                let search = q.search("address.city", city!.trim());
                if (statusFilter) {
                    search = search.eq("status", statusFilter);
                }
                return search;
            })
            .take(500) as AccountDoc[];
    } else if (hasState) {
        results = await ctx.db
            .query(tableName as TableNames)
            .withSearchIndex("search_state", (q) => {
                let search = q.search("address.state", state!.trim());
                if (statusFilter) {
                    search = search.eq("status", statusFilter);
                }
                return search;
            })
            .take(500) as AccountDoc[];
    }

    // Now filter results by remaining fields (AND logic)
    if (hasStreet && !hasZip) {
        // Street was primary, no additional street filter needed
    } else if (hasStreet) {
        const streetLower = street!.trim().toLowerCase();
        results = results.filter((account) =>
            account.address.street.toLowerCase().includes(streetLower)
        );
    }

    if (hasCity && !(hasCity && !hasStreet && !hasZip)) {
        const cityLower = city!.trim().toLowerCase();
        results = results.filter((account) =>
            account.address.city.toLowerCase().includes(cityLower)
        );
    }

    if (hasState && !(hasState && !hasStreet && !hasCity && !hasZip)) {
        const stateLower = state!.trim().toLowerCase();
        results = results.filter((account) =>
            account.address.state.toLowerCase().includes(stateLower)
        );
    }

    if (hasZip && results.length > 0) {
        // ZIP was exact match, already filtered
    }

    // Limit to 100 results
    return results.slice(0, 100);
}
