export const Chat = new class {
	plural(num: any, pluralSuffix = 's', singular = '') {
		if (num && typeof num.length === 'number') {
			num = num.length;
		} else if (num && typeof num.size === 'number') {
			num = num.size;
		} else {
			num = Number(num);
		}
		return (num !== 1 ? pluralSuffix : singular);
  }

  stringify(value: any, depth = 10): string {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'number' || typeof value === 'boolean') return `${value}`;
    if (typeof value === 'string') return `"${value}"`; // NOTE: NOT ESCAPED
    if (typeof value === 'symbol') return value.toString();
    if (Array.isArray(value)) {
      if (!depth) return `[array]`;
      return `[${value.map(elem => this.stringify(elem, depth - 1)).join(', ')}]`;
    }
    if (value instanceof RegExp || value instanceof Date || value instanceof Function) {
      if (!depth && value instanceof Function) return `Function`;
      return `${value}`;
    }
    let constructor = '';
    if (value.constructor && value.constructor.name && typeof value.constructor.name === 'string') {
      constructor = value.constructor.name;
      if (constructor === 'Object') constructor = '';
    } else {
      constructor = 'null';
    }
    if (value.toString) {
      try {
        const stringValue = value.toString();
        if (typeof stringValue === 'string' &&
						stringValue !== '[object Object]' &&
						stringValue !== `[object ${constructor}]`) {
          return `${constructor}(${stringValue})`;
        }
      } catch (e) {}
    }
    let buf = '';
    for (const key in value) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) continue;
      if (depth < 8 || (!depth && constructor)) {
        buf = '...';
        break;
      }
      if (buf) buf += ', ';
      let displayedKey = key;
      if (!/^[A-Za-z0-9_$]+$/.test(key)) displayedKey = JSON.stringify(key);
      buf += `${displayedKey}: ${this.stringify(value[key], depth - 1)}`;
    }
    if (constructor && !buf && constructor !== 'null') return constructor;
    return `${constructor}{${buf}}`;
  }
};