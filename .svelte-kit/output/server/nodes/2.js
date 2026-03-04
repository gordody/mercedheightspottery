import * as server from '../entries/pages/pieces/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/pieces/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/pieces/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.yeF0VFNm.js","_app/immutable/chunks/RlmJM96O.js","_app/immutable/chunks/CKfYcjDY.js","_app/immutable/chunks/MzKkzMKI.js","_app/immutable/chunks/fgVXtmWi.js","_app/immutable/chunks/VPmbUtWU.js","_app/immutable/chunks/B6w811fr.js","_app/immutable/chunks/BX38NmTz.js"];
export const stylesheets = ["_app/immutable/assets/2.CGs9T--u.css"];
export const fonts = [];
