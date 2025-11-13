<script lang="ts">
	export let x: number;
	export let y: number;
	export let color: string;
</script>

<g>
	<circle cx={x} cy={y} fill={color} r="5" class="fill-pink-600" />
</g>
