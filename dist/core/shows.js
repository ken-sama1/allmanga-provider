import { createGQLExecutor, } from "./utils/createGQLExecutor.js";
const showsGQLTypes = new Map([
    ["search", "SearchInput"],
    ["page", "Int"],
    ["offset", "Int"],
    ["limit", "Int"],
    ["translationType", "VaildTranslationTypeEnumType"],
    ["countryOrigin", "VaildCountryOriginEnumType"],
]);
const shows = createGQLExecutor({
    root: "shows",
    name: "shows",
    gqlTypes: showsGQLTypes,
});
export default shows;
