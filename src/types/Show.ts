import type { Evaluate } from "./common.type";
import type { SchemaModelShow } from "./schemas/SchemaModelShow";
import type { SearchInput } from "./SearchInput";

export type ShowArguments = {
	readonly _id: string;
	readonly queryAt: string;
	readonly search: SearchInput;
};

/**
 * Type copy of `SchemaModelShow`
 * */
export type Show = Evaluate<SchemaModelShow>;
