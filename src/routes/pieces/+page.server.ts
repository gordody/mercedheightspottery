import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';

export async function load() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const pieces = await reader.collections.pieces.all();
  console.log("Loaded pieces:", process.cwd(), pieces[0].entry.images.join(", "));
  return { pieces };
}