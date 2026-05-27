import { createGQLExecutor, } from "./utils/createGQLExecutor.js";
const showWithdIdsGQLtypes = new Map([
    ["ids", "[String!]!"],
    ["search", "SearchInput"],
]);
const showsWithIds = createGQLExecutor({
    root: "showsWithIds",
    gqlTypes: showWithdIdsGQLtypes,
    name: "shows_with_ids",
});
export default showsWithIds;
