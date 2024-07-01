export const toStartCase = (value: string) =>
  (value[0]?.toUpperCase() ?? "") + value.slice(1).toLowerCase();
