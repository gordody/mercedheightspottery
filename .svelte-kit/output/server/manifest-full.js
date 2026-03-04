export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BlbEJZm-.js",app:"_app/immutable/entry/app.DIiXs65u.js",imports:["_app/immutable/entry/start.BlbEJZm-.js","_app/immutable/chunks/CgKTHtHe.js","_app/immutable/chunks/CKfYcjDY.js","_app/immutable/chunks/Cn_HKAD8.js","_app/immutable/entry/app.DIiXs65u.js","_app/immutable/chunks/CKfYcjDY.js","_app/immutable/chunks/fgVXtmWi.js","_app/immutable/chunks/RlmJM96O.js","_app/immutable/chunks/Cn_HKAD8.js","_app/immutable/chunks/VPmbUtWU.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/pieces",
				pattern: /^\/pieces\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/pieces/[slug]",
				pattern: /^\/pieces\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
