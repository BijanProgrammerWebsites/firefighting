export const EquipmentStatusToColor = {
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

export const DefectStatusToColor = {
  open: "orange",
  inProgress: "lime",
  waitingForSparePart: "yellow",
  closed: "gray",
} as const;

export const MaintenanceStatusToColor = {
  notStarted: "orange",
  assigned: "yellow",
  inProgress: "lime",
  waitingForSparePart: "yellow",
  completed: "lime",
  verified: "green",
} as const;
