export const esc = (ms) => str==null?'':String(str) .replace(/&/g, '&amp;') .replace(/</g, '&lt;') .replace(/>/g, '&gt;') .replace(/"/g, '&quot;') .replace(/'/g, '&#039;');
export const ms = (ms) => TIME_UNITS.reduce((str, [name, n]) => { const val = Math.floor(ms / n); ms %= n; return val ? `${str}${str ? ', ' : ''}${val} ${name}${val > 1 ? 's' : ''}` : str; }, '') || `${ms} ms`;
