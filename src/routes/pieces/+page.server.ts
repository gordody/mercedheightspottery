import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';

export async function load() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const pieces = await reader.collections.pieces.all();
  const firstPiece = (pieces && pieces.length && pieces.length > 0) ? pieces[0] : null;
  const firstEntry = firstPiece ? firstPiece.entry : null;
  const firstImages = firstEntry ? firstEntry.images : [];

  console.log("Loaded pieces:", process.cwd(), pieces, firstPiece, firstEntry, firstImages.join(", "));
  return { pieces };
}