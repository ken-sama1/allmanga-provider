import type { Manga, MediaWithIdsArguments } from "../types";
import type { OptionalExcept } from "../types/common.type";
import type { GQLTypes } from "../types/";
import {
	createGQLExecutor,
	type GQLExecutor,
} from "./utils/createGQLExecutor.js";

type MangasWithdIdsVariables = OptionalExcept<MediaWithIdsArguments, "ids">;

const mangasWithIdsGQLTypes = new Map<keyof MediaWithIdsArguments, GQLTypes>([
	["ids", "[String!]!"],
	["search", "SearchInput"],
]);

export type MangasWithdIdsQueryExecutor = GQLExecutor<
	MangasWithdIdsVariables,
	Manga[]
>;

const mangasWithIds: MangasWithdIdsQueryExecutor = createGQLExecutor<
	MangasWithdIdsVariables,
	Manga[]
>({
	root: "mangasWithIds",
	gqlTypes: mangasWithIdsGQLTypes,
	name: "mangas_with_ids",
});

export default mangasWithIds;
