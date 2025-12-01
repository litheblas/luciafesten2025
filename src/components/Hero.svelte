<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import Button from './Button.svelte';

	type HeroProps = {
		buttons?: Snippet;
	};

	const { buttons }: HeroProps = $props();

	const ITEMS: string[] = [
		'item_1.webp',
		'item_2.webp',
		'item_3.webp',
		'item_4.webp',
		'item_5.webp',
		'item_6.webp',
		'item_7.webp',
		'item_8.webp',
		'item_9.webp',
		'item_10.webp',
		'item_11.webp',
		'item_12.webp',
		'item_13.webp',
		'item_14.webp'
	];

	const LAYERS = [
		'background_1.webp',
		'background_2.webp',
		'background_3.webp',
		'background_5.webp',
		'background_4.webp'
	];

	type FloatingItem = {
		image: HTMLImageElement;
		size: number;
		x: number;
		y: number;
		dir: number;
		spd: number;
		maxSpd: number;
		angle: number;
		angleSpd: number;
		maxAngleSpd: number;
		timeCreated: number;
		timeToLive: number;
	};

	let imageParent: HTMLDivElement | undefined = undefined;
	let canvas: HTMLCanvasElement | undefined = undefined;
	let ctx = $derived<CanvasRenderingContext2D | null | undefined>(
		(canvas as HTMLCanvasElement | undefined)?.getContext('2d')
	);
	let lastTime = $state(Date.now());
	let items = $state<FloatingItem[]>([]);
	let x = $state(0);
	let y = $state(0);
	let u = $derived(x / (typeof window !== 'undefined' ? window.innerWidth : 1) - 0.5);
	let v = $derived(y / (typeof window !== 'undefined' ? window.innerHeight : 1) - 0.5);

	function handleMouseParallax(evt: MouseEvent) {
		x = evt.pageX;
		y = evt.pageY;
	}

	function handleGyroParallax(gyro: any) {
		x -= gyro.y * 10;
		y -= gyro.x * 10;
	}

	function handleScrollParallax() {
		y = window.scrollY * 4;
	}

	function handleCreateItem() {
		if (canvas == null || imageParent == null) return;

		const src = ITEMS[Math.floor(Math.random() * ITEMS.length)];
		const it: FloatingItem = {
			image: imageParent.querySelector(`img[src="${src}"]`)!,
			angle: Math.random() * 2 * Math.PI,
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			dir: Math.PI - Math.random() * 2 * Math.PI,
			maxSpd: 100 - Math.random() * 200,
			maxAngleSpd: Math.PI - Math.random() * 2 * Math.PI,
			spd: 0,
			angleSpd: 0,
			size: 80 + Math.random() * 100,
			timeCreated: Date.now(),
			timeToLive: 40000 + Math.random() * 20000
		};
		it.spd = it.maxSpd;
		it.angleSpd = it.maxAngleSpd;

		items.unshift(it);
		console.log('Adding item', items);
		setTimeout(handleCreateItem, 4000 + Math.random() * 5000);
	}

	function handleClickCanvas(evt: MouseEvent) {
		for (let i = 0; i < items.length; i++) {
			const it = items[i];
			const dsqr = (evt.pageX - it.x) ** 2 + (evt.pageY - it.y) ** 2;
			if (dsqr < (it.size / 2) ** 2) {
				const baseDir = Math.atan2(it.y - evt.pageY, it.x - evt.pageX);
				it.dir = baseDir + (Math.PI / 4) * Math.random();
				it.spd = 300 - 100 * Math.random();
				it.angleSpd = (2 - 4 * Math.random()) * Math.PI;
			}
		}
	}

	function handleItemsUpdate() {
		let dt = (Date.now() - lastTime) / 1000;

		if (canvas != null && ctx != null) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let i = items.length - 1; i >= 0; i--) {
				const it = items[i];
				it.x += Math.cos(it.dir) * it.spd * dt;
				it.y += Math.sin(it.dir) * it.spd * dt;
				it.angle += it.angleSpd * dt;

				if (it.spd > it.maxSpd) {
					it.spd *= 1 - dt / 3;
				}
				if (it.angleSpd > it.maxAngleSpd) {
					it.angleSpd *= 1 - dt / 3;
				}

				if (it.x > canvas.width - it.size / 2 || it.x < it.size / 2) {
					it.dir = Math.PI - it.dir;
					it.x = Math.max(it.size / 2, Math.min(canvas.width - it.size / 2, it.x));
				}

				if (it.y > canvas.height - it.size / 2 || it.y < it.size / 2) {
					it.dir = -it.dir;
					it.y = Math.max(it.size / 2, Math.min(canvas.height - it.size / 2, it.y));
				}

				ctx.translate(Math.floor(it.x), Math.floor(it.y));
				ctx.rotate(it.angle);
				let alpha =
					(-1 / 1000) * Math.abs(Date.now() - it.timeCreated - it.timeToLive / 2) +
					((1 / 1000) * it.timeToLive) / 2;

				ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
				ctx.drawImage(
					it.image,
					0,
					0,
					it.image.width,
					it.image.height,
					-it.size / 2,
					-it.size / 2,
					it.size,
					it.size
				);
				ctx.globalAlpha = 1;

				if (alpha <= 0) {
					items.splice(i, 1);
				}
				ctx.resetTransform();
			}
		}

		lastTime = Date.now();
		window.requestAnimationFrame(handleItemsUpdate);
	}

	function handleResize() {
		if (canvas) {
			canvas.width = canvas.parentElement!.offsetWidth;
			canvas.height = canvas.parentElement!.offsetHeight;
		}
	}

	onMount(() => {
		if (canvas) {
			canvas.width = canvas.parentElement!.offsetWidth;
			canvas.height = canvas.parentElement!.offsetHeight;
			handleCreateItem();
		}

		if (matchMedia('(pointer:fine)').matches) {
			console.log('using pointer parallax');
			window.addEventListener('mousemove', handleMouseParallax);
		} else {
			window.addEventListener('scroll', handleScrollParallax);
			if (typeof (window as any).Gyroscope !== 'undefined') {
				navigator.permissions.query({ name: 'gyroscope' as PermissionName }).then((result) => {
					if (result.state === 'granted') {
						console.log('using gyro parallax');
						const gyro = new (window as any).Gyroscope({ frequency: 60 });
						gyro.addEventListener('reading', () => handleGyroParallax(gyro));
						gyro.start();
					}
				});
			}
		}
		window.addEventListener('resize', handleResize);
		window.requestAnimationFrame(handleItemsUpdate);
		return () => {
			window.removeEventListener('mousemove', handleMouseParallax);
			window.removeEventListener('scroll', handleScrollParallax);
			window.addEventListener('resize', handleResize);
		};
	});
