import type { EpisodeInfo, EpisodeInfoArguments, GQLTypes } from "../types";
import type { OptionalExcept } from "../types/common.type";
import {
	createGQLExecutor,
	type GQLExecutor,
} from "./utils/createGQLExecutor.js";

type EpisodeInfosVariables = OptionalExcept<
	EpisodeInfoArguments,
	"showId" | "episodeNumStart" | "episodeNumEnd"
>;

export type EpisodeInfosQueryExecutor = GQLExecutor<
	EpisodeInfosVariables,
	EpisodeInfo[]
>;

const episodeInfosGQLTypes = new Map<keyof EpisodeInfosVariables, GQLTypes>([
	["showId", "String!"],
	["episodeNumStart", "Float!"],
	["episodeNumEnd", "Float!"],
	["queryAt", "String"],
]);

const episodeInfos: EpisodeInfosQueryExecutor = createGQLExecutor<
	EpisodeInfosVariables,
	EpisodeInfo[]
>({
	root: "episodeInfos",
	gqlTypes: episodeInfosGQLTypes,
	name: "episode_infos",
});

export default episodeInfos;
