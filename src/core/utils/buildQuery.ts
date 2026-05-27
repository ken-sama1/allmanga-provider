export type QueryRoot =
	| "manga"
	| "mangas"
	| "mangasWithIds"
	| "chaptersForRead"
	| "show"
	| "shows"
	| "showsWithIds"
	| "episode"
	| "episodeInfos";

const buildSelectionSet = <TSelection extends object>(
	selection: TSelection,
	indentLevel = 1,
): string => {
	const indent = "  ";
	const newLineWithIndent = `"\n" ${indent.repeat(indentLevel)}`;

	const selectionSet = Object.entries(selection)
		.map(([k, v]) => {
			if (!v) return null;

			if (typeof v === "object") {
				const nestedIndentLevel = indentLevel + 1;
				return `${k} ${buildSelectionSet(v, nestedIndentLevel)}`;
			}

			return k;
		})
		.filter((v) => v !== null);

	const selectionSetString = selectionSet.join(newLineWithIndent);

	return `{${newLineWithIndent}${selectionSetString}\n${indentLevel > 1 ? indent.repeat(indentLevel - 1) : ""} }`.replace(
		/["]/g,
		"",
	);
};

type VariableDefinition = {
	definitionString: string;
	variableString: string;
};

const buildVariableDefinition = <
	TVars extends Record<string, unknown>,
	TTypes extends Map<keyof TVars, unknown>,
>(
	variables: TVars,
	types: TTypes,
): VariableDefinition => {
	const keysWithType: string[] = [];
	const definitions = Object.keys(variables)
		.map((k) => {
			const propType = types.get(k);

			if (!propType) return null;

			keysWithType.push(k);

			return `$${k}: ${propType}`;
		})
		.filter((v) => v !== null);

	const definitionString = `(${definitions.join(", ")})`;
	const variableString = `(${keysWithType
		.map((k) => {
			return `${k}: $${k}`;
		})
		.join(", ")})`;

	return {
		definitionString,
		variableString,
	};
};

export const buildQuery = <
	TVars extends Record<string, unknown>,
	TTypes extends Map<keyof TVars, string>,
	TSelection extends Record<string, unknown>,
>(args: {
	root: QueryRoot;
	types: TTypes;
	selection: TSelection;
	variables: TVars;
}): string => {
	const { definitionString, variableString } = buildVariableDefinition(
		args.variables,
		args.types,
	);

	const selectionSetString = buildSelectionSet(args.selection, 2);
	const query = `query ${definitionString} {\n  ${args.root} ${variableString} ${selectionSetString}\n}`;

	return query;
};
