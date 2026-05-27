import allmanga from "./dist/allmanga.js";

type MangaProjection = typeof allmanga.manga.projection;
type ShowsProjection = typeof allmanga.shows.projection;
type MangasProjection = typeof allmanga.mangas.projection;
type ShowProjection = typeof allmanga.show.projection;
type EpisodeInfosProjection = typeof allmanga.episodeInfos.projection;
type EpisodeProjection = typeof allmanga.episode.projection;
type ChaptersForReadProjection = typeof allmanga.chaptersForRead.projection;

const mangaSelection = {
	_id: 1,
	isAdult: 0,
	season: 1,
	altNames: 1,
	name: 1,
	englishName: 1,
	airedEnd: 1,
	magazine: 1,
	airedStart: 1,
	aniListId: 1,
	availableChapters: 1,
	availableChaptersDetail: 1,
	averageScore: 1,
	banner: 1,
	broadcastInterval: 1,
	chapterCount: 1,
	characterCount: 1,
	characters: 1,
	dailyUpdateNeeded: 1,
	description: 1,
	determinedInterval: 1,
	hidden: 1,
	lastChapterDate: 1,
	lastChapterTimestamp: 1,
	lastChapterInfo: 1,
	lastUpdateEnd: 1,
	lastUpdateStart: 1,
	musics: 1,
	manualUpdated: 1,
	nameOnlyString: 1,
	nativeName: 1,
	popularity: 1,
	prevideos: 1,
	rating: 1,
	relatedMangas: 1,
	score: 1,
	relatedShows: 1,
	slugTime: 1,
	sortOrder: 1,
	status: 1,
	genres: 1,
	tags: 1,
	thumbnail: 1,
	thumbnails: 1,
	trustedAltNames: 1,
	type: 1,
	updateQueue: 1,
	volumes: 1,
} satisfies MangaProjection;

const manga = await allmanga
	.manga({
		_id: "vWwkWEBSJqgsFtKDs",
	})
	.get({
		...mangaSelection,
		__typename: 0,
	} satisfies MangaProjection);

// console.log(manga);
manga.status === "success" && manga.data;

const mangas = await allmanga
	.mangas({
		search: {
			query: "Lord of the Mysteries",
		},
		countryOrigin: "ALL",
		translationType: "sub",
	})
	.get({
		edges: { ...mangaSelection },
		pageInfo: {
			limit: 1,
			hasNextPage: 1,
			page: 1,
		},
	} satisfies MangasProjection);

// console.log(mangas);
mangas.status === "success" && mangas.data;

const mangasWithIds = await allmanga
	.mangasWithIds({
		ids: ["vWwkWEBSJqgsFtKDs", "aLSaWPgWPsL7Semmj"],
	})
	.get({ ...mangaSelection } satisfies MangaProjection);

// console.log(mangasWithIds);
mangasWithIds.status === "success" && mangasWithIds.data;

const chapters = await allmanga
	.chaptersForRead({
		mangaId: "8EzhvAL9dhSiqouuY",
		chapterString: "2",
		translationType: "sub",
	})
	.get({
		edges: {
			__typename: 1,
			_id: 1,
			pictureServers: 1,
			pictureUrlHead: 1,
			pictureUrls: 1,
			sourceUrl: 1,
			sourceName: 1,
			chapterAiredDateString: 1,
			chapterNumEnd: 1,
			chapterNumStart: 1,
			chapterString: 1,
			downloadQueue: 1,
			mangaId: 1,
			notes: 1,
			pictureUrlsProcessed: 1,
			thumbnail: 1,
			uploadDate: 1,
			translationType: 1,
			priority: 1,
			versionFix: 1,
			videoUrlProcessed: 1,
			streamerId: 1,
			volume: 1,
		},
		manga: {
			__typename: 1,
			name: 1,
		},
		pageInfo: {
			__typename: 1,
		},
		// __typename: 0,
	} satisfies ChaptersForReadProjection);

