export const range = (start: number, size: number) =>
  new Array(size).fill(null).map((_, i) => start + i)

export const zip = <TA, TB, TResult>(
  a: TA[],
  b: TB[],
  map: (a: TA, b: TB) => TResult
) => {
  if (a.length !== b.length) {
    throw new Error("Inputs 'a'a and 'b' must be arrays of the same length")
  }
  return a.map((aa, i) => map(aa, b[i]))
}
