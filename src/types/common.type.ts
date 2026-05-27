type IsObjectOrArray<T extends object> = T extends
	| Record<string, unknown>
	| Array<unknown>
	? true
	: false;

/** Removes properties from `T` whose values match `V` (Defaults to `null`). */
export type RemovePropsWithValue<
	T extends Record<string, unknown>,
	V = null,
> = {
	[K in keyof T as T[K] extends V ? never : K]: T[K] extends Record<
		string,
		unknown
	>
		? RemovePropsWithValue<T[K], V>
		: T[K];
};

/** Add a default value `V` to the specified key `K` in object `T`*/
export type DefaultValue<T, K extends string, V> = {
	__typename: K extends keyof T ? T[K] : V;
};

/**
 * Creates a recursive projection shape from `T`.
 * Primitives map to `V` (Default: `0 | 1`), while objects/arrays recurse.
 */
export type Projection<T, V = 0 | 1> = T extends unknown[]
	? Projection<T[number]>
	: {
			-readonly [K in keyof T]?: T[K] extends (infer U)[]
				? U extends object
					? Projection<U>
					: V
				: T[K] extends object
					? Projection<T[K]>
					: V;
		} & { __typename?: V };

/** Recursively picks fields from `T` matching the truthy shape of projection `P`. */
export type PickProjection<
	T extends object,
	P extends Record<string, unknown>,
> = Simplify<
	IsObjectOrArray<T> extends true
		? T extends Array<unknown>
			? T[number] extends object
				? PickProjection<T[number], P>[]
				: T
			: {
					[K in keyof RemovePropsWithValue<P, 0> &
						keyof T]?: T[K] extends object
						? P[K] extends Record<string, unknown>
							? PickProjection<T[K], P[K]>
							: never
						: T[K];
				} & RemovePropsWithValue<
					{
						__typename: P["__typename"] extends 1 ? string : never;
					},
					never
				>
		: never
>;

/** Enforces that at least one key from `Keys` must be present in `T`. */
export type RequireOne<T, Keys extends keyof T = keyof T> = Omit<T, Keys> &
	{
		[K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
	}[Keys];

/** Recursively makes all properties of a type optional, preserving arrays. */
export type DeepPartial<T> = Simplify<{
	-readonly [K in keyof T]?: T[K] extends object
		? T[K] extends unknown[]
			? DeepPartial<T[K][number]>[]
			: DeepPartial<T[K]>
		: T[K];
}>;

/** Makes all properties deeply optional except for specified keys in `P`. */
export type OptionalExcept<T, P extends string | null = null> = {
	[K in keyof T & P]: T[K];
} & DeepPartial<T>;

/** Hide Abstraction*/
export type Simplify<T> = {
	[K in keyof T]: T[K];
} & {};

/** Create a type copy of an interface*/
export type Evaluate<T> = {
	[K in keyof T]: T[K];
};
