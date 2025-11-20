<script lang="ts">
	import { onMount } from 'svelte';

	const ITEMS: string[] = [
		'/item_1.png',
		'/item_2.png',
		'/item_3.png',
		'/item_4.png',
		'/item_5.png',
		'/item_6.png',
		'/item_7.png',
		'/item_8.png',
		'/item_9.png',
		'/item_10.png',
		'/item_11.png',
		'/item_12.png',
		'/item_13.png',
		'/item_14.png'
	];

	const LAYERS = [
		'/background_1.png',
		'/background_2.png',
		'/background_3.png',
		'/background_5.png',
		'/background_4.png'
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
		if (items.length > 5) {
			items.pop();
		}

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
			size: 80 + Math.random() * 100
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
			for (let i = 0; i < items.length; i++) {
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

				ctx.translate(it.x, it.y);
				ctx.rotate(it.angle);
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
			navigator.permissions.query({ name: 'gyroscope' as PermissionName }).then((result) => {
				if (result.state === 'granted') {
					console.log('using gyro parallax');
					const gyro = new (window as any).Gyroscope({ frequency: 60 });
					gyro.addEventListener('reading', () => handleGyroParallax(gyro));
					gyro.start();
				}
			});
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

<div bind:this={imageParent} class="hidden">
	{#each ITEMS as src}
		<img {src} alt="" />
	{/each}
</div>

<div class="relative h-[90vh] w-full" style="--u: {u}px; --v: {v}px">
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
	<h1
		class="absolute top-1/2 left-1/2 z-0 text-center font-display text-[calc(1rem+8vw)]/[1] drop-shadow-2xl"
	>
		{#each { length: 40 } as _, i}
			<div
				aria-hidden={i !== 0}
				class="pointer-events-none absolute {i !== 0 && 'select-none'}"
				style="
				    transform: translate(-50%, calc(0.1*{i}vw - 50%)) scale({1 - i / 400});
					filter: brightness({i !== 0 ? 0.9 - i / 60 : 1}) contrast({1 + i / 80});
					z-index: {40 - i};
				"
			>
				<span class="pointer-events-auto text-[1em] font-semibold text-orange-400">
					LUCIAFESTEN
				</span>
				<span class="pointer-events-auto text-[0.9em] font-medium text-amber-600 lg:text-[0.7em]">
					IN SPACE
				</span>
			</div>
		{/each}
	</h1>
</div>
<div class="h-[40vh] w-full bg-linear-180 from-black to-black/0"></div>
