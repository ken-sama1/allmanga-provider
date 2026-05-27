import type {
	ChaptersConnection,
	ChaptersConnectionArguments,
	GQLTypes,
} from "../types";
import type { OptionalExcept } from "../types/common.type";
import {
	createGQLExecutor,
	type GQLExecutor,
} from "./utils/createGQLExecutor.js";

type ChaptersForReadVariables = OptionalExcept<
	ChaptersConnectionArguments,
	"mangaId" | "translationType" | "chapterString"
>;

export type ChaptersForReadQueryExecutor = GQLExecutor<
	ChaptersForReadVariables,
	ChaptersConnection
>;

const chaptersForReadGQLTypes = new Map<
	keyof ChaptersForReadVariables,
	GQLTypes
>([
	["mangaId", "String!"],
	["translationType", "VaildTranslationTypeMangaEnumType!"],
	["chapterString", "String!"],
	["page", "Int"],
	["limit", "Int"],
	["offset", "Int"],
	["queryAt", "String"],
	["search", "SearchInput"],
]);

const chaptersForRead: ChaptersForReadQueryExecutor = createGQLExecutor<
	ChaptersForReadVariables,
	ChaptersConnection
>({
	root: "chaptersForRead",
	gqlTypes: chaptersForReadGQLTypes,
	name: "chapters_for_read",
});

export default chaptersForRead;
