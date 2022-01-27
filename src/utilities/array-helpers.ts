export const range = (start: number, size: number) =>
  new Array(size).fill(undefined).map((_, i) => start + i)

export const makeAndFill = <T>(size: number, value: T) =>
  range(0, size).map((_) => value)

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

export const first = <T, Predicate extends (x: T) => boolean>(
  array: T[],
  predicate: Predicate
) => array.filter(predicate)[0]

export const single = <T, Predicate extends (x: T) => boolean>(
  array: T[],
  predicate: Predicate
) => {
  const filtered = array.filter(predicate)
  if (filtered.length !== 1)
    throw new Error(`array does not have 1 matching element`)
  return filtered[0]
}

export const resize = <T>(array: T[], newSize: number, fill: T): T[] => {
  if (newSize === array.length) return array
  if (newSize > array.length)
    return [...array, ...makeAndFill(newSize - array.length, fill)]
  return array.slice(0, newSize)
}
