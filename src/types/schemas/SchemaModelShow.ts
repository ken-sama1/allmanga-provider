import type { DateTime } from "../Scalars";

/**
 *  Base schema model of `Show`
 * */
export interface SchemaModelShow {
	readonly _id: string;
	readonly airedEnd: unknown;
	readonly airedStart: unknown;
	readonly altNames: string;
	readonly aniListId: number;
	readonly availableEpisodes: unknown;
	readonly availableEpisodesDetail: unknown;
	readonly averageScore: number;
	readonly banner: string;
	readonly broadcastInterval: number;
	readonly characterCount: number;
	readonly characters: unknown;
	readonly countryOfOrigin: string;
	readonly dailyUpdateNeeded: boolean;
	readonly description: string;
	readonly determinedInterval: unknown;
	readonly disqusIds: unknown;
	readonly englishName: string;
	readonly episodeCount: number;
	readonly episodeDuration: number;
	readonly genres: string;
	readonly hidden: boolean;
	readonly isAdult: boolean;
	readonly lastEpisodeDate: unknown;
	readonly lastEpisodeInfo: unknown;
	readonly lastEpisodeTimestamp: unknown;
	readonly lastUpdateEnd: DateTime;
	readonly lastUpdateStart: DateTime;
	readonly malId: number;
	readonly manualUpdated: boolean;
	readonly musics: unknown;
	readonly name: string;
	readonly nameOnlyString: string;
	readonly nativeName: string;
	readonly nextAiringEpisode: unknown;
	// readonly pageStatus: PageStatus;
	readonly popularity: number;
	readonly prevideos: string;
	readonly rating: string;
	readonly relatedMangas: unknown;
	readonly relatedShows: unknown;
	readonly score: unknown;
	readonly slugTime: number;
	readonly sortOrder: number;
	readonly status: string;
	readonly studios: string;
	readonly tags: string;
	readonly thumbnail: string;
	readonly thumbnails: string;
	readonly trustedAltNames: string;
	readonly type: string;
	readonly updateQueue: number;
}
