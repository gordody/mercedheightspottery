import { loadAllPiecesFromBundledContent } from '$lib/server/pieces-content';

export async function load() {
  const pieces = loadAllPiecesFromBundledContent();

  return { pieces };
}
