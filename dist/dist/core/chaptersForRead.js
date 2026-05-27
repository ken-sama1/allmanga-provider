import { createGQLExecutor, } from "./utils/createGQLExecutor.js";
const chaptersForReadGQLTypes = new Map([
    ["mangaId", "String!"],
    ["translationType", "VaildTranslationTypeMangaEnumType!"],
    ["chapterString", "String!"],
    ["page", "Int"],
    ["limit", "Int"],
    ["offset", "Int"],
    ["queryAt", "String"],
    ["search", "SearchInput"],
]);
const chaptersForRead = createGQLExecutor({
    root: "chaptersForRead",
    gqlTypes: chaptersForReadGQLTypes,
    name: "chapters_for_read",
});
export default chaptersForRead;
