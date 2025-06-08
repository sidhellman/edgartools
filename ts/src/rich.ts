export function dfToTable(
  data: Array<Record<string, unknown>>,
  options: { title?: string; maxRows?: number } = {}
): string {
  if (!data.length) return '';
  const headers = Object.keys(data[0]);
  const maxRows = options.maxRows ?? 20;
  const rows = data.slice(0, maxRows).map((row) =>
    headers.map((h) => String(row[h] ?? '')).join(' | ')
  );
  const table = [headers.join(' | '), ...rows];
  if (data.length > maxRows) table.push('...');
  return table.join('\n');
}

export function reprRich(renderable: unknown): string {
  if (typeof renderable === 'string') return renderable;
  return JSON.stringify(renderable, null, 2);
}
