import type { SortBy } from "./SortBy";
import type { SortDirection } from "./SortDirection";
import type { ValidSeasonsEnumType } from "./ValidSeasonsEnumType";

export type SearchInput = {
	readonly allowAdult: boolean;
	readonly allowUnknown: boolean;
	readonly authors: string[];
	readonly dateRangeEnd: number;
	readonly dateRangeStart: number;
	readonly denyEcchi: boolean;
	readonly downloadOnly: boolean;
	readonly epRangeEnd: number;
	readonly excludeGenres: string[];
	readonly excludeTags: string[];
	readonly genres: string[];
	readonly includeGenres: boolean;
	readonly includeTypes: boolean;
	readonly isManga: boolean;
	readonly magazine: string;
	readonly query: string;
	readonly season: ValidSeasonsEnumType;
	readonly sortBy: SortBy;
	readonly sortDirection: SortDirection;
	readonly studios: string[];
	readonly tags: string[];
	readonly types: string[];
	readonly year: number;
};
