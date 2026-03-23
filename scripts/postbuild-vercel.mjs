/**
 * Post-build script: copies keystatic CMS assets (.svelte-kit/keystatic/) into
 * every Vercel serverless function bundle so that keystatic-sveltekit can find
 * keystatic.html at runtime under .svelte-kit/output/client/.
 *
 * adapter-vercel does not support an includeFiles option in v6, so these files
 * must be injected manually after the adapter creates .vercel/output/.
 */

import { cp, mkdir, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, join } from 'node:path'

const cwd = process.cwd()
const source = resolve(cwd, '.svelte-kit/keystatic')

if (!existsSync(source)) {
  console.log('postbuild-vercel: .svelte-kit/keystatic not found, skipping.')
  process.exit(0)
}

const functionsDir = resolve(cwd, '.vercel/output/functions')

if (!existsSync(functionsDir)) {
  console.log('postbuild-vercel: .vercel/output/functions not found, skipping.')
  process.exit(0)
}

async function findFuncDirs(dir) {
  const results = []
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      const fullPath = join(dir, entry.name)
      if (entry.name.endsWith('.func')) {
        results.push(fullPath)
      } else {
        results.push(...(await findFuncDirs(fullPath)))
      }
    }
  } catch {
    // Ignore unreadable dirs
  }
  return results
}

const funcDirs = await findFuncDirs(functionsDir)
console.log(`postbuild-vercel: found ${funcDirs.length} function(s)`)

for (const funcDir of funcDirs) {
  const dest = resolve(funcDir, '.svelte-kit/output/client')
  await mkdir(dest, { recursive: true })
  await cp(source, dest, { recursive: true, force: true })
  console.log(`postbuild-vercel: keystatic assets → ${dest}`)
}
