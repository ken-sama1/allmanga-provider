/**
 *  Not done yet
 * */

// import axios from "axios";
//
// import { wrapper } from "axios-cookiejar-support";
// import { CookieJar } from "tough-cookie";
// import { allmangaHeaders } from "../../api/allmangaAPI.js";
//
// const headers = {
// 	Referer: "https://mangahub.io/",
// 	"User-Agent": allmangaHeaders["User-Agent"],
// };
//
// const jar = new CookieJar();
// const client = wrapper(axios.create({ jar, withCredentials: true, headers }));
//
// const getCookie = async (): Promise<string | null> => {
// 	const chapter = Math.floor(Math.random() * 3083);
// 	const baseURL = "https://mangahub.io";
// 	const url = `${baseURL}/chapter/martial-peak/chapter-${chapter}`;
// 	try {
// 		await client.get(url);
//
// 		const cookies = await jar.getCookies(baseURL);
// 		const mhubCookie = cookies.find((c) => c.key === "mhub_access");
//
// 		if (!mhubCookie)
// 			throw new Error("Could not find mhub_access in response cookies");
//
// 		console.log("Cookie fetched", mhubCookie.value);
//
// 		return mhubCookie.value;
// 	} catch (error: unknown) {
// 		const err = error as {
// 			message: string;
// 		};
//
// 		console.log("Failed to fetch cookie:", err.message);
// 		return null;
// 	}
// };
//
// const mangahub = axios.create({
// 	baseURL: "https://imgx.mghcdn.com",
// 	headers: {
// 		...headers,
// 		"x-mhub_access": await getCookie(),
// 	},
// });
//
// type MangaHubProxy<T> =
// 	| { data: T; status: "success" }
// 	| {
// 			status: "error";
// 			error: {
// 				status: number;
// 				message: string;
// 			};
// 	  };
//
// export const mangahubProxy = async (url: string) => {
// 	try {
// 		const response = await mangahub.get(url);
//
// 		console.log(response.data);
//
// 		return response.data;
// 	} catch (error: unknown) {
// 		console.log(error);
// 		const err = error as {
// 			message: string;
// 			status?: number;
// 		};
// 		return err;
// 	}
// };
//
// mangahubProxy("file/imghub/lord-of-the-mysteries/2/71.jpg");
