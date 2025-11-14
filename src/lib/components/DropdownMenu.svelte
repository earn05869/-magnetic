<script lang="ts">
	import { slide } from "svelte/transition";

	export let items: Array<{
		label: string;
		icon?: any;
		iconClass?: string;
		onclick?: () => void;
	}> = [];

	let isOpen = false;

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	const handleFocusLoss = ({ relatedTarget, currentTarget }: any) => {
		if (
			relatedTarget instanceof HTMLElement &&
			currentTarget.contains(relatedTarget)
		)
			return;
		isOpen = false;
	};

	const handleItemClick = (item: any) => {
		if (item.onclick) {
			item.onclick();
		}
		isOpen = false;
	};
</script>

<div
	class="relative flex flex-col items-center rounded-2xl bg-blue-100 overflow-visible"
	on:focusout={handleFocusLoss}
>
	<button
		class="p-2 z-10 flex justify-center items-center rounded-2xl bg-blue-100 hover:bg-blue-200 transition"
		on:click={toggleDropdown}
		aria-label="Dropdown menu"
	>
		<slot name="icon">
			<!-- Default icon slot -->
		</slot>
	</button>

	{#if isOpen}
		<ul
			class="absolute z-20 top-10 right-0 w-40 sm:w-48 bg-blue-100 rounded-2xl shadow-lg flex flex-col gap-1"
			transition:slide={{ duration: 300 }}
		>
			{#each items as item (item.label)}
				<li>
					<button
						class="w-full flex items-center justify-between p-2 hover:bg-blue-200 rounded-lg transition text-end text-xs sm:text-sm"
						on:click={() => handleItemClick(item)}
					>
						<span>{item.label}</span>
							{#if item.icon}
								<div class={item.iconClass || ""}>
									<svelte:component this={item.icon} color={item.color} class={item.iconClass || ""} />
								</div>
							{:else if item.svg}
								<div class={item.iconClass || ""} style="color: {item.color || '#60A5FA'}">
									{@html item.svg}
								</div>
							{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
