export function filterByText(original: string, filter: string | null): boolean {
  const trimmed = filter?.trim();
  return !trimmed || original.includes(trimmed);
}

export function filterByNumber(
  original: number,
  filter: number | "" | null,
): boolean {
  return filter === "" || filter === null || original === filter;
}
