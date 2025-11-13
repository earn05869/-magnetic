<script lang="ts">
	import * as d3 from "d3";
	import type { ScaleLinear } from "d3";

	export let yScale: ScaleLinear<number, number>;
	export let innerWidth: number;
	export let hoveredPoint: { year: number; population: number } | null;
	export let label: string;

	const formatTick = d3.format(".2s");

	const numberOfTicks = (pixelsAvailable: number, pixelsPerTick = 60) =>
		Math.floor(Math.abs(pixelsAvailable) / pixelsPerTick);

	let [yMin, yMax] = $derived(yScale.range());

	let ticks = $derived(yScale.ticks(numberOfTicks(yMax - yMin)));
</script>

<g>
	{#each ticks as tick}
		<g transform={`translate(0 ${yScale(tick)})`}>
			<line
				x1={0}
				x2={innerWidth}
				stroke="#e5e7eb"
				stroke-opacity="0.5"
				class="stroke-gray-300"
			/>
			<text
				dx={-10}
				dy="0.34em"
				text-anchor="end"
				class="fill-gray-800 text-sm"
				fill={hoveredPoint ? "#9ca3af" : "#1f2937"}
			>
				{formatTick(tick)}
			</text>
		</g>
	{/each}
	<text
		dx={-10}
		y={-35}
		dy="0.8em"
		text-anchor="end"
		class="fill-gray-800 text-sm"
	>
		{label}
	</text>
</g>
