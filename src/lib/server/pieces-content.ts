import YAML from 'yaml';

export type PieceEntry = {
	title: string;
	description?: string;
	category: string;
	price?: number;
	dimensions?: string;
	clay?: string;
	glaze?: string;
	fired?: string;
	available?: boolean;
	featured?: boolean;
	images?: string[];
};

export type PieceRecord = {
	slug: string;
	entry: PieceEntry;
};

function getPieceModules(): Record<string, string> {
	return import.meta.glob('/static/content/pieces/*/index.yaml', {
		eager: true,
		import: 'default',
		query: '?raw'
	}) as Record<string, string>;
}

function getSlugFromPath(path: string): string | null {
	const match = path.match(/\/pieces\/([^/]+)\/index\.yaml$/);
	return match?.[1] ?? null;
}

function parsePiece(rawYaml: string): PieceEntry {
	const parsed = (YAML.parse(rawYaml) ?? {}) as PieceEntry;
	return {
		title: parsed.title,
		description: parsed.description,
		category: parsed.category ?? 'other',
		price: parsed.price,
		dimensions: parsed.dimensions,
		clay: parsed.clay,
		glaze: parsed.glaze,
		fired: parsed.fired,
		available: parsed.available ?? false,
		featured: parsed.featured ?? false,
		images: Array.isArray(parsed.images) ? parsed.images : []
	};
}

export function loadAllPiecesFromBundledContent(): PieceRecord[] {
	const modules = getPieceModules();
	const pieces = Object.entries(modules)
		.map(([path, content]) => {
			const slug = getSlugFromPath(path);
			if (!slug) {
				return null;
			}

			return {
				slug,
				entry: parsePiece(content)
			};
		})
		.filter((piece): piece is PieceRecord => piece !== null);

	if (pieces.length === 0) {
		console.error(
			'[pieces loader] No bundled piece content found. Expected files matching /static/content/pieces/*/index.yaml.'
		);
	}

	return pieces;
}

export function loadPieceBySlugFromBundledContent(slug: string): PieceEntry | null {
	const piece = loadAllPiecesFromBundledContent().find((item) => item.slug === slug);
	return piece?.entry ?? null;
}
