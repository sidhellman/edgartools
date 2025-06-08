export class DataPager<T> {
  private data: T[];
  private pageSize: number;
  private currentPage: number;

  constructor(data: T[], pageSize = 50) {
    this.data = data;
    this.pageSize = pageSize;
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.floor((this.data.length - 1) / this.pageSize) + 1;
  }

  private slice(): T[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = Math.min(start + this.pageSize, this.data.length);
    return this.data.slice(start, end);
  }

  current(): T[] {
    return this.slice();
  }

  next(): T[] | undefined {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      return this.slice();
    }
    return undefined;
  }

  previous(): T[] | undefined {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      return this.slice();
    }
    return undefined;
  }
}

export function moneyfmt(value: number, options?: {
  places?: number;
  curr?: string;
  sep?: string;
  dp?: string;
  pos?: string;
  neg?: string;
  trailneg?: string;
}): string {
  const {
    places = 0,
    curr = '$',
    sep = ',',
    dp = '.',
    pos = '',
    neg = '-',
    trailneg = ''
  } = options || {};

  const sign = value < 0 ? neg : pos;
  const absValue = Math.abs(value);
  const fixed = absValue.toFixed(places);
  const [intPart, decPart] = fixed.split('.');
  const intWithSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  const result = curr + intWithSep + (decPart ? dp + decPart : '');
  return sign + result + (value < 0 ? trailneg : '');
}

export * from "./codes";
export * from "./rich";
export * from "./markdown";
export * from "./core";
