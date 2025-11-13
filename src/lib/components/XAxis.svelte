<script lang="ts">
	import * as d3 from "d3";
	import type { ScaleLinear } from "d3";

	export let xScale: ScaleLinear<number, number>;
	export let innerHeight: number;
	export let hoveredPoint: { year: number; population: number } | null;
	export let label: string;

	const numberOfTicks = (pixelsAvailable: number, pixelsPerTick = 140) =>
		Math.floor(Math.abs(pixelsAvailable) / pixelsPerTick);

	let [xMin, xMax] = $derived(xScale.range());

	let ticks = $derived(xScale.ticks(numberOfTicks(xMax - xMin)));
</script>

<g transform={`translate(0 ${innerHeight})`}>
	<line
		x1={xMin}
		x2={xMax}
		y1={0}
		y2={0}
		stroke="#e5e7eb"
		class="stroke-gray-300"
	/>
	{#each ticks as tick}
		<g transform={`translate(${xScale(tick)} 0)`}>
			<line y1={0} y2={6} stroke="#e5e7eb" class="stroke-gray-300" />
			<text
				y={10}
				dy="0.8em"
				text-anchor="middle"
				class="fill-gray-800"
				fill={hoveredPoint ? "#9ca3af" : "#1f2937"}
			>
				{tick}
			</text>
		</g>
	{/each}
	<text
		x={xScale.range()[1] / 2}
		text-anchor="middle"
		y={45}
		class="fill-gray-800 text-sm"
	>
		{label}
	</text>
</g>
