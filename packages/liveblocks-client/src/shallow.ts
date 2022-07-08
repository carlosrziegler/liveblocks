function shallowArray(xs: unknown, ys: unknown): boolean {
  return (
    Array.isArray(xs) &&
    Array.isArray(ys) &&
    xs.length === ys.length &&
    xs.every((x, idx) => Object.is(x, ys[idx]))
  );
}

function shallowObj<T>(objA: T, objB: T): boolean {
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // Specific exception for dates
  if (
    Object.prototype.toString.call(objA) === "[object Date]" ||
    Object.prototype.toString.call(objB) === "[object Date]"
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      Object.is(objA[key as keyof T], objB[key as keyof T])
  );
}

/**
 * Shallowly compares two given values.
 *
 * - Two simple values are considered equal if they're strictly equal
 * - Two arrays are considered equal if their members are strictly equal
 * - Two objects are considered equal if their values are strictly equal
 *
 * Testing goes one level deep.
 */
export default function shallow<T>(a: T, b: T): boolean {
  return Object.is(a, b) || shallowArray(a, b) || shallowObj(a, b);
}