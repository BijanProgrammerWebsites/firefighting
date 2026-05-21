export const StatusToColor = {
  inService: "green",
  needsRepair: "yellow",
  outOfService: "red",
} as const;

export const SeverityToColor = {
  low: "lime",
  medium: "yellow",
  high: "orange",
  critical: "red",
} as const;
