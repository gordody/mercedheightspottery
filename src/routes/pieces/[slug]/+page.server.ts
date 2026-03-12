import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../../keystatic.config';
import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { slug: string } }) {
  const reader = createReader(process.cwd(), keystaticConfig);
  const piece = await reader.collections.pieces.read(params.slug);

  if (!piece) {
    throw error(404, 'Piece not found');
  }

  return { piece, slug: params.slug };
}