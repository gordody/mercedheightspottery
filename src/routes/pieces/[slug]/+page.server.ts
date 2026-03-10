import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../../keystatic.config';
import { error } from '@sveltejs/kit';
import { existsSync } from 'fs';
import { join } from 'path';

export async function load({ params }: { params: { slug: string } }) {
  const contentDir = join(process.cwd(), 'static/content/pieces');
  if (!existsSync(contentDir)) {
    console.error(
      '[piece loader] Content directory missing. Keystatic local storage may not be bundled in this environment.',
      { cwd: process.cwd(), expectedPath: contentDir }
    );
  }

  const reader = createReader(process.cwd(), keystaticConfig);
  const piece = await reader.collections.pieces.read(params.slug);
  
  if (!piece) {
    throw error(404, 'Piece not found');
  }

  return { piece, slug: params.slug };
}