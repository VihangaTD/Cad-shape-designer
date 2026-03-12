export function snapValue(value: number, enabled: boolean, snapSize: number) {
  if (!enabled) return value;
  return Math.round(value / snapSize) * snapSize;
}