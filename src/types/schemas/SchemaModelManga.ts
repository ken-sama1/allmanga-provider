import type { DateTime } from "../Scalars";

/**
 *  Base schema model `Manga`
 * */
export interface SchemaModelManga {
	readonly _id: string;
	readonly airedEnd: unknown;
	readonly airedStart: unknown;
	readonly altNames: string;
	readonly aniListId: number;
	readonly authors: string;
	readonly availableChapters: unknown;
	readonly availableChaptersDetail: unknown;
	readonly averageScore: number;
	readonly banner: string;
	readonly broadcastInterval: number;
	readonly chapterCount: number;
	readonly characterCount: number;
	readonly characters: unknown;
	readonly dailyUpdateNeeded: boolean;
	readonly description: string;
	readonly determinedInterval: unknown;
	readonly englishName: string;
	readonly genres: string;
	readonly hidden: boolean;
	readonly isAdult: boolean;
	readonly lastChapterDate: unknown;
	readonly lastChapterInfo: unknown;
	readonly lastChapterTimestamp: unknown;
	readonly lastUpdateEnd: DateTime;
	readonly lastUpdateStart: DateTime;
	readonly magazine: string;
	readonly manualUpdated: boolean;
	readonly musics: unknown;
	readonly name: string;
	readonly nameOnlyString: string;
	readonly nativeName: string;
	// readonly pageStatus: PageStatus;
	readonly popularity: number;
	readonly prevideos: number;
	readonly rating: string;
	readonly relatedMangas: unknown;
	readonly relatedShows: unknown;
	readonly score: number;
	readonly season: unknown;
	readonly slugTime: number;
	readonly sortOrder: number;
	readonly status: string;
	readonly tags: string;
	readonly thumbnail: string;
	readonly thumbnails: string;
	readonly trustedAltNames: string;
	readonly type: string;
	readonly updateQueue: number;
	readonly volumes: number;
}
