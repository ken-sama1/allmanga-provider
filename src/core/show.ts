import type { GQLTypes } from "../types";
import type { OptionalExcept } from "../types/common.type";
import type { Show, ShowArguments } from "../types/Show";
import {
	createGQLExecutor,
	type GQLExecutor,
} from "./utils/createGQLExecutor.js";

type ShowVariables = OptionalExcept<ShowArguments, "_id">;

const showGQLTypes = new Map<keyof ShowVariables, GQLTypes>([
	["_id", "String!"],
	["queryAt", "String"],
	["search", "SearchInput"],
]);

export type ShowQueryExecutor = GQLExecutor<ShowVariables, Show>;

const show: ShowQueryExecutor = createGQLExecutor<ShowVariables, Show>({
	root: "show",
	gqlTypes: showGQLTypes,
	name: "show",
});

export default show;
