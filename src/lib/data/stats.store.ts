// src/lib/data/stats.store.ts
import { writable } from 'svelte/store';
import { stats as initialStats, type HalleffectData } from './halleffect.rawdata';

const STORAGE_KEY_STATS = 'hall_effect_stats';

// Helper function to load from localStorage
function loadFromStorage(): HalleffectData[] {
	if (typeof window === 'undefined') return initialStats;
	
	try {
		const saved = localStorage.getItem(STORAGE_KEY_STATS);
		if (saved) {
			return JSON.parse(saved);
		}
	} catch (e) {
		console.warn('Failed to parse saved stats', e);
	}
	return initialStats;
}

// Helper function to save to localStorage
function saveToStorage(value: HalleffectData[]): void {
	if (typeof window === 'undefined') return;
	
	try {
		localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(value));
	} catch (e) {
		console.warn('Failed to save stats', e);
	}
}

// Create writable store with localStorage persistence
export const statsStore = writable<HalleffectData[]>(loadFromStorage());

// Subscribe to changes and save to localStorage
statsStore.subscribe((value) => {
	saveToStorage(value);
});

// Helper functions
export function undoLastRow() {
	statsStore.update(stats => {
		if (stats.length > 0) {
			return stats.slice(0, -1);
		}
		return stats;
	});
}

export function resetAllData() {
	statsStore.set([]);
}

export function addTestData(magneticfield: number, voltage: number) {
	statsStore.update(stats => {
		return [...stats, { magneticfield, voltage }];
	});
}

