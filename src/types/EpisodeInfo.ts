import type { Evaluate } from "./common.type";
import type { SchemaModelEpisodeInfo } from "./schemas/SchemaModelEpisodeInfo";

export type EpisodeInfoArguments = {
	readonly showId: string;
	readonly episodeNumStart: number;
	readonly episodeNumEnd: number;
	readonly queryAt: string;
};

/**
 *  Type copy of `SchemaModelEpisodeInfo`
 * */
export type EpisodeInfo = Evaluate<SchemaModelEpisodeInfo>;