</script>

{#snippet layeredText(text: string, layers: number = 20)}
	<span class="pointer-events-auto">{text}</span>
	{#each { length: 40 } as _, i}
		<span
			aria-hidden={i !== 0}
			class="pointer-events-none absolute inset-0 select-none"
			style="
		    transform: translateY(calc(0.1*{i}vw)) scale({1 - i / 400});
			filter: brightness({i !== 0 ? 0.9 - i / 60 : 1}) contrast({1 + i / 80});
			z-index: {-i};
		"
		>
			{text}
		</span>
	{/each}
{/snippet}

<div bind:this={imageParent} class="hidden">
	{#each ITEMS as src}
		<img {src} alt="" />
	{/each}
</div>

<div class="relative h-[calc(100vh-6rem)] w-full" style="--u: {u}px; --v: {v}px">
	<div class="-z-10 h-full w-full bg-black">
		{#each LAYERS as img, i}
			<div
				class="absolute h-full w-full bg-cover bg-no-repeat transition"
				style="
				    --i: {i};
   			        background-image: url({img});
    				background-position: calc(50% + var(--u)*{i + 1}*10) calc(50% + var(--v)*{i + 1}*10)
     			"
			></div>
		{/each}
	</div>
	<canvas
		onclick={handleClickCanvas}
		class="absolute inset-0"
		style="transform: translate(var(--u)*5, var(--v)*5)"
		bind:this={canvas}
	></canvas>
	<div
		class="pointer-events-none absolute top-[50vh] left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-center font-display drop-shadow-2xl"
	>
		<h1 class="text-[calc(1rem+8vw)]/[1]">
			<p class="hidden">LUCIAFESTEN IN SPACE</p>

			<img style="width: 70vw; max-width: 1000px;" src="titel.webp" alt="LUCIAFESTEN - IN SPACE" />
			<div class="-mt-16 flex items-center justify-center">
				<div
					class="pointer-events-auto flex w-full flex-col justify-center gap-3 sm:w-max sm:flex-row"
				>
					{@render buttons?.()}
				</div>
			</div>
		</h1>
	</div>
	<div
		class="pointer-events-none absolute bottom-0 h-[calc(20vh)] w-full bg-linear-180 from-slate-950/0 to-slate-950"
	></div>
</div>

<style>
	canvas {
		image-rendering: -moz-crisp-edges;
		image-rendering: -webkit-crisp-edges;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
	}
</style>
