/**
 *  Base schema model of `EpisodeInfo`
 * */
export interface SchemaModelEpisodeInfo {
	readonly _id: string;
	readonly description: string;
	readonly episodeIdNum: number;
	readonly isManga: boolean;
	readonly notes: string;
	readonly pictureUrlsProcessed: string;
	readonly showId: string;
	readonly thumbnails: string[];
	readonly uploadDates: unknown;
	readonly vidInforsdub: unknown;
	readonly vidInforsraw: unknown;
	readonly vidInforssub: unknown;
}
