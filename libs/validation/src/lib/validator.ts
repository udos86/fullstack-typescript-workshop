export function isForbidden(value: string, forbiddenValue: string): boolean {
  return typeof value === "string" ? value.toLowerCase().includes(forbiddenValue.toLowerCase()) : false;
}
