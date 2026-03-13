import { createGitHubReader } from '@keystatic/core/reader/github';
import keystaticConfig from '../../../../keystatic.config';
import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { slug: string } }) {
  const reader = createGitHubReader(keystaticConfig, {
    repo: 'gordody/mercedheightspottery',
    ref: process.env.VERCEL_GIT_COMMIT_REF ?? process.env.KEYSTATIC_CONTENT_REF,
    token: process.env.GITHUB_TOKEN ?? process.env.KEYSTATIC_GITHUB_READER_TOKEN
  });
  const piece = await reader.collections.pieces.read(params.slug);

  if (!piece) {
    throw error(404, 'Piece not found');
  }

  return { piece, slug: params.slug };
}