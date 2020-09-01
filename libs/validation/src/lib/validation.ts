export function isForbidden(value: string, forbiddenValue: string): boolean {
    return typeof value === "string" ? value.includes(forbiddenValue) : false;
}
