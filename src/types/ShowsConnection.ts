import type { SearchInput } from "./SearchInput";
import type { ValidTranslationTypeEnumType } from "./ValidTranslationTypeEnumType";
import type { ValidCountryOriginEnumType } from "./ValidCountryOriginEnumType";
import type { Evaluate } from "./common.type";
import type { SchemaModelShowsConnection } from "./schemas/SchemaModelShowsConnection.ts";

export type ShowsConnectionArguments = {
	readonly search: SearchInput;
	readonly page: number;
	readonly offset: number;
	readonly limit: number;
	readonly translationType: ValidTranslationTypeEnumType;
	readonly countryOrigin: ValidCountryOriginEnumType;
};

/**
 *  Type copy of `SchemaModelShowsConnection`
 * */
export type ShowsConnection = Evaluate<SchemaModelShowsConnection>;
