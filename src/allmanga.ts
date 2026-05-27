// import { allmangaAPI } from "./api/allmangaAPI.js";
// import {
// 	loggingRequestInterceptor,
// 	loggingResponseInterceptor,
// } from "./api/interceptors/logging.interceptor.js";
import chaptersForRead, {
	type ChaptersForReadQueryExecutor,
} from "./core/chaptersForRead.js";
import episode, { type EpisodeQueryExecutor } from "./core/episode.js";
import episodeInfos, {
	type EpisodeInfosQueryExecutor,
} from "./core/episodeInfos.js";
import manga, { type MangaQueryExecutor } from "./core/manga.js";
import mangas, { type MangasQueryExecutor } from "./core/mangas.js";
import mangasWithIds, {
	type MangasWithdIdsQueryExecutor,
} from "./core/mangasWithIds.js";
import youtubeAnimeProxy, {
	type YoutubeAnimeProxy,
} from "./core/proxy/youtube-anime.proxy.js";
import show, { type ShowQueryExecutor } from "./core/show.js";
import shows, { type ShowsQueryExecutor } from "./core/shows.js";
import showsWithIds, {
	type ShowsWithIdsQueryExecutor,
} from "./core/showsWithIds.js";

// allmangaAPI.interceptors.request.use(loggingRequestInterceptor);
// allmangaAPI.interceptors.response.use(
// 	loggingResponseInterceptor(),
// 	loggingResponseInterceptor(true),
// );

type AllMangaSDKUtils = {
	youtubeAnimeProxy: YoutubeAnimeProxy;
};

const utils: AllMangaSDKUtils = {
	youtubeAnimeProxy,
};

type AllMangaSDK = {
	/** Schema Model `Manga`*/
	manga: MangaQueryExecutor;
	/** Schema Model `MangasConnection`*/
	mangas: MangasQueryExecutor;
	/** Schema Model `Manga`*/
	mangasWithIds: MangasWithdIdsQueryExecutor;
	/** Schema Model `Show`*/
	show: ShowQueryExecutor;
	/** Schema Model `ShowsConnection`*/
	shows: ShowsQueryExecutor;
	/** Schema Model `Show`*/
	showsWithIds: ShowsWithIdsQueryExecutor;
	/** Schema Model `ChaptersConnection`*/
	chaptersForRead: ChaptersForReadQueryExecutor;
	/** Schema Model `Episode`*/
	episode: EpisodeQueryExecutor;
	/** Schema Model `EpisodeInfo`*/
	episodeInfos: EpisodeInfosQueryExecutor;
	utils: typeof utils;
};

const allmanga: AllMangaSDK = {
	show,
	shows,
	showsWithIds,
	manga,
	mangas,
	mangasWithIds,
	chaptersForRead,
	episode,
	episodeInfos,
	utils,
};

export default allmanga;
export type * from "./types/schemas/";
