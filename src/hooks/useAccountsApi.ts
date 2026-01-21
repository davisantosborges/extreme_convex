import { api } from "../../convex/_generated/api";
import type { AccountTableName } from "../../convex/lib/accountTypes";

const apiMap = {
    accounts: api.accounts,
    accounts2: api.accounts2,
    accounts3: api.accounts3,
    accounts4: api.accounts4,
    accounts5: api.accounts5,
} as const;

export function getAccountApi(table: AccountTableName) {
    return apiMap[table];
}

export type AccountApi = ReturnType<typeof getAccountApi>;
