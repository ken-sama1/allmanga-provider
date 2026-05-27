import type { Evaluate } from "./common.type";
import type { SchemaModelManga } from "./schemas/SchemaModelManga";
import type { SearchInput } from "./SearchInput";

export type MangaArguments = {
	readonly _id: string;
	readonly search: SearchInput;
};

/**
 *  Type copy of `SchemaModelManga`
 * */
export type Manga = Evaluate<SchemaModelManga>;
