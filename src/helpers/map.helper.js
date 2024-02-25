export function mapItems(items) {
  if (!items) {
    return [];
  }

  return items.map((i) => ({ ...i, date: new Date(i.date) }));
}
