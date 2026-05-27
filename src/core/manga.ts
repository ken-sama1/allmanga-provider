import type { Manga, MangaArguments } from "../types";
import type { GQLTypes } from "../types/";
import type { OptionalExcept } from "../types/common.type";
import {
	createGQLExecutor,
	type GQLExecutor,
} from "./utils/createGQLExecutor.js";

type MangaVariables = OptionalExcept<MangaArguments, "_id">;

export type MangaQueryExecutor = GQLExecutor<MangaVariables, Manga>;

const mangaGQLTypes = new Map<keyof MangaVariables, GQLTypes>([
	["_id", "String!"],
	["search", "SearchInput"],
]);

const manga: MangaQueryExecutor = createGQLExecutor<MangaVariables, Manga>({
	gqlTypes: mangaGQLTypes,
	name: "manga",
	root: "manga",
});

export default manga;
