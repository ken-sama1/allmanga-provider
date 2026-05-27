import type { ValidTranslationTypeEnumType } from "../ValidTranslationTypeEnumType";

/**
 * Base schema model of `Chapter`
 * */
export interface SchemaModelChapter {
	readonly _id: string;
	readonly chapterAiredDateString: string;
	readonly chapterNumEnd: number;
	readonly chapterNumStart: number;
	readonly chapterString: string;
	readonly downloadQueue: number;
	readonly mangaId: string;
	readonly notes: string;
	readonly pictureServers: unknown;
	readonly pictureUrlHead: string;
	readonly pictureUrls: unknown;
	readonly pictureUrlsProcessed: number;
	readonly priority: number;
	readonly sourceName: string;
	readonly sourceUrl: string;
	readonly streamerId: string;
	readonly thumbnail: string;
	readonly translationType: ValidTranslationTypeEnumType;
	readonly uploadDate: unknown;
	readonly versionFix: string;
	readonly videoUrlProcessed: boolean;
	readonly volume: number;
}
