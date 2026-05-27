import axios from "axios";
import { allmangaHeaders } from "../../api/allmangaAPI.js";
import type { Simplify } from "../../types/common.type.js";
import { isMimeType } from "../utils/isMimeType.js";

const providers = {
	1: "ytimgf",
	2: "aln",
	3: "egendao",
} as const;

const defaultProviderId = 1;

type ProviderId = keyof typeof providers;

const generateBaseURL = (id: ProviderId): string => {
	const provider = providers[id];
	return `https://${provider}.youtube-anime.com/`;
};

const youtubeAnime = axios.create({
	baseURL: generateBaseURL(defaultProviderId),
	headers: {
		...allmangaHeaders,
		Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*",
	},
});

type MangaPanel = {
	num: number;
	url: string;
	retryAttempts?: number;
};

type ProxyConfig = {
	/** Retry failed request*/
	autoRetry?: boolean;
	/** default 3*/
	maxRetry?: number;
	/**
	 * To prevent getting rate-limited if they even had one.
	 * Also to avoid to avoid getting flagged for spam if they even have one.
	 * Won't hurt to be a bit cautious.
	 *
	 * */
	delayPerRequest?: {
		/**default 1000ms*/
		max?: number;
		/** default 200ms*/
		min?: number;
	};
	/** Switch provider (default 1)*/
	providerId?: ProviderId;
};

type YoutubeAnimeProxyResponse = {
	failedCount: number;
	failedPanels: MangaPanel[];
	successCount: number;
	totalProcessed: number;
};

type YoutubeAnimeProxyChunk =
	| {
			status: "success";
			data: {
				num: number;
				img: {
					mimeType: string;
					buffer: Buffer;
				};
			};
	  }
	| {
			status: "error";
			error: {
				status: number;
				message: string;
				retried: number;
			};
	  };

type MangaPanels = Simplify<Omit<MangaPanel, "retryAttempts">>[];

export type YoutubeAnimeProxy = (
	panels: MangaPanels,
	config?: ProxyConfig,
) => AsyncGenerator<YoutubeAnimeProxyChunk, YoutubeAnimeProxyResponse>;

const youtubeAnimeProxy: YoutubeAnimeProxy = async function* (
	panels: Omit<MangaPanel, "retryAttempts">[],
	config?: ProxyConfig,
): AsyncGenerator<YoutubeAnimeProxyChunk, YoutubeAnimeProxyResponse, void> {
	const { delayPerRequest, autoRetry = false, maxRetry = 3 } = config || {};
	const minDelay = delayPerRequest?.min ?? 200;
	const maxDelay = delayPerRequest?.max ?? 1000;
	const selectedProvider = config?.providerId;

	const failedPanels: MangaPanel[] = [];
	let successCount: number = 0;

	let i: number = 0;
	while (i < panels.length) {
		const panel: MangaPanel | undefined = panels[i];

		try {
			if (!panel) {
				throw new Error("Panel out of bounds");
			}

			const response = await youtubeAnime.get<ArrayBuffer>(panel.url, {
				responseType: "arraybuffer",
				...(selectedProvider && { baseURL: generateBaseURL(selectedProvider) }),
			});

			const contentType = response.headers["content-type"];
			const mimeType = isMimeType(contentType) ? contentType : "image/png";

			yield {
				status: "success",
				data: {
					num: panel.num,
					img: {
						mimeType,
						buffer: Buffer.from(response.data),
					},
				},
			};
			i++;
			successCount++;
		} catch (error: unknown) {
			const err = error as {
				message?: string;
				status?: number;
			};

			if (autoRetry && panel) {
				panel.retryAttempts = (panel.retryAttempts ?? 0) + 1;
				if (panel.retryAttempts < maxRetry) {
					continue;
				}
			}

			if (panel) failedPanels.push(panel);

			yield {
				status: "error",
				error: {
					message: err.message || "Unknown error",
					status: err.status || 400,
					retried: panel?.retryAttempts ?? 0,
				},
			};
			i++;
		} finally {
			const delay =
				Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}

	return {
		failedPanels,
		failedCount: failedPanels.length,
		successCount,
		totalProcessed: panels.length,
	};
};

export default youtubeAnimeProxy;
