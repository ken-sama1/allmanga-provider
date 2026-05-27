import type { Manga } from "../Manga";
import type { PageInfo } from "../PageInfo";

/**
 *  Base schema model `MangasConnection`
 * */
export interface SchemaModelMangasConnection {
	readonly edges: Manga[];
	readonly pageInfo: PageInfo;
}
