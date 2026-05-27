import { createGQLExecutor, } from "./utils/createGQLExecutor.js";
const episodeInfosGQLTypes = new Map([
    ["showId", "String!"],
    ["episodeNumStart", "Float!"],
    ["episodeNumEnd", "Float!"],
    ["queryAt", "String"],
]);
const episodeInfos = createGQLExecutor({
    root: "episodeInfos",
    gqlTypes: episodeInfosGQLTypes,
    name: "episode_infos",
});
export default episodeInfos;
