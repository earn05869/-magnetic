<script lang="ts">
	import * as d3 from "d3";
	import type { ScaleLinear } from "d3";
	import Line from "$lib/components/Line.svelte";
	import XAxis from "$lib/components/XAxis.svelte";
	import GridLines from "$lib/components/GridLines.svelte";
	import Crosshair from "$lib/components/Crosshair.svelte";
	import Point from "$lib/components/Point.svelte";
	import type { Stat } from "$lib/data/data.ts";

	export let stats: Stat[];

	let hoveredPoint: Stat | null = null;

	const margin = {
		top: 50,
		right: 50,
		bottom: 50,
		left: 80,
	};

	let width = 100;
	let height = $derived(0.5 * width);

	let innerWidth = $derived(width - margin.left - margin.right);
	let innerHeight = $derived(height - margin.top - margin.bottom);

	const xAccessor = (d: Stat) => d.year;
	const yAccessor = (d: Stat) => d.population;

	const bisectX = d3.bisector(xAccessor).left;

	let xScale = $derived(
		d3
			.scaleLinear()
			.domain(d3.extent(stats, xAccessor) as [number, number])
			.range([0, innerWidth]),
	);

	let yScale = $derived(
		d3
			.scaleLinear()
			.domain(d3.extent(stats, yAccessor) as [number, number])
			.range([innerHeight, 0])
			.nice(),
	);

	let xAccessorScaled = $derived((d: Stat) => xScale(xAccessor(d)));
	let yAccessorScaled = $derived((d: Stat) => yScale(yAccessor(d)));

	const handleMouseMove = (event: MouseEvent) => {
		if (event.currentTarget instanceof SVGElement) {
			const rect = event.currentTarget.getBoundingClientRect();
			const xCoordinate = xScale.invert(
				event.clientX - rect.left - margin.left,
			);
			const index = bisectX(stats, xCoordinate);
			hoveredPoint = stats[index - 1] || stats[0];
		}
	};

	const handleMouseLeave = () => {
		hoveredPoint = null;
	};
</script>

<div class="relative w-full max-w-3xl mx-auto" bind:clientWidth={width}>
	<svg
		role="img"
		aria-label="line chart that shows the variation of Canada's population between 2000 and 2022"
		{width}
		{height}
		class="w-full h-auto"
		on:mousemove={handleMouseMove}
		on:mouseleave={handleMouseLeave}
	>
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			<XAxis {xScale} {innerHeight} {hoveredPoint} label="Year" />
			<GridLines
				{yScale}
				{innerWidth}
				{hoveredPoint}
				label="Population"
			/>
			<Line {stats} {xAccessorScaled} {yAccessorScaled} />
			{#if hoveredPoint}
				<Crosshair
					xAccessorScaled={xAccessorScaled(hoveredPoint)}
					yAccessorScaled={yAccessorScaled(hoveredPoint)}
					xLabel={xAccessor(hoveredPoint)}
					yLabel={yAccessor(hoveredPoint)}
					{innerHeight}
				/>
				<Point
					x={xAccessorScaled(hoveredPoint)}
					y={yAccessorScaled(hoveredPoint)}
					color="#dc267f"
				/>
			{/if}
		</g>
	</svg>
</div>
