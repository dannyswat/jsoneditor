export type JsonObject = Record<string, unknown>;

export function isObject(value: unknown): value is JsonObject {
  return (
    !Array.isArray(value) &&
    typeof value === 'object' &&
    value !== null &&
    value !== undefined
  );
}
