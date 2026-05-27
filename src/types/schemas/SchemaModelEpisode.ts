import type { EpisodeInfo } from "../EpisodeInfo";
import type { Show } from "../Show";
import type { ValidTranslationTypeEnumType } from "../ValidTranslationTypeEnumType";

/**
 *  Base scheme model of `Episode`
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
