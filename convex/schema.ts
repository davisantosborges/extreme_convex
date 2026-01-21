import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const accountDocument = {
  name: v.string(),
  status: v.union(
    v.literal("active"),
    v.literal("inactive"),
    v.literal("pending"),
    v.literal("suspended"),
    v.literal("closed")
  ),
  address: v.object({
    street: v.string(),
    city: v.string(),
    state: v.string(),
    zipCode: v.string(),
  }),
};

function createAccountTable() {
  return defineTable(accountDocument)
    .index("by_status", ["status"])
    .index("by_zip", ["address.zipCode"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["status"],
    })
    .searchIndex("search_city", {
      searchField: "address.city",
      filterFields: ["status"],
    })
    .searchIndex("search_state", {
      searchField: "address.state",
      filterFields: ["status"],
    })
    .searchIndex("search_street", {
      searchField: "address.street",
      filterFields: ["status"],
    });
}

export default defineSchema({
  accounts: createAccountTable(),
  accounts2: createAccountTable(),
  accounts3: createAccountTable(),
  accounts4: createAccountTable(),
  accounts5: createAccountTable(),
});
