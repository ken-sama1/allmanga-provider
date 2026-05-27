import type { Episode, EpisodeArguments, GQLTypes } from "../types";
import type { OptionalExcept } from "../types/common.type";
import {
	createGQLExecutor,
	type GQLExecutor,
} from "./utils/createGQLExecutor.js";

type EpisodeVariables = OptionalExcept<
	EpisodeArguments,
	"showId" | "episodeString" | "translationType"
>;

export type EpisodeQueryExecutor = GQLExecutor<EpisodeVariables, Episode>;

const episodeGQLTypes = new Map<keyof EpisodeVariables, GQLTypes>([
	["showId", "String!"],
	["translationType", "VaildTranslationTypeEnumType!"],
	["episodeString", "String!"],
	["search", "SearchInput"],
	["queryAt", "String"],
]);

const episode: EpisodeQueryExecutor = createGQLExecutor<
	EpisodeVariables,
	Episode
>({
	root: "episode",
	name: "episode",
	gqlTypes: episodeGQLTypes,
});

export default episode;
