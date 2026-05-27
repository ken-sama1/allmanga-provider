import { createGQLExecutor, } from "./utils/createGQLExecutor.js";
const mangaGQLTypes = new Map([
    ["_id", "String!"],
    ["search", "SearchInput"],
]);
const manga = createGQLExecutor({
    gqlTypes: mangaGQLTypes,
    name: "manga",
    root: "manga",
});
export default manga;
