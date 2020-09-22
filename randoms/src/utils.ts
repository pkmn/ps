export const Utils = new class Utils {
	/** Forces num to be an integer (between min and max). */
	clampIntRange(num: any, min?: number, max?: number): number {
		if (typeof num !== 'number') num = 0;
		num = Math.floor(num);
		if (min !== undefined && num < min) num = min;
		if (max !== undefined && num > max) num = max;
		return num;
	}
};
