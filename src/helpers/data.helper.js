export function mapData(data) {
  if (!data) {
    return [];
  }

  return data.map((i) => ({ ...i, date: new Date(i.date) }));
}

export function defaultOne(data) {
  return data ?? 1;
}
