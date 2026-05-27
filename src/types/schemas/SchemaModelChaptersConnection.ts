import type { Chapter } from "../Chapter";
import type { Manga } from "../Manga";
import type { PageInfo } from "../PageInfo";
/**
 * Base schema model of `ChaptersConnection`
 */
export interface SchemaModelChaptersConnection {
	readonly edges: Chapter[];
	readonly manga: Manga;
	readonly pageInfo: PageInfo;
	// readonly pageStatus: PageStatus;
}
