import axios from "axios";
import * as crypto from "node:crypto";
export const allmangaHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Referer: "https://youtu-chan.com",
    Origin: "https://youtu-chan.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0",
};
const seed = "Xot36i3lK3:v1";
export const allmangaKey = crypto
    .createHash("sha256")
    .update(seed, "utf-8")
    .digest();
export const allmangaURL = "/api";
export const allmangaAPI = axios.create({
    baseURL: "https://api.allanime.day",
    headers: {
        ...allmangaHeaders,
    },
});
