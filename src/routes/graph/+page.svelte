<script>
	import { slide } from "svelte/transition";
	import {
		ChevronLeft,
		LineChart,
		ChartSpline,
		ChartColumnBig,
		ChartNetwork,
		EllipsisVertical,
	} from "lucide-svelte";

	import { stats } from "$lib/data/data.ts";
	import LineGraph from "$lib/components/LineChart.svelte";

	const myData = [
		{ x: 0, y: 2 },
		{ x: 1, y: 4 },
		{ x: 2, y: 3 },
		{ x: 3, y: 5 },
	];

	let isDropdownOpen = false;

	const handleDropdownClick = () => {
		isDropdownOpen = !isDropdownOpen;
	};

	const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
		if (
			relatedTarget instanceof HTMLElement &&
			currentTarget.contains(relatedTarget)
		)
			return;
		isDropdownOpen = false;
	};
</script>

<div class="flex flex-col h-screen pb-6 bg-stone-100">
	<nav
		class="flex items-center justify-between w-full h-auto p-4 border-blue-900 bg-white"
	>
		<div class="flex items-center justify-between w-auto min-w-32">
			<a href="/experiment"><ChevronLeft /></a>
			<p>กราฟแสดงข้อมูล</p>
		</div>
		<div class="flex items-center justify-between w-auto min-w-20">
			<div
				class="relative flex flex-col items-center gap-0 rounded-2xl bg-blue-100 overflow-visible"
				on:focusout={handleDropdownFocusLoss}
			>
				<button
					class={`p-2 z-5 w-full flex justify-center items-center border-blue-900 rounded-2xl bg-blue-100 hover:bg-blue-200 transition`}
					on:click={handleDropdownClick}
				>
					<LineChart color="#60A5FA" />
				</button>
				{#if isDropdownOpen}
					<ul
						class="absolute z-0 top-5 left-0 w-full pt-5 bg-blue-100 rounded-b-2xl shadow-lg flex flex-col gap-2 p-2"
						class:visible={isDropdownOpen}
						class:invisible={!isDropdownOpen}
						transition:slide={{ duration: 300 }}
					>
						<li>
							<div class="relative">
								<p class="absolute right-10 w-24 text-end">
									Curve Fit
								</p>
								<ChartSpline color="#60A5FA" />
							</div>
						</li>
						<li>
							<div class="relative">
								<p class="absolute right-10 w-24 text-end">
									Integral
								</p>
								<svg
									fill="#60A5FA"
									width="24px"
									height="24px"
									viewBox="0 0 24 24"
									id="integral"
									data-name="Line Color"
									xmlns="http://www.w3.org/2000/svg"
									class="icon line-color"
									stroke="#60A5FA"
									><g
										id="SVGRepo_bgCarrier"
										stroke-width="100"
									></g><g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g><g id="SVGRepo_iconCarrier"
										><path
											id="primary"
											d="M5,19l.38.76a2.24,2.24,0,0,0,2,1.24h0a2.24,2.24,0,0,0,2.13-1.53L12,12l2.49-7.47A2.24,2.24,0,0,1,16.62,3h0a2.24,2.24,0,0,1,2,1.24L19,5"
											style="fill: none; stroke: #60A5FA; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"
										></path></g
									></svg
								>
							</div>
						</li>
						<li>
							<div class="relative">
								<p class="absolute right-10 w-24 text-end">
									Statistics
								</p>
								<ChartColumnBig color="#60A5FA" />
							</div>
						</li>
						<li>
							<div class="relative">
								<p class="absolute right-10 w-24 text-end">
									Interpolation
								</p>
								<ChartNetwork color="#60A5FA" />
							</div>
						</li>
					</ul>
				{/if}
			</div>
			<EllipsisVertical />
		</div>
	</nav>
	<div class="flex-1 bg-red-100 w-full">
		<LineGraph {stats} />
	</div>
</div>
