// import { allmangaAPI } from "./api/allmangaAPI.js";
// import {
// 	loggingRequestInterceptor,
// 	loggingResponseInterceptor,
// } from "./api/interceptors/logging.interceptor.js";
import chaptersForRead, {} from "./core/chaptersForRead.js";
import episode, {} from "./core/episode.js";
import episodeInfos, {} from "./core/episodeInfos.js";
import manga, {} from "./core/manga.js";
import mangas, {} from "./core/mangas.js";
import mangasWithIds, {} from "./core/mangasWithIds.js";
import youtubeAnimeProxy, {} from "./proxy/youtube-anime.proxy.js";
import show, {} from "./core/show.js";
import shows, {} from "./core/shows.js";
import showsWithIds, {} from "./core/showsWithIds.js";
import deobfuscateURL from "./utils/deobfuscateURL.js";
const utils = {
    deobfuscateURL,
};
const proxy = {
    youtubeAnime: youtubeAnimeProxy,
};
const allmanga = {
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
    proxy,
};
export default allmanga;
