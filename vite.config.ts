import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { keystatic } from 'keystatic-sveltekit'

export default defineConfig({
  // Register the keystatic plugin before SvelteKit
  plugins: [keystatic(), sveltekit()],
  // temp fix for https://github.com/Thinkmill/keystatic/issues/366
  // see https://github.com/Greenheart/keystatic-sveltekit?tab=readme-ov-file
  server: {
    host: "127.0.0.1"
  } 
})