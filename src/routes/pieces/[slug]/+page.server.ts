import { error } from '@sveltejs/kit';
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

function loadPieceBySlugFromBundledContent(slug: string): PieceEntry | null {
  const modules = import.meta.glob('/static/content/pieces/*/index.yaml', {
    eager: true,
    import: 'default',
    query: '?raw'
  }) as Record<string, string>;

  for (const [path, content] of Object.entries(modules)) {
    const pathSlug = path.match(/\/pieces\/([^/]+)\/index\.yaml$/)?.[1];
    if (pathSlug !== slug) continue;

    const parsed = (YAML.parse(content) ?? {}) as PieceEntry;
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

  console.error('[piece loader] No bundled content found for slug', {
    slug,
    pattern: '/static/content/pieces/*/index.yaml'
  });
  return null;
}

export async function load({ params }: { params: { slug: string } }) {
  const piece = loadPieceBySlugFromBundledContent(params.slug);
  
  if (!piece) {
    throw error(404, 'Piece not found');
  }

  return { piece, slug: params.slug };
}