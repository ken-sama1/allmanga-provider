import { createGQLExecutor, } from "./utils/createGQLExecutor.js";
const mangasGQLTypes = new Map([
    ["search", "SearchInput"],
    ["page", "Int"],
    ["offset", "Int"],
    ["limit", "Int"],
    ["translationType", "VaildTranslationTypeMangaEnumType"],
    ["countryOrigin", "VaildCountryOriginEnumType"],
    ["format", "VaildMangaFormatEnumType"],
]);
const mangas = createGQLExecutor({
    root: "mangas",
    gqlTypes: mangasGQLTypes,
    name: "mangas",
});
export default mangas;
