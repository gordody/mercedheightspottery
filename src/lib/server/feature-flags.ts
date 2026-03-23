import { dev } from '$app/environment';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function normalizeBoolean(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === 'true';
}

function readFromEnvFile(fileName: string): string | undefined {
  try {
    const envPath = join(process.cwd(), fileName);
    const content = readFileSync(envPath, 'utf8');

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      const equalsAt = trimmed.indexOf('=');
      if (equalsAt <= 0) {
        continue;
      }

      const key = trimmed.slice(0, equalsAt).trim();
      if (key !== 'ENABLE_SNIPCART') {
        continue;
      }

      const rawValue = trimmed.slice(equalsAt + 1).trim();
      const noComment = rawValue.split('#')[0]?.trim();

      if (!noComment) {
        return undefined;
      }

      if ((noComment.startsWith('"') && noComment.endsWith('"')) || (noComment.startsWith("'") && noComment.endsWith("'"))) {
        return noComment.slice(1, -1);
      }

      return noComment;
    }
  } catch {
    // Ignore missing env files.
  }

  return undefined;
}

export function isSnipcartEnabled(): boolean {
  if (dev) {
    // In development, prefer .env.local/.env so local config wins over exported shell vars.
    const localValue = readFromEnvFile('.env.local');
    if (localValue !== undefined) {
      return normalizeBoolean(localValue);
    }

    const envValue = readFromEnvFile('.env');
    if (envValue !== undefined) {
      return normalizeBoolean(envValue);
    }
  }

  return normalizeBoolean(process.env.ENABLE_SNIPCART);
}
