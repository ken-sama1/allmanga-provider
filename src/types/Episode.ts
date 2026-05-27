import type { Evaluate } from "./common.type";
import type { EpisodeInfo } from "./EpisodeInfo";
import type { SearchInput } from "./SearchInput";
import type { Show } from "./Show";
import type { ValidTranslationTypeEnumType } from "./ValidTranslationTypeEnumType";

export type EpisodeArguments = {
	readonly showId: string;
	readonly episodeString: string;
	readonly translationType: ValidTranslationTypeEnumType;
	readonly queryAt: string;
	readonly search: SearchInput;
};

/**
 *  Base scheme model of `Episode```
 * */
export interface SchemaModelEpisode {
	readonly _id: string;
	readonly description: string;
	readonly downloadQueue: number;
	readonly episodeAiredDateString: string;
	readonly episodeInfo: EpisodeInfo;
	readonly episodeNumEnd: number;
	readonly episodeNumStart: number;
	readonly episodeString: string;
	readonly notes: string;
	// readonly pageStatus: PageStatus;
	readonly show: Show;
	readonly showId: string;
	readonly sourceUrls: unknown;
	readonly thumbnail: string;
	readonly translationType: ValidTranslationTypeEnumType;
	readonly uploadDate: unknown;
	readonly versionFix: string;
}

/**
 * Type copy of `SchemaModelEpisode`
 */
export type Episode = Evaluate<SchemaModelEpisode>;
