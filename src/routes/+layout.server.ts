import type { LayoutServerLoad } from './$types';
import { isSnipcartEnabled } from '$lib/server/feature-flags';

export const load: LayoutServerLoad = async () => {
  return {
    enableSnipcart: isSnipcartEnabled(),
    snipcartPublicKey: process.env.SNIPCART_PUBLIC_KEY?.trim() ?? ''
  };
};
