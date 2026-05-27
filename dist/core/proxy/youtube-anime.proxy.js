import axios from "axios";
import { allmangaHeaders } from "../../api/allmangaAPI.js";
import { isMimeType } from "../utils/isMimeType.js";
const providers = {
    1: "ytimgf",
    2: "aln",
    3: "egendao",
};
const defaultProviderId = 1;
const generateBaseURL = (id) => {
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
const youtubeAnimeProxy = async function* (panels, config) {
    const { delayPerRequest, autoRetry = false, maxRetry = 3 } = config || {};
    const minDelay = delayPerRequest?.min ?? 200;
    const maxDelay = delayPerRequest?.max ?? 1000;
    const selectedProvider = config?.providerId;
    const failedPanels = [];
    let successCount = 0;
    let i = 0;
    while (i < panels.length) {
        const panel = panels[i];
        try {
            if (!panel) {
                throw new Error("Panel out of bounds");
            }
            const response = await youtubeAnime.get(panel.url, {
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
        }
        catch (error) {
            const err = error;
            if (autoRetry && panel) {
                panel.retryAttempts = (panel.retryAttempts ?? 0) + 1;
                if (panel.retryAttempts < maxRetry) {
                    continue;
                }
            }
            if (panel)
                failedPanels.push(panel);
            yield {
                status: "error",
                error: {
                    message: err.message || "Unknown error",
                    status: err.status || 400,
                    retried: panel?.retryAttempts ?? 0,
                },
            };
            i++;
        }
        finally {
            const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
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
