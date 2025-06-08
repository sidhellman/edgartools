export class Result<T> {
  success: boolean;
  error?: string;
  value?: T;

  constructor(success: boolean, value?: T, error?: string) {
    this.success = success;
    this.value = value;
    this.error = error;
  }

  get failure(): boolean {
    return !this.success;
  }
}

export function getBool(value?: string | number | boolean | null): boolean | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  const val = String(value).toLowerCase();
  return ['1', 'y', 'true'].includes(val);
}

export function datefmt(value: Date | string, fmt = 'YYYY-MM-DD'): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  if (fmt === 'YYYY-MM-DD') {
    return date.toISOString().slice(0, 10);
  }
  if (fmt === 'YYYYMMDD') {
    return date.toISOString().slice(0, 10).replace(/-/g, '');
  }
  return date.toISOString();
}

const SPECIAL_PARTS = new Set(['Jr', 'Sr', 'II', 'III', 'MD', 'ET', 'AL', 'et', 'al']);

export function reverseName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return name.trim();
  const extras: string[] = [];
  while (parts.length > 1) {
    const last = parts[parts.length - 1].replace(/\./, '');
    if (SPECIAL_PARTS.has(last)) {
      extras.unshift(parts.pop() as string);
    } else {
      break;
    }
  }
  const last = parts.pop() as string;
  const main = parts.join(' ');
  let result = `${last}${main ? ' ' + main : ''}`;
  if (extras.length) result += ' ' + extras.join(' ');
  return result;
}
