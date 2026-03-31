import { createGitHubReader } from '@keystatic/core/reader/github';
import keystaticConfig from '../../../../keystatic.config';
import { error } from '@sveltejs/kit';
import { isSnipcartEnabled } from '$lib/server/feature-flags';
import { env } from '$env/dynamic/private';

export async function load({ params }: { params: { slug: string } }) {
  const reader = createGitHubReader(keystaticConfig, {
    repo: 'gordody/mercedheightspottery',
    ref: env.VERCEL_GIT_COMMIT_REF ?? env.KEYSTATIC_CONTENT_REF ?? 'master',
    token: env.GITHUB_TOKEN ?? env.KEYSTATIC_GITHUB_READER_TOKEN ?? ''
  });
  const piece = await reader.collections.pieces.read(params.slug);
  const enableSnipcart = isSnipcartEnabled();

  if (!piece) {
    throw error(404, 'Piece not found');
  }

  return { piece, slug: params.slug, enableSnipcart };
}