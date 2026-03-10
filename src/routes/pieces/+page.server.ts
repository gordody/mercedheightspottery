import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import { existsSync } from 'fs';
import { join } from 'path';

export async function load() {
  const contentDir = join(process.cwd(), 'static/content/pieces');
  if (!existsSync(contentDir)) {
    console.error(
      '[pieces loader] Content directory missing. Keystatic local storage may not be bundled in this environment.',
      { cwd: process.cwd(), expectedPath: contentDir }
    );
  }

  const reader = createReader(process.cwd(), keystaticConfig);
  const pieces = await reader.collections.pieces.all();

  return { pieces };
}
