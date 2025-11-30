import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		paths: {
			// base: '/luciafesten2025'
		},
		adapter: adapter({
			pages: './_site',
			assets: './_site'
		})
	}
};

export default config;
