// src/hooks.server.ts
import { type Handle } from '@sveltejs/kit'
import { handleKeystatic } from 'keystatic-sveltekit'
import { access, cp, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import config from '../keystatic.config'

async function ensureKeystaticAssets() {
	if (process.env.NODE_ENV === 'development') return

	const projectRoot = process.cwd()
	const runtimeClientDir = resolve(projectRoot, '.svelte-kit/output/client')
	const runtimeCmsHtml = resolve(runtimeClientDir, 'keystatic.html')

	try {
		await access(runtimeCmsHtml)
		return
	} catch {
		// No-op: we'll try to hydrate from known source locations below.
	}

	const sourceDirs = [
		resolve(projectRoot, '.svelte-kit/keystatic'),
		resolve(projectRoot, 'build/client')
	]

	for (const sourceDir of sourceDirs) {
		try {
			await access(resolve(sourceDir, 'keystatic.html'))
			await mkdir(runtimeClientDir, { recursive: true })
			await cp(sourceDir, runtimeClientDir, { recursive: true, force: true })
			return
		} catch {
			// Try next source directory.
		}
	}
}

await ensureKeystaticAssets()
const keystaticHandle = await handleKeystatic({ config })

export const handle: Handle = keystaticHandle