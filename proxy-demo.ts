import allmanga from "./dist/allmanga.js";

/** Youtube Anime Proxy Usage Demo*/

const chapters = await allmanga
	.chaptersForRead({
		mangaId: "8EzhvAL9dhSiqouuY",
		chapterString: "2",
		translationType: "sub",
	})
	.get({
		edges: {
			sourceName: 1,
			pictureUrls: 1,
		},
	});

/**
 * Array of `MangaPanel` is the `pictureUrls`
 * and the first parameter of youtubeAnimeProxy's shape.
 * */
type MangaPanel = {
	num: number;
	url: string;
};

/**
 * The function that will verify `pictureUrls` type
 * */
const isPictureUrls = (obj: unknown): obj is MangaPanel[] => {
	return Array.isArray(obj) && obj.length > 0 && "url" in obj[0];
};

// Create a function that will fetch the stream.
const fetchPanel = async () => {
	if (chapters.status !== "partial" && chapters.status !== "success") return;

	/**
	 *  Select `"YoutubeAnime"` as provider.
	 *  The youtubeAnimeProxy only works with this provider for now.
	 * */
	const provider = chapters.data.edges?.find(
		(d) => d.sourceName === "YoutubeAnime",
	);

	/**
	 * Initial type of `pictureUrls` is unknown.
	 *
	 * Thats's why you need to assert the type
	 * */
	if (!isPictureUrls(provider?.pictureUrls)) return;

	const stream = allmanga.utils.youtubeAnimeProxy(provider.pictureUrls, {
		// allow auto retry
		autoRetry: true,
		//max retry
		maxRetry: 3,
		// this swtches which endpoint to make request.
		providerId: 1,
		//set a random delay between max and min to avoid getting flagged.
		delayPerRequest: {
			max: 800,
			min: 100,
		},
	});

	const useWhile = true;

	if (!useWhile) {
		// This fetch all the images, but does not return the last chunk.
		// The last chunk is only a summary though.
		// This should be fine if you only want the images
		for await (const chunk of stream) {
			console.log(chunk);
		}
	} else {
		// But if you want to get the last chunk.
		while (true) {
			const { done, value } = await stream.next();

			if (done) {
				const { failedCount, failedPanels, successCount, totalProcessed } =
					value;

				console.log(failedCount, failedPanels, successCount, totalProcessed);
				break;
			}

			if (value.status === "success") {
				const { num, img } = value.data;

				console.log(num, img);

				//convert image buffer to a base64 url
				const base64Url = `data:${img.mimeType};base64,${img.buffer.toString("base64")}`;

				console.log(base64Url);

				/**
				 *  If you are using express to serve the image just pass `img.mimeType` to content-type
				 *
				 *  Example:
				 *
				 *  res.set("Content-Type", img.mimeType);
				 *  res.send(img.buffer);
				 * */
			}
		}
	}
};

// Run the fetcher
fetchPanel();

/**
 *
 *  There are currently two providers available.
 *
 *  I made a proxy for the other, and it works but not perfectly.
 *  It can fetch panels from manga hub but it does not match the metadata provided by allmanga.
 *  For instance, allmanga metadata say that it contains 71 pages, however the mangahub only return 20 pages of images.
 *  But both is the complete panels for that chapter.
 *
 *  But because request will come from mangahub endpoint, it will not be allmanga anymore.
 *  Migth as well create another scraper dedicated to that website.
 *
 *  If I figure out the manga hub youtube-anime endpoint and how to scrape it I'll immediately add it.
 * */
