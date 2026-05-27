import { createGQLExecutor, } from "./utils/createGQLExecutor.js";
const mangasWithIdsGQLTypes = new Map([
    ["ids", "[String!]!"],
    ["search", "SearchInput"],
]);
const mangasWithIds = createGQLExecutor({
    root: "mangasWithIds",
    gqlTypes: mangasWithIdsGQLTypes,
    name: "mangas_with_ids",
});
export default mangasWithIds;
