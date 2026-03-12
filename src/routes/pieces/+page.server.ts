import YAML from 'yaml';

type PieceEntry = {
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

type PieceRecord = {
  slug: string;
  entry: PieceEntry;
};

function loadAllPiecesFromBundledContent(): PieceRecord[] {
  const modules = import.meta.glob('/static/content/pieces/*/index.yaml', {
    eager: true,
    import: 'default',
    query: '?raw'
  }) as Record<string, string>;

  const pieces = Object.entries(modules)
    .map(([path, content]) => {
      const slug = path.match(/\/pieces\/([^/]+)\/index\.yaml$/)?.[1];
      if (!slug) return null;

      const parsed = (YAML.parse(content) ?? {}) as PieceEntry;
      return {
        slug,
        entry: {
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
        }
      };
    })
    .filter((piece): piece is PieceRecord => piece !== null);

  if (pieces.length === 0) {
    console.error('[pieces loader] No bundled content found at /static/content/pieces/*/index.yaml');
  }

  return pieces;
}

export async function load() {
  const pieces = loadAllPiecesFromBundledContent();

  return { pieces };
}
