// src/hooks.server.ts
import { type Handle } from '@sveltejs/kit'
import { handleKeystatic } from 'keystatic-sveltekit'
import config from '../keystatic.config'

const hasKeystatic =
	!!process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
	!!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
	!!process.env.KEYSTATIC_SECRET

let keystaticHandle: Handle | undefined

if (hasKeystatic) {
	keystaticHandle = await handleKeystatic({ config })
}

export const handle: Handle = keystaticHandle ?? (({ event, resolve }) => resolve(event))