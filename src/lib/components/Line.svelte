<script lang="ts">
	import * as d3 from "d3";
	import type { Stat } from "$lib/data/data.ts";

	export let stats: Stat[];
	export let xAccessorScaled: (d: Stat) => number;
	export let yAccessorScaled: (d: Stat) => number;

	const interpolation = d3.curveMonotoneX;

	let lineGenerator = $derived(
		d3
			.line<Stat>()
			.x(xAccessorScaled)
			.y(yAccessorScaled)
			.curve(interpolation),
	);

	let line = $derived(lineGenerator(stats));
</script>

<path
	class="fill-none stroke-indigo-700 stroke-[3px] stroke-linecap-round"
	d={line}
/>
