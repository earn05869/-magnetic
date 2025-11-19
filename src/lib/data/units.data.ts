// src/lib/data/units.data.ts
import { rawPrefixes, rawUnitGroups, type RawUnit } from './units.rawdata';

// --- 1. Processed Data Structures ---

export interface Prefix {
	symbol: string;
	factor: number;
}
export interface Unit {
	symbol: string;
	name: string;
	toBase: (val: number) => number;
	fromBase: (val: number) => number;
}

// A Map for fast prefix lookup by symbol (e.g., 'k' -> { symbol: 'k', factor: 1e3 })
export const prefixMap = new Map<string, Prefix>();
rawPrefixes.forEach((p) => {
	prefixMap.set(p.symbol, { symbol: p.symbol, factor: p.factor });
});

// An ordered list of prefix symbols for the UI arrows
export const prefixSymbols = [...prefixMap.values()]
	.sort((a, b) => b.factor - a.factor)
	.map((p) => p.symbol); // ['G', 'M', 'k', '', 'm', 'u']



/**
 * Finds the next or previous prefix in the ordered list.
 * @param currentPrefixSymbol The current prefix symbol (e.g., 'k').
 * @param direction 'up' (to 'M') or 'down' (to 'm').
 */
export function getNextPrefix(currentPrefixSymbol: string, direction: 'up' | 'down'): string {
	const currentIndex = prefixSymbols.indexOf(currentPrefixSymbol);
	if (currentIndex === -1) return currentPrefixSymbol;

	if (direction === 'up') {
		const nextIndex = Math.max(0, currentIndex - 1);
		return prefixSymbols[nextIndex];
	} else {
		const nextIndex = Math.min(prefixSymbols.length - 1, currentIndex + 1);
		return prefixSymbols[nextIndex];
	}
}

