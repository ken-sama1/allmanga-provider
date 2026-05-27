import type { GQLTypes, MediaWithIdsArguments, Show } from "../types";
import type { OptionalExcept } from "../types/common.type";
import {
	createGQLExecutor,
	type GQLExecutor,
} from "./utils/createGQLExecutor.js";

type ShowsWithIdsVariables = OptionalExcept<MediaWithIdsArguments, "ids">;

const showWithdIdsGQLtypes = new Map<keyof ShowsWithIdsVariables, GQLTypes>([
	["ids", "[String!]!"],
	["search", "SearchInput"],
]);

export type ShowsWithIdsQueryExecutor = GQLExecutor<
	ShowsWithIdsVariables,
	Show[]
>;

const showsWithIds: ShowsWithIdsQueryExecutor = createGQLExecutor<
	ShowsWithIdsVariables,
	Show[]
>({
	root: "showsWithIds",
	gqlTypes: showWithdIdsGQLtypes,
	name: "shows_with_ids",
});

export default showsWithIds;
