import type { Evaluate } from "./common.type";
import type { SchemaModelMangasConnection } from "./schemas/SchemaModelMangasConnection";
import type { SearchInput } from "./SearchInput";
import type { ValidCountryOriginEnumType } from "./ValidCountryOriginEnumType";
import type { ValidMangaFormatEnumType } from "./ValidMangaFormatEnumType";
import type { ValidTranslationTypeMangaEnumType } from "./ValidTranslationTypeMangaEnumType";

export type MangasConnectionArguments = {
	readonly search: SearchInput;
	readonly page: number;
	readonly offset: number;
	readonly limit: number;
	readonly translationType: ValidTranslationTypeMangaEnumType;
	readonly countryOrigin: ValidCountryOriginEnumType;
	readonly format: ValidMangaFormatEnumType;
};

/**
 *  Type copy of `SchemaModelMangasConnection`
 * */
export type MangasConnection = Evaluate<SchemaModelMangasConnection>;
