/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as accounts from "../accounts.js";
import type * as accounts2 from "../accounts2.js";
import type * as accounts3 from "../accounts3.js";
import type * as accounts4 from "../accounts4.js";
import type * as accounts5 from "../accounts5.js";
import type * as lib_accountHelpers from "../lib/accountHelpers.js";
import type * as lib_accountTypes from "../lib/accountTypes.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  accounts: typeof accounts;
  accounts2: typeof accounts2;
  accounts3: typeof accounts3;
  accounts4: typeof accounts4;
  accounts5: typeof accounts5;
  "lib/accountHelpers": typeof lib_accountHelpers;
  "lib/accountTypes": typeof lib_accountTypes;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
