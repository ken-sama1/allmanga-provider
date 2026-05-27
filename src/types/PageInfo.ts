export type PageInfo = {
	readonly hasNextPage: boolean;
	readonly hasPrevPage: boolean;
	readonly limit: number;
	readonly nextPage: number;
	readonly offset: number;
	readonly page: number;
	readonly prevPage: number;
	readonly total: number;
	readonly totalPages: number;
};
