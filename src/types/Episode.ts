import type { Evaluate } from "./common.type";
import type { SearchInput } from "./SearchInput";
import type { ValidTranslationTypeEnumType } from "./ValidTranslationTypeEnumType";
import type { SchemaModelEpisode } from "./schemas/SchemaModelEpisode";

export type EpisodeArguments = {
	readonly showId: string;
	readonly episodeString: string;
	readonly translationType: ValidTranslationTypeEnumType;
	readonly queryAt: string;
	readonly search: SearchInput;
};

/**
 * Type copy of `SchemaModelEpisode`
 */
export type Episode = Evaluate<SchemaModelEpisode>;
