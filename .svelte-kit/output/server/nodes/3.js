import * as server from '../entries/pages/pieces/_slug_/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/pieces/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/pieces/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.CS3YIKnO.js","_app/immutable/chunks/RlmJM96O.js","_app/immutable/chunks/CKfYcjDY.js","_app/immutable/chunks/MzKkzMKI.js","_app/immutable/chunks/fgVXtmWi.js","_app/immutable/chunks/VPmbUtWU.js","_app/immutable/chunks/B6w811fr.js"];
export const stylesheets = ["_app/immutable/assets/3.Dae6jyOt.css"];
export const fonts = [];
