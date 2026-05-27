import type {
	GQLTypes,
	ShowsConnection,
	ShowsConnectionArguments,
} from "../types/";
import type {
	DeepPartial,
	RequireOne,
	Simplify,
} from "../types/common.type.js";
import {
	createGQLExecutor,
	type GQLExecutor,
} from "./utils/createGQLExecutor.js";

type ShowsVariables = Simplify<
	RequireOne<DeepPartial<ShowsConnectionArguments>>
>;

export type ShowsQueryExecutor = GQLExecutor<ShowsVariables, ShowsConnection>;

const showsGQLTypes = new Map<keyof ShowsVariables, GQLTypes>([
	["search", "SearchInput"],
	["page", "Int"],
	["offset", "Int"],
	["limit", "Int"],
	["translationType", "VaildTranslationTypeEnumType"],
	["countryOrigin", "VaildCountryOriginEnumType"],
]);

const shows: ShowsQueryExecutor = createGQLExecutor<
	ShowsVariables,
	ShowsConnection
>({
	root: "shows",
	name: "shows",
	gqlTypes: showsGQLTypes,
});

export default shows;
