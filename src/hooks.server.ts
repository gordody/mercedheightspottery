// src/hooks.server.ts
import { type Handle } from '@sveltejs/kit'

const hasKeystatic =
	!!import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID &&
	!!import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
	!!import.meta.env.KEYSTATIC_SECRET

let keystaticHandle: Handle | undefined

if (hasKeystatic) {
	const { handleKeystatic } = await import('keystatic-sveltekit')
	const { default: config } = await import('../keystatic.config')
	keystaticHandle = await handleKeystatic({ config })
}

export const handle: Handle = keystaticHandle ?? (({ event, resolve }) => resolve(event))