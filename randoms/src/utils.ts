type Comparable = number | string | boolean | Comparable[] | {reverse: Comparable};

/** Forces num to be an integer (between min and max). */
function clampIntRange(num: any, min?: number, max?: number): number {
	if (typeof num !== 'number') num = 0;
	num = Math.floor(num);
	if (min !== undefined && num < min) num = min;
	if (max !== undefined && num > max) num = max;
	return num;
}
/**
 * Compares two variables; intended to be used as a smarter comparator.
 * The two variables must be the same type (TypeScript will not check this).
 *
 * - Numbers are sorted low-to-high, use `-val` to reverse
 * - Strings are sorted A to Z case-semi-insensitively, use `{reverse: val}` to reverse
 * - Booleans are sorted true-first (REVERSE of casting to numbers), use `!val` to reverse
 * - Arrays are sorted lexically in the order of their elements
 *
 * In other words: `[num, str]` will be sorted A to Z, `[num, {reverse: str}]` will be sorted Z to A.
 */
function compare(a: Comparable, b: Comparable): number {
	if (typeof a === 'number') {
		return a - (b as number);
	}
	if (typeof a === 'string') {
		return a.localeCompare(b as string);
	}
	if (typeof a === 'boolean') {
		return (a ? 1 : 2) - (b ? 1 : 2);
	}
	if (Array.isArray(a)) {
		for (let i = 0; i < a.length; i++) {
			const comparison = compare(a[i], (b as Comparable[])[i]);
			if (comparison) return comparison;
		}
		return 0;
	}
	if ('reverse' in a) {
		return compare((b as {reverse: string}).reverse, a.reverse);
	}
	throw new Error(`Passed value ${a} is not comparable`);
}

/**
 * Sorts an array according to the callback's output on its elements.
 *
 * The callback's output is compared according to `PSUtils.compare`
 * (numbers low to high, strings A-Z, booleans true-first, arrays in order).
 */
function sortBy<T>(array: T[], callback: (a: T) => Comparable): T[];
/**
 * Sorts an array according to `PSUtils.compare`
 * (numbers low to high, strings A-Z, booleans true-first, arrays in order).
 *
 * Note that array.sort() only works on strings, not numbers, so you'll need
 * this to sort numbers.
 */
function sortBy<T extends Comparable>(array: T[]): T[];
function sortBy<T>(array: T[], callback?: (a: T) => Comparable) {
	if (!callback) return (array as any[]).sort(compare);
	return array.sort((a, b) => compare(callback(a), callback(b)));
}

class Multiset<T> extends Map<T, number> {
	add(key: T) {
		this.set(key, (this.get(key) ?? 0) + 1);
		return this;
	}
	remove(key: T) {
		const newValue = (this.get(key) ?? 0) - 1;
		if (newValue <= 0) return this.delete(key);
		this.set(key, newValue);
		return true;
	}
}

export const Utils = {clampIntRange, compare, sortBy, Multiset};
