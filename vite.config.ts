import { defineConfig, loadEnv } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { keystatic } from 'keystatic-sveltekit'

export default defineConfig(({ mode }) => {
  // Load .env vars into process.env so keystatic-sveltekit and
  // @keystatic/core (which read process.env) can find them
  const envVars = loadEnv(mode, process.cwd(), '')
  for (const [key, value] of Object.entries(envVars)) {
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }

  return {
    plugins: [keystatic(), sveltekit()],
    server: {
      host: "127.0.0.1"
    }
  }
})