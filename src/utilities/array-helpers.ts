export const range = (start: number, size: number) =>
  new Array(size).fill(null).map((_, i) => start + i)
