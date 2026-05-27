import { createGQLExecutor, } from "./utils/createGQLExecutor.js";
const episodeGQLTypes = new Map([
    ["showId", "String!"],
    ["translationType", "VaildTranslationTypeEnumType!"],
    ["episodeString", "String!"],
    ["search", "SearchInput"],
    ["queryAt", "String"],
]);
const episode = createGQLExecutor({
    root: "episode",
    name: "episode",
    gqlTypes: episodeGQLTypes,
});
export default episode;