// console.log(chapters);
chapters.status === "success" && chapters.data.edges;

const animeSelection: ShowProjection = {
	_id: 1,
	airedEnd: 1,
	airedStart: 1,
	altNames: 1,
	aniListId: 1,
	availableEpisodes: 1,
	availableEpisodesDetail: 1,
	averageScore: 1,
	banner: 1,
	broadcastInterval: 1,
	characterCount: 1,
	characters: 1,
	countryOfOrigin: 1,
	dailyUpdateNeeded: 1,
	description: 1,
	determinedInterval: 1,
	disqusIds: 1,
	englishName: 1,
	episodeCount: 1,
	episodeDuration: 1,
	genres: 1,
	hidden: 1,
	isAdult: 1,
	lastEpisodeDate: 1,
	lastEpisodeInfo: 1,
	lastEpisodeTimestamp: 1,
	lastUpdateEnd: 1,
	lastUpdateStart: 1,
	malId: 1,
	manualUpdated: 1,
	musics: 1,
	name: 1,
	nameOnlyString: 1,
	nativeName: 1,
	nextAiringEpisode: 1,
	popularity: 1,
	prevideos: 1,
	rating: 1,
	relatedMangas: 1,
	relatedShows: 1,
	score: 1,
	slugTime: 1,
	sortOrder: 1,
	status: 1,
	studios: 1,
	tags: 1,
	thumbnail: 1,
	thumbnails: 1,
	trustedAltNames: 1,
	type: 1,
	updateQueue: 1,
};

const show = await allmanga
	.show({
		_id: "bNAbh8viz7n7dGtNM",
	})
	.get({
		...animeSelection,
	} satisfies ShowProjection);

// console.log(show);
show.status === "success" && show.data;

const shows = await allmanga
	.shows({
		countryOrigin: "ALL",
		translationType: "sub",
		search: { query: "Lord of the Mysteries" },
	})
	.get({
		edges: {
			...animeSelection,
		},
		pageInfo: {
			__typename: 1,
			hasNextPage: 1,
		},
	} satisfies ShowsProjection);

// console.log(shows);
shows.status === "success" && shows.data;

const episode = await allmanga
	.episode({
		translationType: "sub",
		episodeString: "1",
		showId: "bNAbh8viz7n7dGtNM",
	})
	.get({
		_id: 1,
		thumbnail: 1,
		description: 1,
		downloadQueue: 1,
		episodeAiredDateString: 1,
		episodeInfo: {
			_id: 1,
			description: 1,
		},
		episodeString: 1,
		notes: 1,
		show: {
			_id: 1,
			description: 1,
			aniListId: 1,
			countryOfOrigin: 1,
		},
		sourceUrls: 1,
		episodeNumStart: 1,
		episodeNumEnd: 1,
		uploadDate: 1,
	} satisfies EpisodeProjection);

// console.log(episode);
episode.status === "success" && episode.data;

const episodeInfos = await allmanga
	.episodeInfos({
		showId: "bNAbh8viz7n7dGtNM",
		episodeNumEnd: 12,
		episodeNumStart: 1,
	})
	.get({
		_id: 1,
		description: 1,
		episodeIdNum: 1,
		isManga: 1,
		notes: 1,
		pictureUrlsProcessed: 1,
		showId: 1,
		thumbnails: 1,
		uploadDates: 1,
		vidInforsdub: 1,
		vidInforssub: 1,
		vidInforsraw: 1,
		__typename: 0,
	} satisfies EpisodeInfosProjection);

// console.log(episodeInfos);
episodeInfos.status === "success" && episodeInfos.data;

const showsWithIds = await allmanga
	.showsWithIds({
		ids: ["bNAbh8viz7n7dGtNM"],
	})
	.get({
		...animeSelection,
	} satisfies ShowProjection);

// console.log(showsWithIds);
showsWithIds.status === "success" && showsWithIds.data;
