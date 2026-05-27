module.exports = {
	entries: [
		{
			filePath: "./src/allmanga.ts",
			outFile: "./dist/allmanga.d.ts",
			output: {
				exportReferencedTypes: false, // Prevents internal types from leaking
			},
		},
	],
};
