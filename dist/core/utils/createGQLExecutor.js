import { isAxiosError } from "axios";
import { allmangaAPI, allmangaURL, } from "../../api/allmangaAPI.js";
import { buildQuery } from "./buildQuery.js";
import { decodeToBeParsed } from "./decodeToBeParsed.js";
export const createGQLExecutor = (config) => {
    const variableStage = (variables) => {
        const get = async (selection) => {
            const query = buildQuery({
                root: config.root,
                types: config.gqlTypes,
                variables,
                selection: {
                    //default value on __typename
                    __typename: 1,
                    ...selection,
                },
            });
            const isEncrypted = (data) => {
                return (data !== null && typeof data === "object" && "tobeparsed" in data);
            };
            const isResponseData = (data) => {
                return data !== null && typeof data === "object" && config.root in data;
            };
            try {
                const response = await allmangaAPI.post(allmangaURL, {
                    query,
                    variables,
                }, 
                //Just used it for logging.
                {
                    metadata: {
                        name: config.name ?? "default_gql_executor",
                    },
                });
                const responseData = response.data;
                if (responseData.data === null) {
                    if (responseData.errors?.length)
                        return {
                            status: "gql-error",
                            errors: responseData.errors,
                        };
                    throw new Error("API returned an empty data payload without explicit errors.");
                }
                let result;
                if (isEncrypted(responseData.data)) {
                    const decryptedData = JSON.parse(decodeToBeParsed(responseData.data.tobeparsed));
                    result = decryptedData;
                }
                else {
                    result = responseData.data;
                }
                if (!isResponseData(result))
                    throw new Error("Invalid response data.");
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
            }
            catch (error) {
                if (isAxiosError(error)) {
                    if (error.response?.data?.errors?.length) {
                        return {
                            status: "gql-error",
                            errors: error.response.data.errors,
                        };
                    }
                }
                const isObject = typeof error === "object" && error !== null;
                const message = error instanceof Error
                    ? error.message
                    : isObject && "message" in error
                        ? String(error.message)
                        : "Unknown error";
                const status = isObject && "status" in error
                    ? Number(error.status)
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
    return variableStage;
};
