import type { Evaluate } from "./common.type";
import type { SchemaModelChaptersConnection } from "./schemas/SchemaModelChaptersConnection";
import type { SearchInput } from "./SearchInput";
import type { ValidTranslationTypeMangaEnumType } from "./ValidTranslationTypeMangaEnumType";

export type ChaptersConnectionArguments = {
	readonly mangaId: string;
	readonly translationType: ValidTranslationTypeMangaEnumType;
	readonly chapterString: string;
	readonly page: number;
	readonly limit: number;
	readonly offset: number;
	readonly queryAt: string;
	readonly search: SearchInput;
};

/**
 * Type copy of `SchemaModelChaptersConnection`
 */
export type ChaptersConnection = Evaluate<SchemaModelChaptersConnection>;
