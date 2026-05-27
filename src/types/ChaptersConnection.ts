import type { Chapter } from "./Chapter";
import type { Evaluate } from "./common.type";
import type { Manga } from "./Manga";
import type { PageInfo } from "./PageInfo";
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
 * Base schema model of `ChaptersConnection`
 */
export interface SchemaModelChaptersConnection {
	readonly edges: Chapter[];
	readonly manga: Manga;
	readonly pageInfo: PageInfo;
	// readonly pageStatus: PageStatus;
}

/**
 * Type copy of `SchemaModelChaptersConnection`
 */
export type ChaptersConnection = Evaluate<SchemaModelChaptersConnection>;
