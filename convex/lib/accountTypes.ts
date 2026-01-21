import { v } from "convex/values";

export const statusValidator = v.optional(
    v.union(
        v.literal("active"),
        v.literal("inactive"),
        v.literal("pending"),
        v.literal("suspended"),
        v.literal("closed")
    )
);

export type AccountTableName = "accounts" | "accounts2" | "accounts3" | "accounts4" | "accounts5";

export type AccountStatus = "active" | "inactive" | "pending" | "suspended" | "closed";
