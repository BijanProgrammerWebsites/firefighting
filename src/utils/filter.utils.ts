export function filterByText(original: string, filter: string | null): boolean {
  const trimmed = filter?.trim();
  return !trimmed || original.includes(trimmed);
}
