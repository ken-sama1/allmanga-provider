import type { PageInfo } from "../PageInfo";
import type { Show } from "../Show";

/**
 *  Base schema model of `ShowsConnection`
 * */
export interface SchemaModelShowsConnection {
	readonly edges: Show[];
	readonly pageInfo: PageInfo;
}
