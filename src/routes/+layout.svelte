<script lang="ts">
  import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { onMount } from 'svelte';

	const SNIPCART_VERSION = '3.3.3';
	const SNIPCART_CDN_BASE = `https://cdn.snipcart.com/themes/v${SNIPCART_VERSION}/default`;
	const SNIPCART_PUBLIC_KEY =
		'ZjQxMmNkMDktYmJmYy00YmUzLWIyZjMtOTdjNzgxZGNiNjczNjM5MDgxNjk2MzAxMDczMjE4';

	export let data: {
		enableSnipcart: boolean;
	};

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	onMount(() => {
		if (data.enableSnipcart) {
			initializeSnipcart();
		}
	});

	function initializeSnipcart() {
		(window as any).SnipcartSettings = {
			publicApiKey: SNIPCART_PUBLIC_KEY
		};

		let snipcart = document.querySelector('#snipcart') as HTMLElement | null;
		if (!snipcart) {
			snipcart = document.createElement('div');
			snipcart.id = 'snipcart';
			snipcart.hidden = true;
			document.body.appendChild(snipcart);
		}
		snipcart.dataset.apiKey = SNIPCART_PUBLIC_KEY;

		const existingScript = document.querySelector('script[src*="cdn.snipcart.com"][src*="snipcart.js"]');
		if (!existingScript) {
			const script = document.createElement('script');
			script.src = `${SNIPCART_CDN_BASE}/snipcart.js`;
			script.async = true;
			document.head.appendChild(script);
		}

		const existingStyles = document.querySelector('link[href*="cdn.snipcart.com"][href*="snipcart.css"]');
		if (!existingStyles) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = `${SNIPCART_CDN_BASE}/snipcart.css`;
			document.head.appendChild(link);
		}
	}
</script>

<slot />