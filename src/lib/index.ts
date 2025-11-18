// place files you want to import through the `$lib` alias in this folder.
export async function wait(ms: number) {
	return new Promise((r) => setTimeout(r, ms));
}
