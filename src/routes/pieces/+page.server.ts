import { createGitHubReader } from '@keystatic/core/reader/github';
import keystaticConfig from '../../../keystatic.config';
import { isSnipcartEnabled } from '../../lib/server/feature-flags';

export async function load() {
  const reader = createGitHubReader(keystaticConfig, {
    repo: 'gordody/mercedheightspottery',
    ref: process.env.VERCEL_GIT_COMMIT_REF ?? process.env.KEYSTATIC_CONTENT_REF,
    token: process.env.GITHUB_TOKEN ?? process.env.KEYSTATIC_GITHUB_READER_TOKEN
  });
  const pieces = await reader.collections.pieces.all();
  const enableSnipcart = isSnipcartEnabled();
  return { pieces, enableSnipcart };
}
