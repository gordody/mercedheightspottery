// src/hooks.server.ts
import { type Handle } from '@sveltejs/kit'
import { handleKeystatic } from 'keystatic-sveltekit'
import config from '../keystatic.config.ts'

const keystaticHandle = await handleKeystatic({ config })

export const handle: Handle = keystaticHandle