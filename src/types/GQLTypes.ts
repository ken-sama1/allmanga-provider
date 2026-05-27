import type { Scalars } from "./Scalars";

export type Enums =
	| "SearchInput"
	| "SortBy"
	| "SortDirection"
	| "VaildCountryOriginEnumType"
	| "VaildTranslationTypeEnumType"
	| "VaildTranslationTypeMangaEnumType"
	| "VaildSeasonsEnumType"
	| "VaildMangaFormatEnumType";

/** Wraps a string type in GraphQL list brackets. e.g., `[User]` */
export type GQLTypeList<T extends string> = `[${T}]`;

/** Appends a `!` to a GraphQL type string to mark it required. e.g., `String!` */
export type GQLTypeRequired<T extends string> = `${T}!`;

export type GQLTypes =
	| Scalars
	| Enums
	| GQLTypeRequired<GQLTypeList<GQLTypeRequired<Scalars | Enums>>>
	| GQLTypeList<GQLTypeRequired<Scalars | Enums>>
	| GQLTypeList<Scalars | Enums>
	| GQLTypeRequired<Scalars | Enums>;
