import { error } from '@sveltejs/kit';
import { loadPieceBySlugFromBundledContent } from '$lib/server/pieces-content';

export async function load({ params }: { params: { slug: string } }) {
  const piece = loadPieceBySlugFromBundledContent(params.slug);
  
  if (!piece) {
    throw error(404, 'Piece not found');
  }

  return { piece, slug: params.slug };
}