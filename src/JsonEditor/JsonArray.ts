export type JsonArray = unknown[];

export function isArray(value: unknown): value is JsonArray {
  return Array.isArray(value);
}