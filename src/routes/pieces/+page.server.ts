import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';

export async function load() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const pieces = await reader.collections.pieces.all();

  return { pieces };
}
