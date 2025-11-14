<script>
	import {
		ChevronLeft,
		LineChart,
		ChartSpline,
		ChartColumnBig,
		ChartNetwork,
		EllipsisVertical,
		Image,
		FileSpreadsheet
	} from "lucide-svelte";

	import { stats } from "$lib/data.ts";
	import LineGraph from "$lib/components/LineChart.svelte";
	import DropdownMenu from "$lib/components/DropdownMenu.svelte";
	import { color } from "d3";

	const myData = [
		{ x: 0, y: 2 },
		{ x: 1, y: 4 },
		{ x: 2, y: 3 },
		{ x: 3, y: 5 },
	];

	const chartMenuItems = [
		{
			label: "Curve Fit",
			icon: ChartSpline,
			color: '#60A5FA',
			iconClass: "w-4 h-4 sm:w-5 sm:h-5",
		},
		{
			label: "Integral",
			icon: null,
			iconClass: "w-4 h-4 sm:w-5 sm:h-5",
			svg: `
				<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" focusable="false">
					<path d="M5,19l.38.76a2.24,2.24,0,0,0,2,1.24h0a2.24,2.24,0,0,0,2.13-1.53L12,12l2.49-7.47A2.24,2.24,0,0,1,16.62,3h0a2.24,2.24,0,0,1,2,1.24L19,5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
				</svg>
			`,
			color: '#60A5FA',
		},
		{
			label: "Statistics",
			icon: ChartColumnBig,
			iconClass: "w-4 h-4 sm:w-5 sm:h-5",
			color: '#60A5FA',
		},
		{
			label: "Interpolation",
			icon: ChartNetwork,
			iconClass: "w-4 h-4 sm:w-5 sm:h-5",
			color: '#60A5FA',
		},
	];

	const exportMenuItems = [
		{
			
			label: "Export Data as CSV",
			icon: FileSpreadsheet,
			color: '#60A5FA',
			iconClass: "w-4 h-4 sm:w-5 sm:h-5",
		},
		{
			
			label: "Export Graph as JPG",
			icon: Image,
			color: '#60A5FA',
			iconClass: "w-4 h-4 sm:w-5 sm:h-5",
		},
	];
</script>

<div class="flex flex-col h-screen bg-stone-100">
	<nav
		class="flex items-center justify-between w-full p-4 bg-white shadow-sm flex-shrink-0"
	>
		<div class="flex items-center gap-2 sm:gap-3">
			<a href="/experiment" class="hover:bg-gray-100 rounded-full p-1 transition">
				<ChevronLeft class="w-5 h-5 sm:w-6 sm:h-6" />
			</a>
			<p class="text-sm sm:text-base font-medium">กราฟแสดงข้อมูล</p>
		</div>
		<div class="flex items-center gap-3 sm:gap-4">
			<DropdownMenu items={chartMenuItems}>
				<svelte:fragment slot="icon">
					<LineChart color="#60A5FA" class="w-5 h-5 sm:w-6 sm:h-6" />
				</svelte:fragment>
			</DropdownMenu>
			<DropdownMenu items={exportMenuItems}>
				<svelte:fragment slot="icon">
					<EllipsisVertical color="#60A5FA" class="w-5 h-5 sm:w-6 sm:h-6" />
				</svelte:fragment>
			</DropdownMenu>
		</div>
	</nav>
	
	<div class="flex-1 overflow-auto bg-blue-50">
		<div class="h-full w-full flex justify-start items-start">
				<LineGraph {stats} />
		</div>
	</div>
</div>