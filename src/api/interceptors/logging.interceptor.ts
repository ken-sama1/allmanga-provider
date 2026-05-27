import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface CustomRequestConfig extends InternalAxiosRequestConfig {
	metadata?: {
		startTime?: number;
		name?: string;
	};
}

export const hasMetadata = (obj: unknown): obj is CustomRequestConfig => {
	return typeof obj === "object" && obj !== null && "metadata" in obj;
};

const METHOD_COLORS: Record<string, string> = {
	GET: "\x1b[32m",
	POST: "\x1b[34m",
	PUT: "\x1b[33m",
	PATCH: "\x1b[35m",
	DELETE: "\x1b[31m",
};

const RESET = "\x1b[0m";
const DIM = "\x1b[90m";

const log = (
	config: InternalAxiosRequestConfig,
	...args: readonly unknown[]
) => {
	if (!hasMetadata(config)) return;

	const name = config.metadata?.name;

	const method = (config.method ?? "GET").toUpperCase();

	const color = METHOD_COLORS[method] ?? "";

	const url = new URL(config.url ?? "", config.baseURL).toString();

	const label = [name && `[${name}]`, `${color}${method}${RESET}`, url]
		.filter(Boolean)
		.join(" ");

	console.log(`${DIM}${new Date().toISOString()}${RESET}`, label, ...args);
};

export const loggingRequestInterceptor = (
	config: InternalAxiosRequestConfig,
) => {
	if (!hasMetadata(config)) return config;

	config.metadata = {
		startTime: Date.now(),
		...config.metadata,
	};

	log(config, "-->");
	return config;
};

export const loggingResponseInterceptor =
	(error = false) =>
	(response: AxiosResponse) => {
		if (!hasMetadata(response.config)) return response;
		const duration = Date.now() - (response.config.metadata?.startTime ?? 0);

		const { config: c } = response;

		const status = response.status;

		log(c, `<-- ${status}`, `${duration}ms`);

		if (error) throw response;

		return response;
	};
