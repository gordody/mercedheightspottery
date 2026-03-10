import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../../keystatic.config';
import { error } from '@sveltejs/kit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export async function load({ params }: { params: { slug: string } }) {
  // Resolve root directory from current module URL to work on both local and Vercel
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFile);
  // Navigate from src/routes/pieces/[slug] to root: ../../../../
  const rootDir = join(currentDir, '../../../../');

  const reader = createReader(rootDir, keystaticConfig);
  const piece = await reader.collections.pieces.read(params.slug);
  
  if (!piece) {
    throw error(404, 'Piece not found');
  }

  return { piece, slug: params.slug };
}