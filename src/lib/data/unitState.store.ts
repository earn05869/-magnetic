// src/lib/data/unitState.store.ts
import { writable } from 'svelte/store';
import { loadExperimentConfig } from './stats.store';

export interface UnitState {
	unit: string;
	prefix: string;
}

const STORAGE_KEY_X_AXIS = 'global_x_axis_unit';
const STORAGE_KEY_Y_AXIS = 'global_y_axis_unit';

// Helper function to load from localStorage
function loadFromStorage(key: string, defaultValue: UnitState): UnitState {
	if (typeof window === 'undefined') return defaultValue;
	
	try {
		const saved = localStorage.getItem(key);
		if (saved) {
			return JSON.parse(saved);
		}
	} catch (e) {
		console.warn(`Failed to parse saved unit state for ${key}`, e);
	}
	return defaultValue;
}

// Helper function to save to localStorage
function saveToStorage(key: string, value: UnitState): void {
	if (typeof window === 'undefined') return;
	
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.warn(`Failed to save unit state for ${key}`, e);
	}
}

// Create writable stores with localStorage persistence
function createPersistedStore(key: string, defaultValue: UnitState) {
	const store = writable<UnitState>(
		loadFromStorage(key, defaultValue)
	);

	// Subscribe to changes and save to localStorage
	store.subscribe((value) => {
		saveToStorage(key, value);
	});

	return store;
}

// Dynamic unit state stores based on current experiment config
function createDynamicStore(key: string) {
	const store = writable<UnitState>({ unit: 'V', prefix: '' });

	// Initialize with stored value or default
	if (typeof window !== 'undefined') {
		const cfg = loadExperimentConfig();
		if (cfg) {
			let defaultValue: UnitState;
			if (key === 'x') {
				defaultValue = { unit: cfg.axis.x.unitSymbol, prefix: cfg.axis.x.prefixSymbol };
			} else {
				defaultValue = { unit: cfg.axis.y.unitSymbol, prefix: cfg.axis.y.prefixSymbol };
			}
			
			const saved = loadFromStorage(`global_${key}_axis_unit`, defaultValue);
			store.set(saved);
		}
	}

	// Subscribe to changes and save to localStorage
	store.subscribe((value) => {
		saveToStorage(`global_${key}_axis_unit`, value);
	});

	return store;
}

// Global unit state stores for flexible axis
export const xAxisUnitStore = createDynamicStore('x');
export const yAxisUnitStore = createDynamicStore('y');

