import { query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { statusValidator } from "./lib/accountTypes";
import { listAccounts, searchAccountsByName, searchAccountsByAddress } from "./lib/accountHelpers";

const TABLE_NAME = "accounts4" as const;

export const list = query({
    args: {
        paginationOpts: paginationOptsValidator,
        statusFilter: statusValidator,
    },
    handler: (ctx, args) => listAccounts(ctx, TABLE_NAME, args.statusFilter, args.paginationOpts),
});

export const search = query({
    args: {
        paginationOpts: paginationOptsValidator,
        searchQuery: v.string(),
        statusFilter: statusValidator,
    },
    handler: (ctx, args) => searchAccountsByName(ctx, TABLE_NAME, args.searchQuery, args.statusFilter, args.paginationOpts),
});

export const searchByAddress = query({
    args: {
        street: v.optional(v.string()),
        city: v.optional(v.string()),
        state: v.optional(v.string()),
        zipCode: v.optional(v.string()),
        statusFilter: statusValidator,
    },
    handler: (ctx, args) => searchAccountsByAddress(ctx, TABLE_NAME, {
        street: args.street,
        city: args.city,
        state: args.state,
        zipCode: args.zipCode,
    }, args.statusFilter),
});
