import { createGQLExecutor, } from "./utils/createGQLExecutor.js";
const showGQLTypes = new Map([
    ["_id", "String!"],
    ["queryAt", "String"],
    ["search", "SearchInput"],
]);
const show = createGQLExecutor({
    root: "show",
    gqlTypes: showGQLTypes,
    name: "show",
});
export default show;
