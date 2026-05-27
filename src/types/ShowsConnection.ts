import type { PageInfo } from "./PageInfo";
import type { Show } from "./Show";
import type { SearchInput } from "./SearchInput";
import type { ValidTranslationTypeEnumType } from "./ValidTranslationTypeEnumType";
import type { ValidCountryOriginEnumType } from "./ValidCountryOriginEnumType";
import type { Evaluate } from "./common.type";

export type ShowsConnectionArguments = {
	readonly search: SearchInput;
	readonly page: number;
	readonly offset: number;
	readonly limit: number;
	readonly translationType: ValidTranslationTypeEnumType;
	readonly countryOrigin: ValidCountryOriginEnumType;
};

/**
 *  Base schema model of `ShowsConnection`
 * */
export interface SchemaModelShowsConnection {
	readonly edges: Show[];
	readonly pageInfo: PageInfo;
}

/**
 *  Type copy of `SchemaModelShowsConnection`
 * */
export type ShowsConnection = Evaluate<SchemaModelShowsConnection>;
