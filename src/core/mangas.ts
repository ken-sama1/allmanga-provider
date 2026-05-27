import type {
	GQLTypes,
	MangasConnection,
	MangasConnectionArguments,
} from "../types";
import type { DeepPartial, RequireOne } from "../types/common.type";
import {
	createGQLExecutor,
	type GQLExecutor,
} from "./utils/createGQLExecutor.js";

type MangasVariables = RequireOne<DeepPartial<MangasConnectionArguments>>;

const mangasGQLTypes = new Map<keyof MangasVariables, GQLTypes>([
	["search", "SearchInput"],
	["page", "Int"],
	["offset", "Int"],
	["limit", "Int"],
	["translationType", "VaildTranslationTypeMangaEnumType"],
	["countryOrigin", "VaildCountryOriginEnumType"],
	["format", "VaildMangaFormatEnumType"],
]);

export type MangasQueryExecutor = GQLExecutor<
	MangasVariables,
	MangasConnection
>;

const mangas: MangasQueryExecutor = createGQLExecutor<
	MangasVariables,
	MangasConnection
>({
	root: "mangas",
	gqlTypes: mangasGQLTypes,
	name: "mangas",
});

export default mangas;
