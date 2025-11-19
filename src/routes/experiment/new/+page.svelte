<script lang="ts">
    import { goto } from '$app/navigation';
    import { initializeNewExperiment } from '$lib/data.ts';
    import type { ExperimentConfig } from '$lib/data.ts';

    let name = '';
    let description = '';
    let xAxisName = 'Magnetic Field';
    let yAxisName = 'Voltage';
    let xAxisUnitSymbol = 'G';
    let xAxisPrefix = '';
    let yAxisUnitSymbol = 'V';
    let yAxisPrefix = '';

    function makeCustomConfig(): ExperimentConfig {
        return {
            id: String(Date.now()),
            name: name || 'New Experiment',
            description,
            createdAt: new Date().toISOString(),
            initialUnits: { 
                voltage: { unit: yAxisUnitSymbol, prefix: yAxisPrefix }, 
                magnetic: { unit: xAxisUnitSymbol, prefix: xAxisPrefix } 
            },
            axis: {
                x: { fieldName: xAxisName.toLowerCase().replace(/\s+/g, ''), unitSymbol: xAxisUnitSymbol, prefixSymbol: xAxisPrefix },
                y: { fieldName: yAxisName.toLowerCase().replace(/\s+/g, ''), unitSymbol: yAxisUnitSymbol, prefixSymbol: yAxisPrefix }
            }
        };
    }

    function startWithDefaults() {
        const cfg = makeCustomConfig();
        initializeNewExperiment(cfg, []);
        goto('/experiment');
    }

    function startFresh() {
        const cfg = makeCustomConfig();
        initializeNewExperiment(cfg, []);
        goto('/experiment');
    }

    function loadSample() {
        const cfg = makeCustomConfig();
        // load sample data from halleffect.rawdata via stats store fallback
        initializeNewExperiment(cfg);
        goto('/experiment');
    }
</script>

<div class="p-6">
    <h2 class="text-xl mb-4">New Experiment Setup</h2>

    <label class="block mb-2">Name
        <input bind:value={name} class="border p-2 w-full" />
    </label>

    <label class="block mb-2">Description
        <input bind:value={description} class="border p-2 w-full" />
    </label>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
            <label class="block mb-2">X Axis Name
                <input bind:value={xAxisName} class="border p-2 w-full" placeholder="e.g., Magnetic Field" />
            </label>
            <label class="block mb-2">X Axis Unit Symbol
                <input bind:value={xAxisUnitSymbol} class="border p-2 w-full" placeholder="e.g., G" />
            </label>
            <label class="block mb-2">X Axis Prefix
                <input bind:value={xAxisPrefix} class="border p-2 w-full" placeholder="e.g., m (milli)" />
            </label>
        </div>
        
        <div>
            <label class="block mb-2">Y Axis Name
                <input bind:value={yAxisName} class="border p-2 w-full" placeholder="e.g., Voltage" />
            </label>
            <label class="block mb-2">Y Axis Unit Symbol
                <input bind:value={yAxisUnitSymbol} class="border p-2 w-full" placeholder="e.g., V" />
            </label>
            <label class="block mb-2">Y Axis Prefix
                <input bind:value={yAxisPrefix} class="border p-2 w-full" placeholder="e.g., m (milli)" />
            </label>
        </div>
    </div>

    <div class="flex gap-2">
        <button class="px-4 py-2 bg-blue-700/70 text-white rounded" on:click={startWithDefaults}>Start with defaults</button>
        <button class="px-4 py-2 bg-blue-700/60 text-white rounded" on:click={startFresh}>Start fresh</button>
        <button class="px-4 py-2 bg-blue-700/50 text-white rounded" on:click={loadSample}>Load sample data</button>
    </div>
</div>
