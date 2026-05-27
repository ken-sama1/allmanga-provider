import { isAxiosError, type InternalAxiosRequestConfig } from "axios";
import {
	allmangaAPI,
	allmangaURL,
	type AllMangaGQLError,
	type AllMangaResponse,
} from "../../api/allmangaAPI.js";
import type {
	DefaultValue,
	PickProjection,
	Projection,
	OptionalExcept,
	Simplify,
} from "../../types/common.type";
import type { GQLTypes } from "../../types/";
import { buildQuery, type QueryRoot } from "./buildQuery.js";
import { decodeToBeParsed } from "./decodeToBeParsed.js";

type GQLObject = Record<string, unknown>;

/**
 *  The base data entity from GraphQL schema layout (e.g., Manga, Show)
 * */
type SchemaModel = GQLObject | Array<GQLObject>;

/**
 * CreateGQLExecutor configs.
 */
type Config<TVars extends GQLObject> = {
	/** Query root field*/
	root: QueryRoot;
	/** An identifier, used on logging.*/
	name?: string;
	/**
	 * The map of arguments paired with their corresponding type in GQL.
	 * @example [["id", "String!"], ["search", "SearchInput"]]
	 * */
	gqlTypes: Map<keyof TVars, GQLTypes>;
	logRequestsInfo?: boolean;
};

/**
 * Calculates the exact shape of the returned dataset
 */
type ResolvedSelection<
	TModel extends SchemaModel,
	TSelection extends GQLObject,
> = Simplify<
	PickProjection<TModel, TSelection & DefaultValue<TSelection, "__typename", 1>> //Add a default value for __typename
>;

/**
 * The structured response.
 */
type QueryResponse<
	TModel extends SchemaModel,
	TSelection extends GQLObject,
> = Promise<AllMangaResponse<ResolvedSelection<TModel, TSelection>>>;

/**
 * Wrapped Projection to OptionalExcept so lsp would display the general name instead of raw properties.
 * Not sure if it works on other IDE, it works mine why would I care about others?
 */
type QueryProjection<T extends SchemaModel> = OptionalExcept<Projection<T>>;

/**
 *  The type for the function where the return fields are selected.
 */
type QuerySelectionStage<TModel extends SchemaModel> = <
	TSelection extends QueryProjection<TModel>,
>(
	selection: TSelection,
) => QueryResponse<TModel, TSelection>;

/**
 *  The type for the function where the query variables are passed.
 * */
type QueryVariableStage<TVars extends GQLObject, TModel extends SchemaModel> = (
	variables: TVars,
) => {
	get: QuerySelectionStage<TModel>;
};

/**
 * GQL executor instance.
 * `TVars` The type for variables.
 * `TModel` The SchemaModel.
 * */
export type GQLExecutor<
	TVars extends GQLObject,
	TModel extends SchemaModel,
> = QueryVariableStage<TVars, TModel> & {
	/**
	 * Holds the type blueprint for this endpoint's selection schema.
	 * * @note This property is type-only and undefined at runtime.
	 * @example
	 * type MyFields = typeof allmanga.show.projection;
	 */
	readonly projection: Simplify<QueryProjection<TModel>>;
};

type CreateGQLExecutor = <TVars extends GQLObject, TModel extends SchemaModel>(
	config: Config<TVars>,
) => GQLExecutor<TVars, TModel>;

export const createGQLExecutor: CreateGQLExecutor = <
	TVars extends GQLObject,
	TModel extends SchemaModel,
>(
	config: Config<TVars>,
) => {
	const variableStage: QueryVariableStage<TVars, TModel> = (
		variables: TVars,
	) => {
		type CurrentProjection = QueryProjection<TModel>;

		const get: QuerySelectionStage<TModel> = async <
			TSelection extends CurrentProjection,
		>(
			selection: TSelection,
		): QueryResponse<TModel, TSelection> => {
			const query = buildQuery<
				TVars,
				Map<keyof TVars, GQLTypes>,
				CurrentProjection
			>({
				root: config.root,
				types: config.gqlTypes,
				variables,
				selection: {
					//default value on __typename
					__typename: 1,
					...selection,
				},
			});

			type ResponseData = {
				[K in QueryRoot]: ResolvedSelection<TModel, TSelection>;
			};

			type EncryptedResponse = {
				_m: string;
				tobeparsed: string;
			};

			const isEncrypted = (data: unknown): data is EncryptedResponse => {
				return (
					data !== null && typeof data === "object" && "tobeparsed" in data
				);
			};

			const isResponseData = (data: unknown): data is ResponseData => {
				return data !== null && typeof data === "object" && config.root in data;
			};

			try {
				const response = await allmangaAPI.post<{
					data?: unknown;
					errors?: AllMangaGQLError[];
				}>(
					allmangaURL,
					{
						query,
						variables,
					},
					//Just used it for logging.
					{
						metadata: {
							name: config.name ?? "default_gql_executor",
						},
					} as unknown as InternalAxiosRequestConfig,
				);

				const responseData = response.data;

				if (responseData.data === null) {
					if (responseData.errors?.length)
						return {
							status: "gql-error",
							errors: responseData.errors,
						};

					throw new Error(
						"API returned an empty data payload without explicit errors.",
					);
				}

				let result: unknown;

				if (isEncrypted(responseData.data)) {
					const decryptedData: unknown = JSON.parse(
						decodeToBeParsed(responseData.data.tobeparsed),
					);

					result = decryptedData;
				} else {
					result = responseData.data;
				}

				if (!isResponseData(result)) throw new Error("Invalid response data.");

				if (responseData.errors?.length)
					return {
						status: "partial",
						data: result[config.root],
						errors: responseData.errors,
					};

				return {
					status: "success",
					data: result[config.root],
				};
			} catch (error: unknown) {
				if (isAxiosError<{ errors?: AllMangaGQLError[] }>(error)) {
					if (error.response?.data?.errors?.length) {
						return {
							status: "gql-error",
							errors: error.response.data.errors,
						};
					}
				}

				const isObject = typeof error === "object" && error !== null;

				const message =
					error instanceof Error
						? error.message
						: isObject && "message" in error
							? String((error as { message: unknown }).message)
							: "Unknown error";

				const status =
					isObject && "status" in error
						? Number((error as { status: unknown }).status)
						: 400;

				return {
					status: "error",
					error: {
						status,
						message,
					},
				};
			}
		};

		return {
			get,
		};
	};

	return variableStage as unknown as GQLExecutor<TVars, TModel>;
};
